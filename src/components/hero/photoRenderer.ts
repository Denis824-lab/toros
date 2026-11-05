import vertexSource from "./vertex.glsl?raw";
import originalFragment from "./fragment.glsl?raw";

// Codrops / Yuri Artiukh fake3d c86d190b8ab0: retain mirrored sampling.
// Rigid UV translation replaces depth warping so faces and outlines stay intact.
const fragmentSource = originalFragment
  .replace("vec4 tex1 = texture2D(image1,mirrored(vUv));", "")
  .replace(/vec2 fake3d = vec2\([^;]+;/, "vec2 fake3d = vUv + mouse;")
  .replace("uniform vec4 resolution;", "uniform vec4 resolution;\nuniform vec4 crop;\nuniform float zoom;")
  .replace("vUv.y = 1. - vUv.y;", "vUv.y = 1. - vUv.y;\n  vUv = (vUv - 0.5) / zoom + 0.5;\n  vUv = crop.xy + vUv * crop.zw;");

export type PhotoRenderer = {
  draw: (x: number, y: number, zoom: number) => void;
  resize: () => void;
  dispose: () => void;
};

function loadImage(url: string, signal: AbortSignal): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const cleanup = () => {
      image.onload = null;
      image.onerror = null;
      signal.removeEventListener("abort", abort);
    };
    const abort = () => {
      cleanup();
      image.src = "";
      reject(new DOMException("Image load cancelled", "AbortError"));
    };
    image.onload = () => { cleanup(); resolve(image); };
    image.onerror = () => { cleanup(); reject(new Error("Hero image could not load")); };
    signal.addEventListener("abort", abort, { once: true });
    if (signal.aborted) abort();
    else image.src = url;
  });
}

export async function createPhotoRenderer(
  canvas: HTMLCanvasElement,
  photo: HTMLImageElement,
  signal: AbortSignal,
): Promise<PhotoRenderer | null> {
  const image = await loadImage(photo.currentSrc || photo.src, signal);
  if (signal.aborted) return null;
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, powerPreference: "low-power" });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const textures: WebGLTexture[] = [];
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  const dispose = () => {
    textures.forEach(texture => gl.deleteTexture(texture));
    shaders.forEach(shader => gl.deleteShader(shader));
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
  try {
    for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Shader allocation failed");
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Hero shader compilation failed");
    }
    program = gl.createProgram();
    if (!program) throw new Error("Program allocation failed");
    shaders.forEach(shader => gl.attachShader(program!, shader));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Hero shader linking failed");
    gl.useProgram(program);
    buffer = gl.createBuffer();
    if (!buffer) throw new Error("Buffer allocation failed");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    [image].forEach((source, index) => {
      const texture = gl.createTexture();
      if (!texture) throw new Error("Texture allocation failed");
      textures.push(texture);
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.uniform1i(gl.getUniformLocation(program!, `image${index}`), index);
    });
    const resolution = gl.getUniformLocation(program, "resolution");
    const crop = gl.getUniformLocation(program, "crop");
    const mouse = gl.getUniformLocation(program, "mouse");
    const zoomUniform = gl.getUniformLocation(program, "zoom");
    gl.uniform1f(gl.getUniformLocation(program, "pixelRatio"), 1);
    gl.uniform2f(gl.getUniformLocation(program, "threshold"), 1, 1);
    const resize = () => {
      const bounds = photo.getBoundingClientRect();
      const parent = photo.parentElement!.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.style.left = `${bounds.left - parent.left}px`;
      canvas.style.top = `${bounds.top - parent.top}px`;
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform4f(resolution, canvas.width, canvas.height, 1, 1);
      const css = getComputedStyle(photo);
      const scale = css.objectFit === "cover"
        ? Math.max(bounds.width / image.width, bounds.height / image.height)
        : Math.min(bounds.width / image.width, bounds.height / image.height);
      const width = bounds.width / (image.width * scale);
      const height = bounds.height / (image.height * scale);
      const [px, py] = css.objectPosition.split(" ").map(value => parseFloat(value) / 100);
      gl.uniform4f(crop, (1 - width) * px, (1 - height) * py, width, height);
    };
    resize();
    return {
      resize,
      draw(x, y, zoom) {
        gl.uniform2f(mouse, x, y);
        gl.uniform1f(zoomUniform, zoom);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}

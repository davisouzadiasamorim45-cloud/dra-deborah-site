"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Capa em WebGL com uma ou mais fotos (usada no topo de /cursos).
 * - Abertura: a primeira foto se abre do café, como tinta se espalhando, com borda dourada.
 * - Com várias fotos, elas se alternam com a mesma transição; a legenda acompanha a foto da vez.
 * - Sempre: faixa de luz dourada e grão de filme (a foto em si fica parada).
 * - Desktop: a foto ocupa a direita e se dissolve no café à esquerda, onde fica o texto. Celular: tela toda.
 * Sem WebGL ou com movimento reduzido, nada é desenhado e fica só a foto estática que a página põe por baixo.
 */

export type FotoCapa = {
  src: string;
  legenda?: string;
  // Ponto da foto que fica sempre à vista, como object-position (0..1, a partir do canto superior esquerdo)
  foco: [number, number];
  focoCelular?: [number, number];
};

type Props = {
  fotos: FotoCapa[];
  // Onde a foto começa no desktop (fração da largura) e largura do degradê para o café
  inicioDesktop?: number;
  degrade?: number;
  // Tempo de cada foto na tela, em segundos
  intervalo?: number;
};

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAGMENT = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexA, uTexB;
uniform vec2 uImgA, uImgB;     // tamanho das fotos (px)
uniform vec2 uFocoA, uFocoB;   // ponto focal (origem embaixo à esquerda)
uniform float uDoCafe;         // 1 = abertura (a foto B surge do café em vez da foto A)
uniform float uTroca;          // 0..1, progresso da troca de A para B
uniform vec2 uRes;
uniform vec2 uRegiao;          // x: onde a foto começa (0 = tela toda), y: largura do degradê
uniform float uTempo;

const vec3 CAFE = vec3(0.169, 0.133, 0.110);

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float ruido(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * ruido(p); p *= 2.02; a *= 0.5; }
  return v;
}

// Foto em "cover" dentro da sua região, com ponto focal (equivale a object-fit: cover + object-position)
vec3 amostra(sampler2D tex, vec2 img, vec2 foco, vec2 uv) {
  float x0 = uRegiao.x;
  vec2 local = vec2((uv.x - x0) / (1.0 - x0), uv.y);
  float rTela = uRes.x * (1.0 - x0) / uRes.y, rImg = img.x / img.y;
  vec2 escala = rTela > rImg ? vec2(1.0, rImg / rTela) : vec2(rTela / rImg, 1.0);
  vec2 p = foco * (1.0 - escala) + local * escala;
  p.y = 1.0 - p.y;
  vec3 c = texture2D(tex, clamp(p, 0.001, 0.999)).rgb;
  return pow(c, vec3(1.06)) * vec3(1.03, 1.0, 0.95);
}

void main() {
  vec2 uv = vUv;
  vec2 aspecto = vec2(uRes.x / uRes.y, 1.0);
  float t = uTempo;
  float x0 = uRegiao.x;

  vec3 a = uDoCafe > 0.5 ? CAFE : amostra(uTexA, uImgA, uFocoA, uv);
  vec3 b = amostra(uTexB, uImgB, uFocoB, uv);

  // Troca: a foto nova se abre a partir do centro da região da foto, em manchas, com borda dourada
  vec2 centro = vec2(x0 + (1.0 - x0) * 0.55, 0.55);
  float mancha = fbm(vUv * 3.2 + 1.7 + floor(t / 30.0)) * 0.55 + length((vUv - centro) * aspecto) * 0.5;
  float limite = uTroca * 1.6 - 0.25;
  float m = smoothstep(limite - 0.12, limite, mancha);
  float borda = smoothstep(limite - 0.04, limite - 0.012, mancha) - smoothstep(limite - 0.012, limite, mancha);
  vec3 cor = mix(b, a, m);
  cor += vec3(0.83, 0.70, 0.42) * borda * 0.9 * step(0.001, uTroca) * step(uTroca, 0.999);

  // No desktop a foto se dissolve no café à esquerda, onde fica o texto
  float presenca = x0 > 0.0 ? smoothstep(x0, x0 + uRegiao.y, uv.x + (fbm(uv * 4.0) - 0.5) * 0.06) : 1.0;
  cor = mix(CAFE, cor, presenca);

  // Faixa de luz dourada que atravessa de tempos em tempos
  float faixa = uv.x * 0.9 + uv.y * 0.55 - mod(t * 0.06, 3.2) + 0.8;
  cor += vec3(0.95, 0.75, 0.42) * exp(-faixa * faixa * 18.0) * 0.10 * presenca;

  // Grão de filme
  cor += (hash(vUv * uRes + fract(t) * 91.0) - 0.5) * 0.045;

  gl_FragColor = vec4(cor, 1.0);
}`;

const ABERTURA = 2.2; // s
const TROCA = 1.8; // s
const suave = (p: number) => 1 - Math.pow(1 - Math.min(Math.max(p, 0), 1), 3);

export default function CapaShader({ fotos, inicioDesktop = 0.42, degrade = 0.3, intervalo = 6 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fotos.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;

    const compilar = (tipo: number, fonte: string) => {
      const s = gl.createShader(tipo)!;
      gl.shaderSource(s, fonte);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compilar(gl.VERTEX_SHADER, VERTEX);
    const fs = compilar(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    gl.uniform1i(u("uTexA"), 0);
    gl.uniform1i(u("uTexB"), 1);

    const capa = canvas.parentElement!;
    const celular = window.matchMedia("(max-width: 700px)");
    let largura = 0, altura = 0;
    const redimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      largura = Math.round(capa.clientWidth * dpr);
      altura = Math.round(capa.clientHeight * dpr);
      canvas.width = largura;
      canvas.height = altura;
      gl.viewport(0, 0, largura, altura);
    };
    redimensionar();
    const ro = new ResizeObserver(redimensionar);
    ro.observe(capa);

    // Texturas: carregam todas antes de começar
    const texturas: (WebGLTexture | null)[] = [];
    const tamanhos: [number, number][] = [];
    let cancelado = false;
    const carregar = (src: string) =>
      new Promise<HTMLImageElement>((ok, falha) => {
        const img = new window.Image();
        img.decoding = "async";
        img.onload = () => ok(img);
        img.onerror = falha;
        img.src = src;
      });

    const usar = (unidade: number, i: number, prefixo: "A" | "B") => {
      gl.activeTexture(gl.TEXTURE0 + unidade);
      gl.bindTexture(gl.TEXTURE_2D, texturas[i]);
      const [w, h] = tamanhos[i];
      gl.uniform2f(u(`uImg${prefixo}`), w, h);
      const f = celular.matches ? fotos[i].focoCelular ?? fotos[i].foco : fotos[i].foco;
      gl.uniform2f(u(`uFoco${prefixo}`), f[0], 1 - f[1]);
    };

    let raf = 0, visivel = true, inicio = 0;
    let indice = 0;
    const desenhar = (agora: number) => {
      if (!inicio) inicio = agora;
      const s = (agora - inicio) / 1000;

      // Linha do tempo: abertura, depois ciclos de [foto parada + troca]
      const ciclo = intervalo + TROCA;
      let de = 0, para = 0, troca = 1, doCafe = 0;
      if (s < ABERTURA || fotos.length < 2) {
        doCafe = s < ABERTURA ? 1 : 0;
        troca = suave(s / ABERTURA);
      } else {
        const k = Math.floor((s - ABERTURA) / ciclo);
        const dentro = s - ABERTURA - k * ciclo;
        de = k % fotos.length;
        para = de;
        if (dentro > intervalo) {
          para = (de + 1) % fotos.length;
          troca = suave((dentro - intervalo) / TROCA);
        }
      }
      // A legenda muda junto com a foto (na metade da troca)
      const mostrando = troca > 0.5 ? para : de;
      if (mostrando !== indice) {
        indice = mostrando;
        setAtual(mostrando);
      }

      usar(0, de, "A");
      usar(1, para, "B");
      gl.uniform1f(u("uDoCafe"), doCafe);
      gl.uniform1f(u("uTroca"), troca);
      gl.uniform2f(u("uRes"), largura, altura);
      gl.uniform2f(u("uRegiao"), celular.matches ? 0 : inicioDesktop, celular.matches ? 0 : degrade);
      gl.uniform1f(u("uTempo"), s);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (visivel) raf = requestAnimationFrame(desenhar);
    };

    // Só anima com a capa na tela e a aba visível
    const retomar = () => {
      cancelAnimationFrame(raf);
      if (visivel && texturas.length) raf = requestAnimationFrame(desenhar);
    };
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting && !document.hidden;
      retomar();
    });
    const aoMudarAba = () => {
      visivel = !document.hidden;
      retomar();
    };
    document.addEventListener("visibilitychange", aoMudarAba);

    Promise.all(fotos.map((f) => carregar(f.src)))
      .then((imgs) => {
        if (cancelado) return;
        imgs.forEach((img, i) => {
          const tex = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
          texturas[i] = tex;
          tamanhos[i] = [img.naturalWidth, img.naturalHeight];
        });
        canvas.dataset.pronto = "";
        io.observe(capa);
        raf = requestAnimationFrame(desenhar);
      })
      .catch(() => {});

    return () => {
      cancelado = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", aoMudarAba);
      // Libera os recursos sem descartar o contexto: em desenvolvimento o React monta o componente duas vezes
      texturas.forEach((t) => gl.deleteTexture(t));
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [fotos, inicioDesktop, degrade, intervalo]);

  const legenda = fotos[atual]?.legenda;
  return (
    <>
      <canvas ref={canvasRef} className="capa-shader" aria-hidden="true" />
      {legenda && (
        <p key={atual} className="capa-legenda" aria-hidden="true">
          <span>{String(atual + 1).padStart(2, "0")}</span>
          {legenda}
        </p>
      )}
    </>
  );
}

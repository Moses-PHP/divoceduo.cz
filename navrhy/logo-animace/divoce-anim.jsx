(() => {
const { CompositionStage, useComposition, Easing, clamp,
        useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor } = window;
const W = 1080, H = 1350, PINK = '#fec3e8', BG = '#290203';
const FONT = "'Noto Serif Display', serif";
const cubic = Easing.easeInOutCubic;

const MOTION = {
  glide(T, keys) {
    if (T <= keys[0].t) return keys[0];
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i], b = keys[i + 1];
      if (T <= b.t) {
        const p = cubic(clamp((T - a.t) / (b.t - a.t), 0, 1));
        return { s: a.s + (b.s - a.s) * p, x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p };
      }
    }
    return keys[keys.length - 1];
  },
  wipe(T, start, end) { return cubic(clamp((T - start) / (end - start), 0, 1)); },
  fade(T, start, end) { return clamp((T - start) / (end - start), 0, 1); }
};

function Big({ left, top, size, sx, children }) {
  return <div style={{ position: 'absolute', left, top, fontSize: size, fontWeight: 600,
    lineHeight: 1, whiteSpace: 'nowrap', transform: `scaleX(${sx})`, transformOrigin: '0 0' }}>{children}</div>;
}

function Slogan({ left, top, sx, text, p, o, hlColor }) {
  const base = { position: 'absolute', left, top, fontSize: 46, fontStyle: 'italic', fontWeight: 400,
    whiteSpace: 'nowrap', transform: `scaleX(${sx})`, transformOrigin: '0 0' };
  return <React.Fragment>
    <div style={base}>{text}</div>
    <div style={{ ...base, color: hlColor, opacity: o,
      clipPath: `inset(-20% ${(1 - p) * 100}% -20% 0)`,
      textShadow: '0 0 22px rgba(255,214,238,0.6)' }}>{text}</div>
  </React.Fragment>;
}

function Piece({ hlColor }) {
  const { T, CUES, authoredTotal } = useComposition();
  const keys = [
    { t: 0,                  s: 1,    x: 540, y: 675 },
    { t: CUES.Lidi - 0.8,    s: 1.05, x: 540, y: 672 },
    { t: CUES.Lidi + 0.7,    s: 2.1,  x: 490, y: 540 },
    { t: CUES.Volnost - 0.7, s: 2.2,  x: 498, y: 548 },
    { t: CUES.Volnost + 0.7, s: 2.1,  x: 520, y: 670 },
    { t: CUES.Tance - 0.7,   s: 2.2,  x: 528, y: 678 },
    { t: CUES.Tance + 0.7,   s: 2.1,  x: 775, y: 785 },
    { t: CUES.Navrat - 0.4,  s: 2.2,  x: 783, y: 793 },
    { t: authoredTotal,      s: 1,    x: 540, y: 675 }
  ];
  const cam = MOTION.glide(T, keys);
  const hl = (start, end) => {
    const p = MOTION.wipe(T, start + 0.3, start + 1.2);
    const o = p > 0 ? 1 - MOTION.fade(T, end - 0.6, end - 0.15) : 0;
    return { p, o };
  };
  const h1 = hl(CUES.Lidi, CUES.Volnost);
  const h2 = hl(CUES.Volnost, CUES.Tance);
  const h3 = hl(CUES.Tance, CUES.Navrat);
  return <div style={{ position: 'absolute', inset: 0, background: BG, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, fontFamily: FONT, fontStretch: 'extra-condensed', color: PINK,
      transform: `scale(${cam.s}) translate(${540 / cam.s - cam.x}px, ${675 / cam.s - cam.y}px)`,
      transformOrigin: '0 0' }}>
      <Big left={230} top={400} size={266} sx={0.89}>Di</Big>
      <Big left={431} top={540} size={266} sx={0.89}>vo</Big>
      <Big left={607} top={663} size={250} sx={0.89}>ce<span style={{ fontSize: 250 }}>!</span></Big>
      <Slogan left={431} top={573} sx={0.89} text="chceme liDI" p={h1.p} o={h1.o} hlColor={hlColor} />
      <Slogan left={356} top={772} sx={0.89} text="chceme VOlnost" p={h2.p} o={h2.o} hlColor={hlColor} />
      <Slogan left={621} top={883} sx={0.89} text="chceme hodně tanCE" p={h3.p} o={h3.o} hlColor={hlColor} />
    </div>
  </div>;
}

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return <div style={{ width: '100%', minHeight: '100vh', background: '#12090a', display: 'flex',
    alignItems: 'center', justifyContent: 'center', padding: 24, boxSizing: 'border-box' }}>
    <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={BG}>
      <Piece hlColor={t.highlightColor} />
    </CompositionStage>
    <TweaksPanel>
      <TweakSection label="Animace" />
      <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      <TweakColor label="Zvýraznění sloganů" value={t.highlightColor}
        options={['#fff1f8', '#ffd9a8', '#ff8fb0']} onChange={(v) => setTweak('highlightColor', v)} />
    </TweaksPanel>
  </div>;
}
window.DivoceAnimApp = App;
})();

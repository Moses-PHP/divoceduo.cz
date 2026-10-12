(() => {
const { CompositionStage, useComposition, Easing, clamp,
        useTweaks, TweaksPanel, TweakSection, TweakToggle } = window;
const W = 1080, H = 1350, PINK = '#fec3e8', BG = '#290203';
const FONT = "'Noto Serif Display', serif";
const SLY = 1020; // slogan baseline-top
const lerp = (a, b, p) => a + (b - a) * p;

const MOTION = {
  write: (T, t0) => Easing.easeOutCubic(clamp((T - t0) / 0.35, 0, 1)),
  scatter: (T, t0) => Easing.easeInCubic(clamp((T - t0) / 0.45, 0, 1)),
  fly: (T, t0, t1) => Easing.easeInOutQuart(clamp((T - t0) / (t1 - t0), 0, 1))
};

function Slogan({ prefix, shared, suffix, s, flyT, T, sharedRef }) {
  const seg = (text, baseIdx, scatters) => text.split('').map((ch, i) => {
    const idx = baseIdx + i;
    const inP = MOTION.write(T, s + 0.12 + idx * 0.035);
    const outP = scatters ? MOTION.scatter(T, s + 1.7 + idx * 0.02) : 0;
    return <span key={idx} style={{ whiteSpace: 'pre', display: 'inline-block',
      opacity: inP * (1 - outP),
      transform: `translateY(${(1 - inP) * 18 - outP * 26}px)` }}>{ch}</span>;
  });
  return <div style={{ position: 'absolute', left: 0, top: SLY, width: W, textAlign: 'center',
    fontSize: 84, lineHeight: 1, whiteSpace: 'nowrap' }}>
    {seg(prefix, 0, true)}
    <span ref={sharedRef} style={{ visibility: T >= flyT ? 'hidden' : 'visible' }}>
      {seg(shared, prefix.length, false)}
    </span>
    {seg(suffix, prefix.length + shared.length, true)}
  </div>;
}

function Flying({ m, c, tgt, t0, t1, T, text, bang, innerRef }) {
  const p = MOTION.fly(T, t0, t1);
  const vis = m && T >= t0;
  const st = { position: 'absolute',
    left: m ? lerp(m.x + c.dx, tgt.x, p) : 0, top: m ? lerp(m.y + c.dy, tgt.y, p) : 0,
    fontSize: lerp(84, tgt.size, p), fontWeight: Math.round(lerp(400, 600, p)),
    lineHeight: 1, whiteSpace: 'nowrap',
    transform: `scaleX(${lerp(1, tgt.sx, p)})`, transformOrigin: '0 0',
    visibility: vis ? 'visible' : 'hidden' };
  let bangEl = null;
  if (bang) {
    const bp = clamp((T - bang) / 0.45, 0, 1);
    bangEl = <span style={{ fontSize: '1em', display: 'inline-block',
      opacity: Math.min(1, bp * 2.5),
      transform: `scale(${lerp(1.9, 1, Easing.easeOutBack(bp))})`,
      transformOrigin: '50% 85%' }}>!</span>;
  }
  const chars = text.split('').map((ch, i) =>
    <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}>{ch}</span>);
  return <div ref={innerRef} style={st}>{chars}{bangEl}</div>;
}

function Piece() {
  const { T, CUES, authoredTotal } = useComposition();
  const [m, setM] = React.useState(null);
  const [corr, setCorr] = React.useState({});
  const rDi = React.useRef(null), rVo = React.useRef(null), rCe = React.useRef(null);
  const fDi = React.useRef(null), fVo = React.useRef(null), fCe = React.useRef(null);
  const rWorld = React.useRef(null);
  React.useEffect(() => {
    let live = true;
    const go = () => {
      if (!live || !rDi.current || !rVo.current || !rCe.current) return;
      const g = (r) => ({ x: r.current.offsetLeft, y: SLY + r.current.offsetTop });
      setM({ di: g(rDi), vo: g(rVo), ce: g(rCe) });
    };
    go();
    const ts = [200, 600, 1200, 2500].map((d) => setTimeout(go, d));
    if (document.fonts) {
      document.fonts.ready.then(() => setTimeout(go, 50));
      if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', go);
    }
    return () => { live = false; ts.forEach(clearTimeout);
      if (document.fonts && document.fonts.removeEventListener) document.fonts.removeEventListener('loadingdone', go); };
  }, []);
  const s1 = CUES.Lidi, s2 = CUES.Volnost, s3 = CUES.Tance;
  const flyOff = 1.8, flyLen = 1.3;
  // self-calibration: just before each flight (letters at rest), compare the real
  // rendered position of the inline letters vs the hidden flying copy and store the delta
  React.useEffect(() => {
    if (!m || !rWorld.current) return;
    const cal = (key, spanRef, flyRef, s) => {
      if (corr[key] || T < s + 1.3 || T >= s + flyOff) return;
      const a = spanRef.current && spanRef.current.firstElementChild;
      const b = flyRef.current && flyRef.current.firstElementChild;
      if (!a || !b) return;
      const wr = rWorld.current.getBoundingClientRect();
      const sc = (wr.width / W) || 1;
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      setCorr((old) => ({ ...old, [key]: { dx: (ra.left - rb.left) / sc, dy: (ra.top - rb.top) / sc } }));
    };
    cal('di', rDi, fDi, s1); cal('vo', rVo, fVo, s2); cal('ce', rCe, fCe, s3);
  });
  const Z = { dx: 0, dy: 0 };
  // intro: full logo holds, then dissolves before the first slogan
  const introO = 1 - MOTION.write(T, s1 - 0.75);
  const pulse = 1;
  return <div style={{ position: 'absolute', inset: 0, background: BG, overflow: 'hidden' }}>
    <div ref={rWorld} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H,
      fontFamily: FONT, fontStretch: 'extra-condensed', color: PINK, transform: `scale(${pulse})`, transformOrigin: '50% 45%' }}>
      {introO > 0 ? <div style={{ position: 'absolute', inset: 0, opacity: introO }}>
        {[{ x: 230, y: 400, fs: 266, t: 'Di' }, { x: 431, y: 540, fs: 266, t: 'vo' },
          { x: 607, y: 663, fs: 250, t: 'ce!' }].map((o, i) =>
          <div key={i} style={{ position: 'absolute', left: o.x, top: o.y, fontSize: o.fs,
            fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap',
            transform: 'scaleX(0.89)', transformOrigin: '0 0' }}>{o.t}</div>)}
        {[{ x: 431, y: 573, t: 'chceme liDI' }, { x: 356, y: 772, t: 'chceme VOlnost' },
          { x: 621, y: 886, t: 'chceme hodně tanCE' }].map((o, i) =>
          <div key={'s' + i} style={{ position: 'absolute', left: o.x, top: o.y, fontSize: 46,
            fontStyle: 'italic', fontWeight: 400, lineHeight: 1, whiteSpace: 'nowrap',
            transform: 'scaleX(0.89)', transformOrigin: '0 0' }}>{o.t}</div>)}
      </div> : null}
      <Slogan prefix="chceme li" shared="Di" suffix="" s={s1} flyT={s1 + flyOff} T={T} sharedRef={rDi} />
      <Slogan prefix="chceme " shared="vo" suffix="lnost" s={s2} flyT={s2 + flyOff} T={T} sharedRef={rVo} />
      <Slogan prefix="chceme hodně tan" shared="ce" suffix="" s={s3} flyT={s3 + flyOff} T={T} sharedRef={rCe} />
      <Flying m={m && m.di} c={corr.di || Z} innerRef={fDi} tgt={{ x: 230, y: 400, size: 266, sx: 0.89 }}
        t0={s1 + flyOff} t1={s1 + flyOff + flyLen} T={T} text="Di" />
      <Flying m={m && m.vo} c={corr.vo || Z} innerRef={fVo} tgt={{ x: 431, y: 540, size: 266, sx: 0.89 }}
        t0={s2 + flyOff} t1={s2 + flyOff + flyLen} T={T} text="vo" />
      <Flying m={m && m.ce} c={corr.ce || Z} innerRef={fCe} tgt={{ x: 607, y: 663, size: 250, sx: 0.89 }}
        t0={s3 + flyOff} t1={s3 + flyOff + flyLen} T={T} text="ce" bang={CUES.Finale + 0.1} />
      {[{ x: 431, y: 573, t: 'chceme liDI', d: 0.55 },
        { x: 356, y: 772, t: 'chceme VOlnost', d: 0.75 },
        { x: 621, y: 886, t: 'chceme hodně tanCE', d: 0.95 }].map((o, i) => {
        const p = MOTION.write(T, CUES.Finale + o.d);
        return <div key={i} style={{ position: 'absolute', left: o.x, top: o.y, fontSize: 46,
          fontStyle: 'italic', fontWeight: 400, whiteSpace: 'nowrap', lineHeight: 1,
          opacity: p, transform: `scaleX(0.89) translateY(${(1 - p) * 12}px)`,
          transformOrigin: '0 0' }}>{o.t}</div>;
      })}
    </div>
  </div>;
}

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return <div style={{ width: '100%', minHeight: '100vh', background: '#12090a', display: 'flex',
    alignItems: 'center', justifyContent: 'center', padding: 24, boxSizing: 'border-box' }}>
    <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={BG}>
      <Piece />
    </CompositionStage>
    <TweaksPanel>
      <TweakSection label="Animace" />
      <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
    </TweaksPanel>
  </div>;
}
window.DivoceSkladApp = App;
})();

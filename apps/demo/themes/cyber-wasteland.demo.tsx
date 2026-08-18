import type { DesignSystem, Page } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+TC:wght@400;500;700&display=swap');

@keyframes cw-rise {
  from { opacity: 0; transform: translateY(22px); filter: blur(5px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes cw-scan {
  from { transform: translateY(-8%); }
  to { transform: translateY(8%); }
}
@keyframes cw-pulse {
  0%, 100% { opacity: 0.55; box-shadow: 0 0 8px currentColor; }
  50% { opacity: 1; box-shadow: 0 0 18px currentColor; }
}
@keyframes cw-flicker {
  0%, 91%, 94%, 100% { opacity: 1; transform: translate(0); }
  92% { opacity: 0.72; transform: translate(3px, -1px); }
  93% { opacity: 0.86; transform: translate(-2px, 1px); }
}
.cw-rise { opacity: 0; animation: cw-rise 800ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.cw-pulse { animation: cw-pulse 2.8s ease-in-out infinite; }
.cw-flicker { animation: cw-flicker 6s steps(1, end) infinite; }
@media (prefers-reduced-motion: reduce) {
  .cw-rise, .cw-pulse, .cw-flicker { animation: none; opacity: 1; transform: none; filter: none; }
}
`;

const Styles = () => <style>{css}</style>;

export const design: DesignSystem = {
  palette: {
    bg: '#070A0F',
    text: '#D7EEF2',
    accent: '#00E5FF',
  },
  fonts: {
    display: '"Chakra Petch", "Noto Sans TC", sans-serif',
    body: '"Noto Sans TC", system-ui, sans-serif',
  },
  typeScale: { hero: 154, body: 30 },
  radius: 4,
};

const p = {
  bg: '#070A0F',
  text: '#D7EEF2',
  accent: '#00E5FF',
  magenta: '#FF2D8D',
  toxic: '#B7FF00',
  amber: '#FFB000',
  danger: '#FF4D6D',
  panel: '#111923',
  panelHi: '#172632',
  line: 'rgba(128, 220, 238, 0.22)',
  lineStrong: 'rgba(128, 220, 238, 0.5)',
  muted: '#72818D',
  faint: '#3B4A55',
};

const font = {
  display: '"Chakra Petch", "Noto Sans TC", sans-serif',
  body: '"Noto Sans TC", system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, Menlo, monospace',
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  background: p.bg,
  color: p.text,
  fontFamily: font.body,
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

const Atmosphere = ({ accent = p.accent }: { accent?: string }) => (
  <>
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(215,238,242,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(215,238,242,0.035) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
        opacity: 0.42,
      }}
    />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: '-10% 0',
        pointerEvents: 'none',
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent 0, transparent 5px, rgba(0,0,0,0.18) 6px)',
        opacity: 0.34,
        animation: 'cw-scan 9s linear infinite alternate',
      }}
    />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: -280,
        right: -240,
        width: 900,
        height: 900,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent} 0%, transparent 64%)`,
        opacity: 0.1,
        filter: 'blur(28px)',
        pointerEvents: 'none',
      }}
    />
  </>
);

const SignalDot = ({ color = p.accent, pulse = true }: { color?: string; pulse?: boolean }) => (
  <span
    aria-hidden
    className={pulse ? 'cw-pulse' : undefined}
    style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: color,
      color,
      flexShrink: 0,
    }}
  />
);

const Header = ({ chapter }: { chapter: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 52,
      left: 112,
      right: 112,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: font.mono,
      fontSize: 16,
      letterSpacing: '0.16em',
      color: p.muted,
      textTransform: 'uppercase',
    }}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <SignalDot />
      <span style={{ color: p.text }}>NEO SKILLS</span>
      <span style={{ color: p.faint }}>/</span>
      <span>FIELD MANUAL</span>
    </span>
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
      <span style={{ color: p.toxic }}>LINK STABLE</span>
      <span style={{ color: p.faint }}>/</span>
      <span>{chapter}</span>
    </span>
  </div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 112,
        right: 112,
        bottom: 38,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: font.mono,
        fontSize: 14,
        letterSpacing: '0.12em',
        color: p.muted,
        textTransform: 'uppercase',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
        <span style={{ width: 96, height: 1, background: p.lineStrong }} />
        OPEN-SOURCE SKILL INFRASTRUCTURE
      </span>
      <span>
        {String(current).padStart(2, '0')}{' '}
        <span style={{ color: p.faint }}>/ {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const Tag = ({ children, color = p.accent }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      alignSelf: 'flex-start',
      padding: '8px 14px',
      border: `1px solid ${color}66`,
      background: `${color}0d`,
      color,
      fontFamily: font.mono,
      fontSize: 14,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    }}
  >
    <SignalDot color={color} />
    {children}
  </div>
);

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    className="cw-flicker"
    style={{
      margin: 0,
      color: p.text,
      fontFamily: font.display,
      fontSize: 78,
      fontWeight: 700,
      lineHeight: 0.98,
      letterSpacing: '-0.04em',
    }}
  >
    {children}
  </h1>
);

const Panel = ({
  children,
  accent = p.accent,
  style,
}: {
  children: ReactNode;
  accent?: string;
  style?: CSSProperties;
}) => (
  <div
    style={{
      position: 'relative',
      border: `1px solid ${accent}55`,
      background: `linear-gradient(135deg, ${p.panelHi} 0%, ${p.panel} 60%)`,
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.025), 0 0 28px ${accent}0d`,
      ...style,
    }}
  >
    <span
      aria-hidden
      style={{ position: 'absolute', top: -1, left: -1, width: 22, height: 1, background: accent }}
    />
    <span
      aria-hidden
      style={{ position: 'absolute', top: -1, left: -1, width: 1, height: 22, background: accent }}
    />
    {children}
  </div>
);

const Terminal = ({
  title,
  lines,
  accent = p.accent,
}: {
  title: string;
  lines: string[];
  accent?: string;
}) => (
  <Panel accent={accent} style={{ overflow: 'hidden' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        borderBottom: `1px solid ${p.line}`,
        background: 'rgba(0,0,0,0.22)',
        color: p.muted,
        fontFamily: font.mono,
        fontSize: 13,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ display: 'inline-flex', gap: 7 }}>
        <SignalDot color={p.danger} pulse={false} />
        <SignalDot color={p.amber} pulse={false} />
        <SignalDot color={p.toxic} pulse={false} />
      </span>
      <span>{title}</span>
    </div>
    <div
      style={{
        padding: '22px 24px',
        display: 'grid',
        gap: 12,
        fontFamily: font.mono,
        fontSize: 17,
        lineHeight: 1.35,
      }}
    >
      {lines.map((line, index) => (
        <div
          key={line}
          style={{ display: 'flex', gap: 14, color: index === lines.length - 1 ? accent : p.text }}
        >
          <span style={{ color: p.faint }}>{String(index + 1).padStart(2, '0')}</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  </Panel>
);

const Module = ({
  index,
  title,
  body,
  color = p.accent,
}: {
  index: string;
  title: string;
  body: string;
  color?: string;
}) => (
  <Panel accent={color} style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: font.mono,
        fontSize: 13,
        color: p.muted,
        letterSpacing: '0.12em',
      }}
    >
      <span style={{ color }}>{index}</span>
      <SignalDot color={color} />
    </div>
    <div style={{ fontFamily: font.display, fontSize: 25, fontWeight: 600, color: p.text }}>
      {title}
    </div>
    <div style={{ fontSize: 16, lineHeight: 1.55, color: p.muted }}>{body}</div>
  </Panel>
);

const Cover: Page = () => (
  <div style={fill}>
    <Styles />
    <Atmosphere />
    <Header chapter="BOOT / 001" />
    <div
      style={{ position: 'absolute', left: 140, top: 220, width: 820, display: 'grid', gap: 28 }}
    >
      <div className="cw-rise" style={{ animationDelay: '80ms' }}>
        <Tag>Survival protocol for AI agents</Tag>
      </div>
      <div className="cw-rise" style={{ animationDelay: '180ms' }}>
        <Title>
          讓 Agent
          <br />
          在廢墟裡
          <br />
          保持秩序
        </Title>
      </div>
      <p
        className="cw-rise"
        style={{
          animationDelay: '300ms',
          margin: 0,
          maxWidth: 680,
          color: p.muted,
          fontSize: 23,
          lineHeight: 1.55,
        }}
      >
        Neo Skills 把專業流程拆成可安裝、可觸發、可驗證的技能模組，讓每一次 Agent
        工作都有可重用的生存工具。
      </p>
    </div>
    <div
      className="cw-rise"
      style={{ position: 'absolute', right: 144, top: 250, width: 520, animationDelay: '420ms' }}
    >
      <Terminal
        title="/relay/neo-skills.status"
        lines={[
          'AGENT.RUNTIME ........ ONLINE',
          'SKILL LAYER .......... MOUNTED',
          'CONTEXT NOISE ........ FILTERED',
          'KNOWLEDGE BASE ....... READY',
        ]}
        accent={p.toxic}
      />
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}
      >
        {['TRIGGER', 'REUSE', 'VERIFY'].map((label, index) => (
          <div
            key={label}
            style={{
              padding: '14px 12px',
              border: `1px solid ${p.line}`,
              background: `${p.panel}cc`,
              fontFamily: font.mono,
              fontSize: 12,
              letterSpacing: '0.1em',
              color: index === 1 ? p.magenta : p.muted,
              textAlign: 'center',
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

const Modules: Page = () => (
  <div style={fill}>
    <Styles />
    <Atmosphere accent={p.magenta} />
    <Header chapter="SYSTEM / 002" />
    <div style={{ position: 'absolute', left: 140, right: 140, top: 154 }}>
      <div className="cw-rise" style={{ animationDelay: '80ms' }}>
        <Tag color={p.magenta}>Core architecture</Tag>
      </div>
      <h2
        className="cw-rise"
        style={{
          animationDelay: '160ms',
          margin: '24px 0 44px',
          maxWidth: 980,
          fontFamily: font.display,
          fontSize: 68,
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          color: p.text,
        }}
      >
        一座技能基地，
        <br />
        五個供電節點。
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        <Module
          index="01"
          title="漸進式揭露"
          body="啟動時只讀取名稱與描述，需要時才展開完整知識。"
        />
        <Module
          index="02"
          title="觸發導向"
          body="每個技能的描述都說明何時使用，讓載入更精準。"
          color={p.magenta}
        />
        <Module
          index="03"
          title="外部知識庫"
          body="把詳細規則放進 references，避免主技能檔失去焦點。"
          color={p.toxic}
        />
        <Module
          index="04"
          title="可重用資源"
          body="透過 assets、templates 與 scripts，把流程變成工具。"
          color={p.amber}
        />
        <Module
          index="05"
          title="可驗證結構"
          body="用檢查腳本確認技能名稱、frontmatter 與檔案結構。"
          color={p.danger}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const TerminalPage: Page = () => (
  <div style={fill}>
    <Styles />
    <Atmosphere accent={p.toxic} />
    <Header chapter="TRACE / 003" />
    <div style={{ position: 'absolute', left: 140, top: 180, width: 720 }}>
      <div className="cw-rise" style={{ animationDelay: '80ms' }}>
        <Tag color={p.toxic}>Live preview signal</Tag>
      </div>
      <h2
        className="cw-rise"
        style={{
          animationDelay: '160ms',
          margin: '24px 0 24px',
          fontFamily: font.display,
          fontSize: 72,
          lineHeight: 0.98,
          letterSpacing: '-0.04em',
          color: p.text,
        }}
      >
        技能不是提示詞。
        <br />
        是可部署的協定。
      </h2>
      <p
        className="cw-rise"
        style={{
          animationDelay: '260ms',
          margin: 0,
          color: p.muted,
          fontSize: 22,
          lineHeight: 1.55,
          maxWidth: 600,
        }}
      >
        讓 Agent 只在正確的時間取得正確的知識，並讓每一個結構都能通過檢查。
      </p>
    </div>
    <div
      className="cw-rise"
      style={{ position: 'absolute', right: 140, top: 200, width: 660, animationDelay: '340ms' }}
    >
      <Terminal
        title="/skills/neo-harness/manifest"
        lines={[
          'name: neo-harness',
          'description: inspect a target project',
          'references/ ........ ATTACHED',
          'scripts/ ........... EXECUTABLE',
          'syntax ............. PASS',
        ]}
        accent={p.toxic}
      />
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 16,
          fontFamily: font.mono,
          fontSize: 13,
          letterSpacing: '0.08em',
          color: p.muted,
        }}
      >
        <span style={{ color: p.toxic }}>● READY</span>
        <span style={{ color: p.faint }}>·</span>
        <span>REUSABLE KNOWLEDGE UNIT</span>
      </div>
    </div>
    <Footer />
  </div>
);

export default [Cover, Modules, TerminalPage];

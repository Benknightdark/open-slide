import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

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

const css = `
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+TC:wght@400;500;700&display=swap');

@keyframes ns-rise {
  from { opacity: 0; transform: translateY(26px); filter: blur(6px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes ns-enter-right {
  from { opacity: 0; transform: translateX(24px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes ns-pulse {
  0%, 100% { opacity: 0.5; box-shadow: 0 0 8px currentColor; }
  50% { opacity: 1; box-shadow: 0 0 20px currentColor; }
}
@keyframes ns-scan {
  from { transform: translateY(-9%); }
  to { transform: translateY(9%); }
}
@keyframes ns-flicker {
  0%, 91%, 94%, 100% { opacity: 1; transform: translate(0); }
  92% { opacity: 0.72; transform: translate(3px, -1px); }
  93% { opacity: 0.86; transform: translate(-2px, 1px); }
}
@keyframes ns-sweep {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}
.ns-rise { opacity: 0; animation: ns-rise 800ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.ns-enter-right { opacity: 0; animation: ns-enter-right 800ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.ns-pulse { animation: ns-pulse 2.8s ease-in-out infinite; }
.ns-flicker { animation: ns-flicker 6s steps(1, end) infinite; }
.ns-sweep { transform-origin: left center; animation: ns-sweep 900ms cubic-bezier(0.22, 1, 0.36, 1) both; }
@media (prefers-reduced-motion: reduce) {
  .ns-rise, .ns-enter-right, .ns-pulse, .ns-flicker, .ns-sweep { animation: none; opacity: 1; transform: none; filter: none; }
}
`;

const Style = () => <style>{css}</style>;

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
        backgroundImage:
          'linear-gradient(rgba(215,238,242,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(215,238,242,0.035) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        opacity: 0.48,
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
        opacity: 0.32,
        animation: 'ns-scan 9s linear infinite alternate',
      }}
    />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: -280,
        right: -220,
        width: 920,
        height: 920,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent} 0%, transparent 64%)`,
        opacity: 0.11,
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }}
    />
  </>
);

const SignalDot = ({ color = p.accent, pulse = true }: { color?: string; pulse?: boolean }) => (
  <span
    aria-hidden
    className={pulse ? 'ns-pulse' : undefined}
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

const Header = ({ chapter, accent = p.accent }: { chapter: string; accent?: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 50,
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
      <SignalDot color={accent} />
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

const Footer = ({ source = 'github.com/Benknightdark/neo-skills' }: { source?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 112,
        right: 112,
        bottom: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: font.mono,
        fontSize: 14,
        letterSpacing: '0.1em',
        color: p.muted,
        textTransform: 'uppercase',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
        <span style={{ width: 96, height: 1, background: p.lineStrong }} />
        {source}
      </span>
      <span>
        {String(current).padStart(2, '0')}{' '}
        <span style={{ color: p.faint }}>/ {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const Frame = ({
  children,
  chapter,
  accent = p.accent,
  source,
}: {
  children: ReactNode;
  chapter: string;
  accent?: string;
  source?: string;
}) => (
  <div style={fill}>
    <Style />
    <Atmosphere accent={accent} />
    <Header chapter={chapter} accent={accent} />
    {children}
    <Footer source={source} />
  </div>
);

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

const HeroTitle = ({ children }: { children: ReactNode }) => (
  <h1
    className="ns-flicker"
    style={{
      margin: 0,
      color: p.text,
      fontFamily: font.display,
      fontSize: 154,
      fontWeight: 700,
      lineHeight: 0.9,
      letterSpacing: '-0.065em',
    }}
  >
    {children}
  </h1>
);

const SectionTitle = ({ children, width = 980 }: { children: ReactNode; width?: number }) => (
  <h2
    className="ns-rise"
    style={{
      margin: '24px 0 0',
      maxWidth: width,
      color: p.text,
      fontFamily: font.display,
      fontSize: 82,
      fontWeight: 600,
      lineHeight: 0.98,
      letterSpacing: '-0.04em',
    }}
  >
    {children}
  </h2>
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
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.025), 0 0 34px ${accent}0d`,
      ...style,
    }}
  >
    <span
      aria-hidden
      style={{ position: 'absolute', top: -1, left: -1, width: 24, height: 1, background: accent }}
    />
    <span
      aria-hidden
      style={{ position: 'absolute', top: -1, left: -1, width: 1, height: 24, background: accent }}
    />
    <span
      aria-hidden
      style={{
        position: 'absolute',
        right: -1,
        bottom: -1,
        width: 24,
        height: 1,
        background: accent,
      }}
    />
    <span
      aria-hidden
      style={{
        position: 'absolute',
        right: -1,
        bottom: -1,
        width: 1,
        height: 24,
        background: accent,
      }}
    />
    {children}
  </div>
);

const Window = ({
  title,
  children,
  accent = p.accent,
}: {
  title: string;
  children: ReactNode;
  accent?: string;
}) => (
  <Panel accent={accent} style={{ overflow: 'hidden' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: `1px solid ${p.line}`,
        background: 'rgba(0,0,0,0.22)',
        fontFamily: font.mono,
        fontSize: 15,
        letterSpacing: '0.08em',
        color: p.muted,
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
    {children}
  </Panel>
);

const Status = ({ label, color = p.toxic }: { label: string; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color,
      fontFamily: font.mono,
      fontSize: 14,
      letterSpacing: '0.09em',
      textTransform: 'uppercase',
    }}
  >
    <SignalDot color={color} />
    {label}
  </span>
);

const Arrow = ({ color = p.accent }: { color?: string }) => (
  <div aria-hidden style={{ display: 'flex', alignItems: 'center', width: 86, color }}>
    <div className="ns-sweep" style={{ flex: 1, height: 1, background: color }} />
    <div
      style={{
        width: 8,
        height: 8,
        borderTop: `1px solid ${color}`,
        borderRight: `1px solid ${color}`,
        transform: 'rotate(45deg)',
      }}
    />
  </div>
);

const FlowStep = ({
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
  <Panel
    accent={color}
    style={{
      flex: 1,
      minHeight: 270,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: font.mono,
        fontSize: 16,
        letterSpacing: '0.12em',
        color: p.muted,
      }}
    >
      <span style={{ color }}>{index}</span>
      <SignalDot color={color} />
    </div>
    <div
      style={{
        fontFamily: font.display,
        fontSize: 32,
        fontWeight: 600,
        lineHeight: 1.05,
        color: p.text,
      }}
    >
      {title}
    </div>
    <div style={{ marginTop: 'auto', fontSize: 21, lineHeight: 1.5, color: p.muted }}>{body}</div>
  </Panel>
);

const Cluster = ({
  name,
  code,
  skills,
  color,
}: {
  name: string;
  code: string;
  skills: string[];
  color: string;
}) => (
  <Panel accent={color} style={{ padding: 24, minHeight: 200 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
      }}
    >
      <span style={{ fontFamily: font.mono, fontSize: 14, letterSpacing: '0.14em', color }}>
        {code}
      </span>
      <SignalDot color={color} />
    </div>
    <div style={{ marginBottom: 18, fontFamily: font.display, fontSize: 32, color: p.text }}>
      {name}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {skills.map((skill) => (
        <span
          key={skill}
          style={{
            padding: '7px 10px',
            border: `1px solid ${color}55`,
            color: p.muted,
            fontFamily: font.mono,
            fontSize: 13,
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  </Panel>
);

const MiniLine = ({
  children,
  color = p.text,
  prefix = '>',
}: {
  children: ReactNode;
  color?: string;
  prefix?: string;
}) => (
  <div
    style={{
      display: 'flex',
      gap: 16,
      fontFamily: font.mono,
      fontSize: 19,
      lineHeight: 1.4,
      color,
    }}
  >
    <span style={{ color: p.faint, flexShrink: 0 }}>{prefix}</span>
    <span>{children}</span>
  </div>
);

const Cover: Page = () => (
  <Frame chapter="BOOT / 001" accent={p.accent}>
    <div style={{ position: 'absolute', left: 140, top: 190, width: 920 }}>
      <div className="ns-rise" style={{ animationDelay: '80ms' }}>
        <Tag>Survival protocol for AI agents</Tag>
      </div>
      <div className="ns-rise" style={{ marginTop: 32, animationDelay: '180ms' }}>
        <HeroTitle>
          NEO
          <br />
          SKILLS
        </HeroTitle>
      </div>
      <div className="ns-rise" style={{ marginTop: 32, animationDelay: '300ms' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontFamily: font.display,
            fontSize: 34,
            color: p.magenta,
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ width: 88, height: 1, background: p.magenta }} />讓 Agent 在廢墟裡保持秩序
        </div>
      </div>
      <p
        className="ns-rise"
        style={{
          animationDelay: '410ms',
          margin: '30px 0 0',
          maxWidth: 720,
          color: p.muted,
          fontSize: 26,
          lineHeight: 1.55,
        }}
      >
        給 AI Agent 使用的專家技能模組。Neo Skills 將流程封裝成技能，分層管理知識，讓 Agent
        在不同工作中重複使用同一套方法。
      </p>
    </div>
    <div
      className="ns-enter-right"
      style={{ position: 'absolute', right: 140, top: 248, width: 540, animationDelay: '430ms' }}
    >
      <Window title="/relay/neo-skills.status" accent={p.toxic}>
        <div style={{ padding: 26, display: 'grid', gap: 17 }}>
          <MiniLine color={p.toxic}>AGENT.RUNTIME ........ ONLINE</MiniLine>
          <MiniLine>SKILL LAYER .......... MOUNTED</MiniLine>
          <MiniLine>CONTEXT NOISE ........ FILTERED</MiniLine>
          <MiniLine color={p.toxic}>KNOWLEDGE BASE ....... READY</MiniLine>
          <div style={{ height: 1, margin: '8px 0 2px', background: p.line }} />
          <Status label="relay stable / 03 nodes" />
        </div>
      </Window>
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
              fontSize: 13,
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
  </Frame>
);

const Problem: Page = () => (
  <Frame chapter="SIGNAL / 002" accent={p.magenta}>
    <div style={{ position: 'absolute', left: 140, right: 140, top: 156 }}>
      <div className="ns-rise" style={{ animationDelay: '80ms' }}>
        <Tag color={p.magenta}>Why this exists</Tag>
      </div>
      <SectionTitle>提示詞會變，流程要能重複使用。</SectionTitle>
      <p
        className="ns-rise"
        style={{
          animationDelay: '260ms',
          margin: '22px 0 42px',
          maxWidth: 1000,
          color: p.muted,
          fontSize: 26,
          lineHeight: 1.5,
        }}
      >
        Neo Skills 將專業流程封裝成可安裝的 `SKILL.md`。Agent
        只在需要時讀取相關規則，避免把所有規則放進同一段提示詞。
      </p>
      <div
        className="ns-rise"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 110px 1fr',
          gap: 26,
          alignItems: 'stretch',
          animationDelay: '360ms',
        }}
      >
        <Window title="legacy / prompt-overload" accent={p.danger}>
          <div
            style={{
              padding: 26,
              minHeight: 320,
              display: 'grid',
              alignContent: 'center',
              gap: 12,
            }}
          >
            {['規範散落在對話中', '上下文持續膨脹', '觸發條件靠記憶', '流程難以重複驗證'].map(
              (line, index) => (
                <div
                  key={line}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '13px 16px',
                    border: `1px solid ${p.danger}44`,
                    background: `${p.danger}0d`,
                    color: index === 1 ? p.text : p.muted,
                    fontFamily: font.mono,
                    fontSize: 17,
                  }}
                >
                  <span style={{ color: p.danger }}>×</span>
                  {line}
                </div>
              ),
            )}
          </div>
        </Window>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'grid',
              gap: 12,
              justifyItems: 'center',
              color: p.magenta,
              fontFamily: font.mono,
              fontSize: 13,
              letterSpacing: '0.1em',
              textAlign: 'center',
            }}
          >
            <span>DECOMPOSE</span>
            <Arrow color={p.magenta} />
          </div>
        </div>
        <Window title="neo / skill-mounted" accent={p.accent}>
          <div
            style={{
              padding: 26,
              minHeight: 320,
              display: 'grid',
              alignContent: 'center',
              gap: 12,
            }}
          >
            {[
              'name + description',
              'SKILL.md / focused rules',
              'references / deep context',
              'scripts / verified action',
            ].map((line, index) => (
              <div
                key={line}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '13px 16px',
                  border: `1px solid ${p.accent}44`,
                  background: `${p.accent}0d`,
                  color: index === 1 ? p.text : p.muted,
                  fontFamily: font.mono,
                  fontSize: 17,
                }}
              >
                <span style={{ color: p.accent }}>+</span>
                {line}
              </div>
            ))}
          </div>
        </Window>
      </div>
    </div>
  </Frame>
);

const Principles: Page = () => (
  <Frame chapter="SYSTEM / 003" accent={p.toxic}>
    <div style={{ position: 'absolute', left: 140, right: 140, top: 154 }}>
      <div className="ns-rise" style={{ animationDelay: '80ms' }}>
        <Tag color={p.toxic}>Core architecture</Tag>
      </div>
      <SectionTitle>
        技能由五個
        <br />
        設計原則組成。
      </SectionTitle>
      <div
        className="ns-rise"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 14,
          marginTop: 42,
          animationDelay: '280ms',
        }}
      >
        {[
          {
            index: '01',
            title: '漸進式揭露',
            body: '啟動時先讀取名稱與描述；需要時再載入完整知識。',
            color: p.accent,
          },
          {
            index: '02',
            title: '觸發導向',
            body: '描述清楚說明何時使用，讓載入條件更明確。',
            color: p.magenta,
          },
          {
            index: '03',
            title: '外部知識庫',
            body: '詳細規則放在 references，主技能檔保持精簡。',
            color: p.toxic,
          },
          {
            index: '04',
            title: '可重用資源',
            body: '用 assets、templates 與 scripts 重用既有流程。',
            color: p.amber,
          },
          {
            index: '05',
            title: '可驗證結構',
            body: '用檢查腳本確認名稱、frontmatter 與檔案結構。',
            color: p.danger,
          },
        ].map((item) => (
          <Panel
            key={item.index}
            accent={item.color}
            style={{
              minHeight: 304,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: font.mono,
                fontSize: 15,
                letterSpacing: '0.12em',
                color: p.muted,
              }}
            >
              <span style={{ color: item.color }}>{item.index}</span>
              <SignalDot color={item.color} />
            </div>
            <div
              style={{
                fontFamily: font.display,
                fontSize: 32,
                fontWeight: 600,
                lineHeight: 1.05,
                color: p.text,
              }}
            >
              {item.title}
            </div>
            <div style={{ marginTop: 'auto', fontSize: 20, lineHeight: 1.55, color: p.muted }}>
              {item.body}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  </Frame>
);

const SkillMap: Page = () => (
  <Frame chapter="MAP / 004" accent={p.accent}>
    <div style={{ position: 'absolute', left: 140, right: 140, top: 154 }}>
      <div className="ns-rise" style={{ animationDelay: '80ms' }}>
        <Tag>Skill registry</Tag>
      </div>
      <SectionTitle width={1100}>把專業流程拆成可部署的技能。</SectionTitle>
      <p
        className="ns-rise"
        style={{ animationDelay: '250ms', margin: '20px 0 34px', color: p.muted, fontSize: 24 }}
      >
        Neo Skills 將 Agent 治理、安全、語言、框架、DevOps 與文字流程分成不同技能。
      </p>
      <div
        className="ns-rise"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          maxWidth: 1420,
          animationDelay: '340ms',
        }}
      >
        <Cluster
          code="GOVERN / 01"
          name="Agent 治理"
          skills={['neo-harness', 'neo-sub-agent', 'generate-skill']}
          color={p.accent}
        />
        <Cluster
          code="SECURE / 02"
          name="安全與隱私"
          skills={['neo-iso-27001', 'neo-iso-27701']}
          color={p.magenta}
        />
        <Cluster
          code="BUILD / 03"
          name="語言與框架"
          skills={['neo-csharp', 'neo-python', 'neo-rust', 'neo-vue', 'neo-typescript']}
          color={p.toxic}
        />
        <Cluster
          code="OPERATE / 04"
          name="交付與營運"
          skills={['neo-azure-pipelines', 'neo-opentelemetry', 'neo-rabbitmq', 'neo-pr']}
          color={p.amber}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 180,
            height: 100,
            display: 'grid',
            placeItems: 'center',
            border: `1px solid ${p.accent}`,
            background: p.bg,
            boxShadow: `0 0 38px ${p.accent}22`,
            fontFamily: font.mono,
            fontSize: 14,
            letterSpacing: '0.14em',
            color: p.accent,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          <span>
            <SignalDot color={p.accent} />
            <br />
            Agent
            <br />
            runtime
          </span>
        </div>
      </div>
    </div>
  </Frame>
);

const LoadFlow: Page = () => (
  <Frame chapter="LOAD / 005" accent={p.magenta}>
    <div style={{ position: 'absolute', left: 140, right: 140, top: 154 }}>
      <div className="ns-rise" style={{ animationDelay: '80ms' }}>
        <Tag color={p.magenta}>Progressive disclosure</Tag>
      </div>
      <SectionTitle width={1120}>
        需要時才載入，
        <br />
        讓上下文保持精簡。
      </SectionTitle>
      <p
        className="ns-rise"
        style={{ animationDelay: '250ms', margin: '20px 0 38px', color: p.muted, fontSize: 24 }}
      >
        Agent 先讀取名稱與描述，再依工作需要逐層載入完整規則與資源。
      </p>
      <div
        className="ns-rise"
        style={{ display: 'flex', alignItems: 'center', gap: 12, animationDelay: '350ms' }}
      >
        <FlowStep
          index="01"
          title="辨識入口"
          body="啟動時讀取 name 與 description，判斷何時需要這項技能。"
        />
        <Arrow color={p.magenta} />
        <FlowStep
          index="02"
          title="展開規則"
          body="需要時載入完整的 SKILL.md，取得這項工作的規則。"
          color={p.magenta}
        />
        <Arrow color={p.magenta} />
        <FlowStep
          index="03"
          title="載入資源"
          body="沿著 references、assets、templates 與 scripts 讀取相關資源。"
          color={p.toxic}
        />
        <Arrow color={p.magenta} />
        <FlowStep
          index="04"
          title="完成工作"
          body="用可重複的流程完成任務，下一次工作可以直接沿用。"
          color={p.amber}
        />
      </div>
    </div>
  </Frame>
);

const Install: Page = () => (
  <Frame chapter="DEPLOY / 006" accent={p.toxic}>
    <div style={{ position: 'absolute', left: 140, right: 140, top: 154 }}>
      <div className="ns-rise" style={{ animationDelay: '80ms' }}>
        <Tag color={p.toxic}>Installation routes</Tag>
      </div>
      <SectionTitle width={1080}>一條命令，安裝整套技能。</SectionTitle>
      <div
        className="ns-rise"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 22,
          marginTop: 42,
          animationDelay: '270ms',
        }}
      >
        <Window title="terminal / skills-cli" accent={p.toxic}>
          <div style={{ padding: 28, display: 'grid', gap: 26 }}>
            <div>
              <div
                style={{
                  marginBottom: 12,
                  fontFamily: font.mono,
                  fontSize: 15,
                  letterSpacing: '0.1em',
                  color: p.muted,
                }}
              >
                LOCAL PROJECT
              </div>
              <MiniLine color={p.toxic}>npx skills add Benknightdark/neo-skills {'\\'}</MiniLine>
              <MiniLine color={p.toxic} prefix=" ">
                --skill --all -y
              </MiniLine>
            </div>
            <div style={{ height: 1, background: p.line }} />
            <div>
              <div
                style={{
                  marginBottom: 12,
                  fontFamily: font.mono,
                  fontSize: 15,
                  letterSpacing: '0.1em',
                  color: p.muted,
                }}
              >
                GLOBAL INSTALL
              </div>
              <MiniLine>npx skills add Benknightdark/neo-skills {'\\'}</MiniLine>
              <MiniLine prefix=" ">--skill --all -g -y</MiniLine>
            </div>
            <div style={{ height: 1, background: p.line }} />
            <div>
              <div
                style={{
                  marginBottom: 12,
                  fontFamily: font.mono,
                  fontSize: 15,
                  letterSpacing: '0.1em',
                  color: p.muted,
                }}
              >
                SYSTEM INSTRUCTIONS
              </div>
              <MiniLine color={p.accent}>npx -p @moon791017/neo-skills {'\\'}</MiniLine>
              <MiniLine prefix=" ">install-system-instructions {'\\'}</MiniLine>
              <MiniLine prefix=" ">--ai-agent codex {'\\'}</MiniLine>
              <MiniLine prefix=" ">--instructions git-commit {'\\'}</MiniLine>
              <MiniLine prefix=" ">--project-path .</MiniLine>
            </div>
          </div>
        </Window>
        <Panel
          accent={p.accent}
          style={{
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: font.mono,
                fontSize: 15,
                letterSpacing: '0.12em',
                color: p.muted,
              }}
            >
              SUPPORTED AGENTS
            </div>
            <div style={{ marginTop: 28, display: 'grid', gap: 14 }}>
              {['Antigravity CLI', 'Claude Code', 'Copilot CLI', 'Codex'].map((agent, index) => (
                <div
                  key={agent}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px 16px',
                    border: `1px solid ${index === 3 ? p.accent : p.line}`,
                    background: index === 3 ? `${p.accent}0d` : 'transparent',
                    fontFamily: font.display,
                    fontSize: 24,
                    color: index === 3 ? p.text : p.muted,
                  }}
                >
                  <span>{agent}</span>
                  <span style={{ color: index === 3 ? p.accent : p.faint }}>↗</span>
                </div>
              ))}
            </div>
          </div>
          <Status label="multiple runtimes / one skill source" color={p.accent} />
        </Panel>
      </div>
    </div>
  </Frame>
);

const Validation: Page = () => (
  <Frame chapter="VERIFY / 007" accent={p.amber}>
    <div style={{ position: 'absolute', left: 140, right: 140, top: 154 }}>
      <div className="ns-rise" style={{ animationDelay: '80ms' }}>
        <Tag color={p.amber}>Structural integrity</Tag>
      </div>
      <SectionTitle width={1050}>安裝前，先確認技能結構。</SectionTitle>
      <p
        className="ns-rise"
        style={{ animationDelay: '250ms', margin: '20px 0 38px', color: p.muted, fontSize: 24 }}
      >
        技能由 `SKILL.md` 與可選的 references、assets、templates、scripts
        組成；驗證腳本會在它進入工作流前檢查結構。
      </p>
      <div
        className="ns-rise"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: 22,
          animationDelay: '350ms',
        }}
      >
        <Window title="tree / skill-package" accent={p.amber}>
          <div
            style={{
              padding: 28,
              display: 'grid',
              gap: 14,
              fontFamily: font.mono,
              fontSize: 20,
              lineHeight: 1.45,
            }}
          >
            <MiniLine color={p.amber}>skills/neo-harness/</MiniLine>
            <MiniLine prefix="├─" color={p.text}>
              SKILL.md
            </MiniLine>
            <MiniLine prefix="├─" color={p.muted}>
              references/
            </MiniLine>
            <MiniLine prefix="├─" color={p.muted}>
              assets/
            </MiniLine>
            <MiniLine prefix="└─" color={p.toxic}>
              scripts/
            </MiniLine>
            <div style={{ height: 1, margin: '12px 0 6px', background: p.line }} />
            <MiniLine color={p.toxic}>check-skills-syntax.py</MiniLine>
          </div>
        </Window>
        <Window title="validator / syntax-check" accent={p.toxic}>
          <div style={{ padding: 28, display: 'grid', gap: 18 }}>
            {[
              ['frontmatter', 'name + description', p.toxic],
              ['trigger', 'usage condition defined', p.toxic],
              ['resources', 'references / assets / scripts', p.accent],
              ['structure', 'skill package is loadable', p.toxic],
            ].map(([label, body, color]) => (
              <div
                key={label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr auto',
                  alignItems: 'center',
                  gap: 18,
                  paddingBottom: 18,
                  borderBottom: `1px solid ${p.line}`,
                  fontFamily: font.mono,
                  fontSize: 18,
                }}
              >
                <span style={{ color: p.muted }}>{label}</span>
                <span style={{ color: p.text }}>{body}</span>
                <span style={{ color }}>{'PASS'}</span>
              </div>
            ))}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 4,
              }}
            >
              <Status label="validation complete" />
              <span style={{ fontFamily: font.mono, fontSize: 17, color: p.muted }}>
                exit code 0
              </span>
            </div>
          </div>
        </Window>
      </div>
    </div>
  </Frame>
);

const Closing: Page = () => (
  <Frame chapter="RELAY / 008" accent={p.accent} source="github.com/Benknightdark/neo-skills · MIT">
    <div style={{ position: 'absolute', left: 140, top: 210, width: 1100 }}>
      <div className="ns-rise" style={{ animationDelay: '80ms' }}>
        <Tag>Transmission complete</Tag>
      </div>
      <div className="ns-rise" style={{ marginTop: 30, animationDelay: '180ms' }}>
        <h2
          style={{
            margin: 0,
            fontFamily: font.display,
            fontSize: 118,
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: '-0.06em',
            color: p.text,
          }}
        >
          把知識變成
          <br />
          可重用的工具。
        </h2>
      </div>
      <p
        className="ns-rise"
        style={{
          animationDelay: '330ms',
          margin: '32px 0 0',
          maxWidth: 800,
          color: p.muted,
          fontSize: 27,
          lineHeight: 1.5,
        }}
      >
        安裝技能，下一次工作直接沿用。
      </p>
      <div
        className="ns-rise"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 46,
          padding: '20px 24px',
          border: `1px solid ${p.accent}`,
          background: `${p.accent}0d`,
          fontFamily: font.mono,
          fontSize: 22,
          color: p.accent,
          animationDelay: '450ms',
        }}
      >
        <span style={{ color: p.toxic }}>›</span>
        npx skills add Benknightdark/neo-skills --skill --all -y
      </div>
    </div>
    <div
      className="ns-enter-right"
      style={{ position: 'absolute', right: 170, top: 276, width: 360, animationDelay: '520ms' }}
    >
      <Panel accent={p.magenta} style={{ padding: 28 }}>
        <div style={{ display: 'grid', gap: 22, fontFamily: font.mono }}>
          <div style={{ fontSize: 14, letterSpacing: '0.14em', color: p.magenta }}>
            LAST KNOWN SIGNAL
          </div>
          <div style={{ fontFamily: font.display, fontSize: 46, lineHeight: 0.98, color: p.text }}>
            KEEP
            <br />
            BUILDING.
          </div>
          <div style={{ height: 1, background: p.line }} />
          <Status label="knowledge relay alive" color={p.toxic} />
        </div>
      </Panel>
    </div>
  </Frame>
);

export const meta: SlideMeta = {
  title: 'Neo Skills · Survival Manual',
  theme: 'cyber-wasteland',
  createdAt: '2026-08-18T00:00:00+08:00',
};

export default [
  Cover,
  Problem,
  Principles,
  SkillMap,
  LoadFlow,
  Install,
  Validation,
  Closing,
] satisfies Page[];

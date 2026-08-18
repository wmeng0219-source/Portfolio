import React from 'react';

const Frame = ({ children, kind, label }) => (
  <div className={`project-blueprint-cover project-blueprint-cover--${kind}`}>
    <svg
      aria-label={label}
      className="project-blueprint-cover__canvas"
      fill="none"
      role="img"
      viewBox="0 0 640 360"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern height="32" id={`${kind}-grid`} patternUnits="userSpaceOnUse" width="32">
          <path d="M 32 0 L 0 0 0 32" stroke="rgba(242, 242, 245, 0.045)" strokeWidth="1" />
        </pattern>
        <marker id={`${kind}-arrow`} markerHeight="8" markerWidth="8" orient="auto" refX="6" refY="3">
          <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
        </marker>
      </defs>
      <rect fill={`url(#${kind}-grid)`} height="360" width="640" />
      {children}
    </svg>
  </div>
);

const BlueprintLabel = ({ children, x, y, tone = 'muted' }) => (
  <text className={`project-blueprint-cover__label project-blueprint-cover__label--${tone}`} x={x} y={y}>
    {children}
  </text>
);

function MemberBlueprint() {
  return (
    <Frame kind="member" label="会员自动化规则引擎">
      <BlueprintLabel tone="accent" x="32" y="34">RULE_ENGINE</BlueprintLabel>
      <BlueprintLabel x="454" y="34">04 INPUTS / 03 OUTPUTS</BlueprintLabel>

      <g className="project-blueprint-cover__structure">
        <path d="M64 100H160M64 145H160M64 190H160M64 235H160" />
        <path d="M160 100V235M160 168H234" className="project-blueprint-cover__active" />
        <path d="M404 168H476V100H560M476 168H560M476 236H560" className="project-blueprint-cover__active" />
        <path d="M320 244V292H104V258" className="project-blueprint-cover__return" />
      </g>

      <g className="project-blueprint-cover__node">
        <rect height="28" rx="6" width="74" x="32" y="86" />
        <rect height="28" rx="6" width="74" x="32" y="131" />
        <rect height="28" rx="6" width="74" x="32" y="176" />
        <rect height="28" rx="6" width="74" x="32" y="221" />
        <text x="43" y="104">MEMBER</text>
        <text x="45" y="149">COUPON</text>
        <text x="57" y="194">BILL</text>
        <text x="48" y="239">CLINIC</text>
      </g>

      <g className="project-blueprint-cover__engine">
        <rect height="152" rx="10" width="170" x="234" y="92" />
        <rect height="32" rx="5" width="62" x="254" y="117" />
        <rect height="32" rx="5" width="62" x="324" y="117" />
        <rect height="32" rx="5" width="62" x="254" y="158" />
        <rect height="32" rx="5" width="62" x="324" y="158" />
        <rect height="32" rx="5" width="132" x="254" y="199" />
        <text x="269" y="137">IF / THEN</text>
        <text x="340" y="137">MATCH</text>
        <text x="272" y="178">SCOPE</text>
        <text x="340" y="178">VERIFY</text>
        <text x="286" y="219">EXCEPTION GATE</text>
      </g>

      <g className="project-blueprint-cover__output">
        <rect height="30" rx="6" width="84" x="536" y="85" />
        <rect height="30" rx="6" width="84" x="536" y="153" />
        <rect height="30" rx="6" width="84" x="536" y="221" />
        <text x="550" y="104">SETTLEMENT</text>
        <text x="560" y="172">BENEFITS</text>
        <text x="567" y="240">AUDIT</text>
      </g>

      <circle className="project-blueprint-cover__signal" cx="160" cy="168" r="5" />
      <circle className="project-blueprint-cover__signal project-blueprint-cover__signal--delay" cx="476" cy="168" r="5" />
      <BlueprintLabel tone="green" x="32" y="327">AUDIT_READY</BlueprintLabel>
      <BlueprintLabel tone="pink" x="360" y="327">EXCEPTION / RETURN</BlueprintLabel>
    </Frame>
  );
}

function OrthodonticsBlueprint() {
  const stages = [
    ['SCREEN', 48, 118],
    ['REFER', 166, 106],
    ['CONSULT', 278, 94],
    ['FOLLOW-UP', 396, 106],
    ['CONVERT', 514, 118],
  ];

  return (
    <Frame kind="orthodontics" label="正畸筛查状态漏斗">
      <BlueprintLabel tone="green" x="32" y="34">STATE_FUNNEL</BlueprintLabel>
      <BlueprintLabel x="504" y="34">05 STAGES</BlueprintLabel>

      <path className="project-blueprint-cover__rail" d="M42 168H600" />
      <path className="project-blueprint-cover__flow" d="M42 168H600" markerEnd="url(#orthodontics-arrow)" />

      {stages.map(([name, x, width], index) => (
        <g className={`project-blueprint-cover__stage project-blueprint-cover__stage--${index}`} key={name}>
          <rect height="58" rx="8" width={width} x={x} y="139" />
          <text x={x + 17} y="164">{name}</text>
          <text className="project-blueprint-cover__stage-index" x={x + 17} y="183">0{index + 1}</text>
        </g>
      ))}

      <g className="project-blueprint-cover__patient-set">
        <circle cx="55" cy="120" r="5" />
        <circle cx="72" cy="111" r="4" />
        <circle cx="85" cy="125" r="4" />
        <circle cx="105" cy="116" r="3" />
        <path d="M58 126L112 156" />
        <circle cx="192" cy="128" r="4" />
        <circle cx="208" cy="120" r="4" />
        <path d="M202 128L246 155" />
      </g>

      <g className="project-blueprint-cover__reentry">
        <path d="M454 198V254H250V286H114V210" markerEnd="url(#orthodontics-arrow)" />
        <rect height="34" rx="7" width="116" x="278" y="237" />
        <text x="296" y="259">REASSESS</text>
      </g>

      <circle className="project-blueprint-cover__signal project-blueprint-cover__signal--green" cx="573" cy="168" r="6" />
      <BlueprintLabel tone="pink" x="32" y="327">WAIT / EXTERNAL / EXPIRED</BlueprintLabel>
      <BlueprintLabel tone="green" x="420" y="327">RE-ENTRY ENABLED</BlueprintLabel>
    </Frame>
  );
}

function PacsBlueprint() {
  return (
    <Frame kind="pacs" label="PACS 人机复核闭环">
      <BlueprintLabel tone="accent" x="32" y="34">HUMAN_AI_LOOP</BlueprintLabel>
      <BlueprintLabel x="506" y="34">READ / VERIFY</BlueprintLabel>

      <g className="project-blueprint-cover__image-field">
        <rect height="152" rx="10" width="204" x="32" y="82" />
        <path d="M66 112H202M66 142H202M66 172H202M100 98V218M134 98V218M168 98V218" />
        <rect className="project-blueprint-cover__finding" height="42" rx="4" width="35" x="121" y="130" />
        <rect className="project-blueprint-cover__finding project-blueprint-cover__finding--secondary" height="28" rx="4" width="25" x="174" y="170" />
        <text x="48" y="254">IMAGE_FIELD</text>
      </g>

      <g className="project-blueprint-cover__ai">
        <path d="M236 158H306" className="project-blueprint-cover__active" markerEnd="url(#pacs-arrow)" />
        <rect height="84" rx="9" width="116" x="306" y="116" />
        <circle cx="334" cy="145" r="7" />
        <circle cx="356" cy="145" r="7" />
        <circle cx="378" cy="145" r="7" />
        <path d="M329 172H397" />
        <text x="335" y="187">AI SIGNAL</text>
      </g>

      <g className="project-blueprint-cover__doctor">
        <path d="M422 158H468" className="project-blueprint-cover__active" markerEnd="url(#pacs-arrow)" />
        <rect height="112" rx="10" width="140" x="468" y="102" />
        <path d="M490 139H548M490 161H574M490 183H535" />
        <circle className="project-blueprint-cover__signal project-blueprint-cover__signal--green" cx="578" cy="126" r="7" />
        <text x="490" y="198">DOCTOR REVIEW</text>
      </g>

      <g className="project-blueprint-cover__feedback">
        <path d="M538 214V278H212V254" markerEnd="url(#pacs-arrow)" />
        <path d="M306 278H118V234" markerEnd="url(#pacs-arrow)" />
        <rect height="30" rx="6" width="104" x="316" y="263" />
        <text x="332" y="283">CHART SYNC</text>
      </g>

      <BlueprintLabel tone="pink" x="32" y="327">AI / NON-BLOCKING</BlueprintLabel>
      <BlueprintLabel tone="green" x="404" y="327">DOCTOR_VERIFIED</BlueprintLabel>
    </Frame>
  );
}

export default function ProjectBlueprintCover({ kind }) {
  if (kind === 'member') return <MemberBlueprint />;
  if (kind === 'orthodontics') return <OrthodonticsBlueprint />;
  return <PacsBlueprint />;
}

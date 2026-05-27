const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const width = 1600;
const height = 900;
const out = path.join(__dirname, "..", "public");
fs.mkdirSync(out, { recursive: true });

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eef6ff"/>
      <stop offset="46%" stop-color="#f4f0ff"/>
      <stop offset="100%" stop-color="#e9fbff"/>
    </linearGradient>
    <linearGradient id="rail" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7cb7ff"/>
      <stop offset="100%" stop-color="#b396ff"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#6f7faf" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <path d="M70 720 C290 600, 360 760, 555 610 S925 450, 1110 570 S1370 735, 1535 585" fill="none" stroke="#d4e6ff" stroke-width="38" stroke-linecap="round"/>
  <path d="M150 270 C330 120, 560 210, 710 310 S1030 470, 1260 270 S1480 200, 1550 290" fill="none" stroke="#eadfff" stroke-width="28" stroke-linecap="round"/>

  <rect x="165" y="145" width="1240" height="600" rx="34" fill="#ffffff" fill-opacity="0.7" stroke="#cddcff" stroke-width="2" filter="url(#shadow)"/>
  <rect x="230" y="230" width="375" height="120" rx="22" fill="#ffffff" stroke="#c8d9ff" stroke-width="2"/>
  <rect x="230" y="405" width="375" height="120" rx="22" fill="#ffffff" stroke="#d8ccff" stroke-width="2"/>
  <rect x="230" y="580" width="375" height="120" rx="22" fill="#ffffff" stroke="#bfeff0" stroke-width="2"/>

  <rect x="730" y="240" width="250" height="96" rx="20" fill="#eff6ff" stroke="#a9cfff" stroke-width="2"/>
  <rect x="1040" y="240" width="250" height="96" rx="20" fill="#f5f1ff" stroke="#c7b8ff" stroke-width="2"/>
  <rect x="875" y="390" width="190" height="84" rx="22" fill="url(#rail)"/>
  <rect x="760" y="540" width="500" height="120" rx="24" fill="#ffffff" stroke="#cddcff" stroke-width="2"/>

  <path d="M610 290 L730 290" stroke="#7cb7ff" stroke-width="9" stroke-linecap="round"/>
  <path d="M610 465 L875 432" stroke="#a891ff" stroke-width="9" stroke-linecap="round"/>
  <path d="M1065 432 L1165 335" stroke="#8fd8e7" stroke-width="9" stroke-linecap="round"/>
  <path d="M1005 580 L1140 580" stroke="#7cb7ff" stroke-width="9" stroke-linecap="round"/>

  <circle cx="730" cy="290" r="34" fill="#ffffff" stroke="#7cb7ff" stroke-width="8"/>
  <circle cx="1040" cy="432" r="34" fill="#ffffff" stroke="#a891ff" stroke-width="8"/>
  <circle cx="875" cy="432" r="18" fill="#ffffff"/>

  <text x="275" y="278" font-family="Inter, Arial, sans-serif" font-size="22" fill="#25395f" font-weight="800">Intent</text>
  <text x="275" y="310" font-family="Inter, Arial, sans-serif" font-size="17" fill="#66779b">Buyer pays 10 USDC on Base</text>
  <text x="275" y="453" font-family="Inter, Arial, sans-serif" font-size="22" fill="#25395f" font-weight="800">Quote</text>
  <text x="275" y="485" font-family="Inter, Arial, sans-serif" font-size="17" fill="#66779b">Solver standing quote matched</text>
  <text x="275" y="628" font-family="Inter, Arial, sans-serif" font-size="22" fill="#25395f" font-weight="800">Settle</text>
  <text x="275" y="660" font-family="Inter, Arial, sans-serif" font-size="17" fill="#66779b">Delivery verified, funds released</text>

  <text x="812" y="280" font-family="Inter, Arial, sans-serif" font-size="20" fill="#2e5fa9" font-weight="800">Base</text>
  <text x="1090" y="280" font-family="Inter, Arial, sans-serif" font-size="20" fill="#705bc2" font-weight="800">Arbitrum</text>
  <text x="938" y="438" font-family="Inter, Arial, sans-serif" font-size="18" fill="#ffffff" font-weight="800">Solver</text>
  <text x="810" y="584" font-family="Inter, Arial, sans-serif" font-size="26" fill="#25395f" font-weight="800">IntentFlow Inspector</text>
  <text x="810" y="622" font-family="Inter, Arial, sans-serif" font-size="18" fill="#66779b">Outcome-first cross-chain UX for LI.FI Intents</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(out, "hero-intents.png"))
  .then(() => console.log("hero-intents.png written"));

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Colors
const colors = {
    bg: '#FFFBF9',
    orange: '#E63E00',
    text1: '#1C1917',
    text2: '#57534E',
    text3: '#8D8D8D',
    go: '#059669',
    kill: '#B91C1C',
    accent: '#FFF7F5'
};

const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margins: { top: 0, bottom: 0, left: 0, right: 0 }
});

const outputStream = fs.createWriteStream('Beforebuild_Premium_Deck.pdf');
doc.pipe(outputStream);

// Asset Paths (Absolute)
const coverImg = "C:\\Users\\jayth\\.gemini\\antigravity\\brain\\76cbea1b-fc98-47af-95ea-06e22ebd6377\\pitch_deck_cover_bg_1772534202175.png";
const moatImg = "C:\\Users\\jayth\\.gemini\\antigravity\\brain\\76cbea1b-fc98-47af-95ea-06e22ebd6377\\truth_moat_illustration_1772534223825.png";

// Helpers
function drawSlideBG() {
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.bg);
}

function slideHeader(title, subtitle) {
    doc.fillColor(colors.orange).fontSize(10).font('Helvetica-Bold').text(subtitle.toUpperCase(), 50, 40, { characterSpacing: 2 });
    doc.fillColor(colors.text1).fontSize(32).font('Times-Bold').text(title, 50, 60);
    doc.rect(50, 105, 100, 3).fill(colors.orange);
}

function slideFooter(pageNum) {
    doc.fontSize(8).fillColor(colors.text3).font('Helvetica')
        .text('© 2026 BEFOREBUILD.AI | CONFIDENTIAL PITCH DECK', 50, doc.page.height - 30)
        .text(`0${pageNum}`, doc.page.width - 70, doc.page.height - 30);
}

// 01: COVER
drawSlideBG();
if (fs.existsSync(coverImg)) {
    doc.image(coverImg, 0, 0, { width: doc.page.width, height: doc.page.height });
}
// Glass overlay effect
doc.rect(50, doc.page.height / 2 - 100, 500, 200).fillOpacity(0.85).fill(colors.bg);
doc.fillOpacity(1);
doc.fillColor(colors.text1).fontSize(42).font('Times-Bold').text('Beforebuild.ai', 80, doc.page.height / 2 - 60);
doc.fillColor(colors.orange).fontSize(18).font('Helvetica-Bold').text('INDIA\'S PRE-BUILD TRUTH LAYER', 80, doc.page.height / 2 + 5, { characterSpacing: 1 });
doc.fillColor(colors.text2).fontSize(12).font('Helvetica').text('Picking the right problem is your only moat.', 80, doc.page.height / 2 + 40);
slideFooter(1);

// 02: THE VALIDATION VACUUM (CRISIS + SHARK TANK)
doc.addPage();
drawSlideBG();
slideHeader('The Validation Vacuum', '01 · The Problem');

// Left side: Stats
doc.fillColor(colors.text2).fontSize(12).font('Helvetica').text('The current ecosystem is defined by massive destruction of capital.', 50, 150, { width: 350 });

let y = 200;
const stats = [
    { n: '42%', t: 'Fail due to lack of market need.' },
    { n: '80%', t: 'Shark Tank deals fail in Due Diligence.' },
    { n: '90%', t: 'Indian startups fail within 5 years.' }
];

stats.forEach(s => {
    doc.fillColor(colors.kill).fontSize(28).font('Times-Bold').text(s.n, 50, y);
    doc.fillColor(colors.text1).fontSize(14).font('Helvetica-Bold').text(s.t, 140, y + 5, { width: 250 });
    y += 70;
});

// Right side: Callout
doc.rect(450, 150, 350, 300).fill(colors.accent);
doc.fillColor(colors.text1).fontSize(18).font('Times-Bold').text('The "Truth Moat" Test', 480, 180);
doc.fillColor(colors.text2).fontSize(11).font('Helvetica').text('Most founders confuse "polite feedback" with "market demand." As Anupam Mittal confirmed, televised handshakes are secondary to the raw truth of Post-TV Due Diligence.', 480, 210, { width: 290, lineGap: 5 });
slideFooter(2);

// 03: MOAT DISCOVERY (PHILOSOPHY + STANDOUT)
doc.addPage();
drawSlideBG();
slideHeader('Moat Discovery', '02 · Our Philosophy');

const items = [
    { h: 'Pain over Features', p: 'We don\'t chase feature requests. We hunt for "Top 3" priorities where users are bleeding money.' },
    { h: 'Evidence over Opinions', p: 'We measure what users HAVE DONE—past behavior is the only honest signal.' },
    { h: 'Mandatory Money', p: 'No validation exists without financial skin in the game. Paid pre-orders or Escrow only.' }
];

y = 150;
items.forEach(i => {
    doc.circle(65, y + 10, 5).fill(colors.orange);
    doc.fillColor(colors.text1).fontSize(16).font('Times-Bold').text(i.h, 85, y);
    doc.fillColor(colors.text2).fontSize(11).font('Helvetica').text(i.p, 85, y + 22, { width: 300 });
    y += 90;
});

if (fs.existsSync(moatImg)) {
    doc.image(moatImg, 450, 140, { width: 350 });
}
slideFooter(3);

// 04: WHY GIANTS FAIL (COMPETITION)
doc.addPage();
drawSlideBG();
slideHeader('The Hallucination Gap', '03 · Market Context');

const comps = [
    { n: 'AI Synthetic Users', f: 'Fatal Flaw: Sycophancy', d: 'Algorithms are programmed to be helpful. Real humans push back, rage-quit, and lie.' },
    { n: 'UserTesting.com', f: 'Recording, Not Strategy', d: 'Records where users click, but cannot tell you why they won\'t pay. Descriptive, not predictive.' },
    { n: 'PreLaunch.com', f: 'Curiosity ≠ Demand', d: 'Waitlists are cheap. A founder with 10k emails can still have zero revenue.' }
];

y = 150;
comps.forEach(c => {
    doc.rect(50, y, 740, 80).strokeColor(colors.orange).lineWidth(0.5).stroke();
    doc.fillColor(colors.text1).fontSize(16).font('Times-Bold').text(c.n, 70, y + 20);
    doc.fillColor(colors.kill).fontSize(10).font('Helvetica-Bold').text(c.f.toUpperCase(), 70, y + 42);
    doc.fillColor(colors.text2).fontSize(11).font('Helvetica').text(c.d, 300, y + 25, { width: 450 });
    y += 100;
});
slideFooter(4);

// 05: 30 DAYS TO TRUTH (SPRINT)
doc.addPage();
drawSlideBG();
slideHeader('The Truth Sprint', '04 · Operational Model');

const weeks = [
    { w: 'W1: Pain Audit', d: '15-20 "Mom Test" interviews. Problem Stack Ranking to kill delusion early.' },
    { w: 'W2: Behavioral Trap', d: 'Fake door funnels. Tracking drop-off at the pricing gate—the moment of truth.' },
    { w: 'W3: Money Signal', d: 'Mandatory financial commitment held in RBI-compliant digital escrow.' },
    { w: 'W4: The Verdict', d: 'Definitive GO / PIVOT / KILL verdict backed by a ₹1 Crore legal guarantee.' }
];

x = 50;
weeks.forEach((w, idx) => {
    doc.rect(x, 150, 175, 250).fill(idx % 2 === 0 ? colors.accent : '#FFFFFF');
    doc.fillColor(colors.orange).fontSize(12).font('Helvetica-Bold').text(`Week 0${idx + 1}`, x + 10, 170);
    doc.fillColor(colors.text1).fontSize(14).font('Times-Bold').text(w.w, x + 10, 195, { width: 155 });
    doc.fillColor(colors.text2).fontSize(10).font('Helvetica').text(w.d, x + 10, 240, { width: 155, lineGap: 3 });
    x += 185;
});
slideFooter(5);

// 06: THE BANKABLE PACK (DELIVERABLES)
doc.addPage();
drawSlideBG();
slideHeader('The Bankable Pack', '05 · Outcomes');

const delivs = [
    '01. Moat Mapping & Defensive Gap Analysis',
    '02. Problem Stack Ranking & Pain Intensity Score',
    '03. High-Fidelity "Fake Door" Funnel Data',
    '04. Verified Intent Action Report (VIAR)',
    '05. Escrow-Verified Pre-order Signals',
    '06. Strategic Pivot Roadmap (Data-Backed)',
    '07. Investor-Ready Validation Certificate'
];

y = 150;
delivs.forEach(d => {
    doc.rect(50, y, 15, 15).fill(colors.orange);
    doc.fillColor(colors.text1).fontSize(16).font('Times-Bold').text(d, 80, y);
    y += 45;
});

doc.rect(500, 150, 300, 250).fill(colors.text1);
doc.fillColor('#FFFFFF').fontSize(24).font('Times-Bold').text('Outcome:', 520, 180);
doc.fillColor(colors.orange).fontSize(48).font('Times-Bold').text('GO', 520, 220);
doc.fillColor('#FFFFFF').fontSize(14).font('Helvetica').text('A definitive decision your investors can bank on.', 520, 280, { width: 250 });
slideFooter(6);

// 07: SCALABLE INSIGHTS (ECONOMICS + TRUTH INDEX)
doc.addPage();
drawSlideBG();
slideHeader('Scalable Insights', '06 · Business Model');

// Pricing table
doc.fontSize(14).font('Times-Bold').text('Confidence-as-a-Service', 50, 150);
const tiers = [
    { t: 'Sanity Check', p: '₹4,999', target: 'Rapid Audit' },
    { t: 'Truth Hunt', p: '₹15,999', target: 'Deep Human Research' },
    { t: 'Revenue Pilot', p: '₹49,999', target: 'Full Demand Simulation' }
];

y = 180;
tiers.forEach(t => {
    doc.fillColor(colors.text1).fontSize(12).font('Helvetica-Bold').text(t.t, 50, y);
    doc.fillColor(colors.orange).fontSize(12).text(t.p, 180, y);
    doc.fillColor(colors.text3).fontSize(10).text(t.target, 280, y);
    y += 30;
});

// The Future
doc.rect(450, 150, 350, 300).fill(colors.accent);
doc.fillColor(colors.text1).fontSize(20).font('Times-Bold').text('Proprietary Data Moat', 480, 180);
doc.fillColor(colors.text2).fontSize(11).font('Helvetica').text('Most agencies sell time. We sell insights. Every sprint compounds into the "Truth Index"—a database of verified pain-intensity scores across Indian sectors.', 480, 220, { width: 290, lineGap: 4 });
doc.fillColor(colors.orange).fontSize(11).font('Helvetica-Bold').text('Future Revenue: ₹50k/mo VC Subscriptions', 480, 320);
slideFooter(7);

// 08: TRUST & TRACEABILITY (LEGAL + REFS)
doc.addPage();
drawSlideBG();
slideHeader('Trust Backed by Law', '07 · Conclusion');

doc.fillColor(colors.text1).fontSize(18).font('Times-Bold').text('Legal Accountability', 50, 150);
doc.fillColor(colors.text2).fontSize(11).font('Helvetica').text('• ₹1 Crore Professional Indemnity (E&O) cover.\n• RBI-Compliant Escrow via RazorpayX / Castler.\n• India DPDP Act 2026 Compliance.', 50, 180, { lineGap: 10 });

doc.fillColor(colors.text1).fontSize(18).font('Times-Bold').text('Key References', 50, 300);
doc.fillColor(colors.text3).fontSize(9).font('Helvetica').text('1. CB Insights: "Top Startup Failure Reasons"\n2. Deutsche.dk: "India Startup Reckoning 2025"\n3. Stern NYU: "Aticus Peterson on Strategic AI"', 50, 330, { lineGap: 5 });

doc.fontSize(22).fillColor(colors.orange).font('Times-Bold').text('www.beforebuild.ai', 50, 480);
slideFooter(8);

doc.end();
console.log('✓ Premium Pitch Deck generated: Beforebuild_Premium_Deck.pdf');

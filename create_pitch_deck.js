const PDFDocument = require('pdfkit');
const fs = require('fs');

// Colors from styles.css
const colors = {
    bg: '#FFFBF9',
    orange: '#E63E00',
    text1: '#1C1917',
    text2: '#57534E',
    text3: '#8D8D8D',
    go: '#059669',
    pivot: '#B45309',
    kill: '#B91C1C',
    border: 'rgba(230, 62, 0, 0.1)'
};

const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margins: { top: 40, bottom: 40, left: 50, right: 50 }
});

const outputStream = fs.createWriteStream('Beforebuild_Pitch_Deck.pdf');
doc.pipe(outputStream);

// Helper for Background
function drawBackground() {
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.bg);
    // Subtle accent
    doc.circle(doc.page.width, 0, 200).fillOpacity(0.05).fill(colors.orange);
    doc.fillOpacity(1);
}

// Helper for Footer
function drawFooter(pageNum) {
    doc.fontSize(10).fillColor(colors.text3)
        .text('BEFOREBUILD.AI | CONFIDENTIAL', 50, doc.page.height - 40)
        .text(`PAGE ${pageNum}`, doc.page.width - 100, doc.page.height - 40, { align: 'right' });
}

// Helper for Section Eyebrow
function drawEyebrow(text) {
    doc.fontSize(10).fillColor(colors.orange).font('Helvetica-Bold')
        .text(text.toUpperCase(), { characterSpacing: 1 });
    doc.moveDown(0.5);
}

// Slide 1: Title Slide
drawBackground();
doc.moveDown(8);
doc.fontSize(48).fillColor(colors.text1).font('Helvetica-Bold')
    .text('Picking the right problem', { align: 'center' });
doc.fontSize(48).fillColor(colors.orange)
    .text('is your only moat.', { align: 'center' });

doc.moveDown(1.5);
doc.fontSize(18).fillColor(colors.text2).font('Helvetica')
    .text('Beforebuild.ai | Problem-First Startup Validation', { align: 'center' });
doc.fontSize(14).fillColor(colors.text3)
    .text("India's Pre-Build Truth Layer.", { align: 'center' });

drawFooter(1);

// Slide 2: The Startup Waste Crisis
doc.addPage();
drawBackground();
drawEyebrow('Section 1 · The Core Problem');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('The Startup Waste Crisis');
doc.moveDown(1);

const stats = [
    { num: '42%', label: 'Fail Due to No Market Need', meta: 'The #1 cause — above funding and competition' },
    { num: '11,000+', label: 'Indian Startups Shuttered in 2025', meta: 'A 30% increase from the previous year' },
    { num: '90%', label: 'Indian Startups Fail Within 5 Years', meta: 'Across all sectors, stages, and funding levels' },
    { num: '255%', label: 'Founders Overestimate Idea Value', meta: 'Leads directly to the "zombie startup" phase' }
];

let x = 50;
let y = 180;
stats.forEach((s, i) => {
    doc.rect(x, y, 160, 150).fillOpacity(0.03).fill(colors.kill);
    doc.fillOpacity(1).fillColor(colors.kill).fontSize(28).font('Helvetica-Bold').text(s.num, x + 10, y + 20);
    doc.fillColor(colors.text1).fontSize(12).text(s.label, x + 10, y + 60, { width: 140 });
    doc.fillColor(colors.text3).fontSize(10).font('Helvetica').text(s.meta, x + 10, y + 100, { width: 140 });
    x += 185;
});

drawFooter(2);

// Slide 3: Shark Tank India Insight
doc.addPage();
drawBackground();
drawEyebrow('Section 1.5 · Intelligence Briefing');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('Shark Tank India: Beyond the Handshake');
doc.moveDown(0.5);
doc.fontSize(14).fillColor(colors.text2).font('Helvetica').text('What you see on screen is just the pitch. The real decision happens later, in due diligence.');

const dossier = [
    { num: '0.1%', label: 'Selection Wall', meta: 'Out of 2 Lakh+ applicants, 99.9% fail to reach the pitch.' },
    { num: '8/10', label: 'Post-TV Fallout', meta: '80% of deals fall through during deep-dive due diligence.' },
    { num: '90%', label: 'Survival Wall', meta: '90% of Indian startups fail within 5 years.' }
];

y = 220;
dossier.forEach((d, i) => {
    doc.fontSize(24).fillColor(colors.orange).font('Helvetica-Bold').text(d.num, 60, y);
    doc.fontSize(16).fillColor(colors.text1).text(d.label, 150, y);
    doc.fontSize(12).fillColor(colors.text2).font('Helvetica').text(d.meta, 150, y + 25, { width: 500 });
    y += 80;
});

drawFooter(3);

// Slide 4: Our Philosophy
doc.addPage();
drawBackground();
drawEyebrow('Section 2 · Our Philosophy');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('Survival Through Scientific Disproof');
doc.moveDown(1);

const phil = [
    { title: 'Pain over Features', desc: 'If the problem is not a "Top 3" priority, they will not pay. We hunt for bleeding problems.' },
    { title: 'Evidence over Opinions', desc: 'We do not ask what they might do. We measure what they have already done.' },
    { title: 'Disproof over Validation', desc: 'Our goal is not to confirm your idea. It is to destroy it scientifically.' }
];

x = 50;
phil.forEach(p => {
    doc.rect(x, 180, 230, 180).strokeColor(colors.orange).lineWidth(1).stroke();
    doc.fillColor(colors.text1).fontSize(18).font('Helvetica-Bold').text(p.title, x + 20, 200);
    doc.fillColor(colors.text2).fontSize(12).font('Helvetica').text(p.desc, x + 20, 240, { width: 190 });
    x += 250;
});

drawFooter(4);

// Slide 5: Competitive Defense
doc.addPage();
drawBackground();
drawEyebrow('Section 3 · Why the Giants Fail');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('Why the Giants Fail');
doc.moveDown(1);

const fails = [
    { name: 'The AI Problem', flaw: 'Sycophancy & Hallucination', desc: 'AI personas are people-pleasers. Real humans push back and lie.' },
    { name: 'UserTesting.com', flaw: 'Descriptive, Not Predictive', desc: 'Records clicks, not why they won\'t pay.' },
    { name: 'PreLaunch.com', flaw: 'Curiosity ≠ Demand', desc: 'Waitlists are cheap. Emails cost nothing.' }
];

y = 200;
fails.forEach(f => {
    doc.fillColor(colors.kill).fontSize(14).font('Helvetica-Bold').text('FATAL FLAW: ' + f.flaw, 50, y);
    doc.fillColor(colors.text1).fontSize(20).text(f.name, 50, y + 20);
    doc.fillColor(colors.text2).fontSize(12).font('Helvetica').text(f.desc, 300, y + 20, { width: 500 });
    y += 100;
});

drawFooter(5);

// Slide 6: Beforebuild.ai Standout
doc.addPage();
drawBackground();
drawEyebrow('Strategic Advantage');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('How We Stand Out');
doc.moveDown(1);

const standouts = [
    { t: 'Definitive Verdicts', d: 'GO / PIVOT / KILL — not a PDF of opinions.' },
    { t: 'The Real Data Moat', d: 'Proprietary signals finding what the market actually pays for.' },
    { t: 'Mandatory Money Signal', d: 'Paid pre-orders or RBI-compliant escrow. Real skin in the game.' },
    { t: 'Legal Accountability', d: '₹1 Crore coverage. We stand behind every KILL verdict.' }
];

x = 50;
y = 180;
standouts.forEach((s, i) => {
    doc.fontSize(16).fillColor(colors.orange).font('Helvetica-Bold').text(s.t, x, y);
    doc.fontSize(12).fillColor(colors.text2).font('Helvetica').text(s.d, x, y + 20, { width: 300 });
    if (i % 2 === 1) { x = 50; y += 100; } else { x += 400; }
});

drawFooter(6);

// Slide 7: The 30-Day Sprint
doc.addPage();
drawBackground();
drawEyebrow('Section 4 · Operational Model');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('The 30-Day Scientific Disproof Sprint');
doc.moveDown(0.5);

const weeks = [
    { w: 'W1: Pain Audit', a: '15-20 Mom Test Interviews', m: 'Problem Stack Ranking' },
    { w: 'W2: Behavioral Trap', a: 'Fake Door Funnels', m: 'Payment Gate Drop-off' },
    { w: 'W3: Money Signal', a: 'Digital Escrow Deposit', m: 'Mandatory Financial Commitment' },
    { w: 'W4: The Verdict', a: 'Bankable Validation Pack', m: 'Deep Analysis & Certification' }
];

y = 200;
weeks.forEach(w => {
    doc.rect(50, y, 740, 60).fillOpacity(0.05).fill(colors.orange);
    doc.fillOpacity(1).fillColor(colors.text1).fontSize(16).font('Helvetica-Bold').text(w.w, 70, y + 20);
    doc.fontSize(12).font('Helvetica').text(w.a, 250, y + 25);
    doc.fillColor(colors.orange).text(w.m, 500, y + 25);
    y += 70;
});

drawFooter(7);

// Slide 8: Deliverables
doc.addPage();
drawBackground();
drawEyebrow('Section 5 · Outcome');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('Master List of Deliverables');
doc.moveDown(1);

const deliv = [
    '• Moat Mapping: Defensive "White Space" Analysis',
    '• Pain Intensity Scoring & Problem Stack Ranking',
    '• High-Fidelity "Fake Door" Behavioral Tracking',
    '• Verified Intent Action Report (Clicks vs Signups)',
    '• RBI-Compliant Escrow Setup for Pre-orders',
    '• Strategic Pivot Roadmap (Data-Backed)',
    '• Investor-ready "Bankable Validation Pack"'
];

deliv.forEach(d => {
    doc.fillColor(colors.text2).fontSize(16).text(d);
    doc.moveDown(0.8);
});

drawFooter(8);

// Slide 9: Pricing
doc.addPage();
drawBackground();
drawEyebrow('Section 6 · Revenue Model');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('Confidence-as-a-Service');
doc.moveDown(1);

const pricing = [
    { t: 'Sanity Check', p: '₹4,999', target: 'Side-Hustlers', features: ['Desk research', 'Gap report', '1x Expert Consult'] },
    { t: 'Truth Hunt', p: '₹15,999', target: 'Solo Founders', features: ['10 Interviews', 'Stack Ranking', 'Pivot Roadmap'] },
    { t: 'Revenue Pilot', p: '₹49,999', target: 'Pre-Seed Teams', features: ['Fake Door Page', 'Ad Sprint', 'Final Verdict'] }
];

x = 50;
pricing.forEach(p => {
    doc.rect(x, 180, 230, 250).fillOpacity(0.03).fill(colors.orange);
    doc.fillOpacity(1).fillColor(colors.orange).fontSize(12).font('Helvetica-Bold').text(p.target, x + 20, 200);
    doc.fillColor(colors.text1).fontSize(20).text(p.t, x + 20, 220);
    doc.fontSize(24).text(p.p, x + 20, 250);
    doc.fillColor(colors.text2).fontSize(10).font('Helvetica').text(p.features.join('\n'), x + 20, 300);
    x += 250;
});

drawFooter(9);

// Slide 10: Sustainability (Burn & Break-even)
doc.addPage();
drawBackground();
drawEyebrow('Section 6 · Sustainability');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('Monthly Burn & Break-Even');
doc.moveDown(1);

const costs = [
    { c: 'Core Team (2 Interns)', a: '₹28,000', p: 'Research + Design' },
    { c: 'The "Truth Hub" Software', a: '₹6,000', p: 'AI Summary Agents' },
    { c: 'Cloud & Data Storage', a: '₹1,500', p: 'Proprietary Database' },
    { c: 'Lead Generation (Ads)', a: '₹10,000', p: 'Targeted LinkedIn Ads' },
    { c: 'Trust Layer (Legal)', a: '₹2,000', p: 'Indemnity Insurance' }
];

y = 180;
costs.forEach(c => {
    doc.fillColor(colors.text1).fontSize(14).font('Helvetica-Bold').text(c.c, 50, y);
    doc.fillColor(colors.orange).text(c.a, 350, y);
    doc.fillColor(colors.text3).fontSize(12).font('Helvetica').text(c.p, 500, y);
    y += 40;
});

doc.rect(50, y + 20, 740, 60).fillOpacity(0.05).fill(colors.kill);
doc.fillOpacity(1).fillColor(colors.text1).fontSize(16).font('Helvetica-Bold').text('Total Monthly Burn: ₹47,500', 70, y + 40);
doc.fillColor(colors.kill).text('Break-even: Just 10 "Sanity Checks" per month', 350, y + 40);

drawFooter(10);

// Slide 11: Vision & Truth Index
doc.addPage();
drawBackground();
drawEyebrow('Section 7 · The Moat');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('The Truth Index');
doc.moveDown(1);

doc.fontSize(16).fillColor(colors.text2).text('Most agencies sell their time. We sell our Insights.', { width: 700 });
doc.moveDown(1);
doc.fontSize(14).text('Every validation sprint generates proprietary data on "Hair-on-Fire" problems in specific Indian sectors. This data compounds over time.');

doc.moveDown(2);
doc.rect(50, 280, 740, 100).fillOpacity(0.05).fill(colors.orange);
doc.fillOpacity(1).fillColor(colors.text1).fontSize(18).font('Helvetica-Bold').text('Long-term monetization: The Risk Index', 70, 300);
doc.fontSize(12).font('Helvetica').text('VCs and Corporate Innovation labs pay a monthly retainer (₹50k+) to access our anonymized database—to see which problems have the highest Pain Intensity score before they fund or build.', 70, 330, { width: 700 });

drawFooter(11);

// Slide 12: Legal & Compliance
doc.addPage();
drawBackground();
drawEyebrow('Section 8 · Legal & Compliance');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('Trust Backed by Law');
doc.moveDown(1);

const legal = [
    { t: 'Professional Indemnity', d: '₹1 Crore legal coverage for every KILL verdict.' },
    { t: 'RBI-Compliant Escrow', d: 'Funds held via RazorpayX or Castler. FEMA compliant.' },
    { t: 'India DPDP Act 2026', d: 'Data handled in full compliance with new privacy laws.' }
];

y = 200;
legal.forEach(l => {
    doc.fillColor(colors.orange).fontSize(18).font('Helvetica-Bold').text(l.t, 50, y);
    doc.fillColor(colors.text2).fontSize(14).font('Helvetica').text(l.d, 50, y + 25);
    y += 80;
});

drawFooter(12);

// Slide 13: Research References
doc.addPage();
drawBackground();
drawEyebrow('Works Cited');
doc.fontSize(32).fillColor(colors.text1).font('Helvetica-Bold').text('Research References');
doc.moveDown(1);

const refs = [
    '1. CB Insights: "The Top 12 Reasons Startups Fail" (Primary Cause Analysis)',
    '2. Deutsche.dk: "India Startup Reckoning 2025: Data-Driven Market Correction"',
    '3. SonyLIV: Shark Tank India Season 4 Official Registration & Selection Data',
    '4. Aticus Peterson, NYU Stern: "Can AI Outperform Humans in Strategic Decision-Making"',
    '5. Bhavya Sharma & Associates: S4 Funded Startups Status 2026 (The Economic Times)',
    '6. Redseer Strategy Consultants: Startup Market Correction and Burn Rate Analysis',
    '7. India DPDP Act 2026: Implementation and Compliance Framework'
];

refs.forEach(r => {
    doc.fillColor(colors.text3).fontSize(12).text(r);
    doc.moveDown(0.5);
});

drawFooter(13);

// Slide 14: Final Statement
doc.addPage();
drawBackground();
doc.moveDown(10);
doc.fontSize(18).fillColor(colors.text2).font('Helvetica')
    .text('We are not building a marketing agency.', { align: 'center' });
doc.moveDown(1);
doc.fontSize(32).fillColor(colors.orange).font('Helvetica-Bold')
    .text("India's Pre-Build Truth Layer.", { align: 'center' });
doc.moveDown(1);
doc.fontSize(14).fillColor(colors.text1)
    .text('www.beforebuild.ai', { align: 'center' });

drawFooter(14);

doc.end();
console.log('PDF Pitch Deck generated successfully: Beforebuild_Pitch_Deck.pdf');

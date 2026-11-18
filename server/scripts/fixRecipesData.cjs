const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../client/src/data/recipesData.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Lines (1-based) with wrong image URL, mapped to correct Unsplash photo IDs
const fixes = {
  520:  { title: 'Authentic Kerala Sadya Avial',       url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80' },
  809:  { title: 'South Indian Pepper Tomato Rasam',   url: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80' },
  1289: { title: 'Hyderabadi Khatti Dal',              url: 'https://images.unsplash.com/photo-1546833998-877b37c2e4c6?auto=format&fit=crop&w=1200&q=80' },
  1559: { title: 'Dal Makhani (or similar)',           url: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=1200&q=80' },
  1838: { title: 'Bengali Fish Curry',                 url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80&v=2' },
  2102: { title: 'Korean Bibimbap',                   url: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80' },
  2593: { title: 'Thai Green Curry',                   url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80' },
  3574: { title: 'Falafel',                            url: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1200&q=80' },
  4474: { title: 'Rasmalai',                           url: 'https://images.unsplash.com/photo-1627823862011-b6a79adf32ea?auto=format&fit=crop&w=1200&q=80' },
  4733: { title: 'Rajma Chawal',                      url: 'https://images.unsplash.com/photo-1546833998-877b37c2e4c6?auto=format&fit=crop&w=1200&q=80&v=2' },
  5127: { title: 'Gongura Pachadi',                   url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80' },
};

const badUrl = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80';

let fixed = 0;
const fixedLines = [...lines];

for (const [lineNumStr, fix] of Object.entries(fixes)) {
  const idx = parseInt(lineNumStr) - 1; // 0-based index
  if (fixedLines[idx] && fixedLines[idx].includes(badUrl)) {
    fixedLines[idx] = fixedLines[idx].replace(badUrl, fix.url);
    console.log(`Fixed line ${lineNumStr}: ${fix.title} -> new URL set`);
    fixed++;
  } else {
    console.warn(`WARN: Line ${lineNumStr} did not match expected pattern. Actual: ${fixedLines[idx]?.trim()?.substring(0,80)}`);
  }
}

fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
console.log(`\nDone. Fixed ${fixed}/11 entries.`);

// Verify no bad URLs remain
const remaining = fixedLines.filter(l => l.includes('b9f581a1996d')).length;
console.log(`Remaining bad URLs: ${remaining}`);

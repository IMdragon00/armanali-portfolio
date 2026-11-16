import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const need = ['dist/index.html', 'dist/main.js', 'dist/main.css', 'dist/assets/portrait.webp', 'dist/assets/og-image.jpg', 'dist/vendor/swarmline.js'];
let bad = 0;
for (const f of need) if (!existsSync(f)) { console.error('Missing', f); bad++; }
const walk = d => readdirSync(d).flatMap(n => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk('src')) if (/touquir/i.test(readFileSync(f, 'utf8'))) { console.error('Reference-owner name found in', f); bad++; }
if (!readFileSync('index.html', 'utf8').includes('rel="canonical" href="https://armanali.com/"')) { console.error('Canonical missing'); bad++; }
console.log(bad ? `Check failed (${bad})` : 'Check passed: files present, no reference-owner details, canonical set.');
process.exit(bad ? 1 : 0);

import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
const watch = process.argv.includes('--watch');
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('public', 'dist', { recursive: true });
copyFileSync('index.html', 'dist/index.html');
const opts = {
  entryPoints: { main: 'src/main.jsx' }, bundle: true, outdir: 'dist', format: 'esm',
  target: ['es2020'], jsx: 'automatic', minify: !watch, sourcemap: watch,
  define: { 'process.env.NODE_ENV': JSON.stringify(watch ? 'development' : 'production') }, logLevel: 'info',
};
if (watch) {
  const ctx = await esbuild.context(opts);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: 'dist', port: 3000 });
  console.log(`Dev server: http://localhost:${port} (restart to pick up index.html or public/ changes)`);
} else {
  await esbuild.build(opts);
}

// Lazy-loads the Swarmline effect (public/vendor/swarmline.js) only when the Motion button is pressed.
let loading = false;
export function startSwarm() {
  if (window.__swarmline) { window.__swarmline.toggle(); return; }
  if (loading) return;
  loading = true;
  const s = document.createElement('script');
  s.src = '/vendor/swarmline.js';
  s.onload = s.onerror = () => { loading = false; };
  document.head.appendChild(s); // the script starts itself on load
}

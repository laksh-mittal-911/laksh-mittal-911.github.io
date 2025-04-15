document.addEventListener('DOMContentLoaded', () => {
    console.log(`${new Date().toISOString()}, view, page loaded`);
  });
  document.addEventListener('click', e => {
    console.log(`${new Date().toISOString()}, click, ${e.target.tagName.toLowerCase()}`);
  });
  
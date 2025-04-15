(function () {
    // Utility to classify the type of element
    function getObjectType(el) {
      if (!el) return 'unknown';
      const tag = el.tagName.toLowerCase();
      if (tag === 'img') return 'image';
      if (tag === 'button') return 'button';
      if (tag === 'a') return 'link';
      if (tag === 'input' || tag === 'textarea') return 'text input';
      if (tag === 'select') return 'drop-down';
      return tag;
    }
  
    // Log the event
    function logEvent(type, target) {
      const timestamp = new Date().toISOString();
      const objectType = getObjectType(target);
      console.log(`${timestamp}, ${type}, ${objectType}`);
    }
  
    // Log clicks
    document.addEventListener('click', (e) => {
      logEvent('click', e.target);
    });
  
    // Log views on page load
    window.addEventListener('load', () => {
      const elements = document.querySelectorAll('img, a, button, input, textarea, select, p, h1, h2, h3');
      elements.forEach(el => {
        logEvent('view', el);
      });
    });
  })();
  
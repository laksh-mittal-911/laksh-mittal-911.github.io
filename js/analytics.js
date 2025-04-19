
(function () {

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
  

    function logEvent(type, target) {
      const timestamp = new Date().toISOString();
      const objectType = getObjectType(target);
      const targetId = target.id ? `#${target.id}` : '';
      const targetClass = target.className ? `.${target.className.replace(/\s+/g, '.')}` : '';
      const targetText = target.innerText ? 
        (target.innerText.length > 20 ? 
         `"${target.innerText.substring(0, 20)}..."` : 
         `"${target.innerText}"`) : 
        '';
      
      console.log(`${timestamp}, ${type}, ${objectType}${targetId}${targetClass} ${targetText}`);
    }
  
 
    document.addEventListener('click', (e) => {
      logEvent('click', e.target);
    });
  
 
    document.addEventListener('submit', (e) => {
      logEvent('submit', e.target);
    });
 
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || 
          e.target.tagName.toLowerCase() === 'textarea') {
        if (e.key === 'Enter') {
          logEvent('enter_key', e.target);
        }
      }
    });
  

    window.addEventListener('load', () => {
      // Log page view
      console.log(`${new Date().toISOString()}, view, page "${document.title}"`);
      

      const elements = document.querySelectorAll('img, a, button, input, textarea, select, p, h1, h2, h3');
      elements.forEach(el => {
        logEvent('view', el);
      });

      let maxScrollPercentage = 0;
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        
        const scrollPercentage = Math.round((scrollPosition / (documentHeight - windowHeight)) * 100);
        
        if (scrollPercentage > maxScrollPercentage && scrollPercentage % 25 === 0) {
          maxScrollPercentage = scrollPercentage;
          console.log(`${new Date().toISOString()}, scroll, ${scrollPercentage}% of page`);
        }
      });
    });
  })();
// Q2: Capture click + “view” events and log to console
(function() {
    function logEvent(type, objType) {
      const timestamp = new Date().toISOString();
      console.log(`${timestamp}, ${type}, ${objType}`);
    }
  
    // clicks
    document.addEventListener('click', e => {
      const tag = e.target.tagName.toLowerCase();
      logEvent('click', tag);
    });
  
    // “view” when element scrolls into view
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          logEvent('view', ent.target.tagName.toLowerCase());
          obs.unobserve(ent.target);
        }
      });
    }, { threshold: 0.5 });
  
    document.querySelectorAll('section, img, a, ul, li, textarea, button')
            .forEach(el => observer.observe(el));
  })();
  
  // Q3: Text analysis
  document.getElementById('analyze-btn').addEventListener('click', () => {
    const text = document.getElementById('text-input').value;
    const letters  = (text.match(/[A-Za-z]/g) || []).length;
    const words    = (text.match(/\b\w+\b/g) || []).length;
    const spaces   = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const special  = (text.match(/[^A-Za-z0-9\s]/g) || []).length;
  
    const pronouns     = ['i','you','he','she','it','we','they','me','him','her','us','them','my','your','his','its','our','their'];
    const prepositions = ['of','in','to','for','with','on','at','by','from','up','about','into','over','after'];
    const articles     = ['a','an'];
  
    function countGroup(list) {
      const counts = Object.fromEntries(list.map(w=>[w,0]));
      (text.toLowerCase().match(/\b\w+\b/g) || []).forEach(tok => {
        if (counts.hasOwnProperty(tok)) counts[tok]++;
      });
      return counts;
    }
  
    const pronounCounts = countGroup(pronouns);
    const prepCounts    = countGroup(prepositions);
    const articleCounts = countGroup(articles);
  
    document.getElementById('analysis-output').textContent =
  `Letters: ${letters}
  Words: ${words}
  Spaces: ${spaces}
  Newlines: ${newlines}
  Special symbols: ${special}
  
  Pronoun counts:
  ${JSON.stringify(pronounCounts, null, 2)}
  
  Preposition counts:
  ${JSON.stringify(prepCounts, null, 2)}
  
  Indefinite article counts:
  ${JSON.stringify(articleCounts, null, 2)}`;
  });
  

document.addEventListener('DOMContentLoaded', () => {
    console.log(`${new Date().toISOString()}, view, page loaded`);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      element.style.opacity = '0';
      setTimeout(() => {
        element.style.opacity = '1';
      }, 300);
    });
    
    const slideUpElements = document.querySelectorAll('.slide-up');
    
    function checkScroll() {
      slideUpElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8 && !element.classList.contains('animated')) {
          element.classList.add('animated');
          element.style.animation = 'slideUp 0.8s ease forwards';
        }
      });
    }
    
    slideUpElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(40px)';
    });
    
    window.addEventListener('scroll', checkScroll);
    setTimeout(checkScroll, 100);
    
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
      cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px)';
          this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
      });
    }
    
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
          e.preventDefault();
          
          document.querySelector(href).scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  });
  
  if (document.querySelector('.cards-container')) {
    const style = document.createElement('style');
    style.textContent = `
      .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 30px;
        margin-top: 40px;
      }
      
      .card {
        background: #fff;
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }
      
      .card i {
        color: #c4a35a;
        margin-bottom: 20px;
      }
      
      .card h3 {
        margin-top: 0;
        margin-bottom: 15px;
      }
    `;
    document.head.appendChild(style);
  }
  
  document.addEventListener('click', e => {
    console.log(`${new Date().toISOString()}, click, ${e.target.tagName.toLowerCase()}`);
  });
  
  if (window.innerWidth < 768) {
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.cssText = `
      background: none;
      border: none;
      color: #2b2b2b;
      font-size: 24px;
      cursor: pointer;
      display: block;
      margin: 0 auto 10px;
    `;
    
    nav.insertBefore(menuToggle, navList);
    
    navList.style.display = 'none';
    
    menuToggle.addEventListener('click', () => {
      if (navList.style.display === 'none') {
        navList.style.display = 'block';
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        navList.style.display = 'none';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }
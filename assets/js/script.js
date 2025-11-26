 (function(){
   try {
     var body = document.body;
     if (body) {
       var loader = document.createElement('div');
       loader.className = 'site-preloader';
       loader.innerHTML = '<img src="assets/images/preloader.gif" alt="Loading...">';
       body.classList.add('preloading');
       body.appendChild(loader);
       function hideLoader(){
         if (!loader) return;
         loader.classList.add('is-hidden');
         body.classList.remove('preloading');
         setTimeout(function(){
           if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
           loader = null;
         }, 350);
       }
       if (document.readyState === 'complete') {
         hideLoader();
       } else {
         window.addEventListener('load', hideLoader);
         setTimeout(hideLoader, 8000);
       }
     }
   } catch (e) {}
 })();

 document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header');
  var toggle = document.querySelector('.menu_toggle');
  var nav = document.getElementById('primary-nav');
  if (!header || !toggle || !nav) return;

  var mq = window.matchMedia('(max-width: 1040px)');

  function isOpen() { return header.classList.contains('nav-open'); }

  function openMenu() {
    header.classList.add('nav-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    header.classList.remove('nav-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('no-scroll');
  }

  toggle.addEventListener('click', function () {
    if (!mq.matches) return; // only active on mobile
    isOpen() ? closeMenu() : openMenu();
  });

  nav.addEventListener('click', function (e) {
    if (!mq.matches) return;
    var t = e.target;
    if (t && t.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (!mq.matches) return;
    if (e.key === 'Escape' && isOpen()) closeMenu();
  });

  function handleResize() {
    if (!mq.matches) {
      // ensure clean state on desktop
      closeMenu();
    }
  }

  if (mq.addEventListener) mq.addEventListener('change', handleResize);
  else mq.onchange = handleResize;
  window.addEventListener('resize', handleResize);
});

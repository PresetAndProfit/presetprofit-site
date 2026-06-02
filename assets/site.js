/* Shared behavior for all sub-pages. Keep tiny + dependency-free. */
(function(){
  // Nav: solid on scroll (sub-pages start solid already, but keep parity)
  var nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('solid')){
    var s = function(){ nav.classList.toggle('scrolled', window.scrollY > 60); };
    window.addEventListener('scroll', s, {passive:true}); s();
  }
  // Mobile menu close on link click
  var links = document.getElementById('navlinks');
  if (links){
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }
  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      var a = btn.nextElementSibling;
      a.style.maxHeight = open ? '0px' : (a.scrollHeight + 'px');
    });
  });

  // Generic graceful form handler (contact + audit)
  document.querySelectorAll('form[data-graceful]').forEach(function(form){
    form.addEventListener('submit', function(e){
      var action = (form.getAttribute('action')||'').trim();
      if (!action){
        e.preventDefault();
        form.style.display = 'none';
        var ok = form.parentElement.querySelector('.form-success');
        if (ok) ok.classList.add('show');
      }
    });
  });
})();

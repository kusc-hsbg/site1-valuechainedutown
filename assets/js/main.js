document.addEventListener('DOMContentLoaded', function() {
  // Hero Slider
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.hero-slider .dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = index;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  if (slides.length > 0) {
    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        clearInterval(slideInterval);
        goToSlide(i);
        startSlider();
      });
    });
    startSlider();
  }

  // Header scroll effect
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileOverlay = document.querySelector('.mobile-nav-overlay');
  var mobileClose = document.querySelector('.mobile-nav-close');

  function openMobileMenu() {
    if (mobileNav) mobileNav.classList.add('open');
    if (mobileOverlay) mobileOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (mobileOverlay) mobileOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // Review carousel
  var track = document.querySelector('.review-track');
  if (track) {
    var cards = track.querySelectorAll('.review-card');
    var cardWidth = 0;
    var position = 0;
    var autoScroll;

    function getVisibleCards() {
      return window.innerWidth <= 991 ? 1 : 3;
    }

    function updateCardWidth() {
      var visible = getVisibleCards();
      var gap = 20;
      var containerWidth = track.parentElement.offsetWidth;
      cardWidth = (containerWidth - gap * (visible - 1)) / visible;
      cards.forEach(function(card) {
        card.style.flex = '0 0 ' + cardWidth + 'px';
      });
    }

    function scrollReviews() {
      var visible = getVisibleCards();
      var maxPos = cards.length - visible;
      position++;
      if (position > maxPos) position = 0;
      track.style.transform = 'translateX(-' + position * (cardWidth + 20) + 'px)';
    }

    function startAutoScroll() {
      autoScroll = setInterval(scrollReviews, 4000);
    }

    updateCardWidth();
    startAutoScroll();
    window.addEventListener('resize', function() {
      updateCardWidth();
      position = 0;
      track.style.transform = 'translateX(0)';
    });
  }

  // Active nav link
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  var navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav a');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var linkPath = href.replace(/\/$/, '') || '/';
    if (linkPath === currentPath ||
        (currentPath.indexOf(linkPath) === 0 && linkPath !== '/')) {
      link.classList.add('active');
    }
  });
});

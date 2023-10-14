document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * loading-web
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  const footer = document.querySelector('footer');
  
  if (scrollTop && footer) {
    const togglescrollTop = function() {
      if (window.scrollY > 400 && window.scrollY < (footer.offsetTop - window.innerHeight)) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    }
  
    window.addEventListener('load', togglescrollTop);
    window.addEventListener('scroll', togglescrollTop);
  
    scrollTop.addEventListener('click', function(event) {
      event.preventDefault();
      if (window.scrollY >= (footer.offsetTop - window.innerHeight)) {
        // Scroll ke bagian atas footer
        window.scrollTo({
          top: footer.offsetTop - window.innerHeight,
          behavior: 'smooth'
        });
      } else {
        // Scroll ke atas halaman
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  } 

  /**
   * Initiate Pure Counter
   */
  new PureCounter();


  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  // Animasi pada fungsi gulir dan init
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

function toggleSearch() {
  var searchBar = document.getElementById("searchBar");
  var searchIcon = document.getElementById("search-icon");
  var closeIcon = document.getElementById("close-icon");
  var searchInput = document.querySelector(".search-input");
  var placeholderText = [" Cari Motor", " Cari Motor.", " Cari Motor..", " Cari Motor...", " Cari Motor...", " Cari Motor..."];
  var currentPlaceholderIndex = 0;
  var searchIconLine = document.querySelector(".search-icon-line");

  if (searchBar.classList.contains("active")) {
    searchIcon.classList.remove("d-none");
    closeIcon.classList.add("d-none");
    searchBar.classList.remove("active");
    searchIconLine.style.width = "auto"; 
  } else {
    searchIcon.classList.add("d-none");
    closeIcon.classList.remove("d-none");
    searchBar.classList.add("active");
    searchInput.focus();

    
    var placeholderAnimationInterval = setInterval(function () {
      searchInput.placeholder = placeholderText[currentPlaceholderIndex];
      currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholderText.length;
    }, 500); 

    setTimeout(function () {
      clearInterval(placeholderAnimationInterval);
    }, 3000); 

    if (window.innerWidth <= 767) { 
      searchIconLine.style.width = "150px";
    }
  }
}


// Akhir Sampai Sini

// Sistem Swiper
var swiper = new Swiper(".mySwiper", {
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
  loop: true,
  autoplay: {
    delay: 4500,    
    disableOnInteraction: false, 
  },
});

// Akhir Sampai Sini

// Sistem ganti warna newsletter
const newsletter = document.querySelector('.newsletter');
const icon = newsletter.querySelector('i');
const text = newsletter.querySelector('p');

// Menambahkan event listener untuk event mouseover
newsletter.addEventListener('mouseover', function() {
  // Mengubah warna teks dan icon menjadi #cdcdcd dengan animasi transisi 0.3s
  icon.style.color = `#cdcdcd`;
  icon.style.transition = `color 0.2s ease-in-out`;
  text.style.color = `#cdcdcd`;
  text.style.transition = `color 0.2s ease-in-out`;
});

// Menambahkan event listener untuk event mouseout
newsletter.addEventListener('mouseout', function() {
  // Mengembalikan warna teks dan icon ke warna semula (#9b9b9b) dengan animasi transisi 0.3s
  icon.style.color = `#9b9b9b`;
  icon.style.transition = `color 0.2s ease-in-out`;
  text.style.color = `#9b9b9b`;
  text.style.transition = `color 0.2s ease-in-out`;
});

const leftBtn = document.querySelector('.lt-button'),
  rightBtn = document.querySelector('.rt-button');
const scroller = document.querySelector('.scrollTop');
const imgs = document.getElementById('content-data');

const sliderContent = document.querySelectorAll('.content');

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['', ''];
const galleryItems = document.querySelectorAll('.gallery-item');
const dispBtn = document.getElementById('offer-btn');
const offersDiv = document.getElementById('offer-container');

// ----------------------------------------------------------------------------------------------

// side bar
$(function () {
  // info button transitions
  $('.menu').on('click', function () {
    $('.menu > i').toggleClass('fa-bars fa-close', 300);
    $('.sidebar-wrapper').toggleClass('show-sidebar', 500);
    $('body').toggleClass('push-body', 500);
  });
});

// scroll top
const scrollBreakpoint = window.innerHeight * 0.4;
const displayButton = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollBreakpoint) {
      scroller.classList.add('visible');
    } else {
      scroller.classList.remove('visible');
    }
  });
};
const scrollTopNow = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

scroller.addEventListener('click', scrollTopNow);
displayButton();

// Preloader

// document.querySelector('body').addEventListener(DO)z
let hidePreloader = () => {
  let preloader = document.getElementById('preloader');
  preloader.style.opacity = 0;
};

let webpage = document.querySelector('html');

setTimeout(() => {
  preloader.style.display = 'none';
}, 1000);
//
// circle hide
dispBtn.addEventListener('click', (e) => {
  e.preventDefault();
  offersDiv.style.display = 'none';
});

// Content Carousal change
let idx = 0;
function run() {
  idx++;
  changeContent();
}
function changeContent() {
  if (idx > sliderContent.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = sliderContent.length - 1;
  }
  if (window.innerWidth >= 1125) {
    return (imgs.style.transform = `translateX(${-idx * 1100}px)`);
  } else if (window.innerWidth < 1125 && window.innerWidth >= 851) {
    return (imgs.style.transform = `translateX(${-idx * 800}px)`);
  } else if (window.innerWidth <= 850 && window.innerWidth >= 651) {
    return (imgs.style.transform = `translateX(${-idx * 580}px)`);
  } else if (window.innerWidth <= 850) {
    return (imgs.style.transform = `translateX(${-idx * 400}px)`);
  } else {
    return console.log(window.innerWidth);
  }
}

leftBtn.addEventListener('click', () => {
  idx--;
  changeContent();
});
rightBtn.addEventListener('click', () => {
  idx++;
  changeContent();
});

// images carousal
class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Update css classes for gallery
  updateGallery() {
    this.carouselArray.forEach((el) => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {
    if (direction.className == 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }

    this.updateGallery();
  }

  // Construct the carousel controls
  setControls() {
    this.carouselControls.forEach((control) => {
      galleryControlsContainer.appendChild(
        document.createElement('button')
      ).className = `gallery-controls-${control}`;

      document.querySelector(`.gallery-controls-${control}`).innerText =
        control;
    });
  }

  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    // const triggers = [...galleryControlsContainer.childNodes];
    const triggers = [leftBtn, rightBtn];

    triggers.forEach((control) => {
      control.addEventListener('click', (e) => {
        e.preventDefault();

        if (control.className == 'gallery-controls-add') {
          const latestIndex =
            this.carouselArray.findIndex(
              (item) =>
                item.getAttribute('data-index') == this.carouselArray.length
            ) + 1;

          // Then add it to the carouselArray and update the gallery
          this.carouselArray.splice(latestIndex, 0, newItem);
          document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
          this.updateGallery();
        } else {
          this.setCurrentState(control);
        }
      });
    });
  }
}

const exampleCarousel = new Carousel(
  galleryContainer,
  galleryItems,
  galleryControls
);

exampleCarousel.setControls();
exampleCarousel.useControls();

//

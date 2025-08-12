//  <script>
    // Declare Swiper to avoid TypeScript error
   // declare const Swiper: any;

    // Wait for Swiper to load before initializing
    function initSwiper() {
      if (typeof Swiper === 'undefined') {
        console.error('Swiper is not loaded. Retrying in 100ms...');
        setTimeout(initSwiper, 100);
        return;
      }

      const swiper = new Swiper('.swiper', {
        loop: false, // Enable continuous loop
        // autoplay: {
        //   delay: 5000, // Auto-slide every 5 seconds
        //   disableOnInteraction: false,
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

      // Click handler for left/right navigation
      const swiperContainer = document.querySelector('.swiper');
      swiperContainer.addEventListener('click', (event) => {
        const rect = swiperContainer.getBoundingClientRect();
        const clickX = event.clientX - rect.left; // X position relative to container
        const halfWidth = rect.width / 2;

        if (clickX > halfWidth) {
          swiper.slideNext(); // Click right side -> next slide
        } else {
          swiper.slidePrev(); // Click left side -> previous slide
        }
      });
      // Keyboard navigation for left/right arrow keys and F key
      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
          swiper.slideNext(); // Right arrow -> next slide
        } else if (event.key === 'ArrowLeft') {
          swiper.slidePrev(); // Left arrow -> previous slide
        } else if (event.key === 'f' || event.key === 'F') {
          const fullscreenButton = document.querySelector('#fullscreenToggle');
          const swiperElement = document.querySelector('.swiper');
          if (!document.fullscreenElement) {
            swiperElement.requestFullscreen().then(() => {
              fullscreenButton.textContent = 'Exit Fullscreen';
            }).catch(err => {
              console.error('Error entering fullscreen:', err);
            });
          } else {
            document.exitFullscreen().then(() => {
              fullscreenButton.textContent = 'Enter Fullscreen';
            }).catch(err => {
              console.error('Error exiting fullscreen:', err);
            });
          }
        }
      });
      // Fullscreen toggle functionality
      const fullscreenButton = document.querySelector('#fullscreenToggle');
      const swiperElement = document.querySelector('.swiper');
      fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          swiperElement.requestFullscreen().then(() => {
            fullscreenButton.textContent = 'Thu nhỏ';
          }).catch(err => {
            console.error('Error entering fullscreen:', err);
          });
        } else {
          document.exitFullscreen().then(() => {
            fullscreenButton.textContent = 'Phóng to';
          }).catch(err => {
            console.error('Error exiting fullscreen:', err);
          });
        }
      });

      // Update button text when fullscreen state changes
      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
          fullscreenButton.textContent = 'Phóng to';
        } else {
          fullscreenButton.textContent = 'Thu nhỏ';
        }
      });
    }

    // Start initialization after DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      initSwiper();
    });
  //</script>
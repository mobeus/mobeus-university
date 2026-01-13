// Scrollbar visibility controller
class ScrollbarController {
  private scrollTimeout: NodeJS.Timeout | null = null;
  private isScrolling = false;

  constructor() {
    this.initScrollHandler();
  }

  private initScrollHandler() {
    // Show scrollbar when scrolling starts
    const handleScrollStart = () => {
      if (!this.isScrolling) {
        document.body.classList.add('scrolling');
        this.isScrolling = true;
      }
      
      // Clear existing timeout
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      // Hide scrollbar after 2 seconds of no scrolling
      this.scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
        this.isScrolling = false;
      }, 2000);
    };

    // Show scrollbar on mouse movement
    const handleMouseMove = () => {
      document.body.classList.add('scrolling');
      
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      this.scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 2000);
    };

    // Add event listeners
    window.addEventListener('scroll', handleScrollStart, { passive: true });
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Show scrollbar initially, then fade out
    setTimeout(() => {
      document.body.classList.add('scrolling');
      setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 1000);
    }, 100);
  }
}

// Initialize scrollbar controller
export const scrollbarController = new ScrollbarController();
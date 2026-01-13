/**
 * Accessibility Utilities for WCAG 2.1 AA Compliance
 */

// Focus trap for modals and dialogs
export const createFocusTrap = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }

    if (e.key === 'Escape') {
      const closeButton = element.querySelector<HTMLButtonElement>('[data-close]');
      closeButton?.click();
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  firstElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

// Announce content changes to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Generate unique IDs for ARIA relationships
let idCounter = 0;
export const generateId = (prefix = 'accessible'): string => {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
};

// Skip to main content link
export const addSkipLink = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded';
  
  document.body.insertBefore(skipLink, document.body.firstChild);
};

// Keyboard navigation helper
export const handleArrowKeyNavigation = (
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  onNavigate: (newIndex: number) => void
) => {
  let newIndex = currentIndex;

  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault();
      newIndex = (currentIndex + 1) % items.length;
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault();
      newIndex = (currentIndex - 1 + items.length) % items.length;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = items.length - 1;
      break;
    default:
      return;
  }

  onNavigate(newIndex);
  items[newIndex]?.focus();
};

// Check if element is visible to screen readers
export const isVisibleToScreenReaders = (element: HTMLElement): boolean => {
  return (
    !element.hasAttribute('aria-hidden') &&
    element.getAttribute('aria-hidden') !== 'true' &&
    window.getComputedStyle(element).display !== 'none' &&
    window.getComputedStyle(element).visibility !== 'hidden'
  );
};

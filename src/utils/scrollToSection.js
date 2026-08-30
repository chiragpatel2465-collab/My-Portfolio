// src/utils/scrollToSection.js
export const scrollToSection = (elementRef, e) => {
  if (e) e.preventDefault();
  if (elementRef?.current) {
    const y = elementRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

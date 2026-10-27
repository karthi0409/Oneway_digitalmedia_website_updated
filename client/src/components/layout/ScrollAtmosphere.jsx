import React, { useEffect, useRef } from 'react';

const SECTION_SELECTOR = 'section, article';

export default function ScrollAtmosphere({ pathname }) {
  const atmosphereRef = useRef(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    const main = document.getElementById('main-content');
    if (!atmosphere || !main) return undefined;

    const sections = Array.from(main.querySelectorAll(SECTION_SELECTOR));
    const targets = sections.length ? sections : [main];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const updateAtmosphere = () => {
      frameId = 0;
      const viewportHeight = window.innerHeight;
      const bandTop = viewportHeight * 0.24;
      const bandBottom = viewportHeight * 0.76;
      let activeIndex = 0;
      let largestVisibleArea = 0;

      targets.forEach((target, index) => {
        const bounds = target.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(bounds.bottom, bandBottom) - Math.max(bounds.top, bandTop));
        if (visibleHeight > largestVisibleArea) {
          largestVisibleArea = visibleHeight;
          activeIndex = index;
        }
      });

      const activeSection = targets[activeIndex];
      const sectionClasses = activeSection.className.toString();
      const tone = /section-light|theme-light|light-theme|marketing-bundles|marketing-channels-section/.test(sectionClasses)
        ? 'light'
        : /section-navy|section-dark|hero-section|cta-banner/.test(sectionClasses)
          ? 'dark'
          : 'neutral';

      atmosphere.dataset.scene = String(activeIndex % 4);
      atmosphere.dataset.tone = tone;
      atmosphere.dataset.reducedMotion = String(reducedMotion.matches);

      if (!reducedMotion.matches) {
        atmosphere.style.setProperty('--scroll-parallax', `${Math.min(window.scrollY * -0.035, 0)}px`);
      } else {
        atmosphere.style.removeProperty('--scroll-parallax');
      }
    };

    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateAtmosphere);
    };

    updateAtmosphere();

    if (!reducedMotion.matches) {
      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate);
    }

    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        window.removeEventListener('scroll', scheduleUpdate);
        window.removeEventListener('resize', scheduleUpdate);
      } else {
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
      }
      scheduleUpdate();
    };

    reducedMotion.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  return (
    <div ref={atmosphereRef} className="scroll-atmosphere" aria-hidden="true">
      <span className="scroll-atmosphere-ribbon" />
    </div>
  );
}

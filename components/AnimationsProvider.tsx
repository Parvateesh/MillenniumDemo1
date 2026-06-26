'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { confettiBurst } from '@/lib/confetti';

export default function AnimationsProvider() {
  const pathname = usePathname();

  const logoClicks = useRef(0);
  const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorMounted = useRef(false);

  // Cursor glow — mount once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    if (cursorMounted.current) return;
    cursorMounted.current = true;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let rafId: number | null = null;
    const onMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        rafId = null;
      });
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-nav], .exp-card, .price-card')) {
        glow.classList.add('cursor-hover');
      } else {
        glow.classList.remove('cursor-hover');
      }
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      glow.remove();
    };
  }, []);



  // Per-route effects: scroll animations, count-up, pins, confetti, logo easter egg
  useEffect(() => {
    // Page enter animation
    const main = document.querySelector('main');
    if (main) {
      main.classList.remove('page-enter');
      void (main as HTMLElement).offsetWidth;
      main.classList.add('page-enter');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Scroll animations
    let observer: IntersectionObserver | null = null;
    function initScrollAnimations() {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in-view');
              observer!.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll('[data-animate]').forEach((el) => {
        el.classList.remove('in-view');
        observer!.observe(el);
      });
    }
    initScrollAnimations();

    // Count-up
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      delete el.dataset.counted;
      const target = parseFloat(el.dataset.count!);
      const isFloat = el.dataset.count!.includes('.');
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1400;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });

    // Pin strike easter egg
    function onPinClick(e: MouseEvent) {
      const pin = (e.target as Element).closest('.pin') as HTMLElement | null;
      if (!pin || pin.classList.contains('struck')) return;
      pin.classList.add('struck');

      const flash = document.createElement('div');
      flash.className = 'strike-flash';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 700);

      const rect = pin.getBoundingClientRect();
      const popup = document.createElement('div');
      popup.className = 'strike-popup';
      popup.textContent = '🎳 STRIKE!';
      popup.style.left = (rect.left + rect.width / 2) + 'px';
      popup.style.top = (rect.top + window.scrollY - 20) + 'px';
      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 1300);



      confettiBurst(e.clientX, e.clientY, 24);

      setTimeout(() => {
        pin.classList.remove('struck');
        pin.style.opacity = '0.18';
        pin.style.animationPlayState = 'running';
      }, 600);
    }
    document.addEventListener('click', onPinClick);

    // Confetti on [data-confetti] buttons
    function onConfettiClick(e: MouseEvent) {
      const btn = (e.target as Element).closest('[data-confetti]');
      if (btn) confettiBurst(e.clientX, e.clientY, 55);
    }
    document.addEventListener('click', onConfettiClick);

    // Logo triple-click pin rain
    function onLogoClick(e: MouseEvent) {
      if (!(e.target as Element).closest('.logo')) return;
      logoClicks.current++;
      if (logoTimer.current) clearTimeout(logoTimer.current);
      logoTimer.current = setTimeout(() => { logoClicks.current = 0; }, 600);
      if (logoClicks.current >= 3) {
        logoClicks.current = 0;
        triggerPinRain();
      }
    }
    document.addEventListener('click', onLogoClick);

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener('click', onPinClick);
      document.removeEventListener('click', onConfettiClick);
      document.removeEventListener('click', onLogoClick);
    };
  }, [pathname]);

  return null;
}

function triggerPinRain() {
  let rain = document.getElementById('pin-rain');
  if (!rain) {
    rain = document.createElement('div');
    rain.id = 'pin-rain';
    document.body.appendChild(rain);
  }
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const pin = document.createElement('div');
      pin.className = 'rain-pin';
      pin.textContent = '🎳';
      pin.style.left = Math.random() * 100 + 'vw';
      pin.style.animationDuration = 1.2 + Math.random() * 1.5 + 's';
      pin.style.fontSize = 1.5 + Math.random() * 2 + 'rem';
      rain!.appendChild(pin);
      setTimeout(() => pin.remove(), 3000);
    }, i * 80);
  }
}

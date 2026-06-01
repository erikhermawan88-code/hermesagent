---
name: gsap-animation
description: "GSAP animation patterns: scroll-triggered animations, parallax, staggered reveals, and advanced motion"
tags: [gsap, animation, scroll, parallax, motion]
version: 1.0.0
created: 2026-05-27
---

# GSAP Animation Patterns

## Core Setup

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

## Basic Scroll Animation

```javascript
gsap.to(".hero-title", {
  y: -100,
  opacity: 0,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
});
```

## Staggered Reveal

```javascript
gsap.from(".card", {
  y: 100,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".card-grid",
    start: "top 80%",
  },
});
```

## Parallax Effect

```javascript
gsap.to(".parallax-bg", {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-container",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

## Text Reveal Animation

```javascript
gsap.from(".reveal-text", {
  y: "100%",
  duration: 1.2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".reveal-text",
    start: "top 85%",
  },
});
```

## Horizontal Scroll Section

```javascript
gsap.to(".horizontal-track", {
  x: () => -(document.querySelector(".horizontal-track").scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-section",
    start: "top top",
    end: () => "+=" + document.querySelector(".horizontal-track").scrollWidth,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  },
});
```

## Magnetic Button Effect

```javascript
document.querySelectorAll(".magnetic-btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  });
  
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  });
});
```

## Scroll-Triggered Counter

```javascript
gsap.to(".counter", {
  textContent: 10000,
  duration: 2,
  snap: { textContent: 1 },
  scrollTrigger: {
    trigger: ".counter",
    start: "top 80%",
  },
  onUpdate: function () {
    document.querySelector(".counter").textContent = Math.round(this.targets()[0].textContent).toLocaleString();
  },
});
```

## Performance Tips

1. **Use `will-change`**: `gsap.set(element, { willChange: 'transform' })`
2. **Avoid animating layout properties**: Use `transform` and `opacity`
3. **Kill ScrollTrigger** when component unmounts: `ScrollTrigger.getAll().forEach(t => t.kill())`
4. **Use `scrub: 1`** for smooth 1-second lag
5. **Batch animations** with `gsap.timeline()` for sequencing

## Easing Reference

```javascript
// Common easings
"power1.out"     // Smooth deceleration
"power2.out"     // Standard
"power3.out"     // Quick
"power4.out"     // Bouncy
"elastic.out(1, 0.5)" // Spring
"back.out(1.7)"  // Overshoot
"expo.out"       // Fast start, smooth end
"circ.out"       // Smooth geometric
```
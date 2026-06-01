# Wibify-Inspired Editorial Design — NeuralFlow

Live: `https://digitalnusa.com/neuralflow/public/`

## Design DNA
Reference: Wibify agency (wibify.agency/en) — editorial agency style.
Distinct from Wibify: teal/navy/gold palette, fullscreen hero slider, Indonesian content.

## Fullscreen Hero Slider
Three slides, each with Unsplash image + dark gradient overlay + white text.

### Slide Images (Unsplash)
```
Slide 1: https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80
         (AI/neural network abstract)
Slide 2: https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80
         (robot/AI tech)
Slide 3: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80
         (data analytics dashboard)
```

### Slide Content
| # | Eyebrow | Headline | Sub |
|---|---------|----------|-----|
| 01 | AI Automation Agency — Open for Projects | Otomasi bisnis dengan *AI Cerdas* | Kami bangun AI workflow... |
| 02 | AI Chatbot Development | Chatbot yang *nggak pernah tidur* | AI chatbot handle customer 24/7... |
| 03 | Analytics & Intelligence | Data jadi *insight*, bukan noise | Dashboard analytics... |

### CSS Structure
```css
.hero-slider { position: relative; width: 100%; height: 100vh; overflow: hidden; background: var(--navy); }
.hero-slides { position: relative; width: 100%; height: 100%; }
.hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 0.8s ease; z-index: 1; }
.hero-slide.active { opacity: 1; z-index: 2; }
.hero-slide img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.45) saturate(0.8); }
.hero-slide-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(12,26,46,0.75) 0%, rgba(12,115,119,0.25) 60%, rgba(12,26,46,0.6) 100%);
}
.hero-slide-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; padding: 120px 48px 80px; z-index: 3; }
.hero-bottom { position: absolute; bottom: 0; left: 0; right: 0; display: flex; align-items: flex-end; justify-content: space-between; padding: 32px 48px; z-index: 4; border-top: 1px solid rgba(255,255,255,0.1); }
```

### Slider JS
```javascript
(function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const counter = document.getElementById('slideCurrent');
    let current = 0;
    let autoplayTimer = null;
    const TOTAL = slides.length;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + TOTAL) % TOTAL;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        counter.textContent = String(current + 1).padStart(2, '0');
    }
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => goTo(current + 1), 5000);
    }
    function stopAutoplay() {
        if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }
    dots.forEach(dot => {
        dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.goto)); startAutoplay(); });
    });
    prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });
    const sliderEl = document.getElementById('hero');
    sliderEl.addEventListener('mouseenter', stopAutoplay);
    sliderEl.addEventListener('mouseleave', startAutoplay);
    startAutoplay();
})();
```

### Dots CSS
```css
.slider-dots { position: absolute; bottom: 48px; right: 48px; display: flex; gap: 10px; z-index: 5; }
.slider-dot { width: 32px; height: 3px; background: rgba(255,255,255,0.25); cursor: pointer; transition: all 250ms; border: none; }
.slider-dot.active { background: var(--teal-light); width: 48px; }
```

## Color Palette
- `--bg: #F7F6F2` (warm off-white)
- `--navy: #0C1A2E`
- `--teal: #0D7377`
- `--teal-light: #14919B`
- `--gold: #D4A853`

## Fonts
- Headings: Syne (400–800 weight)
- Body: Epilogue (400–700 weight)

## Key CSS Tokens
```css
:root {
    --bg: #F7F6F2; --surface: #FFFFFF; --primary: #0A0A0A;
    --navy: #0C1A2E; --teal: #0D7377; --teal-light: #14919B; --gold: #D4A853;
    --text: #0A0A0A; --text-2: #6B6B6B; --text-3: #A0A0A0; --border: #E0DED8;
    --shadow: 0 4px 24px rgba(0,0,0,0.06); --shadow-lg: 0 12px 48px rgba(0,0,0,0.10);
    --radius: 2px;
    --duration-fast: 150ms; --duration-normal: 250ms; --duration-slow: 400ms;
    --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

## Section Number Pattern
```html
<div class="section-num">02 — Services</div>
<h2 class="section-title">AI services untuk <span class="em">bisnis Anda</span></h2>
```
`.section-num` = Syne 0.7rem, teal, letter-spacing 0.1em, with `::before` line.
`.em` = teal italic for word emphasis in headings.

## Marquee Ticker
```html
<div class="marquee-section" style="background: var(--navy);">
    <div class="marquee-track" style="animation: marquee 30s linear infinite;">
        <span class="marquee-item">AI Chatbot Development ◆ </span>
        ...
    </div>
</div>
```
Separators: `◆` (diamond) as `::after` pseudo-element on each item.

## Stats Strip
Navy background, 4 columns, bottom-border hover underline animation:
```css
.stat-item::after { content: ''; position: absolute; bottom: 0; left: 40px; right: 40px; height: 2px; background: var(--teal); transform: scaleX(0); transition: transform 400ms ease; }
.stat-item:hover::after { transform: scaleX(1); }
```

## Process Cards
Ghost large numbers (opacity 0.12):
```css
.pc-num { font-family: 'Syne', sans-serif; font-size: 4rem; font-weight: 800; color: var(--teal); opacity: 0.12; }
```

## FAQ Accordion
Plus → minus via CSS `::after` rotate on open:
```css
.faq-icon::after { width: 1.5px; height: 16px; left: 50%; top: 0; transform: translateX(-50%); transition: transform 250ms; }
.faq-item.open .faq-icon::after { transform: translateX(-50%) rotate(90deg); }
```

## CTA Section
Teal background, oversized background text:
```css
.cta-section::before { content: 'FLOW'; font-family: 'Syne', sans-serif; font-size: clamp(12rem, 25vw, 22rem); font-weight: 800; color: rgba(0,0,0,0.04); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; letter-spacing: -0.05em; white-space: nowrap; }
```

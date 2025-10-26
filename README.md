# Market Robotics Learning for Kids – Course Website Project

From my understanding, this site markets robotics learning for kids (ages 8–14). I built four+ pages with a consistent layout, three JavaScript interactions, a five-image slideshow, and an accessible registration form.

## Live site
- **GitHub Pages:** https://deuelhunte.github.io/MarketRoboticsSite/index.html

## Pages
- `index.html` — Home with hero and **5-image carousel** (Prev/Next/Pause + keyboard)
- `programs.html` — Programs with **age filter** and **FAQ accordion**
- `resources.html` — Articles/downloads and helpful links
- `register.html` — **Form** (≥5 required fields) with client-side validation (Formspree action)
- `success.html` — Local success/confirmation page (optional redirect target)

## How to test
1. **Responsive**: shrink below ~700px; layout stacks header → nav → main → aside → footer.
2. **Accessibility**: image alt text; SVG has `<title>` + `<desc>`; keyboard focus visible; labeled inputs.
3. **JavaScript**:
   - Carousel (5 images) with Prev/Next + Pause/Play; Space toggles pause; arrows change slides.
   - Programs **filter** updates visible cards; results count updates.
   - **FAQ accordion** allows only one open section at a time.
4. **Form**:
   - Required: Parent Name, Email, Child Age, Program, Consent.
   - Client validation blocks invalid/empty input.
   - Submits via `https://formspree.io/f/myzkjveq` (HTTPS). You can set `_redirect` to `success.html`.

## Tech
- HTML5, CSS (responsive grid + media queries), vanilla JS
- Static hosting via GitHub Pages

## Notes
From my understanding, scope excludes user accounts/e-commerce. Images are for educational use.

(function () {
  var hero = document.querySelector(".home-first-screen .hero");
  var el = document.getElementById("hero-dvd-subtitle");
  if (!hero || !el || !el.classList.contains("hero__subtitle--dvd")) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.classList.add("is-static");
    el.style.left = "";
    el.style.top = "";
    return;
  }

  function freezeStatic() {
    el.classList.add("is-static");
    el.style.left = "";
    el.style.top = "";
  }

  var speed = 0.9;
  var angle = Math.random() * Math.PI * 2;
  var vx = Math.cos(angle) * speed;
  var vy = Math.sin(angle) * speed;

  var x = 0;
  var y = 0;
  var w = 0;
  var h = 0;
  var hw = 0;
  var hh = 0;

  function measure() {
    w = hero.clientWidth;
    h = hero.clientHeight;
    hw = el.offsetWidth;
    hh = el.offsetHeight;
  }

  function clamp() {
    if (w < hw || h < hh) return false;
    x = Math.max(0, Math.min(x, w - hw));
    y = Math.max(0, Math.min(y, h - hh));
    return true;
  }

  function placeRandom() {
    measure();
    if (w < hw || h < hh) {
      freezeStatic();
      return false;
    }
    x = Math.random() * (w - hw);
    y = Math.random() * (h - hh);
    el.style.left = x + "px";
    el.style.top = y + "px";
    return true;
  }

  if (!placeRandom()) return;

  var ro = new ResizeObserver(function () {
    measure();
    if (w < hw || h < hh) {
      freezeStatic();
      return;
    }
    clamp();
    el.style.left = x + "px";
    el.style.top = y + "px";
  });
  ro.observe(hero);
  ro.observe(el);

  function tick() {
    if (el.classList.contains("is-static")) return;

    measure();
    if (w < hw || h < hh) {
      freezeStatic();
      return;
    }

    x += vx;
    y += vy;

    if (x <= 0) {
      x = 0;
      vx = Math.abs(vx);
    } else if (x + hw >= w) {
      x = w - hw;
      vx = -Math.abs(vx);
    }

    if (y <= 0) {
      y = 0;
      vy = Math.abs(vy);
    } else if (y + hh >= h) {
      y = h - hh;
      vy = -Math.abs(vy);
    }

    el.style.left = x + "px";
    el.style.top = y + "px";
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

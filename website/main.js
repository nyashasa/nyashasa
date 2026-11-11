(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  function motionOK() { return !reduceMotion.matches; }

  /* Motion (vendor/motion-14.6.0.js) gives spring reveals and scroll-linked movement */
  var M = window.Motion;
  var useMotion = !!(M && M.animate && M.inView && M.scroll) && motionOK();

  /* Each feature runs on its own, so one failing cannot stop the rest */
  function safe(fn) {
    try { fn(); } catch (e) { if (window.console) console.error(e); }
  }

  function each(selector, fn, scope) {
    Array.prototype.forEach.call((scope || document).querySelectorAll(selector), fn);
  }

  /* Keep the motion class in step with the visitor's setting */
  function syncMotion() { root.classList.toggle("motion", motionOK()); }
  syncMotion();
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", syncMotion);

  /* Reveals: springs through Motion where available, CSS transitions otherwise */
  safe(function () {
    each("[data-stagger]", function (group) {
      var i = 0;
      Array.prototype.forEach.call(group.children, function (child) {
        if (child.hasAttribute("data-reveal")) {
          child.setAttribute("data-delay", String(i * 0.08));
          child.style.setProperty("--d", (i * 90) + "ms");
          i++;
        }
      });
    });

    var targets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

    function markIn(el) {
      el.classList.add("is-in");
      if (el.classList.contains("stat")) countUp(el);
    }

    if (useMotion) {
      root.classList.add("m-ready");
      targets.forEach(function (el) {
        var done = false;
        var stop = M.inView(el, function () {
          if (done) return;
          done = true;
          if (stop) stop();
          var delay = parseFloat(el.getAttribute("data-delay") || "0");
          markIn(el);
          M.animate(el, { opacity: [0, 1] }, { duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] });
          if (!(el instanceof SVGElement)) {
            M.animate(el, { y: [40, 0] }, { type: "spring", stiffness: 70, damping: 18, mass: 1, delay: delay });
          }
        }, { margin: "0px 0px -10% 0px", amount: 0.05 });
      });
    } else if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            markIn(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.01 });
      targets.forEach(function (el) { io.observe(el); });
    } else {
      targets.forEach(markIn);
    }
    window.__revealReady = true;
  });

  /* Scroll-linked movement, in the manner of America.gov: the hero recedes as you
     leave it, product screens drift against the page, the statement brightens word
     by word, the Hello panel opens out as it arrives and the contact glow swells as
     the page ends. */
  safe(function () {
    if (!useMotion) return;
    var hero = document.querySelector(".hero");
    var heroOut = { target: hero, offset: ["start start", "end start"] };
    var linear = { ease: "linear" };

    var title = document.querySelector(".hero-title-wrap");
    if (hero && title) M.scroll(M.animate(title, { y: [0, -80], opacity: [1, 0.1] }, linear), heroOut);
    var portrait = document.querySelector(".portrait-move");
    if (hero && portrait) M.scroll(M.animate(portrait, { y: [0, 90], scale: [1, 0.84] }, linear), heroOut);
    var heroBg = document.querySelector(".hero-bg");
    if (hero && heroBg) M.scroll(M.animate(heroBg, { y: [0, 240] }, linear), heroOut);

    each("[data-parallax]", function (el) {
      var box = el.closest(".case") || el;
      M.scroll(M.animate(el, { y: [48, -48] }, linear), { target: box, offset: ["start end", "end start"] });
    });

    var hello = document.querySelector("[data-hello]");
    if (hello) {
      M.scroll(M.animate(hello, { scale: [0.88, 1], borderRadius: ["64px", "28px"] }, linear), { target: hello, offset: ["start end", "start 0.35"] });
      var helloWord = hello.querySelector(".hello-bg");
      if (helloWord) M.scroll(M.animate(helloWord, { x: [90, -90] }, linear), { target: hello, offset: ["start end", "end start"] });
    }

    var glow = document.querySelector(".contact-glow");
    var contact = document.getElementById("contact");
    if (glow && contact) M.scroll(M.animate(glow, { scale: [0.6, 1.15], opacity: [0.3, 1] }, linear), { target: contact, offset: ["start end", "end end"] });

    var statement = document.querySelector("[data-scrub]");
    if (statement) {
      var words = splitWords(statement);
      var n = words.length;
      var last = [];
      M.scroll(function (progress) {
        var t = progress * (n + 8);
        for (var i = 0; i < n; i++) {
          var o = Math.round((0.16 + 0.84 * Math.min(Math.max((t - i) / 8, 0), 1)) * 100) / 100;
          if (last[i] !== o) {
            words[i].style.opacity = String(o);
            last[i] = o;
          }
        }
      }, { target: statement, offset: ["start 0.92", "end 0.55"] });
    }
  });

  /* Wrap each word of an element in a span, keeping inner elements such as .muted */
  function splitWords(el) {
    var out = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var parts = node.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            var span = document.createElement("span");
            span.className = "w";
            span.textContent = part;
            frag.appendChild(span);
            out.push(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        out = out.concat(splitWords(node));
      }
    });
    return out;
  }

  /* Count the stats up from zero the first time they appear */
  function countUp(stat) {
    var el = stat.querySelector(".count");
    if (!el || !motionOK()) return;
    var to = parseFloat(el.getAttribute("data-to")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var start = null;
    el.style.display = "inline-block";
    el.style.minWidth = el.getBoundingClientRect().width + "px";

    function format(n) { return Math.round(n).toLocaleString("en-US") + suffix; }
    function tick(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      el.textContent = format(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(tick);
    }
    el.textContent = format(0);
    requestAnimationFrame(tick);
  }

  /* Theme toggle: follows the system until the visitor picks a theme. Where the browser
     supports view transitions, the new theme opens as a circle from the button. */
  safe(function () {
    var themeToggle = document.getElementById("theme-toggle");
    var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (!themeToggle) return;

    function currentTheme() {
      var set = root.getAttribute("data-theme");
      if (set === "light" || set === "dark") return set;
      return darkQuery.matches ? "dark" : "light";
    }

    function updateThemeLabel() {
      var next = currentTheme() === "dark" ? "light" : "dark";
      themeToggle.setAttribute("aria-label", "Switch to " + next + " theme");
      themeToggle.title = "Switch to " + next + " theme";
    }

    function applyTheme(next) {
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      updateThemeLabel();
    }

    themeToggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      if (!document.startViewTransition || !motionOK()) {
        applyTheme(next);
        return;
      }
      var rect = themeToggle.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      var radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      var transition = document.startViewTransition(function () { applyTheme(next); });
      transition.ready.then(function () {
        root.animate(
          { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + radius + "px at " + x + "px " + y + "px)"] },
          { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      }).catch(function () {});
    });

    if (darkQuery.addEventListener) darkQuery.addEventListener("change", updateThemeLabel);
    new MutationObserver(updateThemeLabel).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    updateThemeLabel();
  });

  /* Mobile menu */
  safe(function () {
    var menuButton = document.getElementById("menu-toggle");
    var navLinks = document.getElementById("nav-links");
    if (!menuButton || !navLinks) return;

    function setMenu(open) {
      navLinks.classList.toggle("is-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    menuButton.addEventListener("click", function () {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuButton.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".bar")) setMenu(false);
    });
  });

  /* Section highlight in the nav, with a pill that slides to the current section */
  safe(function () {
    var nav = document.querySelector(".nav");
    var pill = document.querySelector(".nav-pill");
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    if (!nav || !links.length || !("IntersectionObserver" in window)) return;

    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var active = null;

    function movePill() {
      if (!pill) return;
      var rect = active ? active.getBoundingClientRect() : null;
      if (!rect || rect.width === 0 || window.getComputedStyle(pill).display === "none") {
        nav.classList.remove("has-active");
        return;
      }
      var navRect = nav.getBoundingClientRect();
      pill.style.setProperty("--pill-x", (rect.left - navRect.left) + "px");
      pill.style.setProperty("--pill-w", rect.width + "px");
      nav.classList.add("has-active");
    }

    function setActive(a) {
      if (active === a) return;
      if (active) {
        active.classList.remove("is-active");
        active.removeAttribute("aria-current");
      }
      active = a;
      if (a) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "true");
      }
      movePill();
    }

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = byId[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) setActive(a);
        else if (active === a) setActive(null);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
    window.addEventListener("resize", movePill);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);
  });

  /* Scroll progress, header shadow and the back-to-top button */
  safe(function () {
    var header = document.querySelector(".site-header");
    var fab = document.querySelector(".fab-top");
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset || 0;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var progress = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
      root.style.setProperty("--scroll", progress.toFixed(4));
      if (header) header.classList.toggle("is-scrolled", y > 24);
      if (fab) {
        var show = y > window.innerHeight * 0.9;
        if (show !== fab.classList.contains("is-shown")) {
          fab.classList.toggle("is-shown", show);
          if (show) fab.removeAttribute("aria-hidden");
          else fab.setAttribute("aria-hidden", "true");
        }
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  });

  /* Logo strip: duplicate the logos once so the strip can loop without a seam */
  safe(function () {
    var marquee = document.querySelector(".marquee");
    var track = marquee && marquee.querySelector(".marquee-track");
    if (!track || !motionOK()) return;

    Array.prototype.slice.call(track.children).forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      each("[role], [aria-label]", function (node) {
        node.removeAttribute("role");
        node.removeAttribute("aria-label");
      }, clone);
      track.appendChild(clone);
    });
    track.classList.add("is-looping");
    marquee.classList.add("is-looping");

    function setSpeed() {
      var half = track.scrollWidth / 2;
      track.style.setProperty("--marquee-dur", Math.max(18, half / 45).toFixed(1) + "s");
    }
    setSpeed();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setSpeed);
  });

  /* Pointer effects: a gentle portrait tilt and magnetic buttons */
  safe(function () {
    if (!finePointer.matches || !motionOK()) return;

    var portrait = document.querySelector("[data-tilt]");
    var card = portrait && portrait.querySelector(".portrait-card");
    if (portrait && card) {
      var frame = 0;
      portrait.addEventListener("pointermove", function (event) {
        var r = portrait.getBoundingClientRect();
        var px = (event.clientX - r.left) / r.width;
        var py = (event.clientY - r.top) / r.height;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(function () {
          portrait.classList.add("is-tilting");
          card.style.setProperty("--rx", ((0.5 - py) * 10).toFixed(2) + "deg");
          card.style.setProperty("--ry", ((px - 0.5) * 12).toFixed(2) + "deg");
          portrait.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
          portrait.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
        });
      });
      portrait.addEventListener("pointerleave", function () {
        cancelAnimationFrame(frame);
        portrait.classList.remove("is-tilting");
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    }

    each("[data-magnetic]", function (el) {
      el.addEventListener("pointermove", function (event) {
        var r = el.getBoundingClientRect();
        var dx = event.clientX - (r.left + r.width / 2);
        var dy = event.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + (dx * 0.18).toFixed(1) + "px, " + (dy * 0.3).toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  });

  /* Copy email */
  safe(function () {
    var copyButton = document.getElementById("copy-email");
    var copyStatus = document.getElementById("copy-status");
    var statusTimer;
    if (!copyButton) return;

    function showStatus(message) {
      if (!copyStatus) return;
      copyStatus.textContent = message;
      clearTimeout(statusTimer);
      statusTimer = setTimeout(function () { copyStatus.textContent = ""; }, 2600);
    }

    function selectEmail() {
      var link = document.getElementById("email-link");
      if (!link || !window.getSelection) return;
      var range = document.createRange();
      range.selectNodeContents(link);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      showStatus("Selected. Press Ctrl+C or ⌘C to copy.");
    }

    copyButton.addEventListener("click", function () {
      var text = copyButton.getAttribute("data-copy");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { showStatus("Copied"); }, selectEmail);
      } else {
        selectEmail();
      }
    });
  });

  /* Footer year */
  safe(function () {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  });

  /* Hello, Zimbabwe: the greeting cycles through Shona, Ndebele and English while the
     panel is on screen */
  safe(function () {
    var panel = document.querySelector("[data-hello]");
    var wordEl = panel && panel.querySelector(".greet-word");
    if (!wordEl || !motionOK() || !("IntersectionObserver" in window)) return;
    var words = ["Mhoroi,", "Salibonani,", "Hello,"];
    var i = 0;
    var timer = null;

    function swap() {
      if (document.hidden) return;
      i = (i + 1) % words.length;
      if (!useMotion) {
        wordEl.textContent = words[i];
        return;
      }
      var h = wordEl.offsetHeight || 80;
      M.animate(wordEl, { y: [0, -h], opacity: [1, 0] }, { duration: 0.32, ease: [0.4, 0, 1, 1] }).finished.then(function () {
        wordEl.textContent = words[i];
        M.animate(wordEl, { opacity: [0, 1] }, { duration: 0.4, ease: "easeOut" });
        M.animate(wordEl, { y: [h, 0] }, { type: "spring", stiffness: 150, damping: 20 });
      });
    }

    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !timer) timer = setInterval(swap, 2600);
        else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      });
    }).observe(panel);
  });
})();

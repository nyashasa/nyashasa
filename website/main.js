(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  function motionOK() { return !reduceMotion.matches; }

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

  /* Scroll reveal, with staggered children inside [data-stagger] */
  safe(function () {
    each("[data-stagger]", function (group) {
      var i = 0;
      Array.prototype.forEach.call(group.children, function (child) {
        if (child.hasAttribute("data-reveal")) {
          child.style.setProperty("--d", (i * 90) + "ms");
          i++;
        }
      });
    });

    var targets = document.querySelectorAll("[data-reveal]");

    function reveal(el) {
      el.classList.add("is-in");
      if (el.classList.contains("stat")) countUp(el);
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.01 });
      Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
    } else {
      Array.prototype.forEach.call(targets, reveal);
    }
    window.__revealReady = true;
  });

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

  /* Scroll progress, header shadow, back-to-top button and a gentle hero parallax */
  safe(function () {
    var header = document.querySelector(".site-header");
    var fab = document.querySelector(".fab-top");
    var heroBg = document.querySelector(".hero-bg");
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
      if (heroBg && motionOK() && y < window.innerHeight * 1.5) {
        heroBg.style.setProperty("--hero-shift", (y * 0.25).toFixed(1) + "px");
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

  /* Pointer effects: portrait tilt, spotlight glow and magnetic buttons */
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
          card.style.setProperty("--rx", ((0.5 - py) * 12).toFixed(2) + "deg");
          card.style.setProperty("--ry", ((px - 0.5) * 14).toFixed(2) + "deg");
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

    each("[data-spotlight]", function (el) {
      el.addEventListener("pointermove", function (event) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (event.clientX - r.left).toFixed(0) + "px");
        el.style.setProperty("--my", (event.clientY - r.top).toFixed(0) + "px");
      });
    });

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

  /* Sample event stream in the hero */
  safe(function () {
    var list = document.getElementById("log-lines");
    if (!list) return;
    var MAX_LINES = 7;
    var INTERVAL = 2300;

    var labels = { noeva: "NOEVA", ubuntu: "UBUNTU", fooba: "FOOBA", chef: "CHEF" };
    var events = [
      ["fooba", "split", "merchant 114.00 · platform 4.20 · gateway 1.80"],
      ["noeva", "trk-2208", "codec 8E · 34 records · 0 dropped"],
      ["ubuntu", "bus-1187", "63 passengers connected"],
      ["noeva", "trk-0987", "back online · 212 buffered records synced"],
      ["chef", "payout", "cook 31 · scheduled after the event"],
      ["fooba", "recon", "GL batch · 0 breaks"],
      ["noeva", "rut-0412", "heartbeat · rssi −71 dBm · up 12d"],
      ["ubuntu", "portal", "sign-in · WhatsApp verified · consent ✓"],
      ["fooba", "ledger", "txn 91ad · debits 64.50 = credits 64.50"],
      ["noeva", "vault", "roadworthy · bus 1042 · renewed"],
      ["ubuntu", "ads", "campaign 118 · route 7 · 1,204 impressions"],
      ["chef", "booking", "lunch for 12 · cook verified ✓"]
    ];

    function pad(n) { return n < 10 ? "0" + n : String(n); }
    function stamp(date) { return pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()); }

    function span(className, text) {
      var el = document.createElement("span");
      el.className = className;
      el.textContent = text;
      return el;
    }

    function makeLine(product, entity, message, date) {
      var li = document.createElement("li");
      li.className = "log-line is-new";
      li.appendChild(span("log-time", stamp(date)));
      var tag = span("log-tag", labels[product]);
      tag.setAttribute("data-p", product);
      li.appendChild(tag);
      var msg = span("log-msg", "");
      var b = document.createElement("b");
      b.textContent = entity;
      msg.appendChild(b);
      msg.appendChild(document.createTextNode(" " + message));
      li.appendChild(msg);
      return li;
    }

    var now = Date.now();
    var existing = list.querySelectorAll(".log-time");
    for (var i = 0; i < existing.length; i++) {
      existing[i].textContent = stamp(new Date(now - (existing.length - 1 - i) * INTERVAL));
    }

    var next = 0;
    setInterval(function () {
      if (document.hidden || !motionOK()) return;
      var e = events[next % events.length];
      next++;
      list.appendChild(makeLine(e[0], e[1], e[2], new Date()));
      while (list.children.length > MAX_LINES) list.removeChild(list.firstElementChild);
    }, INTERVAL);
  });
})();

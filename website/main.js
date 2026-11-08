(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* Theme toggle: follows the system until the visitor picks a theme */
  var themeToggle = document.getElementById("theme-toggle");
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set === "light" || set === "dark") return set;
    return darkQuery.matches ? "dark" : "light";
  }

  function updateThemeLabel() {
    if (!themeToggle) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", "Switch to " + next + " theme");
    themeToggle.title = "Switch to " + next + " theme";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      updateThemeLabel();
    });
    if (darkQuery.addEventListener) darkQuery.addEventListener("change", updateThemeLabel);
    new MutationObserver(updateThemeLabel).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    updateThemeLabel();
  }

  /* Mobile menu */
  var menuButton = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");

  function setMenu(open) {
    if (!menuButton || !navLinks) return;
    navLinks.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (menuButton && navLinks) {
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
  }

  /* Copy email */
  var copyButton = document.getElementById("copy-email");
  var copyStatus = document.getElementById("copy-status");
  var statusTimer;

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

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var text = copyButton.getAttribute("data-copy");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { showStatus("Copied"); }, selectEmail);
      } else {
        selectEmail();
      }
    });
  }

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Sample event stream in the hero */
  var list = document.getElementById("log-lines");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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

  if (list) {
    var now = Date.now();
    var existing = list.querySelectorAll(".log-time");
    for (var i = 0; i < existing.length; i++) {
      existing[i].textContent = stamp(new Date(now - (existing.length - 1 - i) * INTERVAL));
    }

    var next = 0;
    setInterval(function () {
      if (document.hidden || reduceMotion.matches) return;
      var e = events[next % events.length];
      next++;
      list.appendChild(makeLine(e[0], e[1], e[2], new Date()));
      while (list.children.length > MAX_LINES) list.removeChild(list.firstElementChild);
    }, INTERVAL);
  }
})();

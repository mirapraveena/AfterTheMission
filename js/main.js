/* =====================================================================
   AFTER THE MISSION — main.js
   ---------------------------------------------------------------------
   Shared code used on EVERY page:
     1. imageUrl()        – builds the address of an image
     2. createImage()     – makes an <img> with a friendly fallback
     3. Navigation        – mobile menu + highlighting the current page
     4. Starfield         – the animated star background
     5. Small helpers     – find an explorer, status badge, etc.
     6. Homepage features – "Where they are now" list, explorer rail,
                            destination panels, "Did you know?" widget
   ===================================================================== */

/* ---------- 1. Image address ---------- */
function imageUrl(imageKey, width) {
  const image = IMAGES[imageKey];
  if (!image) return "";

  if (IMAGE_MODE === "local") {
    // Same rule as tools/download_images.py uses to name the files.
    const safeName = image.file.replace(/[^A-Za-z0-9._-]/g, "_");
    return "images/" + image.folder + "/" + safeName;
  }

  // Wikimedia Commons can resize images for us with ?width=
  return "https://commons.wikimedia.org/wiki/Special:FilePath/" +
    encodeURIComponent(image.file) + "?width=" + (width || 1200);
}

/* ---------- 2. Image element with fallback ----------
   If an image can't load (no internet, file moved), we replace it with a
   styled panel that shows the description instead of a broken icon. */
function createImage(imageKey, width, className) {
  const image = IMAGES[imageKey];
  const img = document.createElement("img");
  img.src = imageUrl(imageKey, width);
  img.alt = image ? image.alt : "";
  img.loading = "lazy";
  img.decoding = "async";
  if (className) img.className = className;
  img.addEventListener("error", function () {
    showImageFallback(img);
  });
  return img;
}

function showImageFallback(img) {
  const fallback = document.createElement("div");
  fallback.className = "img-fallback " + img.className;
  fallback.setAttribute("role", "img");
  fallback.setAttribute("aria-label", img.alt);
  fallback.innerHTML = "<span>" + img.alt + "</span>";
  img.replaceWith(fallback);
}

/* Images written directly in the HTML use data-image="key".
   This fills them in when the page loads. */
function fillStaticImages() {
  document.querySelectorAll("[data-image]").forEach(function (holder) {
    const key = holder.dataset.image;
    const width = Number(holder.dataset.width) || 1400;
    if (holder.dataset.background !== undefined) {
      // Used as a CSS background (e.g. hero sections)
      holder.style.backgroundImage = "url('" + imageUrl(key, width) + "')";
    } else {
      holder.appendChild(createImage(key, width, holder.dataset.class || ""));
    }
  });
}

/* ---------- 3. Navigation ---------- */
function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Highlight the link for the page we are on.
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.dataset.page === page) link.setAttribute("aria-current", "page");
  });

  // Add a soft background to the nav once the user scrolls.
  const nav = document.querySelector(".site-nav");
  window.addEventListener("scroll", function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* ---------- 4. Starfield background ----------
   Draws small dots on a <canvas>. A few of them gently twinkle.
   Animation is switched off for people who prefer reduced motion. */
function setupStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];

  function makeStars() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    const count = Math.floor((window.innerWidth * window.innerHeight) / 5000);
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: (Math.random() * 1.1 + 0.2) * window.devicePixelRatio,
        brightness: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.015 + 0.003,
        phase: Math.random() * Math.PI * 2,
        tint: Math.random() < 0.15 ? "170,190,255" : "255,255,255"
      });
    }
  }

  function draw(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(function (star) {
      const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(star.phase + time * star.speed * 0.06);
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(" + star.tint + "," + (star.brightness * twinkle) + ")";
      context.fill();
    });
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  makeStars();
  draw(0);
  window.addEventListener("resize", function () {
    makeStars();
    if (reduceMotion) draw(0);
  });
}

/* ---------- 5. Small helpers ---------- */
function findExplorer(id) {
  return EXPLORERS.find(function (explorer) { return explorer.id === id; });
}

function statusBadge(explorer) {
  return '<span class="status status-' + explorer.statusKind + '">' +
    STATUS_KINDS[explorer.statusKind] + "</span>";
}

function destinationName(key) {
  return DESTINATIONS[key] ? DESTINATIONS[key].name : key;
}

/* Builds one equipment card (used on the Explore page and homepage). */
function createExplorerCard(explorer) {
  const card = document.createElement("a");
  card.className = "explorer-card dest-" + explorer.destination;
  card.href = "story.html?id=" + explorer.id;
  card.dataset.destination = explorer.destination;

  const media = document.createElement("div");
  media.className = "card-media";
  media.appendChild(createImage(explorer.cardImage, 800));
  card.appendChild(media);

  const body = document.createElement("div");
  body.className = "card-body";
  body.innerHTML =
    '<p class="card-meta"><span class="dest-dot"></span>' + destinationName(explorer.destination) +
    "<span class=\"card-year\">" + explorer.year + "</span></p>" +
    "<h3>" + explorer.name + "</h3>" +
    "<p class=\"card-summary\">" + explorer.summary + "</p>" +
    '<div class="card-status">' + statusBadge(explorer) +
    '<p class="card-location">' + explorer.status + "</p></div>" +
    '<span class="card-cta">Read its story</span>';
  card.appendChild(body);
  return card;
}

/* ---------- 6. Homepage features ---------- */

/* "Where they are now" list in the hero */
function renderManifest() {
  const list = document.getElementById("manifest-list");
  if (!list) return;
  EXPLORERS.forEach(function (explorer) {
    const item = document.createElement("li");
    item.innerHTML =
      '<a href="story.html?id=' + explorer.id + '" class="dest-' + explorer.destination + '">' +
      '<span class="manifest-name">' + explorer.shortName + "</span>" +
      '<span class="manifest-place">' + explorer.location + "</span>" +
      statusBadge(explorer) + "</a>";
    list.appendChild(item);
  });
}

/* The row of explorer cards on the homepage */
function renderExplorerRail() {
  const rail = document.getElementById("explorer-rail");
  if (!rail) return;
  EXPLORERS.forEach(function (explorer) {
    rail.appendChild(createExplorerCard(explorer));
  });
}

/* Moon / Mars / Deep Space panels on the homepage */
function renderDestinationPanels() {
  const holder = document.getElementById("destination-panels");
  if (!holder) return;
  Object.keys(DESTINATIONS).forEach(function (key) {
    const destination = DESTINATIONS[key];
    const count = EXPLORERS.filter(function (e) { return e.destination === key; }).length;
    const panel = document.createElement("a");
    panel.className = "destination-panel dest-" + key;
    panel.href = "explore.html#" + key;
    panel.style.backgroundImage = "url('" + imageUrl(destination.image, 1200) + "')";
    panel.innerHTML =
      '<div class="destination-panel-inner">' +
      "<h3>" + destination.name + "</h3>" +
      "<p>" + destination.blurb + "</p>" +
      '<dl class="destination-facts"><div><dt>Distance</dt><dd>' + destination.distance + "</dd></div>" +
      "<div><dt>Signal delay</dt><dd>" + destination.signal + "</dd></div></dl>" +
      '<span class="panel-cta">See ' + count + (count === 1 ? " explorer" : " explorers") + "</span></div>";
    holder.appendChild(panel);
  });
}

/* "Did you know?" widget: shows one fact, button shows the next. */
function setupDidYouKnow() {
  const text = document.getElementById("dyk-text");
  const button = document.getElementById("dyk-next");
  const counter = document.getElementById("dyk-count");
  if (!text || !button) return;
  let index = Math.floor(Math.random() * GENERAL_FACTS.length);

  function show() {
    text.classList.remove("dyk-in");
    void text.offsetWidth; // restarts the CSS animation
    text.textContent = GENERAL_FACTS[index];
    text.classList.add("dyk-in");
    if (counter) counter.textContent = "Fact " + (index + 1) + " of " + GENERAL_FACTS.length;
  }
  button.addEventListener("click", function () {
    index = (index + 1) % GENERAL_FACTS.length;
    show();
  });
  show();
}

/* ---------- Start everything when the page is ready ---------- */
document.addEventListener("DOMContentLoaded", function () {
  setupNavigation();
  setupStarfield();
  fillStaticImages();
  renderManifest();
  renderExplorerRail();
  renderDestinationPanels();
  setupDidYouKnow();
  const year = document.getElementById("footer-year");
  if (year) year.textContent = new Date().getFullYear();
});

/* =====================================================================
   AFTER THE MISSION — story.js
   ---------------------------------------------------------------------
   ONE page (story.html) shows the story of ANY explorer.
   It reads the id from the address, for example:
       story.html?id=opportunity
   and builds the page from the data in equipment.js.

   Parts of the page built here:
     1. Hero (big image, name, status)
     2. Chapter navigation with a reading-progress bar
     3. Five chapters (imagined voice + verified record + fact)
     4. Interactive mission timeline
     5. Sources and "next explorer" links
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const explorer = findExplorer(params.get("id"));
  const main = document.getElementById("story");
  if (!main) return;

  // No id (or a wrong one): show a chooser with all six stories.
  if (!explorer) {
    const wrongId = params.get("id");
    main.innerHTML =
      '<section class="page story-chooser"><header class="page-head">' +
      "<h1>" + (wrongId ? "We couldn't find that explorer" : "Their stories") + "</h1>" +
      "<p>" + (wrongId
        ? "The link may be incomplete. Choose one of the six explorers below."
        : "Every machine tells its story in five chapters: its beginning, its mission, what it discovered, its final days and its legacy. Choose where to start.") +
      "</p></header>" +
      '<div class="explore-grid" id="chooser-grid"></div></section>';
    const grid = document.getElementById("chooser-grid");
    EXPLORERS.forEach(function (e) { grid.appendChild(createExplorerCard(e)); });
    return;
  }

  document.title = explorer.shortName + " — After the Mission";
  document.body.classList.add("dest-" + explorer.destination);

  main.appendChild(buildHero(explorer));
  main.appendChild(buildLegend());

  const layout = document.createElement("div");
  layout.className = "story-layout";
  layout.appendChild(buildChapterNav(explorer));

  const chapters = document.createElement("div");
  chapters.className = "story-chapters";
  explorer.chapters.forEach(function (chapter, index) {
    chapters.appendChild(buildChapter(chapter, index));
    // Put the timeline straight after Chapter 2 ("My mission")
    if (index === 1) chapters.appendChild(buildTimeline(explorer));
  });
  chapters.appendChild(buildSources(explorer));
  layout.appendChild(chapters);
  main.appendChild(layout);
  main.appendChild(buildNextExplorers(explorer));

  setupChapterTracking();
  setupTimeline(explorer);
});

/* ---------- 1. Hero ---------- */
function buildHero(explorer) {
  const hero = document.createElement("header");
  hero.className = "story-hero";
  hero.style.backgroundImage = "url('" + imageUrl(explorer.heroImage, 2000) + "')";

  let stats = "";
  explorer.stats.forEach(function (stat) {
    stats += "<div><dt>" + stat.label + "</dt><dd>" + stat.value + "</dd></div>";
  });

  hero.innerHTML =
    '<div class="story-hero-inner">' +
    '<a class="back-link" href="explore.html#' + explorer.destination + '">Back to ' + destinationName(explorer.destination) + "</a>" +
    "<h1>" + explorer.name + "</h1>" +
    '<p class="story-tagline">' + explorer.tagline + "</p>" +
    '<div class="story-status">' + statusBadge(explorer) +
    "<span>" + explorer.status + "</span></div>" +
    '<dl class="story-stats">' + stats + "</dl></div>";
  return hero;
}

/* ---------- Legend: explains the two kinds of text ---------- */
function buildLegend() {
  const legend = document.createElement("aside");
  legend.className = "story-legend";
  legend.setAttribute("aria-label", "How to read this story");
  legend.innerHTML =
    '<div class="legend-item legend-voice"><span class="legend-swatch"></span>' +
    "<p><strong>Imagined voice.</strong> Creative narration, written as if the machine were speaking. It adds feeling, not facts.</p></div>" +
    '<div class="legend-item legend-record"><span class="legend-swatch"></span>' +
    "<p><strong>Mission record.</strong> Verified history from NASA and other reliable sources, listed at the end.</p></div>";
  return legend;
}

/* ---------- 2. Chapter navigation ---------- */
function buildChapterNav(explorer) {
  const nav = document.createElement("nav");
  nav.className = "chapter-nav";
  nav.setAttribute("aria-label", "Chapters");

  let items = "";
  explorer.chapters.forEach(function (chapter, index) {
    items += '<li><a href="#chapter-' + (index + 1) + '" data-target="chapter-' + (index + 1) + '">' +
      '<span class="chapter-num">' + (index + 1) + "</span>" + chapter.title + "</a></li>";
    if (index === 1) {
      items += '<li><a href="#timeline" data-target="timeline"><span class="chapter-num">◷</span>Timeline</a></li>';
    }
  });

  nav.innerHTML =
    '<div class="progress-track" aria-hidden="true"><div class="progress-fill" id="progress-fill"></div></div>' +
    "<ol>" + items + "</ol>";
  return nav;
}

/* ---------- 3. One chapter ---------- */
function buildChapter(chapter, index) {
  const section = document.createElement("section");
  section.className = "chapter" + (index % 2 === 1 ? " chapter-flip" : "");
  section.id = "chapter-" + (index + 1);

  let record = "";
  chapter.record.forEach(function (paragraph) {
    record += "<p>" + paragraph + "</p>";
  });

  section.innerHTML =
    '<p class="chapter-label">Chapter ' + (index + 1) + "</p>" +
    "<h2>" + chapter.title + "</h2>" +
    '<div class="chapter-grid">' +
    '<div class="chapter-text">' +
    '<blockquote class="voice"><p>' + chapter.voice + "</p>" +
    '<footer>Imagined voice</footer></blockquote>' +
    '<div class="record"><p class="record-label">Mission record</p>' + record + "</div>" +
    "</div>" +
    '<div class="chapter-side">' +
    '<figure class="chapter-figure"><div class="figure-media"></div>' +
    "<figcaption>" + (IMAGES[chapter.image] ? IMAGES[chapter.image].caption : "") + "</figcaption></figure>" +
    '<aside class="fact-callout"><h3>' + chapter.fact.title + "</h3><p>" + chapter.fact.text + "</p></aside>" +
    "</div></div>";

  section.querySelector(".figure-media").appendChild(createImage(chapter.image, 1100));
  return section;
}

/* ---------- 4. Timeline ---------- */
function buildTimeline(explorer) {
  const section = document.createElement("section");
  section.className = "timeline-section";
  section.id = "timeline";

  let stops = "";
  explorer.timeline.forEach(function (event, index) {
    stops += '<li><button type="button" class="timeline-stop" role="tab" data-index="' + index + '" ' +
      'aria-selected="false" aria-controls="timeline-detail">' +
      '<span class="timeline-dot" aria-hidden="true"></span>' +
      '<span class="timeline-date">' + event.date + "</span>" +
      '<span class="timeline-title">' + event.title + "</span></button></li>";
  });

  section.innerHTML =
    '<p class="chapter-label">Mission timeline</p>' +
    "<h2>Key moments, step by step</h2>" +
    '<p class="timeline-hint">Select a moment, or use the arrow buttons, to move through the mission.</p>' +
    '<div class="timeline-scroller"><ol class="timeline-track" role="tablist" aria-label="Mission events">' + stops + "</ol></div>" +
    '<div class="timeline-detail" id="timeline-detail" role="tabpanel" aria-live="polite">' +
    '<div class="timeline-detail-text"><p class="timeline-detail-date"></p><h3></h3><p class="timeline-detail-body"></p></div>' +
    '<div class="timeline-controls">' +
    '<button type="button" class="round-button" id="timeline-prev" aria-label="Previous moment">‹</button>' +
    '<span id="timeline-position"></span>' +
    '<button type="button" class="round-button" id="timeline-next" aria-label="Next moment">›</button>' +
    "</div></div>";
  return section;
}

function setupTimeline(explorer) {
  const stops = document.querySelectorAll(".timeline-stop");
  const detail = document.getElementById("timeline-detail");
  if (!stops.length || !detail) return;
  let current = 0;

  function show(index) {
    current = Math.max(0, Math.min(index, explorer.timeline.length - 1));
    const event = explorer.timeline[current];
    detail.querySelector(".timeline-detail-date").textContent = event.date;
    detail.querySelector("h3").textContent = event.title;
    detail.querySelector(".timeline-detail-body").textContent = event.text;
    document.getElementById("timeline-position").textContent = (current + 1) + " / " + explorer.timeline.length;

    stops.forEach(function (stop, i) {
      stop.setAttribute("aria-selected", String(i === current));
      stop.classList.toggle("passed", i < current);
    });
    // Fill the line up to the selected moment
    const track = document.querySelector(".timeline-track");
    track.style.setProperty("--ratio", current / (explorer.timeline.length - 1));
    // Keep the selected stop visible on small screens
    stops[current].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });

    detail.classList.remove("detail-in");
    void detail.offsetWidth;
    detail.classList.add("detail-in");
    document.getElementById("timeline-prev").disabled = current === 0;
    document.getElementById("timeline-next").disabled = current === explorer.timeline.length - 1;
  }

  stops.forEach(function (stop) {
    stop.addEventListener("click", function () { show(Number(stop.dataset.index)); });
    stop.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { show(current + 1); stops[current].focus(); }
      if (e.key === "ArrowLeft") { show(current - 1); stops[current].focus(); }
    });
  });
  document.getElementById("timeline-prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("timeline-next").addEventListener("click", function () { show(current + 1); });

  // Show the first moment without scrolling the page on load
  const first = explorer.timeline[0];
  detail.querySelector(".timeline-detail-date").textContent = first.date;
  detail.querySelector("h3").textContent = first.title;
  detail.querySelector(".timeline-detail-body").textContent = first.text;
  document.getElementById("timeline-position").textContent = "1 / " + explorer.timeline.length;
  stops[0].setAttribute("aria-selected", "true");
  const track = document.querySelector(".timeline-track");
  track.style.setProperty("--count", explorer.timeline.length);
  track.style.setProperty("--ratio", 0);
  document.getElementById("timeline-prev").disabled = true;
}

/* ---------- Highlight the chapter being read + progress bar ---------- */
function setupChapterTracking() {
  const links = document.querySelectorAll(".chapter-nav a");
  const sections = document.querySelectorAll(".chapter, .timeline-section");
  const fill = document.getElementById("progress-fill");
  const area = document.querySelector(".story-chapters");

  // IntersectionObserver tells us which section is on screen.
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (link) {
          const isCurrent = link.dataset.target === entry.target.id;
          link.classList.toggle("current", isCurrent);
          // On small screens the chapter list scrolls sideways:
          // slide the current chapter into view (without moving the page).
          if (isCurrent) {
            const list = link.closest("ol");
            if (list.scrollWidth > list.clientWidth) {
              list.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
            }
          }
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(function (section) { observer.observe(section); });

  // Reading progress = how far we've scrolled through the chapters.
  function updateProgress() {
    const rect = area.getBoundingClientRect();
    const total = rect.height - window.innerHeight * 0.5;
    const read = Math.min(Math.max(-rect.top + window.innerHeight * 0.5, 0), total);
    const percent = total > 0 ? (read / total) * 100 : 0;
    fill.style.width = percent + "%";
    fill.style.height = percent + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

/* ---------- 5. Sources + next explorers ---------- */
function buildSources(explorer) {
  const section = document.createElement("section");
  section.className = "story-sources";
  let items = "";
  explorer.sources.forEach(function (source) {
    items += '<li><a href="' + source.url + '" target="_blank" rel="noopener">' + source.title + "</a></li>";
  });
  section.innerHTML =
    "<h2>Sources for this story</h2>" +
    "<p>The mission record above is based on these references. Image credits are on the Sources page.</p>" +
    "<ul>" + items + "</ul>" +
    '<a class="text-link" href="sources.html#' + explorer.id + '">All sources and image credits</a>';
  return section;
}

function buildNextExplorers(explorer) {
  const index = EXPLORERS.indexOf(explorer);
  const previous = EXPLORERS[(index - 1 + EXPLORERS.length) % EXPLORERS.length];
  const next = EXPLORERS[(index + 1) % EXPLORERS.length];
  const nav = document.createElement("nav");
  nav.className = "next-explorers";
  nav.setAttribute("aria-label", "More explorers");

  function link(target, label, className) {
    return '<a class="next-link ' + className + ' dest-' + target.destination + '" href="story.html?id=' + target.id + '">' +
      '<span class="next-label">' + label + "</span>" +
      '<span class="next-name">' + target.name + "</span>" +
      '<span class="next-dest">' + destinationName(target.destination) + "</span></a>";
  }
  nav.innerHTML =
    link(previous, "Previous explorer", "next-prev") +
    '<a class="next-quiz" href="quiz.html">Test what you learned</a>' +
    link(next, "Next explorer", "next-next");
  return nav;
}

/* =====================================================================
   AFTER THE MISSION — explore.js
   ---------------------------------------------------------------------
   The Explore page: a destination selector (All / Moon / Mars /
   Deep Space) and a grid of equipment cards that filters instantly.
   The chosen destination is saved in the address (#moon, #mars, #deep)
   so links from the homepage open the right filter.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("explore-grid");
  const buttons = document.querySelectorAll(".dest-tab");
  const intro = document.getElementById("destination-intro");
  if (!grid) return;

  // Build every card once. Filtering just hides/shows them.
  EXPLORERS.forEach(function (explorer) {
    grid.appendChild(createExplorerCard(explorer));
  });

  function selectDestination(key) {
    if (key !== "all" && !DESTINATIONS[key]) key = "all";

    // Update the tab buttons
    buttons.forEach(function (button) {
      const isActive = button.dataset.filter === key;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    // Show or hide cards
    let shown = 0;
    grid.querySelectorAll(".explorer-card").forEach(function (card) {
      const visible = key === "all" || card.dataset.destination === key;
      card.hidden = !visible;
      if (visible) {
        card.style.animationDelay = (shown * 60) + "ms";
        card.classList.remove("card-enter");
        void card.offsetWidth; // restart animation
        card.classList.add("card-enter");
        shown++;
      }
    });

    // Update the destination description above the grid
    document.body.dataset.destination = key;
    if (key === "all") {
      intro.innerHTML =
        "<h2>All destinations</h2>" +
        "<p>Six machines, three very different places. Some stand where they landed, one is grounded after its last flight, and one is still flying away from the Sun.</p>" +
        '<p class="intro-count">' + shown + " explorers</p>";
    } else {
      const d = DESTINATIONS[key];
      intro.innerHTML =
        "<h2>" + d.name + "</h2><p>" + d.blurb + "</p>" +
        '<dl class="destination-facts"><div><dt>Distance</dt><dd>' + d.distance + "</dd></div>" +
        "<div><dt>Signal delay</dt><dd>" + d.signal + "</dd></div></dl>" +
        '<p class="intro-count">' + shown + (shown === 1 ? " explorer" : " explorers") + "</p>";
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const key = button.dataset.filter;
      history.replaceState(null, "", key === "all" ? "explore.html" : "#" + key);
      selectDestination(key);
    });
  });

  window.addEventListener("hashchange", function () {
    selectDestination(location.hash.replace("#", "") || "all");
  });

  selectDestination(location.hash.replace("#", "") || "all");
});

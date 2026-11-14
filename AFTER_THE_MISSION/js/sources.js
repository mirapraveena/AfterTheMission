/* =====================================================================
   AFTER THE MISSION — sources.js
   ---------------------------------------------------------------------
   Builds the Sources page automatically from equipment.js:
     - general references
     - references for each explorer
     - a credit line for every image used on the site
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const general = document.getElementById("general-sources");
  const perExplorer = document.getElementById("explorer-sources");
  const credits = document.getElementById("image-credits");
  if (!general) return;

  function linkItem(source) {
    return '<li><a href="' + source.url + '" target="_blank" rel="noopener">' + source.title + "</a></li>";
  }

  general.innerHTML = GENERAL_SOURCES.map(linkItem).join("");

  EXPLORERS.forEach(function (explorer) {
    const block = document.createElement("section");
    block.className = "source-block dest-" + explorer.destination;
    block.id = explorer.id;
    block.innerHTML =
      '<h3><a href="story.html?id=' + explorer.id + '">' + explorer.name + "</a></h3>" +
      "<ul>" + explorer.sources.map(linkItem).join("") + "</ul>";
    perExplorer.appendChild(block);
  });

  Object.keys(IMAGES).forEach(function (key) {
    const image = IMAGES[key];
    const page = "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(image.file.replace(/ /g, "_"));
    const row = document.createElement("li");
    row.className = "credit-row";
    const thumb = document.createElement("div");
    thumb.className = "credit-thumb";
    thumb.appendChild(createImage(key, 240));
    row.appendChild(thumb);
    const text = document.createElement("div");
    text.innerHTML =
      "<p class=\"credit-caption\">" + image.caption + "</p>" +
      '<p class="credit-line">Credit: ' + image.credit +
      ' · <a href="' + page + '" target="_blank" rel="noopener">Image source</a></p>';
    row.appendChild(text);
    credits.appendChild(row);
  });
});

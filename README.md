# After the Mission
### The Stories of NASA's Forgotten Explorers
*NASA Space Apps Challenge 2026 — "Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars"*
- live website : https://mirapraveena.github.io/AfterTheMission/index.html
An interactive digital space museum for school students and casual space fans. Six NASA machines tell their own stories (in a clearly labelled *imagined voice*) alongside verified history (the *mission record*), from launch to legacy.

| Explorer | Destination | Current status |
|---|---|---|
| Apollo 11 Lunar Module *Eagle* | The Moon | Descent stage left in place at Tranquility Base |
| Surveyor 3 | The Moon | Inactive since 1967 (camera and scoop brought home by Apollo 12) |
| Sojourner | Mars | Silent since 1997, parked near the Pathfinder lander |
| Opportunity | Mars | Silent since June 2018, in Perseverance Valley |
| Ingenuity | Mars | Grounded at Valinor Hills, out of contact; programmed to keep logging data on board |
| Pioneer 10 | Deep Space | Silent since 2003, still travelling toward Aldebaran |

---

## Features
- **Homepage** with a cinematic hero, a live "Where they are now" list, destination panels and a *Did you know?* fact widget.
- **Explore** page with Moon / Mars / Deep Space filters (links like `explore.html#mars` open a filter directly).
- **Story** pages: five chapters each, a sticky chapter list with a reading-progress bar, fact callouts, image captions and an **interactive mission timeline**.
- **Legacy** page connecting all six missions.
- **Quiz**: 12 questions, instant feedback, the correct answer, a score, and *Try again*.
- **Sources** page listing references for every explorer and a credit for every image.
- Responsive from phones to large screens, keyboard accessible, and respects "reduce motion" settings.

## Technology
Plain **HTML, CSS and JavaScript**. No frameworks, no build step, no backend, no database.

## Project structure
```
AFTER_THE_MISSION/
├── index.html        Home
├── explore.html      Destination filters + equipment cards
├── story.html        ONE page that shows any story: story.html?id=opportunity
├── legacy.html       What the machines left us
├── quiz.html         Knowledge quiz
├── sources.html      References and image credits
├── css/style.css     All styling (colours and fonts are set at the top)
├── js/
│   ├── equipment.js  ALL content: explorers, chapters, timelines, facts, images, sources
│   ├── main.js       Shared code: navigation, starfield, image loading, cards, homepage
│   ├── explore.js    Destination filtering
│   ├── story.js      Builds a story page from equipment.js
│   ├── quiz.js       Quiz questions and logic
│   └── sources.js    Builds the Sources page
├── images/           Empty unless you download local copies (see below)
├── assets/favicon.svg
└── tools/download_images.py   Optional: save images locally
```

### How it works (handy for judging)
1. Every page loads `equipment.js` (the data) and `main.js` (shared tools).
2. Page scripts read the data and build HTML. For example, `story.js` reads `?id=…` from the address, finds that explorer in `EXPLORERS`, and creates the hero, chapters, timeline and sources.
3. **Adding a new explorer** means adding one object to `EXPLORERS` (and its images to `IMAGES`) in `equipment.js`. Cards, filters, stories, the homepage list and the Sources page all update by themselves.

## Running locally
Open `index.html` in a browser, **or** (recommended, so everything behaves exactly as when hosted) start a tiny local server in the project folder:

```bash
python -m http.server 8000
```
then visit <http://localhost:8000>.

## Images
Images are authentic NASA photos and artworks, loaded from **Wikimedia Commons**, which archives NASA's public-domain originals. An internet connection is needed to see them. If an image can't load, a styled panel with its description is shown instead of a broken icon.

**To keep copies inside the project** (for example, for an offline demo):
```bash
python tools/download_images.py
```
Then, in `js/equipment.js`, change `const IMAGE_MODE = "remote";` to `"local"`.

## Deploying
**GitHub Pages**
1. Create a new repository and upload everything inside `AFTER_THE_MISSION/` (so `index.html` is at the top level).
2. Go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

**Netlify**
Go to app.netlify.com/drop and drag the `AFTER_THE_MISSION` folder onto the page. No build settings are needed.

All paths are relative, so the site works in a subfolder (as on GitHub Pages) without changes.

## Accuracy notes
- "Mission record" text was checked against NASA mission pages, NASA/JPL news releases and the NSSDCA catalogue. Each story lists its sources.
- "Imagined voice" text is creative writing. It never adds events, conversations or discoveries.
- Where the US date and the UTC date differ, the story says which one it gives (for example, Opportunity landed on 25 January 2004 UTC, which was 24 January in California).
- Whether Ingenuity is still recording data today cannot be confirmed from Earth, and the site says so.

## Credits
NASA images courtesy of NASA, JPL-Caltech, NASA Ames, GSFC/ASU and the Apollo crews; artists' concepts are labelled on the Sources page. NASA does not endorse this project.

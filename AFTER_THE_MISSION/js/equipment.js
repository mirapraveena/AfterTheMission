/* =====================================================================
   AFTER THE MISSION — equipment.js
   ---------------------------------------------------------------------
   This file holds ALL the content of the website: the images, the six
   explorers, their stories, timelines, facts and sources.

   The other scripts (main.js, explore.js, story.js, quiz.js, sources.js)
   only READ this data and turn it into HTML.

   ➜ To add a new explorer, copy one object inside EXPLORERS, change the
     text, and add its images to IMAGES. Nothing else needs to change.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. IMAGE SETTINGS
   ---------------------------------------------------------------------
   "remote" = load images directly from Wikimedia Commons, where NASA's
              public-domain photos are archived (needs internet).
   "local"  = load images from the /images folder. Run
              tools/download_images.py once to fill that folder.
   --------------------------------------------------------------------- */
const IMAGE_MODE = "remote";

/* Every image used on the site. `file` is the exact file name on
   Wikimedia Commons. `folder` is where the local copy is saved.
   `credit` is shown on the Sources page. */
const IMAGES = {
  /* ---------- The Moon ---------- */
  eagleOrbit: {
    file: "Apollo 11 Lunar Module Eagle in landing configuration in lunar orbit from the Command and Service Module Columbia.jpg",
    folder: "moon",
    alt: "The Apollo 11 lunar module Eagle, gold and silver, flying above the grey lunar surface",
    caption: "Eagle in lunar orbit on 20 July 1969, photographed from Columbia shortly after undocking.",
    credit: "NASA (Apollo 11 crew)"
  },
  aldrinEagle: {
    file: "Astronaut Edwin Aldrin walks on lunar surface near leg of Lunar Module (as11-40-5902).jpg",
    folder: "moon",
    alt: "Buzz Aldrin walking on the Moon beside a leg of the lunar module, with bootprints in the dust",
    caption: "Buzz Aldrin beside one of Eagle's legs. Photo AS11-40-5902, taken by Neil Armstrong.",
    credit: "NASA / Neil A. Armstrong"
  },
  aldrinVisor: {
    file: "Aldrin Apollo 11 original.jpg",
    folder: "moon",
    alt: "Buzz Aldrin standing on the Moon in his spacesuit, the lunar module reflected in his gold visor",
    caption: "Buzz Aldrin at Tranquility Base. Eagle is reflected in his visor.",
    credit: "NASA / Neil A. Armstrong"
  },
  aldrinExperiment: {
    file: "Aldrin with experiment.jpg",
    folder: "moon",
    alt: "Buzz Aldrin carrying scientific experiments across the lunar surface, with Eagle behind him",
    caption: "Aldrin deploys the Early Apollo Scientific Experiments Package. Photo AS11-40-5948.",
    credit: "NASA / Neil A. Armstrong"
  },
  eagleReturn: {
    file: "Apollo 11 lunar module.jpg",
    folder: "moon",
    alt: "The ascent stage of Eagle rising toward Columbia, with the Moon below and a half-lit Earth above",
    caption: "Only Eagle's ascent stage came back to orbit. The descent stage stayed on the Moon. Photo AS11-44-6642.",
    credit: "NASA / Michael Collins"
  },
  earthrise11: {
    file: "Earth Rise as Seen From Lunar Surface (5052124921).jpg",
    folder: "backgrounds",
    alt: "A blue and white Earth rising above the grey horizon of the Moon",
    caption: "Earth rising over the Moon, photographed by the Apollo 11 crew in July 1969.",
    credit: "NASA / Apollo 11"
  },
  surveyorConrad: {
    file: "Surveyor 3-Apollo 12.jpg",
    folder: "moon",
    alt: "Astronaut Pete Conrad standing beside the robotic Surveyor 3 lander, with the Apollo 12 lunar module in the distance",
    caption: "Pete Conrad visits Surveyor 3 on 20 November 1969. Intrepid, the Apollo 12 lander, waits in the background.",
    credit: "NASA / Alan L. Bean"
  },
  surveyorConradCamera: {
    file: "Apollo12ConradSurveyor.jpg",
    folder: "moon",
    alt: "Pete Conrad holding the Surveyor 3 spacecraft and inspecting its camera",
    caption: "Conrad examines Surveyor 3's television camera before removing it. Photo AS12-48-7134.",
    credit: "NASA / Alan L. Bean"
  },
  surveyorScoop: {
    file: "Surveyor3scooping.jpg",
    folder: "moon",
    alt: "Close-up of the Surveyor 3 robotic scoop resting near trenches it dug in the lunar soil",
    caption: "Surveyor 3's scoop and the trenches it dug, photographed by Apollo 12. Photo AS12-48-7129.",
    credit: "NASA / Alan L. Bean"
  },
  surveyorCamera: {
    file: "Surveyor3camera.jpg",
    folder: "moon",
    alt: "The Surveyor 3 television camera on display in a museum case",
    caption: "The camera Apollo 12 brought home, on display at the Smithsonian National Air and Space Museum.",
    credit: "Wikimedia Commons (photo of NASA artifact, NASM)"
  },
  surveyorFromAbove: {
    file: "Surveyor 3 on the Moon.jpg",
    folder: "moon",
    alt: "Surveyor 3 sitting on the slope of a small crater on the Moon",
    caption: "Surveyor 3 on the inner slope of the crater where it landed.",
    credit: "NASA / Alan L. Bean"
  },
  surveyorView: {
    file: "Surveyor 3 Fig 3-53.jpg",
    folder: "moon",
    alt: "Grainy black-and-white image of rock fragments on the wall of a lunar crater",
    caption: "Rocks on the crater wall, seen through Surveyor 3's own television camera (NASA SP-184).",
    credit: "NASA / JPL"
  },
  surveyorLRO: {
    file: "Surveyor crater M114104917RC.jpg",
    folder: "moon",
    alt: "Overhead orbital photo of Surveyor crater showing tiny dots for Surveyor 3 and the Apollo 12 descent stage",
    caption: "Surveyor crater seen from orbit by the Lunar Reconnaissance Orbiter. Surveyor 3 and Intrepid's descent stage are both still there.",
    credit: "NASA / GSFC / Arizona State University (LRO)"
  },

  /* ---------- Mars ---------- */
  sojournerYogi: {
    file: "Sojourner on Mars PIA01122.jpg",
    folder: "mars",
    alt: "The small six-wheeled Sojourner rover pressing an instrument against a large rock on the reddish surface of Mars",
    caption: "Sojourner studies the rock nicknamed Yogi. Photo PIA01122.",
    credit: "NASA / JPL"
  },
  sojournerRoverView: {
    file: "PIA00664.jpg",
    folder: "mars",
    alt: "A low, grainy view from Sojourner looking back at the Pathfinder lander, its airbags and ramp",
    caption: "A rover's-eye view of the Pathfinder lander, with Sojourner's tracks leading away. Photo PIA00664.",
    credit: "NASA / JPL"
  },
  pathfinderPanorama: {
    file: "360 Degree Panorama Mars Pathfinder Landing Site - GPN-2000-000461.jpg",
    folder: "mars",
    alt: "Wide panorama of a rocky orange plain on Mars with two hills on the horizon",
    caption: "The Ares Vallis landing site. The two hills on the horizon were nicknamed Twin Peaks.",
    credit: "NASA / JPL"
  },
  oppyArtist: {
    file: "NASA Mars Rover.jpg",
    folder: "mars",
    alt: "Artist's illustration of the Opportunity rover with its solar panels spread out on a rocky Martian plain",
    caption: "Artist's illustration of a Mars Exploration Rover. Spirit and Opportunity were identical twins.",
    credit: "NASA / JPL / Cornell University, Maas Digital (artist's concept)"
  },
  oppySelfie: {
    file: "PIA07372-MarsOpportunityRover-SelfPortrait-20041220-crop-rotate-sm.jpg",
    folder: "mars",
    alt: "Opportunity's own deck and solar panels seen from above, with the Martian ground around it",
    caption: "Opportunity's self-portrait from December 2004, showing clean solar panels. Photo PIA07372.",
    credit: "NASA / JPL / Cornell"
  },
  oppyEndurance: {
    file: "Opportunity PIA03240.jpg",
    folder: "mars",
    alt: "Computer-made image of Opportunity sitting on layered rock inside Endurance Crater",
    caption: "A synthetic view combining a rover model with real images of Endurance Crater. Photo PIA03240.",
    credit: "NASA / JPL / Cornell (synthetic image)"
  },
  oppyBlueberries: {
    file: "Sol1162B.Rim.Victoria.Crater.and.plain.at.Meridiani.Planum.foreground.detail.jpg",
    folder: "mars",
    alt: "Martian soil covered with thousands of small dark round pebbles called blueberries",
    caption: "Thousands of hematite 'blueberries' on the plains near Victoria Crater.",
    credit: "NASA / JPL / Cornell / Arizona State Univ. (Pancam team)"
  },
  oppyMeteorite: {
    file: "Heat Shield Rock, Mars.jpg",
    folder: "mars",
    alt: "A dark, pitted rock about the size of a basketball lying on the sandy surface of Mars",
    caption: "Heat Shield Rock, the first meteorite identified on another planet.",
    credit: "NASA / JPL / Cornell"
  },
  ingenuityTwoYears: {
    file: "Ingenuity at Two Years on Mars (PIA25881).jpg",
    folder: "mars",
    alt: "The small four-legged Ingenuity helicopter with two long rotor blades standing on rocky Martian ground",
    caption: "Ingenuity photographed by Perseverance's Mastcam-Z on 16 April 2023. Photo PIA25881.",
    credit: "NASA / JPL-Caltech / ASU / MSSS"
  },
  ingenuityThreeForks: {
    file: "Mars Helicopter at Three Forks (PIA25683).jpg",
    folder: "mars",
    alt: "Ingenuity standing near the base of a river delta in Jezero Crater",
    caption: "Ingenuity near the base of Jezero Crater's ancient river delta, December 2022. Photo PIA25683.",
    credit: "NASA / JPL-Caltech / ASU / MSSS"
  },
  ingenuityConcept: {
    file: "PIA23962-Mars2020-Rover&Helicopter-20200714.jpg",
    folder: "mars",
    alt: "Artist's illustration of the Perseverance rover and the Ingenuity helicopter together on Mars",
    caption: "Artist's concept of Perseverance and Ingenuity, released before launch in 2020. Photo PIA23962.",
    credit: "NASA / JPL-Caltech (artist's concept)"
  },
  ingenuityValinor: {
    file: "PIA26237-Mars-IngenuityHelicopter-EndMission-ValinorHills-20240221.jpg",
    folder: "mars",
    alt: "Wide panorama of sand ripples on Mars with the tiny grounded Ingenuity helicopter near the centre",
    caption: "Ingenuity at its final airfield, Valinor Hills, seen by Perseverance on 21 February 2024. Photo PIA26237.",
    credit: "NASA / JPL-Caltech / ASU / MSSS"
  },

  /* ---------- Deep space ---------- */
  pioneerLaunch: {
    file: "Launch of Pioneer 10.jpg",
    folder: "deep_space",
    alt: "An Atlas-Centaur rocket lifting off in a bright plume of fire carrying Pioneer 10",
    caption: "Pioneer 10 lifts off from Cape Canaveral on 2 March 1972. Photo AC72-2143.",
    credit: "NASA Ames Research Center"
  },
  pioneerJupiter: {
    file: "Pioneer 10 at Jupiter.jpg",
    folder: "deep_space",
    alt: "Painting of the Pioneer 10 spacecraft with its large dish antenna flying past the striped planet Jupiter",
    caption: "Artist Rick Guidice's painting of Pioneer 10 passing Jupiter.",
    credit: "NASA Ames / Rick Guidice (artist's concept)"
  },
  pioneerPlaque: {
    file: "Pioneer10-plaque (cropped).jpg",
    folder: "deep_space",
    alt: "The engraved gold-anodised Pioneer plaque showing a man, a woman, the Solar System and a map of pulsars",
    caption: "The Pioneer plaque, a 6 by 9 inch engraved message bolted to the spacecraft.",
    credit: "NASA Ames Research Center"
  },
  pioneerOuter: {
    file: "Pioneer 10 or 11 in outer solar system.jpg",
    folder: "deep_space",
    alt: "Painting of a Pioneer spacecraft alone in dark space with the distant Sun as a bright star",
    caption: "A Pioneer spacecraft in the outer Solar System, painted by Don Davis for NASA.",
    credit: "Don Davis for NASA (artist's concept)"
  },
  pioneerKick: {
    file: "Pioneer 10 on its kickmotor.jpg",
    folder: "deep_space",
    alt: "The Pioneer 10 spacecraft in a clean room being attached to its rocket stage",
    caption: "Pioneer 10 mounted on its rocket stage before launch.",
    credit: "NASA"
  }
};

/* ---------------------------------------------------------------------
   2. DESTINATIONS
   --------------------------------------------------------------------- */
const DESTINATIONS = {
  moon: {
    name: "The Moon",
    distance: "About 384,400 km from Earth",
    signal: "A radio signal takes about 1.3 seconds to arrive",
    blurb: "Our nearest neighbour has no air and no weather, so footprints and machines left there in the 1960s are still where they were placed.",
    image: "earthrise11"
  },
  mars: {
    name: "Mars",
    distance: "Between about 55 and 400 million km from Earth",
    signal: "A radio signal takes between about 3 and 22 minutes",
    blurb: "A cold desert planet with a thin atmosphere, dust storms and ancient riverbeds. Robots have been our only visitors so far.",
    image: "pathfinderPanorama"
  },
  deep: {
    name: "Deep Space",
    distance: "Beyond the orbits of the planets",
    signal: "Pioneer 10's last signal took about 11 hours to arrive",
    blurb: "Some spacecraft never land anywhere. After their work is done they keep coasting outward, silent, on paths that leave the Solar System.",
    image: "pioneerOuter"
  }
};

/* Status categories. `kind` drives the colour of the status badge. */
const STATUS_KINDS = {
  left: "Left in place",
  inactive: "Inactive on the surface",
  grounded: "Grounded, out of contact",
  travelling: "Silent, still travelling"
};

/* ---------------------------------------------------------------------
   3. THE EXPLORERS
   Each story has five chapters. Inside every chapter:
     voice  = creative first-person narration (clearly labelled on the page)
     record = verified facts from NASA and other reliable sources
     fact   = a short highlighted fact
   --------------------------------------------------------------------- */
const EXPLORERS = [
  /* =================================================================
     APOLLO 11 LUNAR MODULE — EAGLE
     ================================================================= */
  {
    id: "eagle",
    name: "Apollo 11 Lunar Module Eagle",
    shortName: "Eagle",
    destination: "moon",
    year: 1969,
    statusKind: "left",
    status: "Descent stage resting at Tranquility Base",
    location: "Sea of Tranquility, the Moon",
    tagline: "The lander that carried the first people to the Moon, then stayed behind as their launch pad.",
    summary: "Eagle landed Neil Armstrong and Buzz Aldrin on the Moon in 1969. Its lower half, the descent stage, never left.",
    heroImage: "eagleOrbit",
    cardImage: "aldrinVisor",
    stats: [
      { label: "Launched", value: "16 July 1969" },
      { label: "Landed", value: "20 July 1969" },
      { label: "Time on the surface", value: "About 21½ hours" },
      { label: "Built by", value: "Grumman" }
    ],
    chapters: [
      {
        title: "My beginning",
        voice: "I was built to do one thing no machine had ever done: carry two people down to another world and bring them back up again. I had two halves, and only one of them was meant to come home.",
        record: [
          "Eagle was the lunar module for Apollo 11, NASA's first mission to land astronauts on the Moon. Its factory name was LM-5, and it was built by the Grumman Aircraft Engineering Corporation.",
          "It launched on 16 July 1969 from Kennedy Space Center, folded up inside a giant Saturn V rocket, together with the command module Columbia. The crew were Neil Armstrong, Buzz Aldrin and Michael Collins.",
          "The lunar module had two stages. The bottom half, the descent stage, held a rocket engine for landing, four legs, and storage for equipment. The top half, the ascent stage, was the cabin where the two astronauts lived and worked, with its own engine for lifting off again."
        ],
        fact: { title: "Why two stages?", text: "Leaving the heavy landing engine and legs behind made the trip back to orbit much lighter, so the ascent stage needed far less fuel." },
        image: "eagleOrbit"
      },
      {
        title: "My mission",
        voice: "On the way down, my computer flashed alarms nobody had expected, and the ground ahead was full of boulders. Neil took manual control and flew me on until he found a smooth place to set down.",
        record: [
          "On 20 July 1969, Armstrong and Aldrin flew Eagle away from Columbia, while Collins stayed in lunar orbit. During the descent, the onboard computer raised a series of program alarms. Flight controllers in Houston judged that it was safe to continue.",
          "Near the end of the descent, Armstrong saw that the planned landing area was covered in large rocks. He took partial manual control and steered Eagle further on to a clear spot. Eagle touched down at about 20:17 UTC, and Armstrong reported: \"Houston, Tranquility Base here. The Eagle has landed.\"",
          "Hours later, Armstrong climbed down Eagle's ladder and became the first person to step onto the Moon, followed by Aldrin. They spent about two and a half hours outside, collecting rock and soil samples, taking photographs and setting up experiments."
        ],
        fact: { title: "Tranquility Base", text: "The astronauts named their landing site Tranquility Base. The International Astronomical Union officially recognises the name." },
        image: "aldrinEagle"
      },
      {
        title: "What I discovered",
        voice: "I didn't carry scientific instruments of my own. My job was to be a doorway. Everything my crew discovered, they discovered because I got them there safely.",
        record: [
          "Eagle's crew brought back the first samples of Moon rock and soil ever collected by people. Scientists found volcanic rocks called basalts, showing that the dark lunar 'seas' are huge plains of ancient lava.",
          "The astronauts set up the Early Apollo Scientific Experiments Package next to Eagle. It included a seismometer to detect moonquakes and a laser-ranging retroreflector, a panel of mirrors that bounces laser light back to Earth.",
          "The mission also proved that people could land, work on the surface and return safely, answering engineering questions that no robot could answer at the time."
        ],
        fact: { title: "Still in use", text: "The Apollo 11 retroreflector left beside Eagle still works. Observatories on Earth bounce lasers off it to measure the Earth–Moon distance very precisely." },
        image: "aldrinExperiment"
      },
      {
        title: "My final days",
        voice: "When it was time to leave, my top half fired its engine and lifted off. My lower half stayed exactly where it was, and it is still there now.",
        record: [
          "On 21 July 1969, at about 17:54 UTC, Eagle's ascent stage launched from the Moon, using the descent stage as its launch platform. It rejoined Columbia in lunar orbit, and the astronauts moved back into the command module.",
          "The empty ascent stage was then released into lunar orbit. Its final fate is unknown. It is generally thought to have eventually crashed into the Moon.",
          "The descent stage was intentionally left behind. It still stands at Tranquility Base, without power, surrounded by footprints and the other equipment left by the crew. Fixed to one of its legs is a plaque that reads, in part: \"Here men from the planet Earth first set foot upon the Moon, July 1969, A.D.\""
        ],
        fact: { title: "Current status", text: "Left in place on purpose. Eagle's descent stage is inactive and has stayed at its landing site since 1969. It was never designed to operate after the crew left." },
        image: "eagleReturn"
      },
      {
        title: "My legacy",
        voice: "Five more lunar modules followed my path. Their lower halves are on the Moon too, each one marking a place where people once stood.",
        record: [
          "Apollo 11 showed that the whole Apollo landing system worked. Five more crews landed on the Moon between 1969 and 1972, each using a lunar module built on Eagle's design.",
          "The six Apollo lunar modules that landed remain the only crewed vehicles ever to land anywhere beyond Earth.",
          "Today, NASA's Artemis program is preparing to return astronauts to the Moon. The engineering lessons of the lunar module, from landing sensors to two-stage design, still inform how landers are planned."
        ],
        fact: { title: "Why it matters", text: "Tranquility Base is treated by many as one of the most important heritage sites in history: the first place outside Earth where humans walked." },
        image: "earthrise11"
      }
    ],
    timeline: [
      { date: "16 Jul 1969", title: "Launch", text: "Apollo 11 lifts off on a Saturn V rocket from Kennedy Space Center." },
      { date: "19 Jul 1969", title: "Arrival at the Moon", text: "Columbia and Eagle enter lunar orbit together." },
      { date: "20 Jul 1969", title: "Landing", text: "Eagle touches down at Tranquility Base at about 20:17 UTC." },
      { date: "21 Jul 1969", title: "First steps", text: "Armstrong steps onto the Moon at about 02:56 UTC, followed by Aldrin." },
      { date: "21 Jul 1969", title: "Liftoff", text: "The ascent stage launches from the Moon. The descent stage stays behind." },
      { date: "24 Jul 1969", title: "Splashdown", text: "The crew splashes down safely in the Pacific Ocean." },
      { date: "Today", title: "Still there", text: "Eagle's descent stage remains at Tranquility Base." }
    ],
    didYouKnow: [
      "The lunar module was named Eagle after the bald eagle, a national symbol of the United States.",
      "Eagle's ascent stage engine had to work the first time. There was no backup way off the Moon."
    ],
    sources: [
      { title: "NASA — Apollo 11 Mission Overview", url: "https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html" },
      { title: "NASA — 50 Years Ago: Apollo Astronauts Land, Take First Steps on Moon", url: "https://www.nasa.gov/feature/50-years-ago-apollo-astronauts-land-take-first-us-steps-on-moon" },
      { title: "Smithsonian National Air and Space Museum — Apollo 11 lunar module", url: "https://airandspace.si.edu/amp-stories/lunar-module" },
      { title: "NASA NSSDCA — Apollo 11 Lunar Module (catalogue entry)", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C" }
    ]
  },

  /* =================================================================
     SURVEYOR 3
     ================================================================= */
  {
    id: "surveyor3",
    name: "Surveyor 3",
    shortName: "Surveyor 3",
    destination: "moon",
    year: 1967,
    statusKind: "inactive",
    status: "Inactive on the Moon since May 1967",
    location: "Ocean of Storms, the Moon",
    tagline: "The robot that tested the Moon's ground for Apollo, and later had visitors.",
    summary: "A robotic lander that dug into the Moon's soil in 1967. Two and a half years later, Apollo 12 astronauts walked over to see it.",
    heroImage: "surveyorConrad",
    cardImage: "surveyorConrad",
    stats: [
      { label: "Launched", value: "17 April 1967" },
      { label: "Landed", value: "20 April 1967" },
      { label: "Images sent", value: "6,315" },
      { label: "Visited by", value: "Apollo 12, Nov 1969" }
    ],
    chapters: [
      {
        title: "My beginning",
        voice: "Before anyone could walk on the Moon, someone had to check that the ground would hold them. That someone was me, and my Surveyor brothers and sisters.",
        record: [
          "Surveyor 3 was a robotic lander built by Hughes Aircraft for NASA. It was part of the Surveyor program, which sent seven landers toward the Moon between 1966 and 1968.",
          "In the early 1960s, scientists did not know for sure whether the Moon's surface was solid or covered in deep dust that could swallow a spacecraft. The Surveyor program's main goal was to show that soft landings were possible and to study the ground where Apollo crews might land.",
          "Surveyor 3 launched on 17 April 1967 on an Atlas-Centaur rocket from Cape Canaveral."
        ],
        fact: { title: "Second success", text: "Surveyor 3 was the second Surveyor to soft-land on the Moon, after Surveyor 1 in 1966." },
        image: "surveyorFromAbove"
      },
      {
        title: "My mission",
        voice: "My landing did not go to plan. Bright rocks confused my radar and my engines kept firing, so I hopped off the ground twice before I finally settled down.",
        record: [
          "Surveyor 3 landed on 20 April 1967 in the Ocean of Storms (Oceanus Procellarum), inside a small crater later named Surveyor crater.",
          "During the descent, highly reflective rocks confused its landing radar, and its small engines did not shut off at the right moment. The lander bounced twice, first to a height of about 10 metres and then about 3 metres, before coming to rest.",
          "It carried a television camera and a new tool: a surface sampler, a small scoop on a mechanical arm. Controllers on Earth used the scoop to dig trenches, press on the soil and pick up material, while the camera watched."
        ],
        fact: { title: "A first", text: "Surveyor 3 was the first spacecraft to carry a scoop that dug into the soil of another world." },
        image: "surveyorScoop"
      },
      {
        title: "What I discovered",
        voice: "I dug, I poked, I watched. And I told the people back home what they most needed to hear: the ground here is firm enough.",
        record: [
          "Surveyor 3 sent back 6,315 television images, including views of its own scoop at work and wide surveys of the lunar surface around it.",
          "On 24 April 1967, the Earth passed in front of the Sun as seen from the Moon. Surveyor 3's camera recorded this eclipse from the lunar surface.",
          "From the sampling tests, scientists concluded that the lunar surface was solid enough to hold the weight of an Apollo lunar module, an important result for planning crewed landings."
        ],
        fact: { title: "Soft but strong", text: "The scoop showed the top layer of soil was fine and loose, but firmer just below, a bit like damp sand at the beach." },
        image: "surveyorView"
      },
      {
        title: "My final days",
        voice: "The lunar night came, two weeks of deep cold. I went quiet and never woke up. Then, two and a half years later, I had visitors.",
        record: [
          "Surveyor 3 last communicated with Earth in early May 1967 (NASA lists the last contact as 4 May). It did not survive the freezing lunar night.",
          "On 19 November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean landed their lunar module Intrepid about 180 metres (600 feet) from Surveyor 3. It was the first precise, targeted landing on the Moon.",
          "The next day they walked over to Surveyor 3, photographed it and removed several parts, including its television camera and scoop, to bring back to Earth for study. The rest of the lander is still in Surveyor crater."
        ],
        fact: { title: "Current status", text: "Inactive since 1967 and still on the Moon. It is the only robotic probe that humans have ever visited on another world." },
        image: "surveyorConradCamera"
      },
      {
        title: "My legacy",
        voice: "Part of me came home. Scientists studied how 31 months on the Moon had changed my metal, glass and paint. I became a lesson in how machines age in space.",
        record: [
          "The returned parts let engineers study how materials changed after about two and a half years on the Moon, exposed to vacuum, radiation, micrometeorites and huge temperature swings. NASA published the results in a detailed 1972 report.",
          "Scientists found bacteria on the returned camera. Later reviews concluded the microbes most likely got there through contamination on Earth. The episode helped NASA tighten its laboratory and cleanliness procedures.",
          "Surveyor 3's camera is on loan to the Smithsonian National Air and Space Museum, and its scoop is at NASA's Jet Propulsion Laboratory."
        ],
        fact: { title: "Seen from orbit", text: "NASA's Lunar Reconnaissance Orbiter has photographed Surveyor crater from above, with Surveyor 3 and Intrepid's descent stage still in place." },
        image: "surveyorLRO"
      }
    ],
    timeline: [
      { date: "17 Apr 1967", title: "Launch", text: "Surveyor 3 launches from Cape Canaveral on an Atlas-Centaur rocket." },
      { date: "20 Apr 1967", title: "Bouncy landing", text: "It bounces twice before settling in the Ocean of Storms." },
      { date: "24 Apr 1967", title: "Eclipse seen from the Moon", text: "Its camera records Earth passing in front of the Sun." },
      { date: "Early May 1967", title: "Last contact", text: "Surveyor 3 falls silent as the lunar night sets in." },
      { date: "19 Nov 1969", title: "Neighbours arrive", text: "Apollo 12 lands about 180 metres away." },
      { date: "20 Nov 1969", title: "The visit", text: "Conrad and Bean remove the camera and scoop to bring home." },
      { date: "Today", title: "Still there", text: "The rest of Surveyor 3 remains in Surveyor crater." }
    ],
    didYouKnow: [
      "All seven Surveyor spacecraft are still on the Moon, including the two that crashed.",
      "Apollo 12 chose its landing site partly to prove it could land precisely next to a known target: Surveyor 3."
    ],
    sources: [
      { title: "NASA Science — Surveyor 3 mission page", url: "https://science.nasa.gov/mission/surveyor-3" },
      { title: "NASA Science — Apollo 12 and Surveyor 3", url: "https://science.nasa.gov/?p=151143" },
      { title: "JPL — Surveyor 3 Camera Returned from the Moon", url: "https://www.jpl.nasa.gov/blog/2012/1/surveyor-3-camera-returned-from-the-moon" },
      { title: "NASA (1972) — Analysis of Surveyor 3 Material and Photographs Returned by Apollo 12 (PDF)", url: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a12/AnalysSurvIIIMtrial.pdf" },
      { title: "NASA NSSDCA — Surveyor 3 (catalogue entry)", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A" }
    ]
  },

  /* =================================================================
     SOJOURNER
     ================================================================= */
  {
    id: "sojourner",
    name: "Sojourner Rover",
    shortName: "Sojourner",
    destination: "mars",
    year: 1997,
    statusKind: "inactive",
    status: "Silent since September 1997, parked near its lander",
    location: "Ares Vallis, Mars",
    tagline: "The first rover to drive on Mars. About the size of a microwave oven.",
    summary: "A tiny six-wheeled rover delivered by Mars Pathfinder in 1997. It was planned to work for a week and lasted almost three months.",
    heroImage: "pathfinderPanorama",
    cardImage: "sojournerYogi",
    stats: [
      { label: "Launched", value: "4 December 1996" },
      { label: "Landed", value: "4 July 1997" },
      { label: "Planned mission", value: "7 sols" },
      { label: "Actual mission", value: "83 sols" }
    ],
    chapters: [
      {
        title: "My beginning",
        voice: "I weighed about as much as a small dog and stood just thirty centimetres tall. Nobody was sure a wheeled robot could even drive on Mars. I was sent to find out.",
        record: [
          "Sojourner was a small, solar-powered rover carried to Mars by NASA's Mars Pathfinder lander. It had a mass of about 10.6 kilograms and six wheels.",
          "Mars Pathfinder was one of the first missions in NASA's Discovery Program of low-cost missions. Its main goal was to test a new, cheaper way of landing on Mars and to show that a rover could work there.",
          "The mission launched on 4 December 1996 on a Delta II rocket from Cape Canaveral. The rover was named after Sojourner Truth, an American abolitionist and women's rights campaigner, after a naming contest for students."
        ],
        fact: { title: "Small but first", text: "Sojourner was the first rover to drive on another planet." },
        image: "sojournerYogi"
      },
      {
        title: "My mission",
        voice: "We didn't fire rockets all the way to the ground. We wrapped ourselves in airbags and bounced. When we stopped rolling, the lander opened like a flower, and I drove down a ramp onto Mars.",
        record: [
          "Mars Pathfinder landed on 4 July 1997 in Ares Vallis, an ancient flood channel. It used parachutes, rockets and giant airbags, bouncing across the ground before rolling to a stop. The lander then opened its petal-shaped panels.",
          "Sojourner rolled down a ramp onto the surface the next day. The lander, later named the Carl Sagan Memorial Station, acted as its base and radio link to Earth. The rover drove short distances, never more than about 12 metres from the lander.",
          "Sojourner had cameras at the front and back, and an Alpha Proton X-ray Spectrometer (APXS), an instrument that measures which chemical elements a rock contains. Drivers on Earth gave the rover commands, and it used simple hazard sensors to avoid obstacles on its own."
        ],
        fact: { title: "Rock nicknames", text: "The team gave nearby rocks friendly names, like Barnacle Bill, Yogi and Couch, so they could talk about them easily." },
        image: "sojournerRoverView"
      },
      {
        title: "What I discovered",
        voice: "I pressed my instrument against rock after rock. Some were not what scientists expected, and the landscape itself told a story about water.",
        record: [
          "Sojourner analysed the chemistry of rocks and soils near the lander. Some rocks, like Yogi, looked similar to common volcanic basalts on Earth, while others, like Barnacle Bill, had different compositions.",
          "Pathfinder's cameras showed rounded pebbles and a landscape shaped by enormous floods, adding evidence that liquid water once flowed across Mars.",
          "Sojourner sent back about 550 images, and the lander sent back more than 16,000. The lander's weather instruments also recorded temperature, pressure and wind, and its cameras spotted dust devils."
        ],
        fact: { title: "Mars on the early internet", text: "Pathfinder's images were posted online almost in real time, and the mission drew huge crowds of visitors to NASA's website in 1997." },
        image: "pathfinderPanorama"
      },
      {
        title: "My final days",
        voice: "I was only built to last a week. I kept going for nearly three months. Then my lander stopped answering, and I could no longer reach home.",
        record: [
          "Sojourner was designed for a mission of 7 sols (Martian days), with a possible extension to 30. It worked for 83 sols and drove a total of about 100 metres.",
          "The last data from Mars Pathfinder arrived on 27 September 1997. Engineers believe the lander's battery failed after many cycles of charging and discharging, and without the lander, Sojourner had no way to talk to Earth.",
          "Sojourner was never damaged. It simply lost contact. It remains parked near the lander in Ares Vallis."
        ],
        fact: { title: "Current status", text: "Inactive and parked near the Pathfinder lander since 1997. Neither has communicated since." },
        image: "sojournerRoverView"
      },
      {
        title: "My legacy",
        voice: "I was small, but I proved the idea worked. Every rover that came after me is a bigger, smarter version of what I started.",
        record: [
          "Pathfinder and Sojourner proved that airbag landings and small rovers could work on Mars. The airbag method was used again for the Spirit and Opportunity rovers in 2004.",
          "Sojourner was followed by Spirit, Opportunity, Curiosity and Perseverance. Each one grew larger and more capable, but all build on the idea Sojourner first tested: a robot geologist driving from rock to rock.",
          "Its 'faster, better, cheaper' approach also showed that important planetary missions could be done on a smaller budget."
        ],
        fact: { title: "Family tree", text: "Sojourner weighed about 10.6 kg. Perseverance, which landed in 2021, weighs about 1,025 kg, nearly 100 times more." },
        image: "sojournerYogi"
      }
    ],
    timeline: [
      { date: "4 Dec 1996", title: "Launch", text: "Mars Pathfinder launches on a Delta II rocket." },
      { date: "4 Jul 1997", title: "Airbag landing", text: "Pathfinder bounces to a stop in Ares Vallis." },
      { date: "5 Jul 1997", title: "Wheels on Mars", text: "Sojourner drives down the lander's ramp onto the surface." },
      { date: "Jul 1997", title: "Meeting the rocks", text: "The rover studies Barnacle Bill and Yogi with its APXS instrument." },
      { date: "27 Sep 1997", title: "Last data", text: "The lander's final transmission with data arrives on sol 83." },
      { date: "Today", title: "Parked", text: "Sojourner and the lander remain silent in Ares Vallis." }
    ],
    didYouKnow: [
      "A sol is a Martian day. It lasts about 24 hours and 39 minutes.",
      "Sojourner moved very slowly, about 1 centimetre per second, so drivers could plan each move carefully."
    ],
    sources: [
      { title: "NASA JPL — Mars Pathfinder fact sheet (archived PDF)", url: "https://webarchive.library.unt.edu/web/20090813031850/http:/jpl.nasa.gov/news/fact_sheets/mpf.pdf" },
      { title: "NASA Science — Mars Pathfinder mission page", url: "https://science.nasa.gov/mission/mars-pathfinder/" },
      { title: "NASA JPL Photojournal — PIA00664, rover's-eye view of the lander", url: "https://photojournal.jpl.nasa.gov/catalog/PIA00664" },
      { title: "NASA NSSDCA — Mars Pathfinder Rover (catalogue entry)", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A" }
    ]
  },

  /* =================================================================
     OPPORTUNITY
     ================================================================= */
  {
    id: "opportunity",
    name: "Opportunity Rover",
    shortName: "Opportunity",
    destination: "mars",
    year: 2004,
    statusKind: "inactive",
    status: "Silent since June 2018, parked in Perseverance Valley",
    location: "Perseverance Valley, Endeavour Crater, Mars",
    tagline: "Planned for 90 days. Worked for more than 14 years.",
    summary: "A golf-cart-sized robot geologist that found strong evidence of ancient water on Mars and drove further than any off-Earth vehicle before it.",
    heroImage: "oppyArtist",
    cardImage: "oppySelfie",
    stats: [
      { label: "Launched", value: "7 July 2003" },
      { label: "Landed", value: "25 January 2004 (UTC)" },
      { label: "Distance driven", value: "45.16 km" },
      { label: "Planned mission", value: "90 sols" }
    ],
    chapters: [
      {
        title: "My beginning",
        voice: "I had a twin called Spirit. We were sent to opposite sides of Mars with the same question: was this planet ever wet?",
        record: [
          "Opportunity was one of two identical rovers in NASA's Mars Exploration Rover mission. Its twin, Spirit, landed three weeks earlier on the other side of the planet in Gusev Crater.",
          "The rovers' main job was to search for evidence of past water. Opportunity was sent to Meridiani Planum because a NASA orbiter had detected the mineral hematite there from above. On Earth, hematite often forms in water.",
          "Opportunity launched on 7 July 2003 on a Delta II rocket from Cape Canaveral."
        ],
        fact: { title: "Twins", text: "Spirit and Opportunity were about the size of a golf cart and powered by solar panels." },
        image: "oppyArtist"
      },
      {
        title: "My mission",
        voice: "I bounced to a stop inside a small crater, and right in front of me were layers of exposed rock. The scientists called it a hole-in-one.",
        record: [
          "Opportunity landed on 25 January 2004 (UTC) inside a small crater later named Eagle Crater. The crater walls exposed layered bedrock, exactly the kind of rock scientists hoped to study.",
          "It carried a panoramic camera (Pancam), an infrared spectrometer (Mini-TES), two spectrometers on its robotic arm to measure chemistry and iron minerals (APXS and Mössbauer), a Microscopic Imager, and a Rock Abrasion Tool that ground away a rock's weathered surface.",
          "Over the years Opportunity drove from crater to crater: Endurance, Victoria, and finally the huge Endeavour Crater, which it reached in August 2011. In 2005 it got stuck in a sand ripple nicknamed Purgatory Dune for several weeks before drivers carefully freed it."
        ],
        fact: { title: "Clever driving", text: "When one front wheel started drawing too much current, engineers often drove Opportunity backward to make that wheel last longer." },
        image: "oppySelfie"
      },
      {
        title: "What I discovered",
        voice: "The ground around me was scattered with tiny grey spheres. The team called them blueberries. They were a message from Mars' wet past.",
        record: [
          "Opportunity was the first rover to identify and study sedimentary rocks on another planet. Its measurements showed these rocks formed in an environment with water, in ancient shallow, temporary lakes and wet sand flats.",
          "It found small spheres rich in hematite, nicknamed 'blueberries'. They are concretions, which form when minerals carried by groundwater build up inside rock.",
          "At Endeavour Crater, Opportunity found bright veins of gypsum deposited by water flowing through cracks, and clay minerals that formed in water that was not strongly acidic. Of all the places it studied, Endeavour had the friendliest conditions for ancient microbial life.",
          "In 2005, it also found a basketball-sized iron-nickel rock, the first meteorite identified on another planet."
        ],
        fact: { title: "Why it matters", text: "Together, Spirit and Opportunity showed that Mars was likely wetter and warmer in the distant past, conditions that might have supported life." },
        image: "oppyBlueberries"
      },
      {
        title: "My final days",
        voice: "In 2018 a dust storm wrapped the whole planet. My sky went dark, my solar panels went hungry, and I fell asleep.",
        record: [
          "By 2018 Opportunity had been working for more than 14 years, far beyond its planned 90 sols. It had survived earlier dust storms, a failed flash memory in 2015, and steering problems.",
          "In June 2018, one of the most intense dust storms ever observed on Mars covered the entire planet. The darkness meant Opportunity's solar panels could no longer recharge its batteries. Its last communication was received on 10 June 2018.",
          "Engineers sent more than a thousand recovery commands over eight months. On 13 February 2019, NASA declared the mission complete. Opportunity remains in Perseverance Valley, on the western rim of Endeavour Crater."
        ],
        fact: { title: "Myth check", text: "A famous online line says Opportunity's last words were \"My battery is low and it's getting dark.\" That was a journalist's poetic summary of the data, not a message the rover sent." },
        image: "oppyEndurance"
      },
      {
        title: "My legacy",
        voice: "I travelled more than a marathon across Mars. The lessons learned from driving me, and keeping me alive, travel on with every rover since.",
        record: [
          "Opportunity drove 45.16 kilometres, setting the record in 2014 for the longest distance driven on another world.",
          "Curiosity (2012) and Perseverance (2021) were designed using lessons from Spirit and Opportunity, including how rovers drive autonomously, use 3D vision to navigate, and make their own science observations.",
          "Opportunity's long life also showed the value of careful engineering and patient teamwork. Many people who worked on it went on to other missions exploring the Solar System."
        ],
        fact: { title: "Record holder", text: "Opportunity worked on the surface of Mars longer than any robot before it, more than 14 years." },
        image: "oppyMeteorite"
      }
    ],
    timeline: [
      { date: "7 Jul 2003", title: "Launch", text: "Opportunity launches from Cape Canaveral on a Delta II rocket." },
      { date: "25 Jan 2004", title: "Hole-in-one", text: "It lands inside Eagle Crater on Meridiani Planum." },
      { date: "2004", title: "Blueberries", text: "Hematite spherules and layered rock reveal a watery past." },
      { date: "Apr 2005", title: "Stuck", text: "It digs into Purgatory Dune and is freed after several weeks." },
      { date: "Aug 2011", title: "Endeavour Crater", text: "After a three-year drive it reaches Endeavour and later finds gypsum veins." },
      { date: "2014", title: "Distance record", text: "It becomes the vehicle with the longest drive on another world." },
      { date: "10 Jun 2018", title: "Last contact", text: "A planet-wide dust storm cuts off its solar power." },
      { date: "13 Feb 2019", title: "Mission complete", text: "NASA ends the mission after more than a thousand recovery attempts." }
    ],
    didYouKnow: [
      "Opportunity's planned 90-sol mission lasted more than 5,000 sols.",
      "Wind sometimes blew dust off Opportunity's solar panels, giving it an unexpected boost of power."
    ],
    sources: [
      { title: "NASA Science — Six Things to Know About NASA's Opportunity Rover", url: "https://science.nasa.gov/missions/mer/six-things-to-know-about-nasas-opportunity-rover" },
      { title: "NASA Science — NASA's Opportunity Rover Mission on Mars Comes to End", url: "https://science.nasa.gov/missions/mer/nasas-opportunity-rover-mission-on-mars-comes-to-end" },
      { title: "NASA Astrobiology — Opportunity Rover Mission Comes to an End", url: "https://astrobiology.nasa.gov/news/opportunity-rover-mission-comes-to-an-end/" },
      { title: "NASA NSSDCA — MER-B Opportunity (catalogue entry)", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A" }
    ]
  },

  /* =================================================================
     INGENUITY
     ================================================================= */
  {
    id: "ingenuity",
    name: "Ingenuity Mars Helicopter",
    shortName: "Ingenuity",
    destination: "mars",
    year: 2021,
    statusKind: "grounded",
    status: "Grounded at Valinor Hills; set up to keep logging data on board",
    location: "Valinor Hills, Jezero Crater, Mars",
    tagline: "The first aircraft to make a powered, controlled flight on another planet.",
    summary: "A 1.8 kg helicopter that hitched a ride on Perseverance. Planned for five test flights, it flew 72 times.",
    heroImage: "ingenuityTwoYears",
    cardImage: "ingenuityTwoYears",
    stats: [
      { label: "Launched", value: "30 July 2020" },
      { label: "First flight", value: "19 April 2021" },
      { label: "Flights", value: "72" },
      { label: "Total flight time", value: "More than 2 hours" }
    ],
    chapters: [
      {
        title: "My beginning",
        voice: "I travelled to Mars folded up under a rover's belly. I was an experiment. If I failed, the main mission would carry on without me. If I succeeded, I would make history.",
        record: [
          "Ingenuity was a small robotic helicopter with a mass of about 1.8 kilograms (4 pounds), built by NASA's Jet Propulsion Laboratory as a technology demonstration.",
          "It launched on 30 July 2020 attached to the underside of the Perseverance rover, and landed with it in Jezero Crater on 18 February 2021.",
          "Flying on Mars is hard: the air is only about 1% as dense as Earth's at sea level. To get enough lift, Ingenuity's two stacked rotors, each about 1.2 metres across, spun in opposite directions at roughly 2,400 revolutions per minute."
        ],
        fact: { title: "A piece of history on board", text: "Ingenuity carried a small swatch of fabric from the Wright brothers' 1903 Flyer, the first powered aircraft on Earth." },
        image: "ingenuityConcept"
      },
      {
        title: "My mission",
        voice: "Mars is too far away for anyone to fly me with a joystick. Every flight, I was on my own: I took off, followed my plan, and landed by myself.",
        record: [
          "Radio signals take several minutes to travel between Earth and Mars, so Ingenuity flew autonomously. The team uploaded a flight plan, and the helicopter used its own sensors and navigation camera to stay on course.",
          "On 19 April 2021, Ingenuity rose about 3 metres, hovered and landed, the first powered, controlled flight on another planet. The airfield was later named Wright Brothers Field.",
          "Its original plan was up to five flights in about 30 days. After succeeding, it moved into a new role: scouting ahead for Perseverance, taking aerial photos to help the science team choose where the rover should go."
        ],
        fact: { title: "Perseverance as a phone", text: "Ingenuity could not talk to Earth directly. It sent its data to Perseverance, which relayed it home." },
        image: "ingenuityThreeForks"
      },
      {
        title: "What I discovered",
        voice: "My discoveries were not about rocks. They were about air, about what it takes to fly where almost nobody thought flying was possible.",
        record: [
          "Ingenuity proved that powered flight works in Mars' thin atmosphere. Over almost three years it flew 72 times, travelled about 17 kilometres, more than 14 times farther than planned, and reached heights of up to about 24 metres.",
          "Its colour and navigation cameras returned aerial views of the terrain, which helped plan routes for Perseverance and showed how aircraft can add a new viewpoint to planetary exploration.",
          "The team also learned how a helicopter copes with Martian dust, cold winter nights, rough terrain and seasonal changes in air density, information that is valuable for designing future Mars aircraft."
        ],
        fact: { title: "Beyond expectations", text: "Ingenuity flew more than 14 times farther than planned and logged more than two hours of flight time." },
        image: "ingenuityTwoYears"
      },
      {
        title: "My final days",
        voice: "On my 72nd flight, something went wrong as I came down to land. My rotor blades were damaged and I could no longer fly. But I wasn't switched off. I was given one last job.",
        record: [
          "On 18 January 2024, Ingenuity made a short flight to check its position after an emergency landing on its previous flight. During the descent it lost contact with Perseverance. When contact returned the next day, images showed that one or more rotor blades had been damaged.",
          "NASA announced the end of its flying mission on 25 January 2024. A later NASA investigation concluded the most likely cause was that its navigation system could not find enough surface features over smooth, featureless sand, leading to a hard landing.",
          "The team installed new software so Ingenuity could act as a stationary testbed, waking each day to check its systems, record temperatures and take a photo, storing the data on board. Its memory could hold about 20 years of this daily data. The final transmission was received on 16 April 2024, and Perseverance has since driven out of communications range."
        ],
        fact: { title: "Current status", text: "Grounded at Valinor Hills and out of contact with Earth. It was programmed to keep collecting data until a part fails or dust covers its solar panel, so whether it is still running today cannot be checked from Earth." },
        image: "ingenuityValinor"
      },
      {
        title: "My legacy",
        voice: "I opened the sky of another world. The next flying explorers will be bigger, stronger and go further, and somewhere on Mars I'll be waiting with my last gift of data.",
        record: [
          "Ingenuity showed that aircraft can be a practical tool for exploring other planets, offering views and access that rovers cannot.",
          "Its success led NASA to study larger Mars helicopters for future missions, including concepts that could carry science instruments or scout terrain for rovers and astronauts.",
          "NASA's Dragonfly mission, a nuclear-powered rotorcraft planned to explore Saturn's moon Titan, will continue the idea of flying explorers on other worlds."
        ],
        fact: { title: "A last gift", text: "NASA's project manager said that whenever humanity revisits Valinor Hills, Ingenuity will be waiting with its stored data." },
        image: "ingenuityValinor"
      }
    ],
    timeline: [
      { date: "30 Jul 2020", title: "Launch", text: "Ingenuity launches attached to the Perseverance rover." },
      { date: "18 Feb 2021", title: "Arrival", text: "It lands in Jezero Crater, still tucked under Perseverance." },
      { date: "3 Apr 2021", title: "Dropped off", text: "Perseverance lowers Ingenuity onto the Martian surface." },
      { date: "19 Apr 2021", title: "First flight", text: "The first powered, controlled flight on another planet." },
      { date: "2021–2023", title: "Scout", text: "Ingenuity scouts terrain ahead of Perseverance." },
      { date: "18 Jan 2024", title: "Flight 72", text: "Its final flight ends with damaged rotor blades." },
      { date: "16 Apr 2024", title: "Goodbye", text: "The team receives its final transmission." }
    ],
    didYouKnow: [
      "Ingenuity's final resting place, Valinor Hills, was named after a land in J.R.R. Tolkien's stories.",
      "Each night on Mars, Ingenuity had to use energy from its solar-charged batteries just to keep its electronics warm."
    ],
    sources: [
      { title: "NASA — NASA's Ingenuity Mars Helicopter Team Says Goodbye … for Now", url: "https://www.nasa.gov/solar-system/nasas-ingenuity-mars-helicopter-team-says-goodbye-for-now/" },
      { title: "JPL — Ingenuity team says goodbye (April 2024)", url: "https://www.jpl.nasa.gov/news/nasas-ingenuity-mars-helicopter-team-says-goodbye-for-now" },
      { title: "NASA — Mars Helicopter technology page", url: "https://mars.nasa.gov/technology/helicopter" },
      { title: "NASA JPL Photojournal — PIA25881, Ingenuity at two years", url: "https://photojournal.jpl.nasa.gov/catalog/PIA25881" }
    ]
  },

  /* =================================================================
     PIONEER 10
     ================================================================= */
  {
    id: "pioneer10",
    name: "Pioneer 10",
    shortName: "Pioneer 10",
    destination: "deep",
    year: 1972,
    statusKind: "travelling",
    status: "Silent since 2003, still coasting out of the Solar System",
    location: "Heading toward the star Aldebaran",
    tagline: "The first spacecraft to cross the asteroid belt and fly past Jupiter.",
    summary: "Launched in 1972 for a 21-month mission, Pioneer 10 kept sending signals for more than 30 years. It is still travelling outward today.",
    heroImage: "pioneerOuter",
    cardImage: "pioneerJupiter",
    stats: [
      { label: "Launched", value: "2 March 1972" },
      { label: "Jupiter flyby", value: "December 1973" },
      { label: "Last signal", value: "23 January 2003" },
      { label: "Planned mission", value: "21 months" }
    ],
    chapters: [
      {
        title: "My beginning",
        voice: "Between Mars and Jupiter lies a belt of rocks. In 1972 nobody knew if a spacecraft could get through it. I was the one who went first.",
        record: [
          "Pioneer 10 was a NASA spacecraft managed by NASA's Ames Research Center. It launched on 2 March 1972 (US time) on an Atlas-Centaur rocket from Cape Canaveral.",
          "Its main goals were to cross the asteroid belt safely, study the space environment between the planets, and make the first close-up study of Jupiter.",
          "Because sunlight is very weak near Jupiter, Pioneer 10 did not use solar panels. It was the first spacecraft to use all-nuclear electrical power, from radioisotope thermoelectric generators (RTGs) that turn heat from decaying plutonium into electricity."
        ],
        fact: { title: "Small spacecraft, big trip", text: "Pioneer 10 had a mass of about 258 kilograms, and its large dish antenna was 2.74 metres across." },
        image: "pioneerLaunch"
      },
      {
        title: "My mission",
        voice: "I spun slowly as I flew, like a top, to keep myself steady. My dish pointed home, and my instruments listened to the radiation, dust and magnetic fields all around me.",
        record: [
          "Pioneer 10 entered the asteroid belt on 15 July 1972 and came through safely in early 1973, showing that the belt was much less dangerous than some had feared.",
          "It carried instruments to measure magnetic fields, charged particles, cosmic rays, dust and ultraviolet and infrared light, as well as an imaging photopolarimeter that built up pictures of Jupiter line by line as the spacecraft spun.",
          "Pioneer 10 made its closest approach to Jupiter on 4 December 1973 (UT; 3 December in the US), passing about 130,000 kilometres above the cloud tops at roughly 126,000 km/h."
        ],
        fact: { title: "Spin to win", text: "Pioneer 10 was spin-stabilised. Its rotation kept it pointed in a steady direction without needing constant thruster firings." },
        image: "pioneerKick"
      },
      {
        title: "What I discovered",
        voice: "Jupiter's radiation was fierce. Some of my circuits were hit and I made errors, but I kept working and sent home pictures no one had ever seen.",
        record: [
          "Pioneer 10 returned the first close-up images of Jupiter, including views of the Great Red Spot and the first close-up images of its moon Ganymede.",
          "It measured Jupiter's intense radiation belts and its huge magnetic field, which extends far into space. This information helped engineers design later spacecraft, including Voyager, to survive near the giant planet.",
          "After Jupiter, Pioneer 10 kept sending measurements of the solar wind and cosmic rays from the outer Solar System for decades."
        ],
        fact: { title: "A message to the stars", text: "Pioneer 10 carries a gold-anodised plaque designed by Carl Sagan and Frank Drake, showing a man, a woman, and the Sun's location using a map of pulsars." },
        image: "pioneerPlaque"
      },
      {
        title: "My final days",
        voice: "My nuclear heart grew weaker every year. My voice became a whisper that only the largest antennas could hear. And then it was gone. But I never stopped moving.",
        record: [
          "Pioneer 10 crossed the orbit of Neptune on 13 June 1983. Until February 1998, when Voyager 1 overtook it, it was the most distant human-made object.",
          "NASA ended routine contact on 31 March 1997, but the Deep Space Network continued to track its signal for an engineering study. The last telemetry data came back on 27 April 2002.",
          "Its last, very weak signal was received on 23 January 2003, from about 12.2 billion kilometres away. Its power source had decayed too far to transmit again, and a contact attempt in February 2003 heard nothing."
        ],
        fact: { title: "Current status", text: "Silent but still travelling. Pioneer 10 is coasting toward the red star Aldebaran, about 68 light-years away. NASA estimates the journey will take more than 2 million years." },
        image: "pioneerOuter"
      },
      {
        title: "My legacy",
        voice: "I went first, so that others could go further. Somewhere out in the dark I'm still carrying a picture of the people who sent me.",
        record: [
          "Pioneer 10 proved that spacecraft could cross the asteroid belt and survive a close encounter with Jupiter, opening the way to the outer planets.",
          "Its sister ship, Pioneer 11, followed in 1973 and became the first spacecraft to fly past Saturn. The Voyager missions that followed in 1977 built on what both Pioneers learned.",
          "Originally designed for a 21-month mission, Pioneer 10 kept returning data for more than 30 years, and it continues to carry its plaque, a message from humanity, out into interstellar space."
        ],
        fact: { title: "Why it matters", text: "Pioneer 10 was humanity's first true step toward the outer Solar System and beyond." },
        image: "pioneerJupiter"
      }
    ],
    timeline: [
      { date: "2 Mar 1972", title: "Launch", text: "Pioneer 10 lifts off from Cape Canaveral on an Atlas-Centaur." },
      { date: "15 Jul 1972", title: "Asteroid belt", text: "It becomes the first spacecraft to enter the asteroid belt." },
      { date: "Dec 1973", title: "Jupiter", text: "First close-up flyby of Jupiter." },
      { date: "13 Jun 1983", title: "Past Neptune's orbit", text: "It travels beyond the orbit of the outermost planet." },
      { date: "17 Feb 1998", title: "Overtaken", text: "Voyager 1 passes it as the most distant human-made object." },
      { date: "23 Jan 2003", title: "Last signal", text: "A final, very faint signal reaches Earth." },
      { date: "Today", title: "Still travelling", text: "Coasting silently toward Aldebaran." }
    ],
    didYouKnow: [
      "Pioneer 10's last signal took about 11 hours to reach Earth, travelling at the speed of light.",
      "Pioneer 10 was designed to last 21 months. It sent data for more than 30 years."
    ],
    sources: [
      { title: "NASA Science — Pioneer 10 mission page", url: "https://science.nasa.gov/mission/pioneer-10" },
      { title: "NASA news release via Spaceflight Now — Pioneer 10 sends last signal (2003)", url: "https://spaceflightnow.com/news/n0302/25pioneer10" },
      { title: "NASA Ames via Phys.org — Ames celebrates the 40th anniversary of Pioneer 10", url: "https://phys.org/news/2012-03-ames-celebrates-40th-anniversary.html" },
      { title: "NASA NSSDCA — Pioneer 10 (catalogue entry)", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A" }
    ]
  }
];

/* ---------------------------------------------------------------------
   4. GENERAL "DID YOU KNOW?" FACTS (homepage widget)
   --------------------------------------------------------------------- */
const GENERAL_FACTS = [
  "There is no wind or rain on the Moon, so the Apollo astronauts' bootprints could last for a very long time.",
  "Light takes about 1.3 seconds to travel from the Moon to Earth.",
  "Radio signals between Earth and Mars take between about 3 and 22 minutes each way, so Mars robots can't be driven live.",
  "The air on Mars is only about 1% as dense as Earth's air at sea level.",
  "NASA's Space Science Data Coordinated Archive (NSSDCA) keeps a public catalogue of almost every spacecraft ever launched.",
  "Pioneer 10 crossed Neptune's orbit in 1983, more than six years before Voyager 2 flew past Neptune itself.",
  "Surveyor 3's camera spent about two and a half years on the Moon before astronauts brought it home.",
  "Opportunity drove more than the length of a marathon on Mars."
];
/* Add each explorer's own facts to the general list. */
EXPLORERS.forEach(function (explorer) {
  explorer.didYouKnow.forEach(function (fact) {
    GENERAL_FACTS.push(fact);
  });
});

/* ---------------------------------------------------------------------
   5. GENERAL REFERENCES (Sources page)
   --------------------------------------------------------------------- */
const GENERAL_SOURCES = [
  { title: "NASA Space Apps Challenge 2026 — Abandoned but not Forgotten (challenge page)", url: "https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/" },
  { title: "NASA Space Science Data Coordinated Archive (NSSDCA) — Master Catalog", url: "https://nssdc.gsfc.nasa.gov/nmc/" },
  { title: "NASA Science — Missions", url: "https://science.nasa.gov/" },
  { title: "NASA JPL Photojournal", url: "https://photojournal.jpl.nasa.gov/" },
  { title: "Wikimedia Commons — archive of public-domain NASA images used on this site", url: "https://commons.wikimedia.org/" }
];

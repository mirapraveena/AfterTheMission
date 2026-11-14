"""
AFTER THE MISSION - download_images.py
---------------------------------------
OPTIONAL. By default the website loads NASA images straight from
Wikimedia Commons. If you'd rather keep copies inside the project
(for example, to demo without internet), run this script once:

    python tools/download_images.py

It reads every image file name from js/equipment.js, downloads a
1600-pixel-wide copy into the images/ folders, and names each file
the same way main.js expects. Then open js/equipment.js and change

    const IMAGE_MODE = "remote";   to   const IMAGE_MODE = "local";

Only uses the Python standard library - nothing to install.
"""

import os
import re
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(ROOT, "js", "equipment.js")
WIDTH = 1600

# Wikimedia asks scripts to identify themselves with a User-Agent.
HEADERS = {"User-Agent": "AfterTheMissionSpaceApps/1.0 (student project; image download)"}


def safe_name(file_name):
    """Same rule as imageUrl() in main.js: keep letters, numbers, . _ -"""
    return re.sub(r"[^A-Za-z0-9._-]", "_", file_name)


def read_images():
    """Find each  file: "..."  followed by  folder: "..."  in equipment.js."""
    text = open(DATA_FILE, encoding="utf-8").read()
    pattern = re.compile(r'file:\s*"([^"]+)",\s*folder:\s*"([^"]+)"')
    return pattern.findall(text)


def main():
    images = read_images()
    print(f"Found {len(images)} images in equipment.js")
    for file_name, folder in images:
        target_dir = os.path.join(ROOT, "images", folder)
        os.makedirs(target_dir, exist_ok=True)
        target = os.path.join(target_dir, safe_name(file_name))
        if os.path.exists(target):
            print("  already have", file_name)
            continue
        url = ("https://commons.wikimedia.org/wiki/Special:FilePath/"
               + urllib.parse.quote(file_name) + f"?width={WIDTH}")
        try:
            request = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(request, timeout=60) as response:
                data = response.read()
            with open(target, "wb") as out:
                out.write(data)
            print("  saved", folder + "/" + safe_name(file_name))
        except Exception as error:  # keep going if one image fails
            print("  FAILED", file_name, "-", error)
        time.sleep(0.5)  # be polite to the server
    print("Done. Now set IMAGE_MODE = \"local\" in js/equipment.js")


if __name__ == "__main__":
    main()

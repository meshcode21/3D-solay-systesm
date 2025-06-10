# 3D Solar System Simulation (Three.js)

A mobile-responsive web app built with **Three.js** that visualizes the solar system in 3D. Planets orbit around the Sun with adjustable speeds, pause/resume control, and realistic lighting with background stars.

---

## 🚀 Features

- 🌞 Textured Sun with emissive lighting
- 🪐 All 8 planets orbiting the Sun
- 🔁 Orbits visualized using `LineLoop`
- 🎛️ Real-time speed control via sliders
- ⏯️ Pause / Resume button with dynamic icon
- 🌌 Starfield background (8k sky texture)
- 🖱️ Mouse interaction with `OrbitControls`
- 🌗 Responsive UI panel + Reset speed button

---

## 📂 Folder Structure

```
/solar-system/
├── index.html
├── script.js
├── style.css
├── OrbitControls.js
└── res/
    ├── 2k_sun.jpg
    ├── 8k_stars.jpg
    ├── pause.svg
    └── play.svg
```

---

## 🛠️ Setup Instructions

### 1. Clone or download this repo

```
git clone https://github.com/meshcode21/3D-solay-systesm.git
```

### 2. Open `index.html` in your browser

Use **Live Server** in VS Code or any static file server for best results.

but direct lunching `index.html` get problem to run properly.

> No build tools or NPM required

---

## 🎥 Demo Video Checklist

Make sure to show:

1. The rotating and orbiting solar system in motion
2. Changing planet speeds using sliders
3. Pause and resume animation using the icon button
4. Orbit paths and starry sky in the background
5. Folder and code walkthrough (especially how planets and orbits were created)

---

## 🧠 Technologies Used

- [Three.js](https://threejs.org/) 
- JavaScript (no frameworks)
- HTML5 + CSS3
- OrbitControls.js (local file)

---

## 📌 Notes

- Make sure `OrbitControls.js` is downloaded locally (not from CDN)
- All assets should be placed in the `res/` folder for organization
- Compatible with all modern browsers (Chrome, Edge, Firefox)

---
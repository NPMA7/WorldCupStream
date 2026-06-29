# GateStream ⚽🔥

**GateStream** is a sleek, modern, and ad-free web application designed for streaming premium live sports directly in your browser. 

Built with a focus on premium aesthetics and uninterrupted user experience, GateStream automatically fetches live match schedules, circumvents intrusive ads from raw streaming sources, and provides a beautiful interface for both live and upcoming matches.

![GateStream UI](img/gatestream_logo.png) 

## ✨ Features

- **Ad-Free Streaming**: Cleverly bypasses popup/popunder ads from the original stream providers by embedding the raw player directly in a clean page.
- **Smart Countdown UI**: Clicking on an upcoming match displays a sleek, glassmorphic countdown timer showing exactly when the match starts. It automatically transitions to the live stream when the timer hits zero!
- **Clean Match URLs**: URLs are cleanly formatted with team names (e.g. `?match=brazil-vs-japan`) while dynamically fetching metadata behind the scenes to keep addresses neat and readable.
- **Dynamic Live Schedules**: Automatically fetches and filters live sports match data from a third-party API.
- **Vertical Server Selector**: A built-in channel selector sidebar sits neatly next to the video player on desktop, allowing you to instantly switch between different streaming servers (CH 1 to CH 6).
- **Premium Flat Design**: Built using modern vanilla CSS with solid cyan accents, flat minimalist buttons, custom scrollbars, and smooth micro-animations.
- **Fully Responsive**: Perfectly adapts to any screen size, whether you're on a desktop, tablet, or smartphone.
- **WIB Timezone**: Match times are automatically formatted to Waktu Indonesia Barat (WIB).

## 🚀 How It Works

GateStream uses Vanilla JavaScript to dynamically fetch a `matches.json` API. 
1. **Live Matches**: Displayed with a red "Live Now" badge on `index.html`. Clicking them opens the stream player on `stream.html`.
2. **Upcoming Matches**: Displayed with the remaining time. Clicking them opens the beautiful Countdown UI on `stream.html`.

## 💻 Tech Stack

- **HTML5**: Semantic structure split across dashboard and streaming pages.
- **CSS3 (Vanilla)**: Advanced CSS variables, glassmorphism (`backdrop-filter`), CSS Grid/Flexbox, and keyframe animations.
- **JavaScript (Vanilla)**: Asynchronous data fetching, dynamic DOM manipulation, and countdown timers.

## 🛠️ Getting Started

Because GateStream relies entirely on client-side web technologies, you don't need any complex backend setup to run it!

1. **Clone the repository**
   ```bash
   git clone https://github.com/NPMA7/WorldCupStream.git
   cd WorldCupStream
   ```

2. **Run Locally**
   You can open `index.html` directly in your browser, but to prevent CORS issues with local files, it's recommended to use a simple local server:
   ```bash
   # If you have Node.js installed:
   npx serve .
   
   # Or using Python:
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` or `http://localhost:3000` in your browser.

## 🎨 UI/UX Highlights

- **Custom Scrollbar**: Dark mode integrated slim scrollbars.
- **Neon Orbs Background**: Floating ambient lights that give the UI depth.
- **Hover Effects**: 3D card lifting effects with glowing shadows.

## 📝 License

This project is open-source and free to use. 
*(Note: Streaming sources are dynamically fetched from third-party APIs and are not hosted or controlled by this repository).*

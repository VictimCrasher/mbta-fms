# Fleet Management System

<p align="center">
  <a href="https://fms.victim-crasher.com/" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%8C%90%20Live%20Website-20B2AA?style=for-the-badge"></img>
  </a>
  <a href="https://youtu.be/8PO5DqPvxao" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%8E%A5%20Explanation%20%26%20Demo%20Video-ED125F?style=for-the-badge"></img>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-7-9135FF?logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind-4.2-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/DaisyUI-5.5-FFC63A?logo=daisyui" />
</p>

A simple Fleet Management System using MBTA API.  
Part of Transjakarta Technical Test

## Architecture

- ⚛️ **React 19 with Vite + TypeScript**, ensuring blazing fast PWA app creation with easy deployment strategy
- 🎨 **Tailwind CSS** for styling management, ensuring faster inline styling
- 🖌️ **DaisyUI** for UI Library, ensuring faster development speed and minimizes styling repetition
- ⚡ **Axios** for API Integrations, ensuring safety and convenience
- 🗺️ **Leaflet and React Leaflet** for Map Integrations, ensuring easier implementation without the need of additional API key and payments
- ♾️ **React Infinte Scroll Component** for Infinite Scroll Implementation, easy to setup and works out of the box.

### Q&A regarding Architecture Decision

**Why not NextJS?**  
Since this is a simple PWA app, we don't additional feature like SSR and dynamic routing.  
It'll also enables deployment on a regular hosting provider out of the box since we don't need additional NodeJS runtime for the app once deployed.

**Why not Vite 8?**  
Vite 8 was released on March 12, 2026. As of this time of writing (March 17, 2026) Tailwind Vite doesn't support Vite 8 out of the box yet.

## Setup

### Prerequisities
Please kindly download these first if you don't have yet  

|Tool|Version|Download Link|
|---|---|---|
|NodeJS*|20.19+|[Download Here](https://nodejs.org/en)|
|Git (For cloning - recommended)|Latest|[Download Here](https://git-scm.com/)|

*Alternatively, you can use nvm if you want to have multiple node instances

### 1. Clone the repository

```bash
git clone https://github.com/VictimCrasher/mbta-fms.git
cd mbta-fms
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Env

Create a `.env` file in the root directory with your these configuration:

```env
VITE_API_URL=https://api-v3.mbta.com
VITE_API_KEY=xxxxxxxxxx
```

API Key is **optional but encouraged** since it'll increase the API rate limit from 20 to 1000 per minutes  
You can get the API key on MBTA Website [https://api-v3.mbta.com/](https://api-v3.mbta.com/)

### 4. Run Development Server

```bash
npm run dev
```

The app is now accessible at [http://localhost:5173/](http://localhost:5173/)

### 5. Build for Production

```bash
npm run build
```

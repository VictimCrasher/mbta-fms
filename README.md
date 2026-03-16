# Fleet Management System

A simple Fleet Management System using MBTA API.

## Architecture

- ⚛️ **React 19 with Vite + TypeScript**, ensuring blazing fast PWA app creation with easy deployment strategy 
- 🎨 **Tailwind CSS** for styling management, ensuring faster inline styling
- 🖌️ **DaisyUI** for UI Library, ensuring faster development speed and minimizes styling repetition
- ⚡ **Axios** for API Integrations, ensuring safety and convenience
- 🗺️ **Leaflet and React Leaflet** for Map Integrations, ensuring easier implementation without the need of additional API key and payments
<br />
<br />
> **Why not NextJS?**  
Since this is a simple PWA app, we don't additional feature like SSR and dynamic routing.  
It'll also enables deployment on a regular hosting provider out of the box since we don't need additional NodeJS runtime for the app once deployed.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Env

Create a `.env` file in the root directory with your these configuration:

```env
VITE_API_URL=https://api-v3.mbta.com
VITE_API_KEY=xxxxxxxxxx
```

API Key is **optional but encouraged** since it'll increase the API rate limit from 20 to 1000 per minutes  
You can get the API key on MBTA Website [https://api-v3.mbta.com/](https://api-v3.mbta.com/)

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

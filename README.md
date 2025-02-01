# Echo-Atlas

## Overview
Echo-Atlas is an interactive web application that allows users to explore music artists and their similarities in a visual format. It leverages Spotify and Last.fm APIs to dynamically generate artist maps based on related artist connections and user interactions.

## Features
- **Search for Artists:** Enter an artist's name to find related artists.
- **Interactive Graph:** Visualize artists as nodes, connected based on similarity scores.
- **Dynamic Exploration:** Click on artist nodes to expand connections.
- **Data Caching:** Uses MongoDB to cache artist data and avoid redundant API calls.
- **Spotify and Last.fm Integration:** Fetches real-time data for artists and songs.

## Technologies Used
- **Frontend:** Next.js, React, Tailwind CSS, D3.js
- **Backend:** Node.js, Express, MongoDB
- **APIs:** Spotify API, Last.fm API

## Installation
### Prerequisites
- Node.js (v16+)
- MongoDB
- Spotify API credentials
- Last.fm API key

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Khaspper/echo-atlas.git
   cd echo-atlas
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env`):
   ```sh
  # Spotify
  NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
  NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

  # Last.fm
  NEXT_PUBLIC_LASTFM_API_KEY=your_lastfm_api_key

  # MongoDB
  NEXT_PUBLIC_MONGO_URI=your_mongodb_connection_string
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open your browser and visit `http://localhost:3000`

## API Endpoints
### **Artist Endpoints**
- `GET /api/get-artist`: Retrieve all artists from the database.
- `POST /api/save-artist`: Save artist details and related artists.

### **Song Endpoints**
- `GET /api/get-song`: Fetch song details from the database.
- `POST /api/save-song`: Save song details and similar songs.

## Components
### **Artist Graph (`ArtistGraph.tsx`)**
- Uses D3.js to render a dynamic graph of artists.
- Allows zoom, pan, and click interactions.

### **Explore Page (`explore.tsx`)**
- Handles user searches and fetches artist data dynamically.
- Displays the artist graph and vinyl records.

## Future Enhancements
- Add a recommendation engine for music discovery.
- Add a song map similar to the artists map.
- Deploy the app to Vercel for live access.

import ResourceCard from "./ResourceCard";

function Music() {
  const musicApps = [
    {
      title: "Spotify",
      description: "Popular music streaming service with millions of songs and podcasts.",
      url: "https://www.spotify.com",
      type: "Music App",
      cost: "Free"
    },
    {
      title: "YouTube Music",
      description: "Explore music playlists, albums, and music videos from YouTube.",
      url: "https://music.youtube.com",
      type: "Music App",
      cost: "Free"
    },
    {
      title: "Apple Music",
      description: "Premium music streaming service by Apple with high-fidelity tracks.",
      url: "https://www.apple.com/apple-music/",
      type: "Music App",
      cost: "Paid"
    },
    {
      title: "SoundCloud",
      description: "Discover new artists, indie music releases, and user podcasts.",
      url: "https://soundcloud.com",
      type: "Music App",
      cost: "Free"
    },
    {
      title: "Amazon Music",
      description: "Music streaming service included with Prime or premium tracks.",
      url: "https://music.amazon.com",
      type: "Music App",
      cost: "Paid"
    },
    {
      title: "Pandora",
      description: "Personalized radio stations and playlist discovery service.",
      url: "https://www.pandora.com",
      type: "Music App",
      cost: "Free"
    }
  ];

  return (
    <div className="container" style={{ padding: 0 }}>
      <h2>Music Applications</h2>
      <p style={{ margin: "0.5rem 0 1.5rem 0", color: "var(--text-secondary)" }}>
        Listen to music playlists and study soundtracks while coding.
      </p>
      
      <div className="resources-grid">
        {musicApps.map((app) => (
          <ResourceCard key={app.title} {...app} />
        ))}
      </div>
    </div>
  );
}

export default Music;

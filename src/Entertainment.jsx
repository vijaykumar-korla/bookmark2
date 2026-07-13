import ResourceCard from "./ResourceCard";

function Entertainment() {
  const entertainmentSites = [
    {
      title: "Netflix",
      description: "Watch TV shows, movies, documentaries, and original series online.",
      url: "https://www.netflix.com",
      type: "Entertainment",
      cost: "Paid"
    },
    {
      title: "Amazon Prime Video",
      description: "Stream popular movies, award-winning originals, and sports.",
      url: "https://www.primevideo.com",
      type: "Entertainment",
      cost: "Paid"
    },
    {
      title: "Disney+ Hotstar",
      description: "Watch live sports, Indian TV serials, movies, and Disney shows.",
      url: "https://www.hotstar.com",
      type: "Entertainment",
      cost: "Paid"
    },
    {
      title: "IMDb",
      description: "Search ratings, reviews, and cast details for movies and TV shows.",
      url: "https://www.imdb.com",
      type: "Entertainment",
      cost: "Free"
    },
    {
      title: "Twitch",
      description: "Live streaming platform for gaming, music, and esports content.",
      url: "https://www.twitch.tv",
      type: "Entertainment",
      cost: "Free"
    },
    {
      title: "YouTube",
      description: "Watch music videos, vlogs, comedy shows, and trending videos.",
      url: "https://www.youtube.com",
      type: "Entertainment",
      cost: "Free"
    }
  ];

  return (
    <div className="container" style={{ padding: 0 }}>
      <h2>Entertainment Platforms</h2>
      <p style={{ margin: "0.5rem 0 1.5rem 0", color: "var(--text-secondary)" }}>
        Explore popular video streaming, gaming, and movie review platforms.
      </p>
      
      <div className="resources-grid">
        {entertainmentSites.map((site) => (
          <ResourceCard key={site.title} {...site} />
        ))}
      </div>
    </div>
  );
}

export default Entertainment;

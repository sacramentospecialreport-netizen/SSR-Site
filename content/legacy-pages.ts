export type Story = {
  slug: string; title: string; section: string; summary: string;
  byline: string; minutes: string; body?: string[];
};

export const featuredStories: Story[] = [
  { slug: "hawk-tuah-patio", title: "Hawk Tuah Girl, Sacramento Sensation, Receives Brand New Patio", section: "Sacramento", summary: "A local podcaster has purchased a vanity patio made predominantly from recycled acrylic nails and guaranteed for 13 Martian years.", byline: "SSR Newsroom", minutes: "5", body: ["A local podcaster recently purchased a brand new vanity patio, courtesy of businessman Pete Draught.", "The patio was constructed using only the finest materials, predominantly recycled acrylic nails. It is said to be guaranteed for use up to 13 Martian years."] },
  { slug: "fish-populations-rebound", title: "Fish Populations Rebound After Wildlife Department Raises License Fees", section: "Environment", summary: "Denizens of the Sacramento River rejoiced after higher costs for local fishermen appeared to give aquatic life an unexpected reprieve.", byline: "Gerald Higgins", minutes: "8" },
  { slug: "sacramento-volunteers", title: "Sacramento Volunteers — An Ulterior Motive?", section: "Community", summary: "A closer look at the people rebuilding trails, clearing brush and asking for nothing in return.", byline: "Joshua Sparks, CFG", minutes: "7" },
];

export const latestStories: Story[] = [
  { slug: "public-safety-results", title: "What Sacramento Told Us About Safety, Sirens and Street Kitties", section: "Public Safety", summary: "The results are in. We chart the city’s linguistic landscape, police presence and permanent parking situation.", byline: "Data Desk", minutes: "6" },
  { slug: "guru-of-news", title: "The Guru of News Speaks From Beneath the City", section: "Interview", summary: "Nathan Tran descends below a hollow 90-story tower for a rare audience with a self-proclaimed master of the news.", byline: "Nathan Tran", minutes: "77" },
  { slug: "drought-watch", title: "Drought Watch: The River, the Radar and What Comes Next", section: "Climate", summary: "Officials eye the ocean as freshwater supplies dwindle and falling water levels uncover artifacts.", byline: "Climate Desk", minutes: "9" },
];

export const legacyPages = [
  ["Home", "/home", "front-page"], ["Safety Quiz", "/home/safety-quiz", "safety"],
  ["Drought Watch", "/home/drought-watch", "drought"], ["Public Safety Survey Results", "/home/public-safety-survey-results", "safety"],
  ["Truth", "/home/truth", "opinion"], ["Intimate Chat", "/home/user-feedback", "community"],
  ["Stories", "/stories", "stories"], ["Convention Watch", "/stories/convention-watch", "culture"],
  ["Local Artist Spotlight", "/stories/local-artist-spotlight", "culture"],
  ["Upcoming Events", "/stories/local-artist-spotlight/upcoming-events", "culture"],
  ["Featured Artists", "/stories/local-artist-spotlight/featured-artists", "culture"],
  ["14 Brutal Truths About Sacramento", "/stories/14-brutal-truths-about-sacramento-ai", "stories"],
  ["Governor’s Statement Sheds Light on CA", "/stories/governors-statement-sheds-light-on-ca", "stories"],
  ["The Guru of News Interview", "/stories/the-guru-of-news-interview", "stories"],
  ["Will Downtown Be Getting a Facelift?", "/stories/will-downtown-be-getting-a-facelift", "stories"],
  ["A Startling Discovery", "/stories/new-anthropological-discovery", "stories"],
  ["Flea Market Infested with Ticks", "/stories/flea-market-infested-with-ticks-discrepancy-confuses-city-hall", "stories"],
  ["Alligators Appearing in the American River", "/stories/alligators-appearing-in-the-american-river", "stories"],
  ["Monkeypox: A Monkey’s Perspective", "/stories/monkeypox-a-monkeys-perspective", "stories"],
  ["The Cost of Driving", "/stories/the-cost-of-driving", "stories"],
  ["Hydrogen Found in City Water Supply", "/stories/hydrogen-found-in-city-water-supply", "stories"],
  ["Sacramento’s Issues: Not My Fault", "/stories/sac-issues", "stories"],
  ["Cashmere King Future Uncertain", "/stories/cashmere-king-future-unsure", "stories"],
  ["Tips of the Job Trade", "/stories/tips-of-the-job-trade", "stories"],
  ["Golden State No More?", "/stories/golden-state-no-more", "stories"],
  ["Gamers & Global Warming", "/stories/gamers-global-warming-ai", "stories"],
  ["Directed Energy and You", "/stories/directed-energy-and-you", "stories"], ["Gas", "/stories/gas", "stories"],
  ["Monkies for the Forest", "/stories/forest-monkies", "stories"], ["Shows", "/shows", "shows"],
  ["Hot Street", "/hot-street", "hot-street"], ["Hot Street Finance", "/hot-street/hot-street-finance", "hot-street"],
  ["Hot Street Crypto", "/hot-street/hot-street-crypto", "hot-street"], ["Hot Street Crime", "/hot-street/hot-street-crime", "hot-street"],
  ["About Us", "/about", "about"], ["The Team", "/about/the-team", "about"],
  ["Headquarters", "/about/headquarters", "about"], ["Live", "/live", "live"],
] as const;

export const allStories = [...featuredStories, ...latestStories];

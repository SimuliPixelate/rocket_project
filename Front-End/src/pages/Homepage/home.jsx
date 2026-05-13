import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

function Home() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    console.log("API Key:", import.meta.env.VITE_NASA_API);
    const fetchApod = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${
            import.meta.env.VITE_NASA_API
          }`
        );
        setApod(res.data);
      } catch (err) {
        console.error("Error fetching NASA data:", err);
      }
    };
    fetchApod();
  }, []);

  const sections = [
    {
      id: 1,
      icon: "📅",
      title: "Picture of the Day",
      path: "/apod",
      desc: "Discover NASA's stunning captured images and information that changes everyday",
    },
    {
      id: 2,
      icon: "🖼️",
      title: "Images & Videos",
      path: "/imagevideo",
      desc: "Search thousands of images and videos captured for learning about astronomy",
    },
    {
      id: 3,
      icon: "🔵",
      title: "Planets",
      path: "/planets",
      desc: "Find quick statistics about planets and exoplanets discovered within our universe",
    },
    {
      id: 4,
      icon: "📖",
      title: "Learnings",
      path: "/personal",
      desc: "Document your experiences and learnings that you can go back and remember later on",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white" data-theme="">
      {/* Hero Section - Using DaisyUI Hero */}
      <header className="hero bg-base-300 py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4">Explore the Cosmos</h1>
            <p className="mb-8 text-sm opacity-80">
              Search and Discover collected universe data. Witness breathtaking
              imagery, information, and write notes to document your learnings
              all in one place.
            </p>
          </div>
        </div>
      </header>

      {/* APOD Section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-white!">Picture of the Day</h1>
        <p className="text-sm text-gray-500">
          Each day a different image or photograph of our fascinating universe
          is featured.
        </p>
        <div className="max-w-4xl my-10 mx-auto aspect-video bg-neutral rounded-2xl  shadow-2xl overflow-hidden">
          {apod ? (
            apod.media_type === "video" ? (
              // Direct .mp4 → video tag
              <video
                src={apod.url}
                alt={apod.title}
                className="w-full h-full"
                controls
              />
            ) : (
              <img src={apod.url} alt={apod.title} className="w-full h-full" />
            )
          ) : (
            <div className="flex h-full items-center justify-center animate-pulse text-gray-500">
              Loading NASA Content...
            </div>
          )}
        </div>

        <div>
          <p className="italic text-lg">{apod?.title}</p>
          {/*<p className="italic text-lg">{apod?.explanation}</p>*/}
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-white!">Learn All about Space</h1>
        <p className="text-sm text-gray-500">
          Our universe is vast, seize the moment to learn something new about it
          each day!
        </p>

        <div className="mt-10 carousel carousel-center max-w-5xl p-4 space-x-6 mx-auto bg-transparent">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="carousel-item w-72 h-96 bg-base-300 rounded-2xl shadow-lg"
            ></div>
          ))}
        </div>

        {/* Custom Progress/Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          <span className="h-1 w-12 bg-sky-400 rounded-full"></span>
          <span className="h-1 w-12 bg-gray-700 rounded-full"></span>
          <span className="h-1 w-12 bg-gray-700 rounded-full"></span>
        </div>
      </section>

      {/* Discovery Grid */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-semibold mb-2 text-white!">
            Start Discovering
          </h1>
          <p className="text-sm text-gray-500">
            With a simple navigation, your set to discover brand new information
            about the universe
          </p>
        </div>
        {/* 2. Map directly inside the grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="group block p-8 bg-gray-900/40 rounded-2xl border border-gray-800 hover:border-sky-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Home;

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Particles from "../../components/Particles";
import stellar from "../../images/stellar.jpg";
import saturn from "../../images/saturn.jpg";
import launch from "../../images/launch.jpg";
import astronaut from "../../images/astronaut.jpg";
import earth from "../../images/earth.jpg";
import planet from "../../images/planet.svg";
import calendar from "../../images/calendar.svg";
import star from "../../images/star.svg";
import user from "../../images/user.svg";
import image from "../../images/image.svg";
import lightbulb from "../../images/lightbulb.svg";
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
      icon: calendar,
      title: "Picture of the Day",
      path: "/apod",
      desc: "Discover NASA's stunning captured images and information that changes everyday",
    },
    {
      id: 2,
      icon: image,
      title: "Images & Videos",
      path: "/imagevideo",
      desc: "Search thousands of images and videos captured for learning about astronomy",
    },
    {
      id: 3,
      icon: planet,
      title: "Planets",
      path: "/planets",
      desc: "Find quick statistics about planets and exoplanets discovered within our universe",
    },
    {
      id: 4,
      icon: star,
      title: "Stars",
      path: "/stars",
      desc: "Find quick statistics about stars and stellar bodies discovered within our universe",
    },
    {
      id: 5,
      icon: lightbulb,
      title: "Learnings",
      path: "/personal",
      desc: "Document your experiences and learnings that you can go back and remember later on",
    },
    {
      id: 6,
      icon: user,
      title: "Profile",
      path: "/profile",
      desc: "Access and update your account information, profile picture, and security",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white" data-theme="">
      {/* Hero Section - Using DaisyUI Hero */}

      <div
        style={{ width: "100%", height: "600px", position: "relative" }}
        className="hero py-20 border-b border-zinc-900"
      >
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
        <div className="hero-content text-center">
          <div className="max-w-md">
            <p className="text-4xl font-bold mb-4">Explore the Cosmos</p>
            <p className="mb-8 text-sm opacity-80">
              Search and Discover collected universe data. Witness breathtaking
              imagery, information, and write notes to document your learnings
              all in one place.
            </p>
          </div>
        </div>
      </div>

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

        <div className="mt-6">
          <span className="text-xs font-semibold tracking-widest text-sky-400 uppercase block mb-1">
            Featured Title
          </span>
          <p className="text-lg md:text-xl font-medium text-slate-200 px-4">
            {apod?.title}
          </p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-white!">Learn All about Space</h1>
        <p className="text-sm text-gray-500 pb-10">
          Our universe is vast, seize the moment to learn something new about it
          each day!
        </p>

        <div className="carousel w-full max-w-4xl mx-auto h-87.5 md:h-125 rounded-2xl border border-gray-800 shadow-2xl">
          {[
            { id: "slide1", img: earth, prev: "#slide5", next: "#slide2" },
            { id: "slide2", img: stellar, prev: "#slide1", next: "#slide3" },
            { id: "slide3", img: saturn, prev: "#slide2", next: "#slide4" },
            { id: "slide4", img: launch, prev: "#slide3", next: "#slide5" },
            { id: "slide5", img: astronaut, prev: "#slide4", next: "#slide1" },
          ].map((slide) => (
            <div
              id={slide.id}
              key={slide.id}
              className="carousel-item relative w-full h-full"
            >
              <img
                src={slide.img}
                className="w-full h-full object-cover"
                alt="Space Slide"
              />
              <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                <a
                  href={slide.prev}
                  className="btn btn-circle btn-sm md:btn-md bg-black/50 hover:bg-black/80 border-none text-white pointer-events-auto"
                >
                  ❮
                </a>
                <a
                  href={slide.next}
                  className="btn btn-circle btn-sm md:btn-md bg-black/50 hover:bg-black/80 border-none text-white pointer-events-auto"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discovery Grid */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-semibold text-white!">
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
                <img src={item.icon} className="max-w-24 mx-auto" />
              </div>
              <h3 className="text-xl  font-bold mb-3 group-hover:text-sky-400 text-white">
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

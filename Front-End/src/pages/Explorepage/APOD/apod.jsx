import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
function Apod() {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    console.log("API Key:", import.meta.env.VITE_NASA_API);
    const fetchApod = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${
            import.meta.env.VITE_NASA_API
          }&date=${date}`
        );
        setApod(res.data);
      } catch (err) {
        console.error("Error fetching NASA data:", err);
      }
    };
    fetchApod();
  }, [date]);

  const sections = [
    {
      id: 1,
      icon: "📅",
      title: "Picture of the Day",
      path: "/apod",
    },
    {
      id: 2,
      icon: "🖼️",
      title: "Images & Videos",
      path: "/imagevideo",
    },
    {
      id: 3,
      icon: "🔵",
      title: "Planets",
      path: "/planets",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white" data-theme="">
      <header className="hero bg-base-300 py-20">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4">Picture of the Day</h1>
            <p className="mb-8 text-xl opacity-80">
              Each day a different image or photograph of our fascinating
              universe is featured, along with an explanation written and
              provided by proffesional astronomers.
            </p>
          </div>
        </div>
      </header>

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      <section>
        <div className="flex justify-center mb-10">
          <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800 flex items-center gap-3">
            <span className="text-xs uppercase text-zinc-500 ml-2">
              Filter Date:
            </span>
            <input
              type="date"
              value={date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent text-white outline-none cursor-pointer p-1"
            />
          </div>
        </div>
      </section>

      <section>
        <div>
          <p className="italic text-5xl">{apod?.title}</p>
          {/*<p className="italic text-lg">{apod?.explanation}</p>*/}
        </div>

        <div className="flex container justify-center mt-5 items-center gap-10 text-gray-400 font-medium">
          <div>
            <p className="text-[10px] uppercase text-zinc-500 mb-1">
              Date Created
            </p>
            <p className="text-xl font-medium">{apod?.date}</p>
          </div>

          {/* Separator Dot */}
          <div className="w-2 h-2 rounded-full bg-zinc-700 mt-5" />

          {/* Photographer Block */}
          <div>
            <p className="text-[10px] uppercase text-zinc-500 mb-1">Credits</p>
            <p className="text-xl font-medium">{apod?.copyright || "NASA"}</p>
          </div>
        </div>

        <div className="max-w-4xl my-5 mx-auto aspect-video bg-neutral rounded-2xl  shadow-2xl overflow-auto">
          {apod ? (
            apod.media_type === "video" ? (
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
        <div className="flex justify-center">
          <p className="text-lg leading-relaxed text-zinc-400 max-w-4xl text-justify">
            {apod?.explanation}
          </p>
        </div>
      </section>
    </div>
  );
}
export default Apod;

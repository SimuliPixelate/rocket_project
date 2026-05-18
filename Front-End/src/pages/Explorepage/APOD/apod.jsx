import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ReactPlayer from "react-player";
import axios from "axios";
import Particles from "../../../components/Particles";
import ExploreNav from "../../../components/ExploreNav";
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

  return (
    <div className="bg-black min-h-screen text-white" data-theme="">
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
          <div className="max-w-xl">
            <p className="text-4xl font-bold mb-4">Picture of the Day</p>
            <p className="mb-8 text-sm opacity-80">
              Each day a different image or photograph of our fascinating
              universe is featured, along with an explanation written and
              provided by proffesional astronomers.
            </p>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="flex justify-center mb-10">
          <div className="bg-zinc-900 p-2 rounded-full border border-zinc-800 flex items-center gap-3">
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
              <ReactPlayer
                src={apod.url}
                alt={apod.title}
                width="100%"
                height="100%"
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

      <ExploreNav />
    </div>
  );
}
export default Apod;

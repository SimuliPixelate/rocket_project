import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Particles from "../../../components/Particles";
import ExploreNav from "../../../components/ExploreNav";
function Stars() {
  const [stars, setStars] = useState([]);
  const [search, setSearch] = useState("Sun");
  const [page, setPage] = useState(1);
  const size = 15;

  const totalPages = Math.ceil(stars.length / size);
  const currentItems = stars.slice((page - 1) * size, page * size);

  const fetchStars = async (query = "") => {
    try {
      const res = await axios.get(
        `https://api.api-ninjas.com/v1/stars?name=${query}`,
        {
          headers: { "X-Api-Key": import.meta.env.VITE_API_NINJA },
        }
      );
      if (Array.isArray(res.data)) {
        setStars(res.data);
      } else {
        setStars([]);
      }
      setPage(1);
    } catch (err) {
      console.error("Error fetching stars:", err);
    }
  };

  useEffect(() => {
    fetchStars(search);
  }, []);

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
    {
      id: 4,
      icon: "✨",
      title: "Stars",
      path: "/stars",
    },
  ];

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
            <p className="text-4xl font-bold mb-4">Stars</p>
            <p className="mb-8 text-xl opacity-80">
              Browse simple statistical data about different stars and stellar
              bodies in the known universe.
            </p>
          </div>
        </div>
      </div>

      <section className="pt-10">
        <div className="max-w-xl mx-auto mb-10 flex gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
          <input
            type="text"
            className="bg-transparent flex-1 px-4 outline-none"
            placeholder="Search a star..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchStars(search)}
          />
          <button
            onClick={() => fetchStars(search)}
            className="text-white px-4 py-2 rounded-lg font-bold btn btn-info"
          >
            Search
          </button>
        </div>
      </section>

      {/* Results Grid */}
      <section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentItems.map((star, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-sky-400">{star.name}</p>
                <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">
                  {star.constellation || "Unknown Constellation"}
                </span>
              </div>

              <div className="space-y-2 text-sm text-zinc-300">
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span>Apparent Magnitude</span>{" "}
                  <span>{star.apparent_magnitude} m</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span>Absolute Magnitude</span>{" "}
                  <span>{star.absolute_magnitude} a</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span>Distance</span>{" "}
                  <span>{star.distance_light_year} ly</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span>Spectral Class</span> <span>{star.spectral_class}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 join">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${
                page === i + 1 ? "btn-info" : "btn-ghost"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      <ExploreNav />
    </div>
  );
}

export default Stars;

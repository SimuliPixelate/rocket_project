import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Particles from "../../../components/Particles";
import ExploreNav from "../../../components/ExploreNav";
function Planets() {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState("Earth");
  const [page, setPage] = useState(1);
  const size = 15;

  const totalPages = Math.ceil(planets.length / size);
  const currentItems = planets.slice((page - 1) * size, page * size);

  const fetchPlanets = async (query = "") => {
    try {
      const res = await axios.get(
        `https://api.api-ninjas.com/v1/planets?name=${query}`,
        {
          headers: { "X-Api-Key": import.meta.env.VITE_API_NINJA },
        }
      );
      if (Array.isArray(res.data)) {
        setPlanets(res.data);
      } else {
        setPlanets([]);
      }
      setPage(1);
    } catch (err) {
      console.error("Error fetching planets:", err);
    }
  };

  useEffect(() => {
    fetchPlanets(search);
  }, []);

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
            <p className="text-4xl font-bold mb-4">Planets</p>
            <p className="mb-8 text-sm opacity-80">
              Browse simple statistical data about different planets and
              exoplanets in the known universe.
            </p>
          </div>
        </div>
      </div>

      <section className="pt-10">
        <div className="max-w-xl mx-auto mb-10 flex gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
          <input
            type="text"
            className="bg-transparent flex-1 px-4 outline-none"
            placeholder="Search a planet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchPlanets(search)}
          />
          <button
            onClick={() => fetchPlanets(search)}
            className="text-white px-4 py-2 rounded-lg font-bold btn btn-info"
          >
            Search
          </button>
        </div>
      </section>

      {/* Results Grid */}
      <section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentItems.map((planet, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold text-sky-400">{planet.name}</p>
                <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">
                  {planet.distance_light_year === 0
                    ? "SOLAR SYSTEM"
                    : "EXOPLANET"}
                </span>
              </div>

              <div className="space-y-2 text-sm text-zinc-300">
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span>Mass</span> <span>{planet.mass ?? "N/A"} Mⱼ</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span>Radius</span> <span>{planet.radius ?? "N/A"} Rⱼ</span>
                </div>
                <div className="flex justify-between">
                  <span>Temp</span> <span>{planet.temperature ?? "N/A"} K</span>
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

export default Planets;

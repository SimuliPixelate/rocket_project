import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Particles from "../../../components/Particles";
import ExploreNav from "../../../components/ExploreNav";
function Library() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("earth");
  const [page, setPage] = useState(1);
  const [mediaType, setMediaType] = useState("image");
  const size = 15;

  const totalPages = Math.ceil(items.length / size);
  const currentItems = items.slice((page - 1) * size, page * size);

  const searchNASA = async (searchQuery, type = mediaType) => {
    try {
      const res = await axios.get(
        `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=${type}`
      );
      setItems(res.data.collection.items);
      setPage(1);
    } catch (err) {
      console.error("Error fetching NASA library:", err);
    }
  };

  useEffect(() => {
    searchNASA(query);
  }, []);

  const handleFilterChange = (newType) => {
    setMediaType(newType);
    searchNASA(query, newType);
  };

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
            <p className="text-4xl font-bold mb-4">Images & Videos </p>
            <p className="mb-8 text-sm opacity-80">
              Access data that are discovered and captured of our universe and
              beyond.
            </p>
          </div>
        </div>
      </div>

      <section className="p-10">
        {/* Search Bar - Matching your wireframe */}
        <div className="max-w-xl mx-auto mb-10 flex gap-2 bg-zinc-900 p-2 rounded-lg">
          <input
            type="text"
            className="bg-transparent flex-1 px-4 outline-none"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchNASA(query)}
          />
          <button
            onClick={() => searchNASA(query)}
            className="text-white px-4 py-2 rounded-lg font-bold btn btn-info"
          >
            Search
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          {["image", "video"].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`px-6 py-2 rounded-full border transition-all ${
                mediaType === type
                  ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              } capitalize font-medium`}
            >
              {type}s
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentItems.map((item) => {
            const { nasa_id, title, date_created } = item.data[0];
            const thumb = item.links?.[0].href;

            return (
              <Link
                key={nasa_id}
                to={`/imagevideodetail/${nasa_id}`}
                className="block group"
              >
                <p className="text-center text-xs text-gray-500 mb-2">
                  {new Date(date_created).toLocaleDateString()}
                </p>
                <div className="aspect-video bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
                  {thumb && (
                    <img
                      src={thumb}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </Link>
            );
          })}
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

export default Library;

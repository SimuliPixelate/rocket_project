import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuthStore } from "../../store/authStore";
import Particles from "../../components/Particles";

function Personal() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const size = 10;

  const totalPages = Math.ceil(items.length / size);
  const currentItems = items.slice((page - 1) * size, page * size);

  useEffect(() => {
    if (!user?._id) return;
    const fetchLearnings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/personal/users/${user._id}`, {
          withCredentials: true,
        });
        setItems(res.data);
      } catch (err) {
        setError("Failed to load learnings.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLearnings();
  }, [user?._id]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this entry?")) return;
    try {
      await axios.delete(`/api/personal/delete/user/${id}`, {
        withCredentials: true,
      });
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete entry.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
            <p className="text-4xl font-bold mb-4">Personal Learnings</p>
            <p className="mb-8 text-xl opacity-80">
              Write what you have learned. Document your discoveries and
              findings.
            </p>
          </div>
        </div>
      </div>

      <section className="py-10 px-6 max-w-5xl mx-auto">
        <button
          className="btn btn-info btn-sm mb-8"
          onClick={() => navigate("/personal/create")}
        >
          Add Learning
        </button>

        {loading && (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        )}
        {error && <p className="text-center text-error py-10">{error}</p>}

        {!loading && !error && (
          <div className="space-y-5 gap-6 grid grid-cols-2">
            {currentItems.map((item) => (
              <div
                key={item._id}
                className="group relative bg-[#0f111a] border border-gray-800 p-6 rounded-xl hover:border-gray-600 transition-all h-full flex flex-col"
              >
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() =>
                      navigate(`/personal/edit/${item._id}`, {
                        state: { item },
                      })
                    }
                    className="btn btn-ghost btn-xs text-info"
                  >
                    <TbPencil />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>

                <p className="font-bold text-justify text-2xl text-gray-300 break-all">
                  {item.title}
                </p>
                <p className="text-gray-500 text-justify text-sm break-all">
                  {item.description}
                </p>
              </div>
            ))}

            {!items.length && (
              <p className="text-center text-gray-600 py-10">No entries yet.</p>
            )}
          </div>
        )}

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
      </section>
    </div>
  );
}

export default Personal;

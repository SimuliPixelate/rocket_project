import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbPencil } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
function Personal() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: null, title: "", description: "" });
  const [page, setPage] = useState(1);
  const size = 10;

  // Derived state for pagination
  const totalPages = Math.ceil(items.length / size);
  const currentItems = items.slice((page - 1) * size, page * size);

  const toggleModal = (item = { id: null, title: "", description: "" }) => {
    setForm(item);
    const modal = document.getElementById("p_modal");
    item.id ? modal.showModal() : modal.showModal(); // Opens for both
    if (!item.id && !item.title) modal.showModal(); // Clear for new
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (form.id) {
      setItems(items.map((i) => (i.id === form.id ? form : i)));
    } else {
      setItems([{ ...form, id: Date.now() }, ...items]);
      setPage(1);
    }
    document.getElementById("p_modal").close();
  };

  const remove = (id) =>
    confirm("Delete?") && setItems(items.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="hero bg-base-300 py-20">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4">Personal Learnings</h1>
            <p className="mb-8 text-xl opacity-80">
              Write what you have learned. Document your discoveries and
              findings.
            </p>
          </div>
        </div>
      </header>

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <button
          className="btn btn-info btn-sm mb-8"
          onClick={() => toggleModal()}
        >
          Add Learning
        </button>
      </section>

      <div className="space-y-5 max-w-5xl mx-auto">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#0f111a] border border-gray-800 p-6 rounded-xl hover:border-gray-600 transition-all"
          >
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggleModal(item)}
                className="btn btn-ghost btn-xs text-info"
              >
                <TbPencil />
              </button>
              <button
                onClick={() => remove(item.id)}
                className="btn btn-ghost btn-xs text-error"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-bold text-justify text-2xl text-gray-300 break-all">
                {item.title}
              </p>
              <p className="text-gray-500 text-justify text-sm break-all">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        {!items.length && (
          <p className="text-center text-gray-600 py-10">No entries yet.</p>
        )}
      </div>

      {/* Simplified Pagination */}
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

      {/* Unified Modal */}
      <dialog id="p_modal" className="modal">
        <form
          onSubmit={handleSave}
          className="modal-box bg-[#1a1d29] border border-gray-800 space-y-4"
        >
          <h3 className="font-bold text-info">
            {form.id ? "Edit" : "New"} Entry
          </h3>
          <input
            className="input input-bordered w-full bg-black"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="textarea textarea-bordered w-full bg-black h-24"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <div className="modal-action">
            <button className="btn btn-info w-full">
              {form.id ? "Update" : "Save"}
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Personal;

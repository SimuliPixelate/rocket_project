import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";

function PersonalEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedItem = location.state?.item;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (passedItem) {
      setFormData({
        title: passedItem.title || "",
        description: passedItem.description || "",
      });
    }
  }, [passedItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.put(`/api/personal/update/user/${id}`, formData, {
        withCredentials: true,
      });
      navigate("/personal");
    } catch (err) {
      console.error("Error updating learning:", err);
      setError("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-[#0f111a] border border-gray-800 rounded-xl p-8">
        <p className="text-2xl font-bold text-info mb-6">Edit Learning</p>

        {error && <p className="text-error text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full bg-black"
              placeholder="What did you learn?"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full bg-black h-32"
              placeholder="Describe what you learned in detail..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="btn btn-info flex-1"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <Link to="/personal" className="btn  flex-1">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonalEdit;

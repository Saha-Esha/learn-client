import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Provider/AuthContext.jsx";

const AddLesson = () => {
  const { student } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageurl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔒 Only teacher can access
  if (student?.role !== "teacher") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8089/api/v1/lesson/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add lesson");

      setMessage("Lesson added successfully ✅");
      setFormData({ title: "", description: "", imageurl: "" });

      // redirect after success
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      setMessage("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Lesson</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Lesson Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
              placeholder="Enter lesson title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
              placeholder="Lesson description"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="imageurl"
              value={formData.imageurl}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Add Lesson"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddLesson;

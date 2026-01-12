import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateGig = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/gigs", formData);
      setSuccess("Gig created successfully!");
      setTimeout(() => {
        navigate("/gigs");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Post a Gig</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <input
          type="text"
          name="title"
          placeholder="Gig Title"
          className="w-full mb-4 p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Gig Description"
          className="w-full mb-4 p-2 border rounded"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          className="w-full mb-4 p-2 border rounded"
          value={formData.budget}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Posting..." : "Post Gig"}
        </button>
      </form>
    </div>
  );
};

export default CreateGig;

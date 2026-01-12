import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const GigDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [gig, setGig] = useState(null);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await api.get(`/gigs/${id}`);
        setGig(res.data);
      } catch (err) {
        setError("Failed to load gig");
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/bids", {
        gigId: id,
        message,
        price,
      });

      setSuccess("Bid placed successfully!");
      setMessage("");
      setPrice("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place bid");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!gig) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold">{gig.title}</h1>
      <p className="text-gray-600 mt-2">{gig.description}</p>
      <p className="mt-4 text-xl font-semibold">Budget: ₹{gig.budget}</p>

      <hr className="my-6" />

      {user && (
        <div>
          <h2 className="text-xl font-bold mb-4">Place a Bid</h2>

          {success && <p className="text-green-600 mb-2">{success}</p>}
          {error && <p className="text-red-600 mb-2">{error}</p>}

          <form onSubmit={handleBidSubmit} className="space-y-4">
            <textarea
              placeholder="Your message..."
              className="w-full border p-2 rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Your price"
              className="w-full border p-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Submit Bid
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GigDetails;

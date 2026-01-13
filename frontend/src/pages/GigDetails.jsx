import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleDeleteGig = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gig?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/gigs/${gig._id}`);
      navigate("/my-gigs");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete gig");
    }
  };

  if (loading) return <div className="p-6 pt-20">Loading...</div>;
  if (error) return <div className="p-6 pt-20 text-red-500">{error}</div>;
  if (!gig) return null;

  const isOwner =
  user &&
  (gig.owner === user._id || gig.owner?._id === user._id);


  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold">{gig.title}</h1>
      {isOwner && (
        <p className="text-sm text-gray-400">(You posted this gig)</p>
      )}

      <p className="text-gray-600 mt-2">{gig.description}</p>
      <p className="mt-4 text-xl font-semibold">Budget: ₹{gig.budget}</p>

      {/* OWNER ACTIONS */}
      {isOwner && (
        <div className="mt-4">
          <button
            onClick={handleDeleteGig}
            className="text-red-600 hover:underline"
          >
            Delete Gig
          </button>
        </div>
      )}

      <hr className="my-6" />

      {/* BID FORM */}
      {!isOwner && user && (
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

      {/* OWNER MESSAGE */}
      {isOwner && (
        <span className="text-sm text-gray-500">(You posted this gig)</span>
    )}

    </div>
  );
};

export default GigDetails;

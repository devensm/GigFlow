import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [gigId, setGigId] = useState("");
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchBids = async () => {
    if (!gigId) return;

    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/bids/${gigId}`);
      setBids(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load bids");
    } finally {
      setLoading(false);
    }
  };

  const handleHire = async (bidId) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await api.patch(`/bids/${bidId}/hire`);

      setSuccess("Freelancer hired successfully!");
      fetchBids(); // refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Hiring failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter your Gig ID"
          className="border p-2 rounded w-full"
          value={gigId}
          onChange={(e) => setGigId(e.target.value)}
        />
        <button
          onClick={fetchBids}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Load Bids
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <div className="space-y-4">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{bid.freelancer.name}</p>
              <p className="text-gray-600">{bid.message}</p>
              <p className="font-bold">₹{bid.price}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={
                    bid.status === "hired"
                      ? "text-green-600"
                      : bid.status === "rejected"
                      ? "text-red-600"
                      : "text-gray-600"
                  }
                >
                  {bid.status}
                </span>
              </p>
            </div>

            {bid.status === "pending" && (
              <button
                onClick={() => handleHire(bid._id)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Hire
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

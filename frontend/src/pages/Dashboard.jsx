import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const res = await api.get("/gigs/my");
        setGigs(res.data);
      } catch (err) {
        setError("Failed to load your gigs");
      }
    };

    fetchMyGigs();
  }, []);

  const loadBids = async (gigId) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      setSelectedGig(gigId);

      const res = await api.get(`/bids/${gigId}`);
      setBids(res.data);
    } catch (err) {
      setError("Failed to load bids");
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

      loadBids(selectedGig);
    } catch (err) {
      setError(err.response?.data?.message || "Hiring failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Client Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: My Gigs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Gigs</h2>

          {gigs.length === 0 && (
            <p className="text-gray-500">You haven’t posted any gigs yet.</p>
          )}

          <div className="space-y-3">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                onClick={() => loadBids(gig._id)}
                className={`border p-4 rounded cursor-pointer hover:bg-gray-50 ${
                  selectedGig === gig._id ? "bg-gray-100" : ""
                }`}
              >
                <h3 className="font-semibold">{gig.title}</h3>
                <p className="text-sm text-gray-600">
                  Budget: ₹{gig.budget}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      gig.status === "assigned"
                        ? "text-green-600"
                        : "text-gray-600"
                    }
                  >
                    {gig.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bids */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Bids</h2>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          {!selectedGig && (
            <p className="text-gray-500">Select a gig to view bids.</p>
          )}

          {selectedGig && bids.length === 0 && !loading && (
            <p className="text-gray-500">No bids yet.</p>
          )}

          <div className="space-y-3">
            {bids.map((bid) => (
              <div
                key={bid._id}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{bid.freelancer.name}</p>
                  <p className="text-gray-600">{bid.message}</p>
                  <p className="font-bold">₹{bid.price}</p>
                  <p className="text-sm">
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
      </div>
    </div>
  );
};

export default Dashboard;

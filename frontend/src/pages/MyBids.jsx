import { useEffect, useState } from "react";
import api from "../services/api";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const res = await api.get("/bids/my");
        setBids(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your bids");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBids();
  }, []);

  return (
    <div className="pt-20 p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bids</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && bids.length === 0 && (
        <p className="text-gray-500">You haven’t placed any bids yet.</p>
      )}

      <div className="space-y-4">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{bid.gig.title}</h2>
              <p className="text-gray-600">Budget: ₹{bid.gig.budget}</p>
              <p className="text-gray-600">Your Price: ₹{bid.price}</p>
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

            <div className="text-sm text-gray-500">
              Gig Status: {bid.gig.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBids;

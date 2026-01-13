import { useEffect, useState } from "react";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";


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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this bid?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/bids/${id}`);
      setBids((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete bid");
    }
  };

  const handleEdit = async (bid) => {
    const newMessage = prompt("Edit your message:", bid.message);
    const newPrice = prompt("Edit your price:", bid.price);

    if (!newMessage || !newPrice) return;

    try {
      const res = await api.put(`/bids/${bid._id}`, {
        message: newMessage,
        price: newPrice,
      });

      setBids((prev) =>
        prev.map((b) => (b._id === bid._id ? res.data : b))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update bid");
    }
  };

  return (
    <div className="pt-20 p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bids</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && bids.length === 0 && (
        <div className="text-center text-gray-500">
            <p className="text-lg">No bids yet</p>
            <p className="text-sm">Start bidding on open gigs</p>
        </div>
      )}

      <div className="space-y-4">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">
                {bid.gig?.title || "Gig no longer exists"}
                </h2>
              <p className="text-gray-600">Your Message: {bid.message}</p>
              <p className="text-gray-600">Your Price: ₹{bid.price}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                  <StatusBadge status={bid.status} />
              </p>
            </div>

            {bid.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(bid)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(bid._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBids;

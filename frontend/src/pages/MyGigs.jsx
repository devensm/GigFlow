import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const res = await api.get("/gigs/my");
        setGigs(res.data);
      } catch (err) {
        setError("Failed to load your gigs");
      } finally {
        setLoading(false);
      }
    };

    fetchMyGigs();
  }, []);

  return (
    <div className="pt-20 p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Gigs</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && gigs.length === 0 && (
        <div className="text-center text-gray-500">
            <p className="text-lg">No gigs posted</p>
            <p className="text-sm">Create your first gig</p>
        </div>

      )}

      <div className="space-y-4">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{gig.title}</h2>
              <p className="text-gray-600">Budget: ₹{gig.budget}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                  <StatusBadge status={gig.status} />

              </p>
            </div>

            <div className="flex gap-4 items-center">
                <Link
                    to={`/gigs/${gig._id}`}
                    className="text-blue-600 hover:underline"
                >
                    View
                </Link>

                <button
                    onClick={async () => {
                    const confirmDelete = window.confirm(
                        "Are you sure you want to delete this gig?"
                    );
                    if (!confirmDelete) return;

                    try {
                        await api.delete(`/gigs/${gig._id}`);
                        setGigs((prev) => prev.filter((g) => g._id !== gig._id));
                    } catch (err) {
                        alert(err.response?.data?.message || "Failed to delete gig");
                    }
                    }}
                    className="text-red-500 hover:underline"
                >
                    Delete
                </button>
                </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGigs;

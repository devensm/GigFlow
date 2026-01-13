import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

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
        <p className="text-gray-500">You haven’t posted any gigs yet.</p>
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

            <Link
              to={`/gigs/${gig._id}`}
              className="text-blue-600 hover:underline"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGigs;

import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gigs");
      setGigs(res.data);
    } catch (err) {
      setError("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.get(`/gigs/search?q=${search}`);
      setGigs(res.data);
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Browse Gigs</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search gigs..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading &&
          gigs.map((gig) => (
            <div
              key={gig._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{gig.title}</h2>
              <p className="text-gray-600 mt-2">
                {gig.description.substring(0, 80)}...
              </p>
              <p className="mt-2 font-bold">₹{gig.budget}</p>

              <Link
                to={`/gigs/${gig._id}`}
                className="inline-block mt-4 text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BrowseGigs;

import { useEffect, useState } from "react";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hireLock, setHireLock] = useState({});

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
      setHireLock((prev) => ({ ...prev, [bidId]: true }));
      setError("");
      setSuccess("");

      await api.patch(`/bids/${bidId}/hire`);
      setSuccess("Freelancer hired successfully!");

      setTimeout(() => {
        loadBids(selectedGig);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Hiring failed");
    } finally {
      setHireLock((prev) => ({ ...prev, [bidId]: false }));
    }
  };

  return (
    <div className="pt-20 p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Client Dashboard</h1>
        <p className="text-gray-600 text-base font-normal">Manage your projects and review freelancer proposals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* all gigs */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">My Projects</h2>

          {gigs.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded">
              <p className="text-gray-500 text-sm font-normal">No projects posted yet</p>
            </div>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                onClick={() => loadBids(gig._id)}
                className={`border p-4 rounded-md cursor-pointer transition duration-200 ${
                  selectedGig === gig._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">{gig.title}</h3>
                <p className="text-xs text-gray-600 mt-2">
                  Budget: ₹{gig.budget}
                </p>
                <StatusBadge status={gig.status} />
              </div>
            ))}
          </div>
        </div>

        {/* all bids on the gigs */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            {selectedGig ? "Proposals" : "Select a Project"}
          </h2>

          {/* alert*/}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-4">
              <p className="text-red-800 font-medium text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-4">
              <p className="text-green-800 font-medium text-sm">{success}</p>
            </div>
          )}

         
          {loading && <LoadingSpinner text="Loading proposals..." />}

          {/* empty state */}
          {!selectedGig && !loading && (
            <div className="text-center py-12 bg-gray-50 rounded">
              <p className="text-gray-400 mb-2">—</p>
              <p className="text-gray-600 font-medium text-sm">Select a project to view proposals</p>
            </div>
          )}

          {selectedGig && !loading && bids.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded">
              <p className="text-gray-400 mb-2">—</p>
              <p className="text-gray-600 font-medium text-sm">No proposals yet</p>
            </div>
          )}

          {/* bids list */}
          {!loading && bids.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wide">
                {bids.length} Proposal{bids.length !== 1 ? 's' : ''}
              </p>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {bids.map((bid) => (
                  <div
                    key={bid._id}
                    className="border border-gray-200 p-4 rounded-md hover:shadow-sm transition duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{bid.freelancer.name}</p>
                        <p className="text-xs text-gray-500 font-normal">{bid.freelancer.email}</p>
                      </div>
                      <StatusBadge status={bid.status} />
                    </div>

                    <p className="text-gray-700 bg-gray-50 p-3 rounded text-sm mb-3 font-normal">
                      {bid.message}
                    </p>

                    <div className="flex justify-between items-center">
                      <p className="text-base font-semibold text-blue-600">₹{bid.price}</p>

                      {bid.status === "pending" && (
                        <button
                          onClick={() => handleHire(bid._id)}
                          disabled={hireLock[bid._id]}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-sm"
                        >
                          {hireLock[bid._id] ? "Hiring..." : "Hire"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

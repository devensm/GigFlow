import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Alert from "../components/ui/Alert";


const BrowseGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/gigs");
      setGigs(res.data);
    } catch (err) {
      setError("Failed to load gigs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      fetchGigs();
      return;
    }

    try {
      setSearchLoading(true);
      setError("");
      const res = await api.get(`/gigs/search?q=${search}`);
      setGigs(res.data);
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Projects</h1>
            <p className="text-base text-gray-600 font-normal">
              Find the right freelancer or project for your needs
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 flex gap-3">
              <input
                type="text"
                placeholder="Search projects by title..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={searchLoading}
                loading={searchLoading}
              >
                Search
              </Button>
            </div>
            {search && (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  setSearch("");
                  fetchGigs();
                }}
              >
                Clear
              </Button>
            )}
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Error State */}
        {error && (
          <Alert
            type="error"
            title="Error"
            message={error}
            onClose={() => setError("")}
            closable
          />
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner text="Loading amazing gigs..." />}

        {/* Empty State */}
        {!loading && gigs.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="text-4xl font-light text-gray-400 mb-4">—</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {search ? "No projects found" : "No projects available"}
            </h3>
            <p className="text-gray-600 text-base font-normal">
              {search
                ? "Try adjusting your search criteria"
                : "New projects will appear here soon"}
            </p>
            {search && (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setSearch("");
                  fetchGigs();
                }}
                className="mt-6"
              >
                View All Projects
              </Button>
            )}
          </div>
        )}

        {/* Gigs Grid */}
        {!loading && gigs.length > 0 && (
          <>
            <div className="mb-8 text-sm text-gray-500 font-medium">
              {gigs.length} Project{gigs.length !== 1 ? "s" : ""}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigs.map((gig, index) => (
                <Link key={gig._id} to={`/gigs/${gig._id}`}>
                  <Card
                    hoverable
                    shadow="base"
                    padding="lg"
                    className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="primary" size="sm">
                        Available
                      </Badge>
                      <span className="text-xs text-gray-500 font-medium">
                        {new Date(gig.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      {gig.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow font-normal">
                      {gig.description}
                    </p>

                    {/* Owner Info */}
                    {gig.owner && (
                      <p className="text-xs text-gray-500 mb-4 font-normal">
                        Posted by <span className="font-medium text-gray-700">{gig.owner.name}</span>
                      </p>
                    )}

                    {/* Budget & Action */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="text-lg font-semibold text-blue-600">
                        ₹{gig.budget}
                      </div>
                      <div className="text-sm text-blue-600 font-medium hover:text-blue-700 group flex items-center gap-1 transition-colors duration-200">
                        Details <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseGigs;

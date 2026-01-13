import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Alert from "../components/ui/Alert";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";


const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [gig, setGig] = useState(null);
  const [bidForm, setBidForm] = useState({ message: "", price: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/gigs/${id}`);
        setGig(res.data);
      } catch (err) {
        setApiError("Failed to load gig details");
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  const isOwner =
    user && (gig?.owner === user._id || gig?.owner?._id === user._id);

  const validateBidForm = () => {
    const newErrors = {};
    if (!bidForm.message) newErrors.message = "Message is required";
    if (bidForm.message.length < 5) newErrors.message = "Message must be at least 5 characters";
    if (!bidForm.price) newErrors.price = "Price is required";
    if (isNaN(bidForm.price) || bidForm.price <= 0) newErrors.price = "Price must be a positive number";
    return newErrors;
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateBidForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setApiError("");
    setApiSuccess("");

    try {
      await api.post("/bids", {
        gigId: id,
        message: bidForm.message,
        price: bidForm.price,
      });

      setApiSuccess("Bid placed successfully! 🎉");
      setBidForm({ message: "", price: "" });
      setErrors({});
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to place bid");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGig = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gig? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/gigs/${gig._id}`);
      navigate("/my-gigs");
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to delete gig");
    }
  };

  if (loading) return <LoadingSpinner text="Loading gig details..." />;

  if (apiError && !gig)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <Alert type="error" title="Error" message={apiError} closable={false} />
      </div>
    );

  if (!gig) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* alert */}
        {apiError && (
          <Alert
            type="error"
            title="Error"
            message={apiError}
            onClose={() => setApiError("")}
            closable
          />
        )}
        {apiSuccess && (
          <Alert
            type="success"
            title="Success"
            message={apiSuccess}
            onClose={() => setApiSuccess("")}
            closable
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* gig details */}
          <div className="lg:col-span-2">
            <Card shadow="lg" padding="lg">
              {/* header */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4 flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                      {gig.title}
                    </h1>
                    {isOwner && (
                      <div className="flex gap-2 items-center">
                        <Badge variant="primary">Your Gig</Badge>
                        <Badge variant={gig.status === "open" ? "success" : "gray"}>
                          {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-blue-600">₹{gig.budget}</div>
                    <p className="text-sm text-gray-600 mt-1">Total Budget</p>
                  </div>
                </div>
              </div>


              {gig.owner && !isOwner && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Posted by:</span> {gig.owner.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Posted on:</span>{" "}
                    {new Date(gig.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {gig.description}
                </p>
              </div>


              {isOwner && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Actions</h3>
                  <Button
                    variant="danger"
                    onClick={handleDeleteGig}
                  >
                    Delete Gig
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* bidding form */}
          <div>
            {!isOwner && user ? (
              <Card shadow="lg" padding="lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Place a Bid</h3>

                <form onSubmit={handleBidSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Proposal
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="message"
                      placeholder="Describe your approach and experience..."
                      rows="5"
                      value={bidForm.message}
                      onChange={(e) => {
                        setBidForm({ ...bidForm, message: e.target.value });
                        setErrors({ ...errors, message: "" });
                      }}
                      disabled={submitting}
                      className={`
                        w-full px-4 py-2.5 text-base font-normal
                        border rounded-lg transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                        placeholder-gray-400 resize-none
                        ${
                          errors.message
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }
                      `}
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <Input
                    id="price"
                    label="Your Price (₹)"
                    type="number"
                    placeholder="5000"
                    value={bidForm.price}
                    onChange={(e) => {
                      setBidForm({ ...bidForm, price: e.target.value });
                      setErrors({ ...errors, price: "" });
                    }}
                    error={errors.price}
                    required
                    disabled={submitting}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={submitting}
                    disabled={submitting}
                  >
                    Submit Bid
                  </Button>
                </form>
              </Card>
            ) : isOwner ? (
              <Card shadow="lg" padding="lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">👤</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    You Posted This Gig
                  </h3>
                  <p className="text-gray-600 mb-6">
                    View bids and hire freelancers from your dashboard
                  </p>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </Card>
            ) : (
              <Card shadow="lg" padding="lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔐</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Sign In to Bid
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create an account or sign in to place a bid on this gig
                  </p>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetails;

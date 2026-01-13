import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Alert from "../components/ui/Alert";
import Card from "../components/ui/Card";


const CreateGig = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (formData.title.length < 3) newErrors.title = "Title must be at least 3 characters";
    if (!formData.description) newErrors.description = "Description is required";
    if (formData.description.length < 10) newErrors.description = "Description must be at least 10 characters";
    if (!formData.budget) newErrors.budget = "Budget is required";
    if (isNaN(formData.budget) || formData.budget <= 0) newErrors.budget = "Budget must be a positive number";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError("");
    setSuccess("");

    try {
      await api.post("/gigs", formData);
      setSuccess("Gig posted successfully! Redirecting...");
      setTimeout(() => {
        navigate("/gigs");
      }, 2000);
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 px-6 pt-20 pb-10">
      <div className="max-w-2xl mx-auto">
        <Card shadow="lg" padding="lg">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Gig</h1>
            <p className="text-gray-600">
              Share what you need done and let freelancers bid on it
            </p>
          </div>

          {/* Alerts */}
          {apiError && (
            <Alert
              type="error"
              title="Error"
              message={apiError}
              onClose={() => setApiError("")}
              closable
            />
          )}

          {success && (
            <Alert
              type="success"
              title="Success"
              message={success}
              closable={false}
            />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="title"
              label="Gig Title"
              type="text"
              name="title"
              placeholder="e.g., Build a React Dashboard"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              required
              disabled={loading}
            />

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe what you need in detail..."
                rows="6"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                className={`
                  w-full px-4 py-2.5 text-base font-normal
                  border rounded-lg transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                  placeholder-gray-400
                  ${
                    errors.description
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }
                  resize-none
                `}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? 'description-error' : undefined}
              />
              {errors.description && (
                <p id="description-error" className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <Input
              id="budget"
              label="Budget (₹)"
              type="number"
              name="budget"
              placeholder="1000"
              value={formData.budget}
              onChange={handleChange}
              error={errors.budget}
              required
              disabled={loading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Post Gig
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateGig;

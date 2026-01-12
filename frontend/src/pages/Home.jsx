import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 pt-20">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Find Work. Hire Talent. Instantly.
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          GigFlow is a mini freelance marketplace where clients post gigs and
          freelancers bid for them — fast, simple, and secure.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/gigs"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Browse Gigs
          </Link>

          <Link
            to="/create"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300"
          >
            Post a Gig
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Post Gigs</h3>
          <p className="text-gray-600">
            Create gigs easily with title, description, and budget.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Place Bids</h3>
          <p className="text-gray-600">
            Freelancers can bid with a message and price.
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Hire Instantly</h3>
          <p className="text-gray-600">
            Clients can hire one freelancer securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

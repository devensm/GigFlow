import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";


const Home = () => {
  const features = [
    {
      icon: '01',
      title: 'Post Gigs',
      description: 'Create gigs easily with title, description, and budget.',
    },
    {
      icon: '02',
      title: 'Place Bids',
      description: 'Freelancers can bid with a message and price.',
    },
    {
      icon: '03',
      title: 'Hire Instantly',
      description: 'Clients can hire one freelancer securely.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="mb-8 animate-in fade-in duration-1000">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Connect with Top Talent Instantly
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            GigFlow is the modern platform where businesses post projects and skilled freelancers bid competitively — transparent, secure, and fast.
          </p>
        </div>


        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <Link to="/gigs">
            <Button size="lg" className="px-8">
              Browse Projects
            </Button>
          </Link>
          <Link to="/create">
            <Button variant="outline" size="lg" className="px-8">
              Post a Project
            </Button>
          </Link>
        </div>

  
        <div className="text-gray-500 text-sm mb-16 animate-in fade-in duration-1000 delay-300">
          Trusted by thousands of businesses and freelancers
        </div>
      </div>

   
      <div className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg font-normal max-w-2xl mx-auto">
            Three straightforward steps to find the right person for your work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card hoverable padding="lg" shadow="base">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-lg font-semibold mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-normal">
                  {feature.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>

    
      <div className="bg-blue-600 text-white border-t border-blue-700">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Great Talent?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto font-normal">
            Join the platform trusted by businesses and freelancers worldwide
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg" className="!rounded-full px-8">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { usePlaces } from '../../hooks';
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Heart,
  ArrowRight,
  Play,
  Award,
  Sparkles
} from 'lucide-react';

const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places, loading } = allPlaces;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=600&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-blue-900/80"></div>
            </div>
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-400/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/25 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-cyan-500/20 rounded-full animate-pulse"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
              <span className="text-lg font-medium bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Welcome to the Future of Travel
              </span>
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
            
            <h1 className="mb-6 text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Extraordinary
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Stays
              </span>
            </h1>
            
            <p className="mb-8 text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Experience India like never before with our curated collection of unique accommodations, 
              from heritage havelis to modern retreats.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="#explore"
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <Globe className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                Explore Destinations
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold text-lg hover:bg-white/30 transition-all duration-300">
                <Play className="h-6 w-6" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{places.length}+</div>
                <div className="text-blue-200 text-sm">Unique Places</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">28</div>
                <div className="text-blue-200 text-sm">States Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9</div>
                <div className="text-blue-200 text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-200 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">StayInn</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of technology and hospitality, crafted by Chirag Yadav
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified Properties</h3>
              <p className="text-gray-600">Every listing is personally verified for quality and safety standards.</p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Booking</h3>
              <p className="text-gray-600">Book your stay instantly with our streamlined reservation system.</p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Hosts</h3>
              <p className="text-gray-600">Connect with authentic local hosts for genuine cultural experiences.</p>
            </div>

            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600">Curated selection of premium accommodations across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Amazing Places</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From the snow-capped Himalayas to the sun-kissed beaches of Goa, discover India's diverse beauty
            </p>
          </div>

          {places.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {places.slice(0, 8).map((place) => (
                <div key={place._id} className="group">
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No places found yet!</h3>
              <p className="text-gray-600 mb-8">
                We're working on adding amazing places for you to explore.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              >
                <ArrowRight className="h-5 w-5" />
                Check Back Later
              </Link>
            </div>
          )}

          {places.length > 8 && (
            <div className="text-center mt-12">
              <Link
                to="/"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
              >
                View All Places
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Adventure</span>?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of authentic Indian hospitality through StayInn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;

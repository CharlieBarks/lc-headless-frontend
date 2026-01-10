import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Las Cruces</div>
                <div className="text-xs text-gray-600">Directory</div>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/restaurant" className="text-gray-700 hover:text-green-600 transition">Restaurants</Link>
              <Link href="/business" className="text-gray-700 hover:text-green-600 transition">Businesses</Link>
              <Link href="/accommodation" className="text-gray-700 hover:text-green-600 transition">Accommodations</Link>
              <Link href="/places" className="text-gray-700 hover:text-green-600 transition">Places</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Desert Icon */}
          <div className="mb-8 inline-block">
            <div className="text-8xl sm:text-9xl mb-4 animate-bounce">🏜️</div>
          </div>
          
          {/* Error Message */}
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Lost in the Desert?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Looks like this page wandered off into the Chihuahuan Desert. Don't worry, we'll help you find your way back to Las Cruces!
          </p>
          
          {/* Quick Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <Link 
              href="/restaurant" 
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🍽️</div>
              <div className="font-semibold text-gray-900">Restaurants</div>
              <div className="text-sm text-gray-500 mt-1">Find great food</div>
            </Link>
            
            <Link 
              href="/business" 
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏪</div>
              <div className="font-semibold text-gray-900">Businesses</div>
              <div className="text-sm text-gray-500 mt-1">Local services</div>
            </Link>
            
            <Link 
              href="/accommodation" 
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏨</div>
              <div className="font-semibold text-gray-900">Accommodations</div>
              <div className="text-sm text-gray-500 mt-1">Places to stay</div>
            </Link>
            
            <Link 
              href="/places" 
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📍</div>
              <div className="font-semibold text-gray-900">Places</div>
              <div className="text-sm text-gray-500 mt-1">Attractions</div>
            </Link>
          </div>
          
          {/* Back Home Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/" 
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              ← Return to Homepage
            </Link>
            <Link 
              href="/blog" 
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-md"
            >
              Read Our Blog
            </Link>
          </div>
          
          {/* Help Text */}
          <p className="mt-12 text-sm text-gray-500">
            Still can't find what you're looking for? <Link href="/contact-us" className="text-green-600 hover:text-green-700 underline">Contact us</Link> for help!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">About Us</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Welcome to Las Cruces Directory, your comprehensive guide to discovering the best local businesses,
            restaurants, accommodations, and places in Las Cruces, New Mexico.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            We are dedicated to connecting the Las Cruces community by providing a centralized platform
            where locals and visitors can discover amazing businesses and services in our vibrant city.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">What We Do</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Our directory features carefully curated listings of restaurants, businesses, accommodations,
            and notable places throughout Las Cruces. We strive to provide accurate, up-to-date information
            to help you make informed decisions about where to eat, shop, stay, and explore.
          </p>
        </div>
      </div>
    </div>
  );
}

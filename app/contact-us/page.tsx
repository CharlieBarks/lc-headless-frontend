import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          Have questions or want to add your business to our directory? We'd love to hear from you!
        </p>

        <div className="space-y-6">
          <div className="flex items-start space-x-4 p-6 bg-slate-50 rounded-xl">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
              <a href="mailto:info@lascrucesdirectory.com" className="text-emerald-600 hover:text-emerald-700">
                info@lascrucesdirectory.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-slate-50 rounded-xl">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
              <p className="text-slate-600">Las Cruces, New Mexico</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-slate-50 rounded-xl">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
              <a href="tel:+15055551234" className="text-emerald-600 hover:text-emerald-700">
                (505) 555-1234
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <h3 className="font-semibold text-slate-900 mb-2">Business Inquiries</h3>
          <p className="text-slate-600">
            Want to add your business to our directory? Contact us to learn about our listing options
            and how we can help showcase your business to the Las Cruces community.
          </p>
        </div>
      </div>
    </div>
  );
}

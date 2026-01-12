import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function NewsletterSection() {
  return (
    <section id="newsletter" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex items-center gap-2">
        <div className="w-8 h-1 bg-gradient-to-r from-transparent to-emerald-500 rounded-full"></div>
        <div className="flex-1 h-1 bg-emerald-500 rounded-full"></div>
        <div className="w-3 h-1 bg-emerald-400 rounded-full"></div>
        <div className="flex-1 h-1 bg-emerald-500 rounded-full"></div>
        <div className="w-8 h-1 bg-gradient-to-l from-transparent to-emerald-500 rounded-full"></div>
      </div>
      <div className="max-w-5xl mx-auto">
        <a
          href="https://livelovelascruces.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="mb-6">
                <Image
                  src="/1.png"
                  alt="Live Love Las Cruces"
                  width={200}
                  height={64}
                  className="h-16 w-auto"
                />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Stay in the Loop
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Subscribe to the Live Love Las Cruces newsletter and get the latest updates on local events, new businesses, and everything happening in our vibrant community.
              </p>

              <div className="inline-flex items-center space-x-2 text-emerald-600 font-semibold text-lg group">
                <span>Subscribe Now</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="relative hidden md:block h-full min-h-[400px]">
              <Image
                src="/FarmersMarket.png"
                alt="Las Cruces Farmers Market"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

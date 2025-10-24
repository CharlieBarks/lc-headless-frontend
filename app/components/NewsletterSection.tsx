'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://livelovelascruces.com/wp-json/newsletter/v1/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="mb-6">
                <img
                  src="/2.png"
                  alt="Live Love Las Cruces"
                  className="h-16 w-auto"
                />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Stay in the Loop
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Subscribe to the Live Love Las Cruces newsletter and get the latest updates on local events, new businesses, and everything happening in our vibrant community.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
                  />
                </div>

                {status === 'success' ? (
                  <div className="flex items-center justify-center space-x-2 py-4 bg-emerald-50 text-emerald-700 rounded-xl font-medium">
                    <Check className="w-5 h-5" />
                    <span>{message}</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
                  </button>
                )}

                {status === 'error' && (
                  <p className="text-red-600 text-sm text-center">{message}</p>
                )}
              </form>

              <p className="text-xs text-slate-500 mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20"></div>
              <img
                src="https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Las Cruces Community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

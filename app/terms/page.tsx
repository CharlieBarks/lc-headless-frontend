export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using Las Cruces Directory, you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Use of Service</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Las Cruces Directory provides a platform for discovering local businesses, restaurants,
              accommodations, and places. You agree to use this service only for lawful purposes and in
              accordance with these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Business Listings</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We strive to provide accurate and up-to-date information about listed businesses. However:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>We do not guarantee the accuracy of all listing information</li>
              <li>Business hours, contact information, and services may change without notice</li>
              <li>We are not responsible for the quality of services provided by listed businesses</li>
              <li>We reserve the right to modify or remove listings at our discretion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              The content, design, and functionality of Las Cruces Directory are protected by copyright
              and other intellectual property rights. You may not reproduce, distribute, or create
              derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              Las Cruces Directory and its operators shall not be liable for any direct, indirect,
              incidental, consequential, or punitive damages arising from your use of or inability to
              use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting to the website. Your continued use of the service constitutes
              acceptance of any modifications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@lascrucesdirectory.com" className="text-emerald-600 hover:text-emerald-700">
                legal@lascrucesdirectory.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

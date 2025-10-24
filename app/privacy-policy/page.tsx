export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              Las Cruces Directory ("we," "our," or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard your information when you
              visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We may collect information about your device and how you interact with our website, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Improve our website and services</li>
              <li>Understand how visitors use our directory</li>
              <li>Analyze trends and user behavior</li>
              <li>Provide relevant content and listings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Links</h2>
            <p className="text-slate-600 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@lascrucesdirectory.com" className="text-emerald-600 hover:text-emerald-700">
                privacy@lascrucesdirectory.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

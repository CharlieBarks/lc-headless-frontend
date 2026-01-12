import Link from 'next/link';
import Image from 'next/image';
import { Calendar, BookOpen, ChevronRight } from 'lucide-react';
import { getBlogPostImage, decodeHtmlEntities, getCachedBlogPosts } from '../../lib/wordpress';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog - Las Cruces Directory',
  description: 'Read the latest articles, news, and stories about Las Cruces. Stay updated with local events, business highlights, and community news.',
  openGraph: {
    title: 'Las Cruces Directory Blog',
    description: 'Read the latest articles, news, and stories about Las Cruces.',
    type: 'website',
  },
};

export default async function BlogPage() {
  const blogPosts = await getCachedBlogPosts(50);

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-slate-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
          </nav>

          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Blog</h1>
              <p className="text-xl text-slate-300">
                Stories, news, and updates from Las Cruces
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-slate-300">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              {blogPosts.length} articles
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                const imageUrl = getBlogPostImage(post);
                const excerpt = stripHtml(post.excerpt.rendered);

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={decodeHtmlEntities(post.title.rendered)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-slate-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(post.date)}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                        {decodeHtmlEntities(post.title.rendered)}
                      </h3>
                      <p className="text-slate-600 line-clamp-3">{excerpt}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No posts yet</h3>
              <p className="text-slate-600">Check back soon for new articles!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

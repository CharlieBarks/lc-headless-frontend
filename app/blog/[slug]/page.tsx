import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { getBlogPostImage, decodeHtmlEntities, getCachedBlogPostBySlug } from '../../../lib/wordpress';
import { getCachedBlogPostSEO, generateArticleSchema, generateBreadcrumbSchema, JsonLdScript } from '../../../lib/seo';
import type { Metadata } from 'next';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = await getCachedBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  const headersList = await headers();
  const host = headersList.get('host') || '';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const currentUrl = `${protocol}://${host}/blog/${slug}`;

  const seoData = await getCachedBlogPostSEO(slug);

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const excerpt = stripHtml(post.excerpt.rendered);
  const title = decodeHtmlEntities(post.title.rendered);

  return {
    title: seoData.title || title,
    description: seoData.description || excerpt,
    openGraph: {
      title: seoData.ogTitle || title,
      description: seoData.ogDescription || excerpt,
      images: seoData.ogImage ? [seoData.ogImage] : getBlogPostImage(post) ? [getBlogPostImage(post)] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.twitterTitle || title,
      description: seoData.twitterDescription || excerpt,
      images: seoData.twitterImage ? [seoData.twitterImage] : getBlogPostImage(post) ? [getBlogPostImage(post)] : undefined,
    },
    alternates: {
      canonical: currentUrl,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = await getCachedBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 font-medium">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = getBlogPostImage(post);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const estimateReadingTime = (content: string): number => {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const readingTime = post.content ? estimateReadingTime(post.content.rendered) : 5;

  const articleSchema = generateArticleSchema({
    headline: decodeHtmlEntities(post.title.rendered),
    description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim(),
    image: imageUrl,
    datePublished: post.date,
    author: 'Las Cruces Directory',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://lascrucesdirectory.com' },
    { name: 'Blog', url: 'https://lascrucesdirectory.com/blog' },
    { name: decodeHtmlEntities(post.title.rendered), url: `https://lascrucesdirectory.com/blog/${slug}` },
  ]);

  return (
    <>
      <JsonLdScript data={[articleSchema, breadcrumbSchema]} />
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <span className="text-slate-900 font-medium truncate">{decodeHtmlEntities(post.title.rendered)}</span>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {decodeHtmlEntities(post.title.rendered)}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {imageUrl && (
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-8">
              <Image
                src={imageUrl}
                alt={decodeHtmlEntities(post.title.rendered)}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          )}
        </header>

        {post.content && (
          <div
        className="wp-content"      
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        )}

        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Blog</span>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(post.link)}&text=${encodeURIComponent(post.title.rendered)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                <span className="sr-only">Share on Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.link)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                <span className="sr-only">Share on Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}

/**
 * BlogCards Component - Displays featured and regular blog posts.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {BlogPost[]} props.blogPosts - List of blog posts to display (first one is treated as featured).
 * @param {(imageName: string, type: 'cover' | 'author') => string} props.getImageSrc
 *        Function to return the correct image URL or placeholder.
 * @param {(imageKey: string) => void} props.handleImageError
 *        Callback to handle image load errors.
 *
 * @example
 * const getImageSrc = (name, type) => {
 *   if (!name) {
 *     return type === 'author'
 *       ? '/images/profilePlaceholder.jpg'
 *       : '/images/blogPlaceholder.jpg';
 *   }
 *   return `/images/${name}.jpg`;
 * };
 *
 * const handleImageError = (key) => console.error('Image failed:', key);
 *
 * <BlogCards
 *   blogPosts={blogPosts}
 *   getImageSrc={getImageSrc}
 *   handleImageError={handleImageError}
 * />
 *
 * @typedef {Object} BlogPost
 * @property {string} title - Blog post title.
 * @property {string} excerpt - Short summary text.
 * @property {string} coverImage - Image name without extension.
 * @property {string[]} categories - Array of categories.
 * @property {BlogAuthor} author - Author details.
 * @property {string} date - Publication date.
 * @property {string} readTime - Estimated read time.
 * @property {string} slug - Post slug for routing.
 *
 * @typedef {Object} BlogAuthor
 * @property {string} name - Author name.
 * @property {string} imageName - Author image name without extension.
 */

import Image from 'next/image';
import Link from 'next/link';

interface BlogAuthor {
  name: string;
  imageName: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  coverImage: string;
  categories: string[];
  author: BlogAuthor;
  date: string;
  readTime: string;
  slug: string;
}

interface BlogCardsProps {
  blogPosts: BlogPost[];
  getImageSrc: (imageName: string, type: 'cover' | 'author') => string;
  handleImageError: (imageKey: string) => void;
}

export default function BlogCards({ blogPosts, getImageSrc, handleImageError }: BlogCardsProps) {
  // The first post is the featured post (already sorted by date in parent component)
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <>
      {/* Featured Article */}
      {featuredPost && (
        <div className="blog-card group">
          <Link href={`/blog/${featuredPost.slug}`} className="block">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-[hsla(var(--card))] rounded-xl overflow-hidden border border-[hsla(var(--border),0.2)] hover:border-[hsla(var(--electric-cyan),0.5)] transition-colors duration-300">
              <div className="md:col-span-2 relative h-60 md:h-auto overflow-hidden">
                <Image
                  src={getImageSrc(featuredPost.coverImage, 'cover')}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => {
                    handleImageError(`cover-${featuredPost.coverImage}`);
                  }}
                  unoptimized
                />
              </div>

              <div className="md:col-span-3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.categories.map((category, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.2)]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={getImageSrc(featuredPost.author.imageName, 'author')}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                        onError={() => {
                          handleImageError(`author-${featuredPost.author.imageName}`);
                        }}
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-[hsl(var(--muted-foreground))] text-xs">
                        {featuredPost.date} · {featuredPost.readTime}
                      </p>
                    </div>
                  </div>

                  <span className="text-[hsl(var(--electric-cyan))] group-hover:translate-x-1 transition-transform duration-300">
                    Read Article →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Regular Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {regularPosts.map((post, index) => (
          <div key={index} className="blog-card group">
            <Link
              href={`/blog/${post.slug}`}
              className="block bg-[hsla(var(--card))] rounded-xl overflow-hidden border border-[hsla(var(--border),0.2)] hover:border-[hsla(var(--electric-cyan),0.5)] transition-colors duration-300 h-full"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={getImageSrc(post.coverImage, 'cover')}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => {
                    handleImageError(`cover-${post.coverImage}`);
                  }}
                  unoptimized
                />
              </div>

              <div className="p-6 flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.slice(0, 1).map((category, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.2)]"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
                  {post.title}
                </h3>

                <p className="text-[hsl(var(--muted-foreground))] text-sm mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={getImageSrc(post.author.imageName, 'author')}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        onError={() => {
                          handleImageError(`author-${post.author.imageName}`);
                        }}
                        unoptimized
                      />
                    </div>
                    <p className="text-white text-xs font-medium">
                      {post.author.name}
                    </p>
                  </div>
                  <p className="text-[hsl(var(--muted-foreground))] text-xs">
                    {post.readTime}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-26 mb-28 relative z-10">
        <Link
          href="/blog/all"
          className="inline-block px-6 py-3 bg-[hsl(var(--electric-cyan))] text-[hsl(var(--background))] rounded-lg font-medium transition-transform duration-300 transform hover:scale-105"
        >
          View All Articles
        </Link>
      </div>
    </>
  );
}
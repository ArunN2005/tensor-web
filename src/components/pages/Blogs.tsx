import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

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
  important?: boolean;
}
interface BlogCardsProps {
  blogPosts: BlogPost[];
  getImageSrc: (imageName: string, type: 'cover' | 'author') => string;
  handleImageError: (imageKey: string) => void;
  categories?: string[];
  filterCategory?: string;
  setFilterCategory?: (cat: string) => void;
}

export default function BlogCards({
  blogPosts,
  getImageSrc,
  handleImageError,
  categories = [],
  filterCategory = '',
  setFilterCategory = () => {},
}: BlogCardsProps) {
  const displayPosts = filterCategory
    ? blogPosts.filter((p) => p.categories.includes(filterCategory))
    : blogPosts;
  const importantPosts = displayPosts.filter((post) => post.important);
  const regularPosts = displayPosts.filter((post) => !post.important);
  const featuredPost = displayPosts[0];

  // --- Scroll hint logic ---
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollHint(container.scrollLeft <= 10);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Filtering System */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${
            filterCategory
              ? 'bg-gray-700 text-gray-100 hover:bg-[hsl(var(--electric-cyan))] hover:text-black'
              : 'bg-[hsl(var(--electric-cyan))] text-black hover:bg-gray-700 hover:text-white'
          }`}
          onClick={() => setFilterCategory('')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${
              filterCategory === cat
                ? 'bg-[hsl(var(--electric-cyan))] text-black'
                : 'bg-gray-700 text-gray-100 hover:bg-[hsl(var(--electric-cyan))] hover:text-black'
            }`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

     {/* Featured Post */}
<h3 className="text-xl font-bold mb-5 text-[hsl(var(--electric-cyan))]">
  Spotlight Stories
</h3>
{featuredPost && (
  <div className="group mb-14 rounded-2xl overflow-hidden border border-[hsla(var(--border),0.2)] mx-2 sm:mx-0 transform transition-transform duration-500 hover:scale-[1.02]">
    <Link href={`/blog/${featuredPost.slug}`}>
      <div className="relative w-full flex items-end h-64 sm:h-96 lg:h-[28rem]">
        <Image
          src={getImageSrc(featuredPost.coverImage, 'cover')}
          alt={featuredPost.title}
          fill
          className="object-cover"
          onError={() =>
            handleImageError(`cover-${featuredPost.coverImage}`)
          }
          loading="lazy"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="relative z-10 p-4 sm:p-8 max-w-full sm:max-w-2xl text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {featuredPost.categories.map((cat, i) => (
              <span
                key={i}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-xs rounded border border-[hsl(var(--electric-cyan))] bg-[hsla(var(--electric-cyan),0.16)] text-[hsl(var(--electric-cyan))] font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-5 leading-snug tracking-tight group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
            {featuredPost.title}
          </h2>
          <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-lg font-serif">
            {featuredPost.excerpt}
          </p>
          <div className="mt-3 sm:mt-5 text-left">
            <span className="relative cursor-pointer font-bold text-[hsl(var(--electric-cyan))] hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[hsl(var(--electric-cyan))] after:transition-all after:duration-500 hover:after:w-full">
              Read Now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  </div>
)}

      {/* Important Posts */}
      {importantPosts.length > 1 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-2 px-2 sm:px-0">
            <h3 className="text-xl font-bold text-[hsl(var(--electric-cyan))] whitespace-nowrap">
              Top Blogs
            </h3>
            {showScrollHint && (
              <span className="text-sm text-white px-3 py-1 shadow-md font-semibold animate-[pulse_2.5s_ease-in-out_infinite] whitespace-nowrap">
                Scroll here →
              </span>
            )}
          </div>
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap gap-6 overflow-x-auto py-4 px-2 sm:px-0 hide-scrollbar"
          >
            {importantPosts.map((post) => (
              <div
                key={post.slug}
                className="group min-w-[340px] max-w-xs flex-shrink-0 rounded-2xl overflow-hidden border border-[hsla(var(--border),0.18)] bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 active:scale-100 cursor-pointer mx-2"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative h-48 w-full">
                    <Image
                      src={getImageSrc(post.coverImage, 'cover')}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      onError={() =>
                        handleImageError(`cover-${post.coverImage}`)
                      }
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.categories.map((cat, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs rounded-full border border-[hsl(var(--electric-cyan))] bg-[hsla(var(--electric-cyan),0.16)] text-[hsl(var(--electric-cyan))] font-semibold"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-6 rounded-full overflow-hidden">
                        <Image
                          src={getImageSrc(post.author.imageName, 'author')}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          onError={() =>
                            handleImageError(`author-${post.author.imageName}`)
                          }
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <span className="text-xs text-gray-300">
                        {post.author.name}
                      </span>
                      <span className="ml-auto text-xs text-gray-400 italic">
                        {post.readTime}
                      </span>
                    </div>
                    <div className="mt-1 text-right">
                      <span className="relative cursor-pointer font-bold text-[hsl(var(--electric-cyan))] hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[hsl(var(--electric-cyan))] after:transition-all after:duration-500 hover:after:w-full">
                        Read Now →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section>
        <h3 className="text-xl font-bold mb-5 text-[hsl(var(--electric-cyan))]">
          Discover More
        </h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr px-2 sm:px-0">
          {regularPosts.map((post) => (
            <div
              key={post.slug}
              className="blog-card group bg-[hsla(var(--card),0.98)] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-[hsla(var(--border),0.15)] transition duration-500 relative cursor-pointer"
              style={{
                transition: 'transform 0.3s',
                willChange: 'transform',
              }}
              tabIndex={0}
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={getImageSrc(post.coverImage, 'cover')}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() =>
                      handleImageError(`cover-${post.coverImage}`)
                    }
                    loading="lazy"
                    unoptimized
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.categories.slice(0, 2).map((category, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full font-mono border border-[hsl(var(--electric-cyan))] bg-[hsla(var(--electric-cyan),0.16)] text-[hsl(var(--electric-cyan))] font-semibold"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-base mb-4 line-clamp-3 flex-grow font-serif">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden border border-[hsl(var(--electric-cyan))]">
                        <Image
                          src={getImageSrc(post.author.imageName, 'author')}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          onError={() =>
                            handleImageError(
                              `author-${post.author.imageName}`
                            )
                          }
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <div>
                        <span className="text-white text-xs font-semibold block">
                          {post.author.name}
                        </span>
                        <span className="text-[hsl(var(--muted-foreground))] text-xs block">
                          {post.date}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300">
                      {post.readTime}
                    </span>
                  </div>
                  <div className="mt-1 text-right">
                    <span className="relative cursor-pointer font-bold text-[hsl(var(--electric-cyan))] hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[hsl(var(--electric-cyan))] after:transition-all after:duration-500 hover:after:w-full">
                      Read Now →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

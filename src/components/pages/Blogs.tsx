import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

// Simple pseudo-random number generator with seed (same as Hero component)
const seededRandom = (min: number, max: number, seed: number) => {
  const x = Math.sin(seed) * 10000;
  const result = (x - Math.floor(x)) * (max - min) + min;
  return result;
};

// Generate particles for background
const generateParticles = (count: number, seed: number = 555) => {
  return Array.from({ length: count }, (_, i) => {
    const size = seededRandom(1, 3, seed + i * 0.1);
    const top = seededRandom(0, 100, seed + i * 0.2);
    const left = seededRandom(0, 100, seed + i * 0.3);
    const color = i % 3 === 0 
      ? 'hsla(var(--electric-cyan), 0.6)' 
      : i % 3 === 1 
        ? 'hsla(var(--digital-purple), 0.6)' 
        : 'hsla(var(--magenta), 0.6)';
        
    return { size, top, left, color, id: i };
  });
};

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
  // Helper component: dynamic aspect based on image natural size
  const DynamicCardImage = ({
    src,
    alt,
    onError,
  }: { src: string; alt: string; onError: () => void }) => {
    const [ratio, setRatio] = useState<number | null>(null);
    return (
      <div
        className="relative w-full overflow-hidden rounded-md bg-[hsla(var(--card),0.4)]"
        style={{ aspectRatio: ratio ? String(ratio) : '16 / 9' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          onError={onError}
          loading="lazy"
          unoptimized
          onLoadingComplete={(img) => {
            if (img.naturalWidth && img.naturalHeight) {
              setRatio(img.naturalWidth / img.naturalHeight);
            }
          }}
        />
        {/* subtle inner shadow to frame letterboxed images */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]" />
      </div>
    );
  };
  const displayPosts = filterCategory
    ? blogPosts.filter((p) => p.categories.includes(filterCategory))
    : blogPosts;
  // We will render a single uniform grid; no featured or top sections
  const allGridPosts = displayPosts;

  // --- Scroll hint logic ---
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState<Array<{size: number, top: number, left: number, color: string, id: number}>>([]);

  useEffect(() => {
    setIsLoaded(true);
    setParticles(generateParticles(15));
    
    if (headingRef.current) {
      // Animation for the heading
      const gsapImport = import('gsap').then(({ gsap }) => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      });
    }
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollHint(container.scrollLeft <= 10);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative py-8 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-[hsla(var(--digital-purple),0.05)] blur-[100px] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-[25vw] h-[25vw] rounded-full bg-[hsla(var(--electric-cyan),0.05)] blur-[80px]"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
        </div>
      </div>
      
      {/* Particles animation - only rendered on client side */}
      {isLoaded && particles.map(particle => (
        <div 
          key={particle.id} 
          className="blog-particle absolute rounded-full z-1 opacity-0"
          style={{ 
            width: `${particle.size}px`, 
            height: `${particle.size}px`, 
            top: `${particle.top}%`, 
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        ></div>
      ))}

  {/* Section heading is rendered by the page header */}

      {/* Filtering System */}
      <div className="flex flex-wrap gap-2 mb-8 relative z-10 justify-center">
        <button
          className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${
            filterCategory
              ? 'bg-[hsla(var(--background),0.8)] text-white hover:bg-[hsl(var(--electric-cyan))] hover:text-black border border-[hsla(var(--electric-cyan),0.3)]'
              : 'bg-[hsl(var(--electric-cyan))] text-black hover:bg-[hsla(var(--background),0.8)] hover:text-white border border-[hsla(var(--electric-cyan),0.5)]'
          }`}
          onClick={() => setFilterCategory('')}
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${
              filterCategory === cat
                ? 'bg-[hsl(var(--electric-cyan))] text-black border border-[hsla(var(--electric-cyan),0.5)]'
                : 'bg-[hsla(var(--background),0.8)] text-white hover:bg-[hsl(var(--electric-cyan))] hover:text-black border border-[hsla(var(--electric-cyan),0.3)]'
            }`}
            onClick={() => setFilterCategory(cat)}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Unified Grid of Posts */}
      <section className="relative z-10">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr px-2 sm:px-0">
          {allGridPosts.map((post) => (
            <div
              key={post.slug}
              className="blog-card group bg-[hsla(var(--card),0.95)] backdrop-blur rounded-2xl overflow-hidden shadow-md hover:shadow-[0_0_20px_hsla(var(--electric-cyan),0.2)] border border-[hsla(var(--border),0.3)] hover:border-[hsla(var(--electric-cyan),0.4)] transition duration-500 relative cursor-pointer transform hover:translate-y-[-8px]"
              style={{
                transition: 'all 0.3s ease',
                willChange: 'transform',
              }}
              tabIndex={0}
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <DynamicCardImage
                  src={getImageSrc(post.coverImage, 'cover')}
                  alt={post.title}
                  onError={() => handleImageError(`cover-${post.coverImage}`)}
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.categories.slice(0, 2).map((category, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full font-mono border border-[hsl(var(--electric-cyan))] bg-[hsla(var(--electric-cyan),0.16)] text-[hsl(var(--electric-cyan))] font-semibold"
                        style={{ fontFamily: 'var(--font-geist-mono)' }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 
                    className="text-2xl font-bold mb-1 text-white group-hover:text-[hsl(var(--electric-cyan))] transition-colors"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    {post.title}
                  </h3>
                  <p 
                    className="text-[hsl(var(--muted-foreground))] text-base mb-4 line-clamp-3 flex-grow"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
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
                        <span 
                          className="text-white text-xs font-semibold block"
                          style={{ fontFamily: 'var(--font-space-grotesk)' }}
                        >
                          {post.author.name}
                        </span>
                        <span 
                          className="text-[hsl(var(--muted-foreground))] text-xs block"
                          style={{ fontFamily: 'var(--font-geist-mono)' }}
                        >
                          {post.date}
                        </span>
                      </div>
                    </div>
                    <span 
                      className="text-xs text-gray-300"
                      style={{ fontFamily: 'var(--font-geist-mono)' }}
                    >
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
      
      {/* Code symbols */}
      <div className="absolute top-[15%] right-[10%] text-[hsla(var(--electric-cyan),0.2)] text-4xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`{ }`}</div>
      <div className="absolute bottom-[25%] left-[12%] text-[hsla(var(--digital-purple),0.2)] text-3xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`</>`}</div>
    </div>
  );
}

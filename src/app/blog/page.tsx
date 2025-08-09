'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

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

export default function BlogPage() {
  const blogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const blogPosts: BlogPost[] = [
    {
      title: 'The Future of AI: Trends and Predictions for 2024 and Beyond',
      excerpt: 'Artificial intelligence continues to evolve at a rapid pace. In this comprehensive article, we explore the emerging trends, breakthrough technologies, and predictions for the future of AI in 2024 and beyond. From generative AI to autonomous systems, discover how these advancements will transform industries and society.',
      coverImage: 'ai-future',
      categories: ['Artificial Intelligence', 'Technology Trends'],
      author: {
        name: 'Sarah Chen',
        imageName: 'sarah-chen'
      },
      date: 'May 18, 2024',
      readTime: '12 min read',
      slug: 'future-of-ai-trends-predictions'
    },
    {
      title: 'Getting Started with TensorFlow: A Beginner\'s Guide',
      excerpt: 'Learn the basics of TensorFlow and how to build your first machine learning model with this comprehensive guide for beginners.',
      coverImage: 'tensorflow-guide',
      categories: ['Machine Learning', 'TensorFlow'],
      author: {
        name: 'Alex Johnson',
        imageName: 'alex-johnson'
      },
      date: 'May 10, 2024',
      readTime: '8 min read',
      slug: 'getting-started-with-tensorflow'
    },
    {
      title: 'Building Responsive Websites with Next.js and Tailwind CSS',
      excerpt: 'Discover how to create beautiful, responsive websites using Next.js and Tailwind CSS with this step-by-step tutorial.',
      coverImage: 'nextjs-tailwind',
      categories: ['Web Development', 'Next.js'],
      author: {
        name: 'Maya Patel',
        imageName: 'maya-patel'
      },
      date: 'April 25, 2024',
      readTime: '6 min read',
      slug: 'building-responsive-websites-nextjs-tailwind'
    },
    {
      title: 'Introduction to Quantum Computing: Concepts and Applications',
      excerpt: 'Explore the fascinating world of quantum computing, including key concepts, algorithms, and real-world applications.',
      coverImage: 'quantum-computing',
      categories: ['Quantum Computing', 'Technology'],
      author: {
        name: 'David Kim',
        imageName: 'david-kim'
      },
      date: 'April 15, 2024',
      readTime: '10 min read',
      slug: 'intro-to-quantum-computing'
    }
  ];
  
  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    // Animate blog cards
    if (blogRef.current) {
      const blogCards = blogRef.current.querySelectorAll('.blog-card');
      gsap.fromTo(
        blogCards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3
        }
      );
    }
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-4">Latest Articles</h1>
        <div className="w-20 h-1 bg-[hsl(var(--electric-cyan))] mx-auto"></div>
        <p className="mt-6 text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Explore our latest articles, tutorials, and insights on technology, programming, and innovation.
        </p>
      </div>
      
      <div ref={blogRef} className="grid grid-cols-1 gap-12">
        {/* Featured Article */}
        <div className="blog-card group">
          <Link href={`/blog/${blogPosts[0].slug}`} className="block">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-[hsla(var(--card),0.5)] rounded-xl overflow-hidden border border-[hsla(var(--border),0.2)] hover:border-[hsla(var(--electric-cyan),0.5)] transition-colors duration-300">
              <div className="md:col-span-2 relative h-60 md:h-auto overflow-hidden">
                <Image
                  src={`/images/blog/${blogPosts[0].coverImage}.jpg`}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/grid-pattern.svg"; // Fallback image
                  }}
                />
              </div>
              
              <div className="md:col-span-3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blogPosts[0].categories.map((category, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 text-xs rounded-full bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.2)]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  
                  <p className="text-[hsl(var(--muted-foreground))] mb-6">{blogPosts[0].excerpt}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={`/images/team/${blogPosts[0].author.imageName}.jpg`}
                        alt={blogPosts[0].author.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/Team.jpg"; // Fallback image
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{blogPosts[0].author.name}</p>
                      <p className="text-[hsl(var(--muted-foreground))] text-xs">{blogPosts[0].date} · {blogPosts[0].readTime}</p>
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
        
        {/* Regular Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <div key={index} className="blog-card group">
              <Link href={`/blog/${post.slug}`} className="block bg-[hsla(var(--card),0.5)] rounded-xl overflow-hidden border border-[hsla(var(--border),0.2)] hover:border-[hsla(var(--electric-cyan),0.5)] transition-colors duration-300 h-full">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={`/images/blog/${post.coverImage}.jpg`}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/grid-pattern.svg"; // Fallback image
                    }}
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
                          src={`/images/team/${post.author.imageName}.jpg`}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/Team.jpg"; // Fallback image
                          }}
                        />
                      </div>
                      <p className="text-white text-xs font-medium">{post.author.name}</p>
                    </div>
                    <p className="text-[hsl(var(--muted-foreground))] text-xs">{post.readTime}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link
          href="/blog/all"
          className="px-6 py-3 bg-[hsl(var(--electric-cyan))] text-[hsl(var(--background))] rounded-lg font-medium hover:bg-[hsla(var(--electric-cyan),0.8)] transition-colors"
        >
          View All Articles
        </Link>
      </div>
    </div>
  );
}

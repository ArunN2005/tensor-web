'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import BlogCards from '@/components/pages/Blogs';

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

export default function BlogPage() {
  const blogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [filterCategory, setFilterCategory] = useState('');

  const blogPosts: BlogPost[] = [
    {
      title: 'Chasing the Next Big Thing — The Never-Ending Web Framework Race',
      excerpt: 'Are we building better websites—or just sprinting on a hype treadmill? A grounded take on frameworks, fatigue, and focus.',
      coverImage: 'web blog.png',
      categories: ['Web Development', 'Opinion'],
      author: { 
        name: 'KEERTHIVASAN S V', 
        imageName: 'https://media.licdn.com/dms/image/v2/D5603AQF1bBmX3MQhEw/profile-displayphoto-scale_400_400/B56ZiUlBrfHUAk-/0/1754839392810?e=1759968000&v=beta&t=u95GxjVUvkddYTQcd4kI4wiXBAHu0SsHNJhmVJfrO2Y' 
      },
      date: 'September 8, 2025',
      readTime: '7 min read',
      slug: 'never-ending-web-framework-race',
      important: true,
    },
    {
      title: 'The Future of Research & Development: Driving Innovation in a Hyperconnected World',
      excerpt: 'How AI labs, quantum breakthroughs, and digital twins are reshaping modern R&D—from methods to moonshots.',
      coverImage: 'r and d.jpg',
      categories: ['R&D', 'Innovation'],
      author: { 
        name: 'Jishnu Teja Dandamudi', 
        imageName: 'https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMgmJtMMbu7L5kgxMzcNX9ZHPEyTF2fBn8I3qJ' 
      },
      date: 'September 8, 2025',
      readTime: '9 min read',
      slug: 'future-of-research-and-development',
      important: true,
    },
  ];
  // Get all unique categories
  const allCategories = Array.from(new Set(blogPosts.flatMap((post) => post.categories))).sort();

  // Sort by date desc (latest at top)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter posts by search term
  const filteredPosts = sortedPosts.filter((post) => (filterCategory ? post.categories.includes(filterCategory) : true));

  const handleImageError = (imageKey: string) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }));
  };

  const getImageSrc = (imageName: string, type: 'cover' | 'author') => {
    if (!imageName) {
      return type === 'author'
        ? '/images/profilePlaceholder.jpg'
        : '/images/blogPlaceholder.jpg';
    }
    const imageKey = `${type}-${imageName}`;
    if (imageErrors[imageKey]) {
      return type === 'author'
        ? '/images/profilePlaceholder.jpg'
        : '/images/blogPlaceholder.jpg';
    }
    // Support absolute URLs and explicit extensions (png/jpg)
    if (imageName.startsWith('http')) return imageName;
    if (imageName.includes('.')) return `/images/${imageName}`;
    return `/images/${imageName}.jpg`;
  };

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    if (blogRef.current) {
      const blogCards = blogRef.current.querySelectorAll('.blog-card');
      gsap.fromTo(
        blogCards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  return (
    <div className="relative w-full mb-16 font-sans">
      {/* Page Header */}
      <div className="text-center mb-14 pt-24 px-4">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          <span className="text-white">Latest</span> <span className="gradient-text">Articles</span>
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(var(--magenta))] mx-auto rounded-full"></div>
        <p className="mt-6 text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto font-light tracking-wide">
          Explore our latest articles, tutorials, and insights on technology, programming, and innovation.
        </p>
      </div>

      {/* Search removed for a cleaner blogs page */}

      {/* Blog Cards */}
      <div ref={blogRef} className="relative z-10 px-3 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <BlogCards
          blogPosts={filteredPosts}
          getImageSrc={getImageSrc}
          handleImageError={handleImageError}
          categories={allCategories}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
      </div>
    </div>
  );
}
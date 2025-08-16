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
}

export default function BlogPage() {
  const blogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  const handleImageError = (imageKey: string) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }));
  };

  const getImageSrc = (imageName: string, type: 'cover' | 'author') => {
    if (!imageName) {
      return type === 'author' ? '/images/profilePlaceholder.jpg' : '/images/blogPlaceholder.jpg';
    }
    const imageKey = `${type}-${imageName}`;
    if (imageErrors[imageKey]) {
      return type === 'author' ? '/images/profilePlaceholder.jpg' : '/images/blogPlaceholder.jpg';
    }
    return `/images/${imageName}.jpg`;
  };

  const blogPosts: BlogPost[] = [
    {
      title: 'The Future of AI: Trends and Predictions for 2024 and Beyond',
      excerpt: 'Artificial intelligence continues to evolve at a rapid pace. In this comprehensive article, we explore the emerging trends, breakthrough technologies, and predictions for the future of AI in 2024 and beyond. From generative AI to autonomous systems, discover how these advancements will transform industries and society.',
      coverImage: 'ai-future',
      categories: ['Artificial Intelligence', 'Technology Trends'],
      author: { name: 'Sarah Chen', imageName: 'sarah-chen' },
      date: 'May 18, 2024',
      readTime: '12 min read',
      slug: 'future-of-ai-trends-predictions'
    },
    {
      title: 'Getting Started with TensorFlow: A Beginner\'s Guide',
      excerpt: 'Learn the basics of TensorFlow and how to build your first machine learning model with this comprehensive guide for beginners.',
      coverImage: 'tensorflow-guide',
      categories: ['Machine Learning', 'TensorFlow'],
      author: { name: 'Alex Johnson', imageName: 'alex-johnson' },
      date: 'May 10, 2024',
      readTime: '8 min read',
      slug: 'getting-started-with-tensorflow'
    },
    {
      title: 'Building Responsive Websites with Next.js and Tailwind CSS',
      excerpt: 'Discover how to create beautiful, responsive websites using Next.js and Tailwind CSS with this step-by-step tutorial.',
      coverImage: 'nextjs-tailwind',
      categories: ['Web Development', 'Next.js'],
      author: { name: 'Maya Patel', imageName: 'maya-patel' },
      date: 'April 25, 2024',
      readTime: '6 min read',
      slug: 'building-responsive-websites-nextjs-tailwind'
    },
    {
      title: 'Introduction to Quantum Computing: Concepts and Applications',
      excerpt: 'Explore the fascinating world of quantum computing, including key concepts, algorithms, and real-world applications.',
      coverImage: 'quantum-computing',
      categories: ['Quantum Computing', 'Technology'],
      author: { name: 'David Kim', imageName: 'david-kim' },
      date: 'April 15, 2024',
      readTime: '10 min read',
      slug: 'intro-to-quantum-computing'
    }
  ];

  // Sort posts newest to oldest based on date
  const sortedPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        onComplete: () => setLoaded(true)
      }
    );

    if (blogRef.current) {
      const blogCards = blogRef.current.querySelectorAll('.blog-card');
      gsap.fromTo(
        blogCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.5
        }
      );
    }
  }, []);

  return (
    <div className="relative w-full">
      {/* Background image with opacity control */}
      <div
        className="absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          backgroundImage: 'url(/images/blogsBackground.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: '1500px auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: loaded ? 0.3 : 0.95
        }}
      ></div>
      
      <div className="text-center mb-16 relative z-10 pt-20">
        <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-4">
          Latest Articles
        </h1>
        <div className="w-20 h-1 bg-[hsl(var(--electric-cyan))] mx-auto"></div>
        <p className="mt-6 text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Explore our latest articles, tutorials, and insights on technology, programming, and innovation.
        </p>
      </div>

      <div ref={blogRef} className="grid grid-cols-1 gap-12 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <BlogCards 
          blogPosts={sortedPosts} 
          getImageSrc={getImageSrc} 
          handleImageError={handleImageError} 
        />
      </div>
    </div>
  );
}
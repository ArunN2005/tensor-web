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
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts: BlogPost[] = [
    {
      title: 'The Future of AI: Trends and Predictions for 2024 and Beyond',
      excerpt: 'Artificial intelligence continues to evolve at a rapid pace...',
      coverImage: 'ai-future',
      categories: ['Artificial Intelligence', 'Technology Trends'],
      author: { name: 'Sarah Chen', imageName: 'sarah-chen' },
      date: 'May 18, 2024',
      readTime: '12 min read',
      slug: 'future-of-ai-trends-predictions',
      important: true,
    },
    {
      title: "Getting Started with TensorFlow: A Beginner's Guide",
      excerpt: 'Learn the basics of TensorFlow and how to build your first ML model...',
      coverImage: 'tensorflow-guide',
      categories: ['Machine Learning'],
      author: { name: 'Alex Johnson', imageName: 'alex-johnson' },
      date: 'May 10, 2024',
      readTime: '8 min read',
      slug: 'getting-started-with-tensorflow',
      important: true,
    },
    {
      title: 'Building Responsive Websites with Next.js and Tailwind CSS',
      excerpt: 'Discover how to create beautiful, responsive websites...',
      coverImage: 'nextjs-tailwind',
      categories: ['Web Development', 'Next.js'],
      author: { name: 'Maya Patel', imageName: 'maya-patel' },
      date: 'April 25, 2024',
      readTime: '6 min read',
      slug: 'building-responsive-websites-nextjs-tailwind',
    },
    {
      title: 'Introduction to Quantum Computing: Concepts and Applications',
      excerpt: 'Explore the fascinating world of quantum computing...',
      coverImage: 'quantum-computing',
      categories: ['Quantum Computing'],
      author: { name: 'David Kim', imageName: 'david-kim' },
      date: 'April 15, 2024',
      readTime: '10 min read',
      slug: 'intro-to-quantum-computing',
    },
    {
      title: 'Quantum Computing: Unlocking the Next Era of Innovation',
      excerpt: 'Quantum computing is set to revolutionize industries with unprecedented computational power...',
      coverImage: 'quantum-computing',
      categories: ['Quantum Tech'],
      author: { name: 'David Lin', imageName: 'david-lin' },
      date: 'June 2, 2024',
      readTime: '10 min read',
      slug: 'quantum-computing-next-era',
      important: false,
    },
    {
      title: 'Sustainable Tech: How Green Innovations Are Shaping the Future',
      excerpt: 'From renewable energy to carbon-neutral data centers, sustainability is driving major tech shifts...',
      coverImage: 'sustainable-tech',
      categories: ['Technology Trends'],
      author: { name: 'Emily Rodriguez', imageName: 'emily-rodriguez' },
      date: 'April 27, 2024',
      readTime: '8 min read',
      slug: 'sustainable-tech-green-innovations',
      important: true,
    },
    {
      title: 'Web3 and Decentralization: Beyond Cryptocurrency',
      excerpt: 'The rise of decentralized networks is changing finance, governance, and digital ownership...',
      coverImage: 'web3-decentralization',
      categories: ['Blockchain', 'Technology Trends'],
      author: { name: 'Michael Osei', imageName: 'michael-osei' },
      date: 'March 15, 2024',
      readTime: '11 min read',
      slug: 'web3-decentralization-beyond-crypto',
      important: false,
    },
    {
      title: 'The Rise of Edge Computing in a Connected World',
      excerpt: 'As IoT expands, edge computing ensures faster, smarter, and more efficient data processing...',
      coverImage: 'edge-computing',
      categories: ['Cloud & Edge'],
      author: { name: 'Priya Sharma', imageName: 'priya-sharma' },
      date: 'July 9, 2024',
      readTime: '9 min read',
      slug: 'rise-of-edge-computing',
      important: false,
    },
    {
      title: 'Cybersecurity in 2024: Emerging Threats and How to Stay Ahead',
      excerpt: 'With AI-driven attacks and new vulnerabilities, cybersecurity strategies must evolve rapidly...',
      coverImage: 'cybersecurity-2024',
      categories: ['Cybersecurity', 'Tech Safety'],
      author: { name: 'Alex Carter', imageName: 'alex-carter' },
      date: 'August 21, 2024',
      readTime: '13 min read',
      slug: 'cybersecurity-2024-emerging-threats',
      important: true,
    },
  ];
  // Get all unique categories
  const allCategories = Array.from(
    new Set(blogPosts.flatMap(post => post.categories))
  ).sort();

  // Sort by date desc (latest at top)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filter posts by search term
  const filteredPosts = sortedPosts.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? post.categories.includes(filterCategory) : true)
  );

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
    <div className="relative w-full mb-12 font-sans">
      {/* Page Header */}
      <div className="text-center mb-16 pt-20 px-4">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight font-serif"
        >
          Latest Articles
        </h1>
        <div className="w-20 h-1 bg-[hsl(var(--electric-cyan))] mx-auto rounded-full"></div>
        <p className="mt-6 text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto font-light tracking-wide">
          Explore our latest articles, tutorials, and insights on technology, programming, and innovation.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center px-2 sm:px-0">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-full border border-[hsla(var(--border),0.2)] bg-[hsla(var(--card),0.95)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--electric-cyan))] focus:border-[hsl(var(--electric-cyan))] transition"
        />
      </div>

      {/* Blog Cards */}
      <div ref={blogRef} className="relative z-10 px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto">
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
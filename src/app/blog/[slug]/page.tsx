"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import {
  Bookmark,
  BookmarkCheck,
  Share2,
  Check,
  ArrowLeft,
} from "lucide-react";

import BlogCards from "@/components/pages/Blogs";

type AllPosts = {
  title: string;
  excerpt: string;
  coverImage: string;
  categories: string[];
  author: { name: string; imageName: string; linkedIn?: string };
  date: string;
  readTime: string;
  slug: string;
  important?: boolean;
};

const allPosts: AllPosts[] = [
  {
    title: "The Future of AI: Trends and Predictions for 2024 and Beyond",
    excerpt: "Artificial intelligence continues to evolve at a rapid pace...",
    coverImage: "ai-future",
    categories: ["Artificial Intelligence", "Technology Trends"],
    author: {
      name: "Sarah Chen",
      imageName: "sarah-chen",
      linkedIn: "https://www.linkedin.com/in/sarah-chen",
    },
    date: "May 18, 2024",
    readTime: "12 min read",
    slug: "future-of-ai-trends-predictions",
    important: true,
  },
  {
    title: "Getting Started with TensorFlow: A Beginner's Guide",
    excerpt: "Learn the basics of TensorFlow and how to build your first ML model...",
    coverImage: "tensorflow-guide",
    categories: ["Machine Learning"],
    author: {
      name: "Alex Johnson",
      imageName: "alex-johnson",
      linkedIn: "https://www.linkedin.com/in/alex-johnson",
    },
    date: "May 10, 2024",
    readTime: "8 min read",
    slug: "getting-started-with-tensorflow",
    important: true,
  },
  {
    title: "Building Responsive Websites with Next.js and Tailwind CSS",
    excerpt: "Discover how to create beautiful, responsive websites...",
    coverImage: "nextjs-tailwind",
    categories: ["Web Development", "Next.js"],
    author: {
      name: "Maya Patel",
      imageName: "maya-patel",
      linkedIn: "https://www.linkedin.com/in/maya-patel",
    },
    date: "April 25, 2024",
    readTime: "6 min read",
    slug: "building-responsive-websites-nextjs-tailwind",
  },
  {
    title: "Introduction to Quantum Computing: Concepts and Applications",
    excerpt: "Explore the fascinating world of quantum computing...",
    coverImage: "quantum-computing",
    categories: ["Quantum Computing"],
    author: {
      name: "David Kim",
      imageName: "david-kim",
      linkedIn: "https://www.linkedin.com/in/david-kim",
    },
    date: "April 15, 2024",
    readTime: "10 min read",
    slug: "intro-to-quantum-computing",
  },
  {
    title: "Quantum Computing: Unlocking the Next Era of Innovation",
    excerpt:
      "Quantum computing is set to revolutionize industries with unprecedented computational power...",
    coverImage: "quantum-computing",
    categories: ["Quantum Tech"],
    author: {
      name: "David Lin",
      imageName: "david-lin",
      linkedIn: "https://www.linkedin.com/in/david-lin",
    },
    date: "June 2, 2024",
    readTime: "10 min read",
    slug: "quantum-computing-next-era",
    important: false,
  },
  {
    title: "Sustainable Tech: How Green Innovations Are Shaping the Future",
    excerpt:
      "From renewable energy to carbon-neutral data centers, sustainability is driving major tech shifts...",
    coverImage: "sustainable-tech",
    categories: ["Technology Trends"],
    author: {
      name: "Emily Rodriguez",
      imageName: "emily-rodriguez",
      linkedIn: "https://www.linkedin.com/in/emily-rodriguez",
    },
    date: "April 27, 2024",
    readTime: "8 min read",
    slug: "sustainable-tech-green-innovations",
    important: true,
  },
  {
    title: "Web3 and Decentralization: Beyond Cryptocurrency",
    excerpt:
      "The rise of decentralized networks is changing finance, governance, and digital ownership...",
    coverImage: "web3-decentralization",
    categories: ["Blockchain", "Technology Trends"],
    author: {
      name: "Michael Osei",
      imageName: "michael-osei",
      linkedIn: "https://www.linkedin.com/in/michael-osei",
    },
    date: "March 15, 2024",
    readTime: "11 min read",
    slug: "web3-decentralization-beyond-crypto",
    important: false,
  },
  {
    title: "The Rise of Edge Computing in a Connected World",
    excerpt:
      "As IoT expands, edge computing ensures faster, smarter, and more efficient data processing...",
    coverImage: "edge-computing",
    categories: ["Cloud & Edge"],
    author: {
      name: "Priya Sharma",
      imageName: "priya-sharma",
      linkedIn: "https://www.linkedin.com/in/priya-sharma",
    },
    date: "July 9, 2024",
    readTime: "9 min read",
    slug: "rise-of-edge-computing",
    important: false,
  },
  {
    title: "Cybersecurity in 2024: Emerging Threats and How to Stay Ahead",
    excerpt:
      "With AI-driven attacks and new vulnerabilities, cybersecurity strategies must evolve rapidly...",
    coverImage: "cybersecurity-2024",
    categories: ["Cybersecurity", "Tech Safety"],
    author: {
      name: "Alex Carter",
      imageName: "alex-carter",
      linkedIn: "https://www.linkedin.com/in/alex-carter",
    },
    date: "August 21, 2024",
    readTime: "13 min read",
    slug: "cybersecurity-2024-emerging-threats",
    important: true,
  },
];

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = allPosts.find((p) => p.slug === slug);

  const containerRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- GSAP animations ---
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".fade-in", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!post) {
    return (
      <div className="text-center py-20 text-gray-400">Blog not found</div>
    );
  }

  // --- Save for Later (bookmark) animation ---
  const handleSave = () => {
    setSaved((prev) => !prev);
    gsap.fromTo(
      ".save-btn",
      { scale: 0.8, rotate: -15 },
      { scale: 1, rotate: 0, duration: 0.4, ease: "elastic.out(1,0.6)" }
    );
  };

  // --- Share button (native or fallback copy) ---
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- Related blogs filtering (same category) ---
  const relatedPosts = allPosts.filter(
    (p) =>
      p.slug !== post.slug &&
      p.categories.some((c) => post.categories.includes(c))
  );

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white"
    >
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center text-[hsl(var(--electric-cyan))] hover:underline mb-6 fade-in"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blogs
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-6 fade-in">{post.title}</h1>

      {/* Cover Image */}
      <div className="relative w-full h-[24rem] rounded-2xl overflow-hidden mb-8 fade-in">
        <Image
          src={`/images/covers/${post.coverImage}.jpg`}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Author + Meta */}
      <div className="flex items-center justify-between mb-10 fade-in">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[hsl(var(--electric-cyan))]">
            <Image
              src={`/images/authors/${post.author.imageName}.jpg`}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">{post.author.name}</p>
            <p className="text-xs text-gray-400">{post.date}</p>
          </div>
        </div>

        <div className="flex gap-3">

            <button
            onClick={handleSave}
            className="save-btn flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border border-[hsl(var(--electric-cyan))] bg-transparent text-[hsl(var(--electric-cyan))] hover:bg-[hsl(var(--electric-cyan))] hover:text-black transition"
            >
            {saved ? (
                <BookmarkCheck className="w-4 h-4 text-[hsl(var(--electric-cyan))]" />
            ) : (
                <Bookmark className="w-4 h-4" />
            )}
            {saved ? "Saved" : "Save for Later"}
            </button>

            {/* Share */}
            <button
            onClick={handleShare}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border border-[hsl(var(--electric-cyan))] bg-transparent text-[hsl(var(--electric-cyan))] hover:bg-[hsl(var(--electric-cyan))] hover:text-black transition"
            >
            {copied ? (
                <Check className="w-4 h-4 text-green-400" />
            ) : (
                <Share2 className="w-4 h-4" />
            )}
            {copied ? "Link Copied!" : "Share"}
            </button>
        </div>
      </div>

      {/* Content */}
      <article className="prose prose-invert max-w-none fade-in">
        <p className="leading-relaxed text-lg text-gray-200 font-serif">
          {post.excerpt}
          More content coming soon! Stay tuned for in-depth articles, tutorials,
          and insights on the latest in technology and innovation.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          efficitur, nunc ut laoreet facilisis, massa nunc consectetur nisi,
          euismod aliquam nisl nunc eu lectus. Integer non felis nec erat. In
          hac habitasse platea dictumst. Curabitur at lacus ac velit ornare
          lobortis. Donec pede justo, fringilla vel, aliquet nec, vulputate et,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede mollis pretium. Integer tincidunt. 
        </p>
      </article>

      {/* Author Bio + Follow */}
      <div className="mt-14 p-6 rounded-xl bg-[hsla(var(--card),0.5)] border border-[hsla(var(--border),0.2)] fade-in flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[hsl(var(--electric-cyan))]">
            <Image
              src={`/images/authors/${post.author.imageName}.jpg`}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{post.author.name}</h3>
            <p className="text-sm text-gray-400">Author</p>
          </div>
        </div>

        {/* Follow button */}
       {post.author.linkedIn && (
            <Link
                href={post.author.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[hsl(var(--electric-cyan))] text-black font-semibold transition-transform duration-300 hover:scale-105"
            >
                Follow
            </Link>
            )}

      </div>

      {/* Related Blogs */}
        {relatedPosts.length > 0 && (
  <div className="mt-16 fade-in">
    <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--electric-cyan))]">
      Related Blogs
    </h2>
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group bg-[hsla(var(--card),0.98)] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-[hsla(var(--border),0.15)] transition-transform duration-300 hover:scale-105"
        >
          <div className="relative h-48 w-full">
            <Image
              src={`/images/covers/${post.coverImage}.jpg`}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-5 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-2">
              {post.categories.slice(0, 2).map((cat, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full border border-[hsl(var(--electric-cyan))] bg-[hsla(var(--electric-cyan),0.16)] text-[hsl(var(--electric-cyan))] font-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <div className="relative h-8 w-8 rounded-full overflow-hidden border border-[hsl(var(--electric-cyan))]">
                <Image
                  src={`/images/authors/${post.author.imageName}.jpg`}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs text-gray-300">{post.author.name}</span>
              <span className="ml-auto text-xs text-gray-400 italic">
                {post.readTime}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
    </div>
  );
}

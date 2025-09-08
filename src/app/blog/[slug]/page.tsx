"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";

type AllPosts = {
  title: string;
  excerpt: string;
  coverImage: string; // absolute or public path
  categories: string[];
  author: { name: string; image?: string; linkedIn?: string };
  date: string;
  readTime: string;
  slug: string;
  important?: boolean;
};

const allPosts: AllPosts[] = [
  {
    title:
      "Chasing the Next Big Thing — The Never-Ending Web Framework Race",
    excerpt:
      "Every week it feels like a new framework drops. Are we making better products—or just chasing novelty?",
    coverImage: "/images/web blog.png",
    categories: ["Web Development", "Opinion"],
    author: {
      name: "KEERTHIVASAN S V",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQF1bBmX3MQhEw/profile-displayphoto-scale_400_400/B56ZiUlBrfHUAk-/0/1754839392810?e=1759968000&v=beta&t=u95GxjVUvkddYTQcd4kI4wiXBAHu0SsHNJhmVJfrO2Y",
      linkedIn: "https://www.linkedin.com/in/keerthivasansv/",
    },
    date: "September 8, 2025",
    readTime: "7 min read",
    slug: "never-ending-web-framework-race",
    important: true,
  },
  {
    title:
      "The Future of Research & Development: Driving Innovation in a Hyperconnected World",
    excerpt:
      "From AI labs to quantum breakthroughs—how modern R&D evolves with agile, data-driven methods.",
    coverImage: "/images/r and d.jpg",
    categories: ["R&D", "Innovation"],
    author: {
      name: "Jishnu Teja Dandamudi",
      image:
        "https://sj67hjofte.ufs.sh/f/7JfC7VrndVSMgmJtMMbu7L5kgxMzcNX9ZHPEyTF2fBn8I3qJ",
      linkedIn:
        "https://www.linkedin.com/in/jishnu-teja-dandamudi-858028289",
    },
    date: "September 8, 2025",
    readTime: "9 min read",
    slug: "future-of-research-and-development",
    important: true,
  },
];

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = allPosts.find((p) => p.slug === slug);

  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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

  // Reading progress bar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const total = el.scrollHeight - el.clientHeight;
      const current = el.scrollTop;
      const pct = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;
      setProgress(pct);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  if (!post) {
    return <div className="text-center py-20 text-gray-400">Blog not found</div>;
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-40">
        <div
          className="h-full bg-[hsl(var(--electric-cyan))] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Back button */}
      <Link href="/blog" className="inline-flex items-center text-[hsl(var(--electric-cyan))] hover:underline mb-6 fade-in">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blogs
      </Link>

      {/* Title */}
  <h1 className="text-4xl md:text-5xl font-extrabold mb-6 fade-in" style={{ fontFamily: 'var(--font-unbounded)' }}>{post.title}</h1>

      {/* Cover Image */}
      <div className="relative w-full h-[24rem] rounded-2xl overflow-hidden mb-8 fade-in">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Author + Meta */}
      <div className="flex items-center justify-between mb-10 fade-in">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[hsl(var(--electric-cyan))]">
            <Image src={post.author.image ?? "/images/profilePlaceholder.jpg"} alt={post.author.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold">{post.author.name}</p>
            <p className="text-xs text-gray-400">{post.date}</p>
          </div>
        </div>
        {/* Follow button removed by request */}
      </div>

      {/* Content */}
      <article className="prose prose-invert max-w-none fade-in">
        <style jsx>{`
          :global(.prose h3) {
            font-family: var(--font-unbounded);
          }
          :global(.prose p) {
            color: hsl(var(--muted-foreground));
            line-height: 1.85;
            font-size: 1.05rem;
          }
          :global(.prose ul) {
            margin-top: 0.5rem;
            margin-bottom: 1rem;
          }
          :global(.prose li) {
            margin: 0.25rem 0;
          }
          :global(.prose strong) {
            color: #fff;
          }
          :global(.prose a) {
            color: hsl(var(--electric-cyan));
            text-decoration: none;
          }
          :global(.prose a:hover) {
            text-decoration: underline;
          }
          :global(.prose blockquote) {
            border-left: 3px solid hsl(var(--electric-cyan));
            padding-left: 1rem;
            color: #cbd5e1;
          }
          :global(.prose code) {
            background: rgba(148, 163, 184, 0.12);
            padding: 0.2rem 0.4rem;
            border-radius: 0.375rem;
            font-family: var(--font-geist-mono);
            font-size: 0.95em;
          }
        `}</style>
        {post.slug === "never-ending-web-framework-race" ? (
          <>
            <p>Every week, it feels like a new web development framework is born. Astro. Remix. Qwik. Solid. SvelteKit. Nuxt. Next 13. Next 14. Next-next-next?</p>
            <p>And just when you’ve learned one, the Internet decides: “Cool, now here’s another — shinier, faster, lighter, more reactive, more resumable, more isomorphic.” It’s exciting. It’s exhausting. And it makes me wonder: are we building better websites, or just running on a treadmill of tech hype?</p>
            <h3>The Good Side: Innovation on Overdrive</h3>
            <ul>
              <li>Speed → Nobody likes waiting for a site to load.</li>
              <li>Developer Experience → Less boilerplate, more fun.</li>
              <li>Scalability → Handle millions without breaking.</li>
              <li>Cool Factor → Admit it, we all like new toys.</li>
            </ul>
            <h3>The Flip Side: Framework Fatigue</h3>
            <p>When every week brings a new “revolutionary” framework, things feel repetitive. Everyone promises better performance, easier learning, and benchmark wins—like superhero origin stories on repeat.</p>
            <h3>What We Might Be Losing</h3>
            <ul>
              <li><strong>Stability:</strong> risk of abandoned stacks.</li>
              <li><strong>Depth:</strong> hopping instead of mastery.</li>
              <li><strong>Focus:</strong> users care if it works, not the stack.</li>
            </ul>
            <h3>Learning from the Past</h3>
            <p>jQuery once ruled and offered stability. Today, tools can feel like short-lived trends.</p>
            <h3>How to Stay Sane</h3>
            <ul>
              <li>Pick one solid framework and go deep.</li>
              <li>Experiment intentionally—on side projects.</li>
              <li>Focus on fundamentals: HTML, CSS, JavaScript.</li>
              <li>Remember the user.</li>
            </ul>
            <h3>In the End…</h3>
            <p>Frameworks are amazing. Use them as tools, not beliefs. Value depth over novelty and ship meaningful apps.</p>
          </>
        ) : (
          <>
            <p>Research and Development (R&D) is no longer confined to laboratories and isolated innovation hubs. In today’s hyperconnected economy, R&D is the engine of competitiveness, enabling companies and research institutions to transform bold ideas into disruptive technologies.</p>
            <p>This blog explores how R&D is evolving, the emerging technologies fueling it, and the methodologies that ensure faster, more impactful outcomes.</p>
            <h3>1. The Evolution of R&D</h3>
            <p>Traditional linear models are giving way to iterative, collaborative, and data-driven cycles.</p>
            <ul>
              <li>Open Innovation</li>
              <li>Digital R&D</li>
              <li>Agile Research</li>
            </ul>
            <h3>2. Cutting-Edge Technologies Transforming R&D</h3>
            <ul>
              <li><strong>AI & ML:</strong> predict outcomes, optimize designs, and reduce cost.</li>
              <li><strong>Quantum Computing:</strong> chemistry, cryptography, optimization.</li>
              <li><strong>Sustainable Technologies:</strong> energy storage, smart grids, CCU.</li>
              <li><strong>Industry 4.0 & Digital Twins:</strong> simulate before real deployment.</li>
            </ul>
            <h3>3. Methodologies Shaping Next-Gen R&D</h3>
            <ul>
              <li>Agile research cycles</li>
              <li>Data-centric R&D</li>
              <li>Collaborative platforms</li>
              <li>Explainable AI (XAI)</li>
            </ul>
            <h3>4. Challenges in R&D Today</h3>
            <ul>
              <li>High costs</li>
              <li>Talent gap</li>
              <li>Scalability</li>
              <li>Ethical dilemmas</li>
            </ul>
            <h3>5. The Future of R&D: What’s Next?</h3>
            <ul>
              <li>AI-powered autonomous labs</li>
              <li>Interdisciplinary fusion</li>
              <li>Global collaboration</li>
              <li>Metaverse for R&D</li>
            </ul>
            <h3>Conclusion</h3>
            <p>R&D has moved to the strategic core of innovation-driven organizations. Those who invest in data-driven, collaborative, and ethical R&D will shape the next era of human progress.</p>
          </>
        )}
      </article>

      {/* Related blogs removed */}
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

interface Badge {
  name: string;
  color?: string;
}

interface Member {
  name: string;
  imageName: string;
  points: number;
  contributions: number;
  badges: Badge[];
  rank: number;
}

export default function LeaderboardPage() {
  const tableRef = useRef<HTMLTableElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const members: Member[] = [
    {
      name: 'Alex Johnson',
      imageName: 'alex-johnson',
      points: 1250,
      contributions: 47,
      badges: [
        { name: 'ML Expert' },
        { name: 'Workshop Leader' }
      ],
      rank: 1
    },
    {
      name: 'Maya Patel',
      imageName: 'maya-patel',
      points: 1120,
      contributions: 42,
      badges: [
        { name: 'Web Dev' },
        { name: 'Open Source' }
      ],
      rank: 2
    },
    {
      name: 'David Kim',
      imageName: 'david-kim',
      points: 980,
      contributions: 38,
      badges: [
        { name: 'AI Research' },
        { name: 'Technical Writer' }
      ],
      rank: 3
    },
    {
      name: 'Sarah Chen',
      imageName: 'sarah-chen',
      points: 875,
      contributions: 35,
      badges: [
        { name: 'UI/UX Design' },
        { name: 'Frontend Dev' }
      ],
      rank: 4
    },
    {
      name: 'James Wilson',
      imageName: 'james-wilson',
      points: 830,
      contributions: 31,
      badges: [
        { name: 'Backend Dev' },
        { name: 'Database Expert' }
      ],
      rank: 5
    },
    {
      name: 'Priya Sharma',
      imageName: 'priya-sharma',
      points: 790,
      contributions: 29,
      badges: [
        { name: 'Mobile Dev' },
        { name: 'Workshop Leader' }
      ],
      rank: 6
    },
    {
      name: 'Michael Chen',
      imageName: 'michael-chen',
      points: 720,
      contributions: 25,
      badges: [
        { name: 'DevOps' },
        { name: 'Cloud Computing' }
      ],
      rank: 7
    },
    {
      name: 'Olivia Rodriguez',
      imageName: 'olivia-rodriguez',
      points: 680,
      contributions: 24,
      badges: [
        { name: 'Data Science' },
        { name: 'Visualization' }
      ],
      rank: 8
    },
    {
      name: 'Daniel Okafor',
      imageName: 'daniel-okafor',
      points: 640,
      contributions: 22,
      badges: [
        { name: 'Blockchain' },
        { name: 'Smart Contracts' }
      ],
      rank: 9
    },
    {
      name: 'Emma Thompson',
      imageName: 'emma-thompson',
      points: 610,
      contributions: 20,
      badges: [
        { name: 'Game Dev' },
        { name: '3D Modeling' }
      ],
      rank: 10
    }
  ];
  
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Member;
    direction: 'ascending' | 'descending';
  }>({ key: 'rank', direction: 'ascending' });
  
  const sortedMembers = [...members].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  
  const handleSort = (key: keyof Member) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    // Animate table rows
    if (tableRef.current) {
      const tableRows = tableRef.current.querySelectorAll('tbody tr');
      gsap.fromTo(
        tableRows,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.3
        }
      );
    }
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-4">Community Leaderboard</h1>
        <div className="w-20 h-1 bg-[hsl(var(--electric-cyan))] mx-auto"></div>
        <p className="mt-6 text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Recognizing our most active and valuable community contributors. Join us and earn points through participation and contributions!
        </p>
      </div>
      
      {/* Featured top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {sortedMembers.slice(0, 3).map((member) => (
          <div 
            key={member.rank}
            className={`flex flex-col items-center justify-center p-6 bg-[hsla(var(--card),0.5)] rounded-xl border ${
              member.rank === 1
                ? 'border-yellow-500 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                : member.rank === 2
                ? 'border-gray-400 shadow-[0_0_15px_rgba(192,192,192,0.3)]'
                : 'border-amber-700 shadow-[0_0_15px_rgba(205,127,50,0.3)]'
            }`}
          >
            <div className="relative h-16 w-16 mb-4">
              {member.rank === 1 && (
                <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center border-2 border-[hsl(var(--background))]">
                  1
                </div>
              )}
              {member.rank === 2 && (
                <div className="absolute -top-3 -right-3 bg-gray-400 text-black text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center border-2 border-[hsl(var(--background))]">
                  2
                </div>
              )}
              {member.rank === 3 && (
                <div className="absolute -top-3 -right-3 bg-amber-700 text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center border-2 border-[hsl(var(--background))]">
                  3
                </div>
              )}
              <Image
                src={`/images/team/${member.imageName}.jpg`}
                alt={member.name}
                fill
                className="object-cover rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/Team.jpg"; // Fallback image
                }}
              />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
            <p className="text-[hsl(var(--electric-cyan))] font-bold mb-3">{member.points} points</p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {member.badges.map((badge, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.2)]"
                >
                  {badge.name}
                </span>
              ))}
              {member.badges.length > 2 && (
                <span className="px-2 py-1 text-xs rounded-full bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.2)]">
                  +1
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Leaderboard table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full border-collapse">
          <thead className="bg-[hsla(var(--card),0.8)]">
            <tr>
              <th 
                className="px-4 py-3 text-left text-sm cursor-pointer hover:text-[hsl(var(--electric-cyan))]"
                onClick={() => handleSort('rank')}
              >
                Rank
                {sortConfig.key === 'rank' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th className="px-4 py-3 text-left text-sm">Member</th>
              <th 
                className="px-4 py-3 text-left text-sm cursor-pointer hover:text-[hsl(var(--electric-cyan))]"
                onClick={() => handleSort('points')}
              >
                Points
                {sortConfig.key === 'points' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="px-4 py-3 text-left text-sm cursor-pointer hover:text-[hsl(var(--electric-cyan))]"
                onClick={() => handleSort('contributions')}
              >
                Contributions
                {sortConfig.key === 'contributions' && (
                  <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th className="px-4 py-3 text-left text-sm">Badges</th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers.map((member, index) => (
              <tr 
                key={index}
                className="border-t border-[hsla(var(--border),0.2)] hover:bg-[hsla(var(--card),0.3)]"
              >
                <td className="px-4 py-3 text-sm font-medium">
                  {member.rank === 1 && <span className="text-yellow-500 font-bold">#1</span>}
                  {member.rank === 2 && <span className="text-gray-400 font-bold">#2</span>}
                  {member.rank === 3 && <span className="text-amber-700 font-bold">#3</span>}
                  {member.rank > 3 && <span>#{member.rank}</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={`/images/team/${member.imageName}.jpg`}
                        alt={member.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/Team.jpg"; // Fallback image
                        }}
                      />
                    </div>
                    <span className="font-medium">{member.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-[hsl(var(--electric-cyan))]">{member.points}</td>
                <td className="px-4 py-3">{member.contributions}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {member.badges.map((badge, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.2)]"
                      >
                        {badge.name}
                      </span>
                    ))}
                    {member.badges.length > 2 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.2)]">
                        +1
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-center mt-12">
        <Link
          href="/leaderboard/full"
          className="px-6 py-3 bg-[hsl(var(--electric-cyan))] text-[hsl(var(--background))] rounded-lg font-medium hover:bg-[hsla(var(--electric-cyan),0.8)] transition-colors"
        >
          View Full Leaderboard
        </Link>
      </div>
    </div>
  );
}

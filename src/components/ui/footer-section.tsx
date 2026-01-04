'use client';
import React, { useState, useEffect } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Instagram, Linkedin, MessageCircle, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Connect',
		links: [
			{ title: 'GitHub', href: 'https://github.com/Tensor-Amrita-Coimbatore', icon: Github },
			{ title: 'Instagram', href: 'https://www.instagram.com/tensor_club/', icon: Instagram },
			{ title: 'LinkedIn', href: 'https://linkedin.com/company/tensor-club', icon: Linkedin },
			{ title: 'Discord', href: '#', icon: MessageCircle },
		],
	},
];

export function Footer() {
	const [currentTime, setCurrentTime] = useState<Date | null>(null);

	useEffect(() => {
		setCurrentTime(new Date());
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-[hsla(var(--electric-cyan),0.2)] bg-gradient-to-t from-[hsl(var(--background))] via-[hsla(var(--card),0.95)] to-[hsla(var(--card),0.9)] backdrop-blur-md px-6 py-6 lg:py-8">
			<div className="bg-gradient-to-r from-transparent via-[hsla(var(--electric-cyan),0.3)] to-transparent absolute top-0 right-1/2 left-1/2 h-px w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-8">
				{/* Brand Section */}
				<AnimatedContainer className="space-y-3 lg:col-span-1">
					<div className="relative p-2.5 bg-gradient-to-br from-[hsla(var(--card),0.6)] via-[hsla(var(--background),0.4)] to-[hsla(var(--card),0.6)] rounded-2xl shadow-2xl border-2 border-[hsla(var(--electric-cyan),0.6)] backdrop-blur-md inline-block">
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsla(var(--electric-cyan),0.2)] via-[hsla(var(--digital-purple),0.2)] to-[hsla(var(--magenta),0.2)] blur-sm"></div>
						<Image 
							src="/tensor-horizontal.png"
							alt="Tensor Club"
							width={180}
							height={50}
							className="relative z-10 object-contain"
						/>
					</div>
					
					<p className="text-[hsla(var(--electric-cyan),1)] text-sm font-mono font-semibold">
						AI Community
					</p>
					
					<p className="text-[hsla(var(--foreground),0.8)] text-xs leading-relaxed">
						Join our community of AI enthusiasts building the future.
					</p>

					{/* Live Status Badge */}
					<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[hsla(var(--card),0.7)] to-[hsla(var(--background),0.7)] rounded-xl border-2 border-emerald-500/50 shadow-lg backdrop-blur-md">
						<motion.div 
							className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
							animate={{ scale: [1, 1.4, 1] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<span className="text-emerald-400 text-xs font-semibold">Live</span>
						<span className="text-[hsla(var(--foreground),0.8)] text-xs font-mono">
							{currentTime?.toLocaleTimeString('en-IN', { 
								timeZone: 'Asia/Kolkata',
								hour12: false 
							})} IST
						</span>
					</div>
				</AnimatedContainer>

				{/* Footer Links Sections - Vertical Social Icons */}
				<div className="lg:col-span-1">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div>
								<h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
									{section.label}
								</h3>
								<div className="flex flex-col gap-2">
									{section.links.map((link) => (
										<motion.div key={link.title}>
											<Link
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-br from-[hsla(var(--card),0.6)] to-[hsla(var(--background),0.6)] border border-[hsla(var(--foreground),0.2)] text-[hsla(var(--foreground),0.7)] hover:text-white hover:border-[hsla(var(--electric-cyan),0.6)] transition-all duration-300 outline-none shadow-lg backdrop-blur-sm group"
											>
												{link.icon && <link.icon className="w-4 h-4 group-hover:text-[hsla(var(--electric-cyan),1)]" />}
												<span className="text-sm">{link.title}</span>
											</Link>
										</motion.div>
									))}
								</div>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>

			{/* Bottom Copyright */}
			<div className="mt-6 pt-4 border-t border-[hsla(var(--border),0.3)] w-full">
				<p className="text-[hsla(var(--foreground),0.6)] text-start text-xs">
					© {new Date().getFullYear()} Tensor Club. All rights reserved.
				</p>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

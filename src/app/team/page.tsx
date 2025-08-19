"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaLinkedin, FaGithub, FaArrowLeft, FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const members = [
	{
		name: "Pal",
		designation: "Chairman",
		year: "Faculty",
		image: "/images/Pal.jpg",
		category: ["staff"],
		socials: {
			instagram: "https://instagram.com/pal",
			linkedin: "https://linkedin.com/in/pal",
			github: "https://github.com/pal"
		}
	},
	{
		name: "Sajeev Senthil",
		designation: "President",
		year: "3rd Year AIE",
		image: "/images/sajeev.jpg",
		category: ["core"],
		socials: {
			instagram: "https://instagram.com/sajeev",
			linkedin: "https://linkedin.com/in/sajeev",
			github: "https://github.com/sajeev"
		}
	},
	{
		name: "Anirudh",
		designation: "Vice-President",
		year: "3rd Year AIE",
		image: "/images/anirudh.jpg",
		category: ["core"],
		socials: {
			instagram: "https://instagram.com/anirudh",
			linkedin: "https://linkedin.com/in/anirudh",
			github: "https://github.com/anirudh"
		}
	},
	{
		name: "Siva Prasath",
		designation: "Treasurer",
		year: "3rd Year AIE",
		image: "/images/siva.jpg",
		category: ["core", "logistics"],
		socials: {
			instagram: "https://instagram.com/sivaprasath",
			linkedin: "https://linkedin.com/in/sivaprasath",
			github: "https://github.com/sivaprasath"
		}
	},
	{
		name: "R&d",
		designation: "Research & Development Head",
		year: "3rd Year AIE",
		image: "/images/rd.jpg",
		category: ["core", "research"],
		socials: {
			instagram: "https://instagram.com/rd",
			linkedin: "https://linkedin.com/in/rd",
			github: "https://github.com/rd"
		}
	},
	{
		name: "Keerthivasan Venkitajalam",
		designation: "Web Dev Lead",
		year: "3rd Year AIE",
		image: "/images/keerthivasan.jpg",
		category: ["core", "webdev"],
		socials: {
			instagram: "https://instagram.com/keerthivasan",
			linkedin: "https://linkedin.com/in/keerthivasan",
			github: "https://github.com/keerthivasan"
		}
	},
	{
		name: "Vishal",
		designation: "PR Head",
		year: "3rd Year AIE",
		image: "/images/vishal.jpg",
		category: ["core", "pr"],
		socials: {
			instagram: "https://instagram.com/vishal",
			linkedin: "https://linkedin.com/in/vishal",
			github: "https://github.com/vishal"
		}
	},
	{
		name: "John Doe",
		designation: "Media Head",
		year: "2nd Year ME",
		image: "/images/john.jpg",
		category: ["core", "media"],
		socials: {
			instagram: "https://instagram.com/johndoe",
			linkedin: "https://linkedin.com/in/johndoe",
			github: "https://github.com/johndoe"
		}
	},
	{
		name: "Jane Smith",
		designation: "Logistics Head",
		year: "3rd Year Civil",
		image: "/images/jane.jpg",
		category: ["core", "logistics"],
		socials: {
			instagram: "https://instagram.com/janesmith",
			linkedin: "https://linkedin.com/in/janesmith",
			github: "https://github.com/janesmith"
		}
	},
];

const categories = [
	{ key: "all", label: "All Members" },
	{ key: "staff", label: "Staff Coordinators" },
	{ key: "core", label: "Core" },
	{ key: "webdev", label: "Web Dev" },
	{ key: "pr", label: "PR" },
	{ key: "research", label: "R&D" },
	{ key: "media", label: "Media" },
	{ key: "logistics", label: "Logistics" },
];

export default function TeamPage() {
	const [filter, setFilter] = useState("all");
	const [isMobile, setIsMobile] = useState(false);
	const [cardIndex, setCardIndex] = useState(0);
	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const nameRefs = useRef<(HTMLHeadingElement | null)[]>([]);

	// Ensure only one button is visible in mobile view, even on reload
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const filteredMembers =
		filter === "all"
			? members
			: members.filter((member) => member.category.includes(filter));

	// Heading animation on mount
	useEffect(() => {
		gsap.fromTo(
			headingRef.current,
			{ opacity: 0, y: -40 },
			{ opacity: 1, y: 0, duration: 1, ease: "power3.out" }
		);
	}, []);

	// Smooth card animations on scroll (desktop only)
	useEffect(() => {
		if (!isMobile && containerRef.current) {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			gsap.set(".team-card", { opacity: 0, y: 40, transform: "translateZ(0)" });
			ScrollTrigger.batch(".team-card", {
				start: "top 85%",
				onEnter: (batch) => {
					gsap.to(batch, {
						opacity: 1,
						y: 0,
						stagger: 0.15,
						duration: 0.8,
						ease: "power3.out"
					});
				},
				onLeaveBack: (batch) => {
					gsap.to(batch, {
						opacity: 0,
						y: 40,
						duration: 0.5,
						ease: "power2.inOut"
					});
				}
			});
		}
	}, [filteredMembers, isMobile]);

	// Reset card index when filter changes
	useEffect(() => {
		return setCardIndex(0);
	}, [filter]);

	// Mobile: handle section switching (now works for all sections)
	const currentCategoryIndex = categories.findIndex(cat => cat.key === filter);
	const handlePrevSection = () => {
		const newIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
		setFilter(categories[newIndex].key);
	};
	const handleNextSection = () => {
		const newIndex = (currentCategoryIndex + 1) % categories.length;
		setFilter(categories[newIndex].key);
	};

	const handlePrev = () => {
		setCardIndex((prev) => (prev === 0 ? filteredMembers.length - 1 : prev - 1));
	};
	const handleNext = () => {
		setCardIndex((prev) => (prev === filteredMembers.length - 1 ? 0 : prev + 1));
	};

	// Dynamically calculate social icons top position based on name height
	const getSocialIconsTop = (index: number) => {
		const nameEl = nameRefs.current[index];
		if (nameEl) {
			const height = nameEl.offsetHeight;
			return `${height + 44}px`; // 44px for spacing below name+designation+year
		}
		return "80px";
	};

	return (
		<div className="min-h-screen bg-black-900 text-white p-6">
			<h1
				ref={headingRef}
				className="text-4xl md:text-5xl font-bold text-center gradient-text mb-8"
			>
				Meet Our Team
			</h1>

			{/* Filter Buttons */}
			<div className="flex flex-wrap justify-center items-center gap-3 mb-8">
				{isMobile && (
					<button
						onClick={handlePrevSection}
						className="px-2 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-xl flex items-center"
					>
						<FaArrowLeft />
					</button>
				)}
				{isMobile ? (
					<button
						className={`px-4 py-2 rounded-lg border transition-all duration-300 bg-cyan-500 text-white`}
						style={{ minWidth: "140px" }}
					>
						{categories[currentCategoryIndex].label}
					</button>
				) : (
					categories.map((cat) => (
						<button
							key={cat.key}
							onClick={() => setFilter(cat.key)}
							className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
								filter === cat.key
									? "bg-cyan-500 text-white"
									: "bg-gray-800 hover:bg-gray-700"
							}`}
						>
							{cat.label}
						</button>
					))
				)}
				{isMobile && (
					<button
						onClick={handleNextSection}
						className="px-2 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-xl flex items-center"
					>
						<FaArrowRight />
					</button>
				)}
			</div>
			{/* Members Grid (centered for all resolutions) */}
			<div
				ref={containerRef}
				className={`flex flex-wrap justify-center items-center gap-6 mx-auto`}
				style={{ maxWidth: "1200px" }}
			>
				{filteredMembers.map((member, index) => (
					<div
						key={index}
						className="team-card bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center p-5 hover:scale-105 transition-transform duration-300 relative group"
						style={{
							width: "260px",
							minWidth: "260px",
							maxWidth: "260px",
							height: "340px",
							minHeight: "340px",
							maxHeight: "340px",
							willChange: "transform, opacity",
							position: "relative"
						}}
					>
						<img
							src={member.image}
							alt={member.name}
							className="object-cover rounded-full border-4 border-cyan-500"
							style={{
								width: "136px",
								height: "136px",
								objectFit: "cover",
								borderRadius: "9999px"
							}}
						/>
						{/* Fixed spacing between image and name */}
						<div style={{ height: "24px" }} />
						<div className="relative w-full flex flex-col items-center justify-center">
							{/* Always show name */}
							<h2
								className="text-lg font-bold"
								ref={el => { nameRefs.current[index] = el; }}
							>
								{member.name}
							</h2>
							{/* Fade out designation/year on hover */}
							<div className="transition-opacity duration-300 group-hover:opacity-0">
								<p className="text-cyan-400 text-base">{member.designation}</p>
								<p className="text-gray-400 text-sm">{member.year}</p>
							</div>
						</div>
						{/* Social Icons fixed at bottom */}
						<div
							className="absolute left-0 right-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							style={{
								bottom: "32px",
								position: "absolute"
							}}
						>
							{member.socials?.instagram && (
								<a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
									<FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition-transform" />
								</a>
							)}
							{member.socials?.linkedin && (
								<a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
									<FaLinkedin className="text-blue-400 text-2xl hover:scale-110 transition-transform" />
								</a>
							)}
							{member.socials?.github && (
								<a href={member.socials.github} target="_blank" rel="noopener noreferrer">
									<FaGithub className="text-gray-300 text-2xl hover:scale-110 transition-transform" />
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
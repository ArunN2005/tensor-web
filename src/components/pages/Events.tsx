"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import gsap from "gsap";
import "@/styles/Event.css";

interface Event {
  id: number;
  title: string;
  description: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  time: string;
  location: string;
  status: "past" | "upcoming";
  image: string[];
  registration?: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Induction 2025",
      description: "The induction ceremony of the Tensor club is a formal event for the official inauguration and induction of the club for the students of Amrita School of AI. The ceremony will serve as an opportunity for the office bearers to introduce their vision and various aspects of the club. The event is expected to be around 90-120 mins in duration, and will host interactive sessions with the Dean - School of AI, Alumnus — School of AI, Display of student projects, interactive informal sessions and a gratitude ceremony.",
      date: {
        day: "8th",
        month: "September",
        year: "2025"
      },
      time: "4:45 PM",
      location: "Amriteshwari Hall",
      status: "upcoming",
      image: ["/images/upcoming events/induction 2025.jpg"],
      registration: "open"
    },
    {
      id: 2,
      title: "Induction 2024",
      description: "The induction ceremony marked the beginning of the Tensor Club journey for the new academic year. Students were introduced to the club's mission, activities, and leadership team. The event featured inspiring talks, project showcases, and networking opportunities.",
      date: {
        day: "15th",
        month: "September",
        year: "2024"
      },
      time: "5:00 PM",
      location: "Amriteshwari Hall",
      status: "past",
      image: ["/images/past events/induction 2024.jpg"]
    },
    {
      id: 3,
      title: "AI Prompting Workshop",
      description: "A comprehensive workshop on AI prompting techniques, focusing on effective prompt design for AI models. The workshop equipped participants with foundational and advanced skills in designing effective prompts for AI models, fostering an understanding of how inputs shape outputs and enhancing their ability to leverage generative AI tools. Topics included introduction to AI basics, interactive prompt activities, core concepts of prompting, interactive demos, advanced prompting techniques, and AI tools.",
      date: {
        day: "27th",
        month: "January",
        year: "2025"
      },
      time: "9:00 AM - 1:00 PM",
      location: "Sandheepani Hall",
      status: "past",
      image: ["/images/past events/prompting workshop.png"]
    },
    {
      id: 4,
      title: "AI/ML Penetration Testing Workshop",
      description: "With the increasing adoption of AI/ML in various sectors, the security of these systems has become a crucial concern. This workshop introduced participants to penetration testing techniques specifically for and by AI/ML models, helping them understand vulnerabilities, attacks, and best security practices. The workshop was handled by Mr Tarun Harisudha, Associate Security Consultant, VAPT, NxxT, Coimbatore.",
      date: {
        day: "21st",
        month: "February",
        year: "2025"
      },
      time: "9:00 AM - 1:00 PM",
      location: "Amrita School of AI",
      status: "past",
      image: ["/images/past events/pentesting workshop.png"]
    },
    {
      id: 5,
      title: "AI Advent Calendar",
      description: "The AI Advent Calendar event brought together students to explore a new AI topic or tool each day leading up to the winter break. Participants learned about the latest AI advancements, participated in daily challenges, and built a comprehensive understanding of various AI domains.",
      date: {
        day: "1-25",
        month: "December",
        year: "2024"
      },
      time: "Various Times",
      location: "Online & Amrita School of AI",
      status: "past",
      image: ["/images/past events/advent calendar.jpg"]
    }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<Record<string, { width: number; height: number; aspectRatio: number }>>({});
  const [currentAspectRatio, setCurrentAspectRatio] = useState(4/3); // Default aspect ratio
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Simple check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const imgSrc = img.src;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const aspectRatio = naturalWidth / naturalHeight;
    
    setImageDimensions(prev => ({
      ...prev,
      [imgSrc]: {
        width: naturalWidth,
        height: naturalHeight,
        aspectRatio
      }
    }));
    
    setCurrentAspectRatio(aspectRatio);
    setIsImageLoading(false);
  };

  // Ensure first image doesn't remain in perpetual loading state (cached images or onLoad not firing)
  useEffect(() => {
    const imgUrl = events[0]?.image?.[0];
    if (!imgUrl) return;
    // If the image element already exists & is complete (from cache), clear loading
    const existing = document.querySelector<HTMLImageElement>(`img[src*="${imgUrl.split('/').pop()}"]`);
    if (existing && existing.complete && existing.naturalWidth > 0) {
      setIsImageLoading(false);
      setCurrentAspectRatio(existing.naturalWidth / existing.naturalHeight || 4/3);
    }
    // Fallback timeout in case onLoad never fires
    const timeout = setTimeout(() => {
      setIsImageLoading(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  if (events.length === 0) {
    return (
      <div id="events" className="flex justify-center items-center h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        Loading events...
      </div>
    );
  }

  const currentEvent = events[currentIndex];
  const currentImage = currentEvent.image[currentImageIndex];

  // Preload images for better navigation experience
  useEffect(() => {
    // Preload next few images
    const preloadImages = () => {
      // Create an array of images to preload - next event + all images in current event
      const imagesToPreload = new Set<string>();
      
      // Add next event's first image
      const nextIndex = (currentIndex + 1) % events.length;
      const nextEventImage = events[nextIndex].image[0];
      if (nextEventImage) {
        imagesToPreload.add(nextEventImage);
      }
      
      // Add all images from current event
      currentEvent.image.forEach(img => {
        if (img !== currentImage) { // Skip current image as it's already loading
          imagesToPreload.add(img);
        }
      });
      
      // Preload all the collected images
      imagesToPreload.forEach(imageUrl => {
        const preloadImg = document.createElement('img');
        preloadImg.src = imageUrl;
        preloadImg.style.display = 'none';
        preloadImg.onload = () => {
          document.body.removeChild(preloadImg);
          
          // Add to our dimensions cache for smoother transitions
          const imgEl = document.createElement('img');
          imgEl.onload = () => {
            setImageDimensions(prev => ({
              ...prev,
              [imageUrl]: {
                width: imgEl.naturalWidth,
                height: imgEl.naturalHeight,
                aspectRatio: imgEl.naturalWidth / imgEl.naturalHeight
              }
            }));
          };
          imgEl.src = imageUrl;
        };
        document.body.appendChild(preloadImg);
      });
    };
    
    preloadImages();
  }, [currentIndex, currentImage, events, currentEvent.image]);

  // Function to calculate optimal container dimensions based on screen size and image ratio
  const calculateOptimalDimensions = useCallback(() => {
    if (!currentImage || !imageDimensions[currentImage]) return;
    
    const imgData = imageDimensions[currentImage];
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Calculate max dimensions based on viewport
    let maxWidth, maxHeight;
    
    if (isMobile) {
      // Mobile optimizations
      maxWidth = screenWidth * 0.9; // 90% of screen width
      maxHeight = screenHeight * 0.4; // 40% of screen height
    } else {
      // Desktop optimizations
      maxWidth = screenWidth * 0.4; // 40% of screen width for desktop
      maxHeight = screenHeight * 0.6; // 60% of screen height
    }
    
    // Calculate dimensions that preserve aspect ratio
    let calculatedWidth, calculatedHeight;
    
    if (imgData.width / imgData.height > maxWidth / maxHeight) {
      // Width is the limiting factor
      calculatedWidth = maxWidth;
      calculatedHeight = calculatedWidth / imgData.aspectRatio;
    } else {
      // Height is the limiting factor
      calculatedHeight = maxHeight;
      calculatedWidth = calculatedHeight * imgData.aspectRatio;
    }
    
    return {
      width: Math.round(calculatedWidth),
      height: Math.round(calculatedHeight)
    };
  }, [currentImage, imageDimensions, isMobile]);
  
  // Update aspect ratio when image changes
  useEffect(() => {
    if (currentImage) {
      if (imageDimensions[currentImage]) {
        setCurrentAspectRatio(imageDimensions[currentImage].aspectRatio);
        setIsImageLoading(false);
      } else {
        setIsImageLoading(true);
      }
    }
  }, [currentImage, imageDimensions]);

  // Animation effect when changing events
  useEffect(() => {
    if (events.length > 0) {
      const elements = [
        titleRef.current,
        descriptionRef.current,
        imageRef.current,
        dateRef.current,
        prevButtonRef.current,
        nextButtonRef.current
      ].filter(Boolean);

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }
  }, [currentIndex, events]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    setCurrentImageIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : events.length - 1
    );
    setCurrentImageIndex(0);
  };

  const handleImageNext = () => {
    const currentEvent = events[currentIndex];
    setCurrentImageIndex((prevIndex) =>
      prevIndex < currentEvent.image.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleImagePrev = () => {
    const currentEvent = events[currentIndex];
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : currentEvent.image.length - 1
    );
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <section 
      id="events" 
      className="relative min-h-screen flex flex-col justify-center py-16 px-4 md:px-8 overflow-hidden bg-[hsl(var(--background))]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Primary cyan orb */}
        <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[hsla(var(--electric-cyan),0.05)] blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Secondary purple orb */}
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[hsla(var(--digital-purple),0.05)] blur-[100px] transform translate-x-1/4 translate-y-1/4"></div>
        
        {/* Small accent magenta orb */}
        <div className="absolute top-[60%] right-[40%] w-[15vw] h-[15vw] rounded-full bg-[hsla(var(--magenta),0.03)] blur-[80px]"></div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
      </div>

      {/* Section heading */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2" style={{ fontFamily: 'var(--font-unbounded)' }}>
          <span className="text-white">Tensor</span>
          <span className="gradient-text"> Events</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[hsla(var(--electric-cyan),0.7)] to-[hsla(var(--magenta),0.7)] mx-auto"></div>
        <p className="mt-4 text-lg text-[hsl(var(--foreground))] opacity-80 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Discover our past and upcoming events designed to empower and inspire AI enthusiasts.
        </p>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto flex ${isMobile ? "flex-col" : "flex-row"} gap-8`}>
        {/* Event Content */}
        <div className={`${isMobile ? "order-2 mt-8" : "w-1/2"}`}>
          <div ref={dateRef} className="mb-2">
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-[hsla(var(--digital-purple),0.2)] text-[hsla(var(--electric-cyan),1)] border border-[hsla(var(--digital-purple),0.3)]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              {currentEvent.status === "upcoming" ? "UPCOMING EVENT" : "PAST EVENT"}
            </span>
          </div>
          
          <h3 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4 text-[hsl(var(--foreground))]" style={{ fontFamily: 'var(--font-unbounded)' }}>
            {currentEvent.title}
          </h3>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-[hsla(var(--electric-cyan),0.8)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span style={{ fontFamily: 'var(--font-space-grotesk)' }}>{`${currentEvent.date.month} ${currentEvent.date.day}, ${currentEvent.date.year}`}</span>
            </div>
            
            <div className="flex items-center text-[hsla(var(--digital-purple),0.8)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span style={{ fontFamily: 'var(--font-space-grotesk)' }}>{currentEvent.time}</span>
            </div>
            
            <div className="flex items-center text-[hsla(var(--magenta),0.8)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span style={{ fontFamily: 'var(--font-space-grotesk)' }}>{currentEvent.location}</span>
            </div>
          </div>
          
          <div ref={descriptionRef} className="mb-8">
            <p className="text-[hsl(var(--foreground))] opacity-80" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {isMobile && !showFullDescription
                ? `${currentEvent.description.substring(0, 150)}...`
                : currentEvent.description}
              
              {isMobile && (
                <button 
                  onClick={toggleDescription}
                  className="text-[hsla(var(--electric-cyan),1)] ml-2 font-medium"
                >
                  {showFullDescription ? "Read less" : "Read more"}
                </button>
              )}
            </p>
          </div>
          
          {currentEvent.status === "upcoming" && currentEvent.registration === "open" && (
            <div className="mb-8">
              <a 
                href="#register" 
                className="bg-[hsla(var(--electric-cyan),1)] hover:bg-[hsla(var(--electric-cyan),0.9)] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-glow hover:scale-105 transform inline-block"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600 }}
              >
                Register Now
              </a>
            </div>
          )}
          
          {/* Navigation controls */}
          <div className="flex gap-4">
            <button 
              ref={prevButtonRef}
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-[hsla(var(--background),0.5)] border border-[hsla(var(--electric-cyan),0.3)] flex items-center justify-center text-[hsla(var(--electric-cyan),0.8)] hover:bg-[hsla(var(--background),0.7)] hover:text-[hsla(var(--electric-cyan),1)] transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              ref={nextButtonRef}
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[hsla(var(--background),0.5)] border border-[hsla(var(--electric-cyan),0.3)] flex items-center justify-center text-[hsla(var(--electric-cyan),0.8)] hover:bg-[hsla(var(--background),0.7)] hover:text-[hsla(var(--electric-cyan),1)] transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
            
            <div className="ml-4 flex items-center">
              <span className="text-sm text-[hsl(var(--foreground))] opacity-60" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                {currentIndex + 1} / {events.length}
              </span>
            </div>
          </div>
        </div>
        
        {/* Event Image */}
        <div 
          ref={imageRef}
          className={`${isMobile ? "order-1 w-full" : "w-1/2"} relative transition-all duration-300`}
        >
          <div 
            className="relative overflow-hidden rounded-xl border border-[hsla(var(--border),0.3)] shadow-lg max-w-full mx-auto"
            style={{ 
              aspectRatio: isImageLoading ? "4/3" : currentAspectRatio.toString(),
              transition: "all 0.3s ease-out",
              maxWidth: calculateOptimalDimensions()?.width || (isMobile ? "100%" : "85%"),
              maxHeight: calculateOptimalDimensions()?.height || (isMobile ? "50vh" : "70vh")
            }}
          >
            {/* Loading state overlay with improved animation */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[hsla(var(--background),0.7)] z-20">
                <div className="flex flex-col items-center">
                  <div className="relative w-10 h-10">
                    <div className="absolute w-full h-full border-2 border-[hsla(var(--electric-cyan),0.5)] border-t-[hsla(var(--electric-cyan),1)] rounded-full animate-spin"></div>
                    <div className="absolute w-full h-full border-2 border-[hsla(var(--digital-purple),0.3)] border-r-[hsla(var(--digital-purple),0.8)] rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
                  </div>
                  <p className="mt-3 text-xs text-[hsla(var(--electric-cyan),0.8)]" style={{ fontFamily: 'var(--font-geist-mono)' }}>LOADING IMAGE</p>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-tr from-[hsla(var(--background),0.4)] via-transparent to-transparent z-10"></div>
            
            <div className="relative w-full h-full">
              {/* Low quality placeholder - shown while main image loads */}
              {isImageLoading && (
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-lg scale-105 opacity-50 transition-opacity duration-500"
                  style={{ backgroundImage: `url(${currentImage})` }}
                />
              )}
              
              <Image
                src={currentImage}
                alt={currentEvent.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`transition-all duration-500 ease-in-out ${isImageLoading ? 'opacity-0' : 'opacity-100 hover:scale-105'}`}
                style={{ 
                  objectFit: 'contain',
                  objectPosition: 'center',
                  maxHeight: '100%',
                  maxWidth: '100%'
                }}
                // Priority ensures first image is eager loaded
                priority={currentIndex === 0 && currentImageIndex === 0}
                onLoad={handleImageLoad}
              />
            </div>
            
            {currentEvent.image.length > 1 && (
              <>
                <button
                  onClick={handleImagePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[hsla(var(--background),0.5)] border border-[hsla(var(--electric-cyan),0.3)] flex items-center justify-center text-white backdrop-blur-sm"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleImageNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[hsla(var(--background),0.5)] border border-[hsla(var(--electric-cyan),0.3)] flex items-center justify-center text-white backdrop-blur-sm"
                >
                  <ChevronRight size={16} />
                </button>
                
                <div className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-[hsla(var(--background),0.6)] rounded-full backdrop-blur-sm text-xs text-[hsl(var(--foreground))]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  {currentImageIndex + 1}/{currentEvent.image.length}
                </div>
              </>
            )}
            
            {currentEvent.status === "upcoming" && (
              <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-[hsla(var(--electric-cyan),0.2)] border border-[hsla(var(--electric-cyan),0.3)] rounded-full text-[hsla(var(--electric-cyan),1)] text-xs backdrop-blur-sm">
                Happening Soon
              </div>
            )}
          </div>
          
          {/* Image dimensions display - can be removed in production */}
          {imageDimensions[currentImage] && (
            <div className="mt-2 text-xs text-[hsl(var(--foreground))] opacity-60 text-center" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              {Math.round(imageDimensions[currentImage].width)} × {Math.round(imageDimensions[currentImage].height)}
              {/* Can be removed in production: */}
              <span className="ml-2">({imageDimensions[currentImage].aspectRatio.toFixed(2)})</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export interface ProjectTag {
  name: string;
  color?: string;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  imageName: string; // Required for thumbnail
  tags: ProjectTag[] | string[];
  githubLink?: string;
  github?: string;
  projectLink?: string;
  demo?: string;
  featured?: boolean;
  category?: string;
  year?: number;
  status?: "completed" | "in-progress" | "planned";
}

export const projectsData: Project[] = [
  {
    _id: "smart-posture",
    title: "SmartPosture",
    description:
      "SmartPosture is a wearable belt with ESP32 and dual IMUs that monitors spine posture and provides vibration feedback for correction. Using a neural network, it achieved 97.5% accuracy in trials, supporting physiotherapy, rehabilitation, and ergonomic health.",
    imageName: "smart-posture",
    tags: ["ESP32", "Arduino IDE", "TensorFlow"],
    githubLink: "https://github.com",
    projectLink: "#",
    featured: true,
    category: "AIoT",
    year: 2024,
    status: "completed",
  },
  {
    _id: "the-arena",
    title: "The Arena",
    description:
      "The Arena combines the excitement of e-sports with the challenge of competitive quizzes in a high-energy, social experience. Guided by an AI Game Master, teams tackle mission-based storylines like “Mission to Mars,” promoting teamwork, quick thinking, and lasting engagement in classrooms or corporate events.",
    imageName: "the-arena",
    tags: ["Next.js", "FastAPI", "WebSockets"],
    githubLink: "https://github.com",
    projectLink: "https://www.youtube.com/watch?v=UeJvo70lnJw",
    featured: true,
    category: "Artificial Intelligence",
    year: 2023,
    status: "completed",
  },
  {
    _id: "derived",
    title: "Derived",
    description:
      "Derived: The AI-Native Development Environment for React.Derived is more than just a tool; it's your creative co-pilot, designed to accelerate your workflow and unleash your creativity. Whether you're a developer, a designer, or an entrepreneur, Derived empowers you to build beautiful, powerful React apps faster than ever before.",
    imageName: "derived",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "E2B", "Firecrawl"],
    githubLink: "https://github.com/Sri-Krishna-V/derived-tc",
    projectLink: "#",
    featured: true,
    category: "Artificial Intelligence",
    year: 2024,
    status: "completed",
  },

  // {
  //   _id: "mission-to-Mars",
  //   title: "Mission-to-Mars",
  //   description:
  //     "A tool for exploring and analyzing blockchain transactions and smart contracts.",
  //   imageName: "blockchain",
  //   tags: ["JavaScript", "Solidity", "Ethereum", "Web3.js"],
  //   githubLink: "https://github.com/Tensor-Amrita-Coimbatore/Mission-to-Mars",
  //   projectLink: "#",
  //   featured: true,
  //   category: "Blockchain",
  //   year: 2023,
  //   status: "completed",
  // },
  
  // {
  //   _id: "iot-dashboard",
  //   title: "IoT Device Dashboard",
  //   description:
  //     "Real-time monitoring and control dashboard for IoT devices with advanced analytics.",
  //   imageName: "iot-dashboard",
  //   tags: ["React", "Node.js", "MongoDB", "Socket.io"],
  //   githubLink: "https://github.com",
  //   projectLink: "#",
  //   featured: false,
  //   category: "IoT",
  //   year: 2024,
  //   status: "in-progress",
  // },
  // {
  //   _id: "ai-chatbot",
  //   title: "AI-Powered Chatbot",
  //   description:
  //     "Intelligent chatbot using natural language processing for customer support automation.",
  //   imageName: "ai-chatbot",
  //   tags: ["Python", "OpenAI", "FastAPI", "React"],
  //   githubLink: "https://github.com",
  //   projectLink: "#",
  //   featured: false,
  //   category: "Artificial Intelligence",
  //   year: 2024,
  //   status: "completed",
  // },
  // {
  //   _id: "mobile-fitness-app",
  //   title: "Mobile Fitness Tracker",
  //   description:
  //     "Cross-platform mobile app for fitness tracking with social features and AI coaching.",
  //   imageName: "fitness-app",
  //   tags: ["React Native", "Firebase", "TensorFlow Lite", "Redux"],
  //   githubLink: "https://github.com",
  //   projectLink: "#",
  //   featured: false,
  //   category: "Mobile Development",
  //   year: 2023,
  //   status: "completed",
  // },
  // {
  //   _id: "data-visualization",
  //   title: "Data Visualization Suite",
  //   description:
  //     "Interactive data visualization tools for complex datasets with real-time updates.",
  //   imageName: "data-viz",
  //   tags: ["D3.js", "React", "Python", "PostgreSQL"],
  //   githubLink: "https://github.com",
  //   projectLink: "#",
  //   featured: false,
  //   category: "Data Science",
  //   year: 2024,
  //   status: "in-progress",
  // },
];

// Helper functions
export const getFeaturedProjects = () =>
  projectsData.filter((project) => project.featured);
export const getProjectsByCategory = (category: string) =>
  projectsData.filter((project) => project.category === category);
export const getProjectsByStatus = (status: string) =>
  projectsData.filter((project) => project.status === status);

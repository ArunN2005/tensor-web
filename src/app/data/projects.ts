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
    _id: "tensor-ml-framework",
    title: "Tensor ML Framework",
    description:
      "An open-source machine learning framework focused on tensor computations and deep learning algorithms.",
    imageName: "tensor-ml",
    tags: ["Python", "PyTorch", "TensorFlow", "CUDA"],
    githubLink: "https://github.com",
    projectLink: "#",
    featured: true,
    category: "Machine Learning",
    year: 2024,
    status: "completed",
  },
  {
    _id: "web-dev-platform",
    title: "Web Development Platform",
    description:
      "A comprehensive platform for learning and practicing modern web development technologies.",
    imageName: "web-dev",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    githubLink: "https://github.com",
    projectLink: "#",
    featured: false,
    category: "Web Development",
    year: 2024,
    status: "completed",
  },
  {
    _id: "quantum-simulator",
    title: "Quantum Computing Simulator",
    description:
      "A simulator for quantum computing algorithms and visualizations of quantum phenomena.",
    imageName: "quantum-sim",
    tags: ["Python", "Qiskit", "React", "WebGL"],
    githubLink: "https://github.com",
    projectLink: "#",
    featured: true,
    category: "Quantum Computing",
    year: 2023,
    status: "completed",
  },
  {
    _id: "blockchain-explorer",
    title: "Blockchain Explorer",
    description:
      "A tool for exploring and analyzing blockchain transactions and smart contracts.",
    imageName: "blockchain",
    tags: ["JavaScript", "Solidity", "Ethereum", "Web3.js"],
    githubLink: "https://github.com",
    projectLink: "#",
    featured: false,
    category: "Blockchain",
    year: 2023,
    status: "completed",
  },
  {
    _id: "iot-dashboard",
    title: "IoT Device Dashboard",
    description:
      "Real-time monitoring and control dashboard for IoT devices with advanced analytics.",
    imageName: "iot-dashboard",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    githubLink: "https://github.com",
    projectLink: "#",
    featured: false,
    category: "IoT",
    year: 2024,
    status: "in-progress",
  },
  {
    _id: "ai-chatbot",
    title: "AI-Powered Chatbot",
    description:
      "Intelligent chatbot using natural language processing for customer support automation.",
    imageName: "ai-chatbot",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    githubLink: "https://github.com",
    projectLink: "#",
    featured: true,
    category: "Artificial Intelligence",
    year: 2024,
    status: "completed",
  },
  {
    _id: "mobile-fitness-app",
    title: "Mobile Fitness Tracker",
    description:
      "Cross-platform mobile app for fitness tracking with social features and AI coaching.",
    imageName: "fitness-app",
    tags: ["React Native", "Firebase", "TensorFlow Lite", "Redux"],
    githubLink: "https://github.com",
    projectLink: "#",
    featured: false,
    category: "Mobile Development",
    year: 2023,
    status: "completed",
  },
  {
    _id: "data-visualization",
    title: "Data Visualization Suite",
    description:
      "Interactive data visualization tools for complex datasets with real-time updates.",
    imageName: "data-viz",
    tags: ["D3.js", "React", "Python", "PostgreSQL"],
    githubLink: "https://github.com",
    projectLink: "#",
    featured: false,
    category: "Data Science",
    year: 2024,
    status: "in-progress",
  },
];

// Helper functions
export const getFeaturedProjects = () =>
  projectsData.filter((project) => project.featured);
export const getProjectsByCategory = (category: string) =>
  projectsData.filter((project) => project.category === category);
export const getProjectsByStatus = (status: string) =>
  projectsData.filter((project) => project.status === status);

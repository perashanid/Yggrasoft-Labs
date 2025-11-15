import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Domain from './models/Domain';
import Project from './models/Project';
import Settings from './models/Settings';
import { Review } from './models/Review';
import { Blog } from './models/Blog';
import { Admin } from './models/Admin';

dotenv.config();

const domains = [
  {
    name: 'Technology',
    slug: 'technology',
    description:
      'Pioneering innovative software solutions and digital platforms that transform how businesses operate. From AI-powered applications to blockchain implementations, we develop cutting-edge technology that solves real-world problems and drives digital transformation across industries.',
    icon: 'FaLaptopCode',
    hasActiveProjects: true,
    order: 1,
    isActive: true,
  },
  {
    name: 'Agriculture',
    slug: 'agriculture',
    description:
      'Revolutionizing farming through smart agriculture solutions and sustainable practices. We combine IoT sensors, data analytics, and modern farming techniques to increase crop yields, optimize resource usage, and promote environmentally friendly agricultural methods that feed communities.',
    icon: 'FaSeedling',
    hasActiveProjects: true,
    order: 2,
    isActive: true,
  },
  {
    name: 'Education',
    slug: 'education',
    description:
      'Empowering learners through accessible, innovative educational platforms and programs. We create digital learning environments, develop curriculum, and provide resources that make quality education available to everyone, bridging gaps and fostering lifelong learning opportunities.',
    icon: 'FaGraduationCap',
    hasActiveProjects: false,
    order: 3,
    isActive: true,
  },
  {
    name: 'Stock Markets',
    slug: 'stock-markets',
    description:
      'Developing intelligent trading platforms and financial analysis tools that democratize investment opportunities. Our solutions provide real-time market insights, algorithmic trading capabilities, and risk management tools that help investors make informed decisions in dynamic markets.',
    icon: 'FaChartLine',
    hasActiveProjects: true,
    order: 4,
    isActive: true,
  },
  {
    name: 'Job Markets',
    slug: 'job-markets',
    description:
      'Connecting talent with opportunity through innovative recruitment and career development platforms. We build systems that match skills with needs, provide career guidance, and create pathways for professional growth, helping individuals and organizations thrive together.',
    icon: 'FaBriefcase',
    hasActiveProjects: false,
    order: 5,
    isActive: true,
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    description:
      'Advancing medical care through digital health solutions and telemedicine platforms. We develop patient management systems, health monitoring applications, and medical data analytics tools that improve healthcare delivery, enhance patient outcomes, and make quality care more accessible.',
    icon: 'FaHeartbeat',
    hasActiveProjects: true,
    order: 6,
    isActive: true,
  },
];

const projects = [
  {
    title: 'AI-Powered Analytics Platform',
    description:
      'A comprehensive analytics platform leveraging artificial intelligence to provide real-time insights and predictive analytics for businesses. Features include automated data processing, machine learning models, and interactive dashboards that help organizations make data-driven decisions.',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yggrasoft-labs/ai-analytics',
    liveUrl: 'https://analytics.yggrasoft.com',
    featured: true,
    order: 1,
    isActive: true,
  },
  {
    title: 'Smart Farm Management System',
    description:
      'An IoT-enabled farm management solution that monitors soil conditions, weather patterns, and crop health in real-time. Farmers can optimize irrigation, predict harvest times, and reduce resource waste through intelligent automation and data-driven recommendations.',
    technologies: ['Node.js', 'React Native', 'IoT', 'PostgreSQL', 'AWS'],
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yggrasoft-labs/smart-farm',
    featured: true,
    order: 2,
    isActive: true,
  },
  {
    title: 'Blockchain Trading Platform',
    description:
      'A secure and transparent trading platform built on blockchain technology. Enables peer-to-peer trading with smart contracts, real-time market data, and advanced risk management tools. Features include automated trading bots and portfolio analytics.',
    technologies: ['Solidity', 'Web3.js', 'React', 'Node.js', 'Ethereum'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yggrasoft-labs/blockchain-trading',
    liveUrl: 'https://trade.yggrasoft.com',
    featured: true,
    order: 3,
    isActive: true,
  },
  {
    title: 'Telemedicine Platform',
    description:
      'A comprehensive healthcare platform connecting patients with medical professionals through secure video consultations, digital prescriptions, and health record management. Includes appointment scheduling, payment processing, and integration with medical devices.',
    technologies: ['Vue.js', 'Django', 'WebRTC', 'PostgreSQL', 'Docker'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yggrasoft-labs/telemedicine',
    featured: false,
    order: 4,
    isActive: true,
  },
  {
    title: 'E-Learning Management System',
    description:
      'An interactive learning platform with course creation tools, video streaming, assessments, and progress tracking. Supports multiple learning formats including live classes, recorded lectures, and interactive quizzes with AI-powered personalized learning paths.',
    technologies: ['Angular', 'Spring Boot', 'MySQL', 'Redis', 'Kubernetes'],
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yggrasoft-labs/elearning',
    liveUrl: 'https://learn.yggrasoft.com',
    featured: false,
    order: 5,
    isActive: true,
  },
  {
    title: 'Job Matching AI Engine',
    description:
      'An intelligent job matching system using machine learning to connect job seekers with opportunities based on skills, experience, and career goals. Features include resume parsing, skill gap analysis, and personalized job recommendations.',
    technologies: ['Python', 'FastAPI', 'React', 'NLP', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yggrasoft-labs/job-matching',
    featured: false,
    order: 6,
    isActive: true,
  },
];

const settings = {
  siteName: 'Yggrasoft Labs',
  tagline: 'Connecting Realms of Innovation',
  missionStatement:
    'At Yggrasoft Labs, we are dedicated to developing, funding, and deploying real-world solutions across multiple domains. Inspired by Yggdrasil, the World Tree from Norse mythology, we connect different realms of innovation to create sustainable impact in technology, agriculture, education, finance, employment, and healthcare.',
  contactEmail: 'contact@yggrasoft.com',
  socialMedia: {
    twitter: 'https://twitter.com/yggrasoftlabs',
    linkedin: 'https://linkedin.com/company/yggrasoft-labs',
    github: 'https://github.com/yggrasoft-labs',
  },
};

// General reviews (not project-specific)
const generalReviews = [
  {
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechVentures Inc',
    rating: 5,
    review: 'Yggrasoft Labs delivered an exceptional AI analytics platform that transformed our business intelligence capabilities. Their technical expertise and commitment to quality are unmatched.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    isActive: true,
    order: 1,
  },
  {
    name: 'Michael Chen',
    role: 'Farm Owner',
    company: 'Green Valley Farms',
    rating: 5,
    review: 'The smart farm management system has revolutionized how we operate. We\'ve seen a 40% increase in efficiency and significant cost savings. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?img=12',
    isActive: true,
    order: 2,
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Medical Director',
    company: 'HealthFirst Clinic',
    rating: 5,
    review: 'The telemedicine platform has made healthcare more accessible to our patients. The system is intuitive, secure, and has greatly improved our service delivery.',
    avatar: 'https://i.pravatar.cc/150?img=9',
    isActive: true,
    order: 3,
  },
  {
    name: 'David Thompson',
    role: 'Investment Manager',
    company: 'Capital Growth Partners',
    rating: 5,
    review: 'Their blockchain trading platform provides the security and transparency we need. The real-time analytics and automated features have given us a competitive edge.',
    avatar: 'https://i.pravatar.cc/150?img=33',
    isActive: true,
    order: 4,
  },
];

// Project-specific reviews
const projectReviews = [
  // AI-Powered Analytics Platform reviews
  {
    name: 'Jennifer Martinez',
    role: 'Data Science Lead',
    company: 'DataCorp Solutions',
    rating: 5,
    review: 'The AI analytics platform exceeded our expectations. The predictive models are incredibly accurate, and the dashboard interface makes complex data accessible to our entire team.',
    avatar: 'https://i.pravatar.cc/150?img=10',
    isActive: true,
    order: 1,
    projectTitle: 'AI-Powered Analytics Platform',
  },
  {
    name: 'Robert Kim',
    role: 'VP of Operations',
    company: 'Global Insights Inc',
    rating: 5,
    review: 'Implementation was seamless, and the ROI was evident within the first quarter. The real-time insights have transformed our decision-making process.',
    avatar: 'https://i.pravatar.cc/150?img=14',
    isActive: true,
    order: 2,
    projectTitle: 'AI-Powered Analytics Platform',
  },
  {
    name: 'Amanda Foster',
    role: 'Business Analyst',
    company: 'TechVentures Inc',
    rating: 4,
    review: 'Powerful analytics capabilities with an intuitive interface. The machine learning models have helped us identify trends we would have missed otherwise.',
    avatar: 'https://i.pravatar.cc/150?img=20',
    isActive: true,
    order: 3,
    projectTitle: 'AI-Powered Analytics Platform',
  },
  
  // Smart Farm Management System reviews
  {
    name: 'Carlos Rodriguez',
    role: 'Agricultural Manager',
    company: 'Sunrise Farms',
    rating: 5,
    review: 'This system has completely transformed our farming operations. The IoT sensors provide real-time data that helps us optimize irrigation and reduce water waste by 35%.',
    avatar: 'https://i.pravatar.cc/150?img=15',
    isActive: true,
    order: 1,
    projectTitle: 'Smart Farm Management System',
  },
  {
    name: 'Lisa Wang',
    role: 'Farm Operations Director',
    company: 'Green Valley Farms',
    rating: 5,
    review: 'The predictive analytics for crop health have been a game-changer. We can now address issues before they become problems, resulting in higher yields and better quality produce.',
    avatar: 'https://i.pravatar.cc/150?img=47',
    isActive: true,
    order: 2,
    projectTitle: 'Smart Farm Management System',
  },
  {
    name: 'James Patterson',
    role: 'Sustainability Coordinator',
    company: 'EcoFarm Collective',
    rating: 5,
    review: 'Not only has this improved our efficiency, but it has also helped us meet our sustainability goals. The resource optimization features are outstanding.',
    avatar: 'https://i.pravatar.cc/150?img=52',
    isActive: true,
    order: 3,
    projectTitle: 'Smart Farm Management System',
  },
  
  // Blockchain Trading Platform reviews
  {
    name: 'Alexander Petrov',
    role: 'Chief Trading Officer',
    company: 'Quantum Capital',
    rating: 5,
    review: 'The security and transparency of this blockchain platform are unparalleled. Smart contracts execute flawlessly, and the audit trail gives us complete confidence.',
    avatar: 'https://i.pravatar.cc/150?img=59',
    isActive: true,
    order: 1,
    projectTitle: 'Blockchain Trading Platform',
  },
  {
    name: 'Sophia Chen',
    role: 'Portfolio Manager',
    company: 'Capital Growth Partners',
    rating: 5,
    review: 'The automated trading bots have significantly improved our trading efficiency. The platform handles high-frequency trading with zero downtime.',
    avatar: 'https://i.pravatar.cc/150?img=44',
    isActive: true,
    order: 2,
    projectTitle: 'Blockchain Trading Platform',
  },
  {
    name: 'Marcus Johnson',
    role: 'Risk Analyst',
    company: 'SecureInvest Group',
    rating: 4,
    review: 'Excellent risk management tools and real-time analytics. The platform has helped us minimize exposure while maximizing returns.',
    avatar: 'https://i.pravatar.cc/150?img=68',
    isActive: true,
    order: 3,
    projectTitle: 'Blockchain Trading Platform',
  },
  
  // Telemedicine Platform reviews
  {
    name: 'Dr. Rachel Green',
    role: 'Chief Medical Officer',
    company: 'HealthFirst Clinic',
    rating: 5,
    review: 'This platform has revolutionized how we deliver care. Video consultations are crystal clear, and the integrated health records make patient care seamless.',
    avatar: 'https://i.pravatar.cc/150?img=32',
    isActive: true,
    order: 1,
    projectTitle: 'Telemedicine Platform',
  },
  {
    name: 'Dr. Michael Torres',
    role: 'Telemedicine Director',
    company: 'CareConnect Health',
    rating: 5,
    review: 'Patient satisfaction has increased by 45% since implementing this platform. The appointment scheduling and prescription management features are excellent.',
    avatar: 'https://i.pravatar.cc/150?img=60',
    isActive: true,
    order: 2,
    projectTitle: 'Telemedicine Platform',
  },
  {
    name: 'Nurse Sarah Williams',
    role: 'Head Nurse',
    company: 'Virtual Care Solutions',
    rating: 5,
    review: 'Easy to use for both staff and patients. The integration with medical devices allows us to monitor patients remotely with confidence.',
    avatar: 'https://i.pravatar.cc/150?img=48',
    isActive: true,
    order: 3,
    projectTitle: 'Telemedicine Platform',
  },
  
  // E-Learning Management System reviews
  {
    name: 'Professor David Lee',
    role: 'Dean of Online Education',
    company: 'Global University',
    rating: 5,
    review: 'The most comprehensive e-learning platform we\'ve used. The AI-powered personalized learning paths have improved student outcomes significantly.',
    avatar: 'https://i.pravatar.cc/150?img=13',
    isActive: true,
    order: 1,
    projectTitle: 'E-Learning Management System',
  },
  {
    name: 'Emma Thompson',
    role: 'Education Technology Specialist',
    company: 'LearnTech Academy',
    rating: 5,
    review: 'Course creation tools are intuitive, and the analytics help us understand student engagement. The live class feature works flawlessly even with 500+ participants.',
    avatar: 'https://i.pravatar.cc/150?img=45',
    isActive: true,
    order: 2,
    projectTitle: 'E-Learning Management System',
  },
  {
    name: 'Dr. Kevin Brown',
    role: 'Curriculum Director',
    company: 'Future Skills Institute',
    rating: 4,
    review: 'Excellent platform with robust features. The assessment tools and progress tracking have made it easier to ensure learning objectives are met.',
    avatar: 'https://i.pravatar.cc/150?img=56',
    isActive: true,
    order: 3,
    projectTitle: 'E-Learning Management System',
  },
  
  // Job Matching AI Engine reviews
  {
    name: 'Rebecca Martinez',
    role: 'HR Director',
    company: 'TalentFirst Corp',
    rating: 5,
    review: 'This AI engine has reduced our time-to-hire by 60%. The skill matching is incredibly accurate, and candidates are much better aligned with our needs.',
    avatar: 'https://i.pravatar.cc/150?img=27',
    isActive: true,
    order: 1,
    projectTitle: 'Job Matching AI Engine',
  },
  {
    name: 'Thomas Anderson',
    role: 'Recruitment Manager',
    company: 'CareerPath Solutions',
    rating: 5,
    review: 'The resume parsing and skill gap analysis features are outstanding. We\'ve seen a 40% improvement in candidate quality since implementation.',
    avatar: 'https://i.pravatar.cc/150?img=51',
    isActive: true,
    order: 2,
    projectTitle: 'Job Matching AI Engine',
  },
  {
    name: 'Linda Chen',
    role: 'Talent Acquisition Lead',
    company: 'NextGen Careers',
    rating: 5,
    review: 'Personalized job recommendations have increased candidate engagement dramatically. The platform understands nuances that traditional systems miss.',
    avatar: 'https://i.pravatar.cc/150?img=49',
    isActive: true,
    order: 3,
    projectTitle: 'Job Matching AI Engine',
  },
];

const blogs = [
  {
    title: 'The Future of AI in Business Analytics',
    slug: 'future-of-ai-in-business-analytics',
    excerpt: 'Exploring how artificial intelligence is transforming the way businesses analyze data and make decisions.',
    content: 'Artificial Intelligence is revolutionizing business analytics by enabling organizations to process vast amounts of data in real-time, identify patterns that humans might miss, and make predictions with unprecedented accuracy...',
    coverImage: '',
    author: 'Yggrasoft Labs Team',
    tags: ['AI', 'Analytics', 'Technology', 'Business'],
    isPublished: true,
    publishedAt: new Date('2024-11-01'),
    views: 1250,
  },
  {
    title: 'Smart Agriculture: Feeding the Future',
    slug: 'smart-agriculture-feeding-the-future',
    excerpt: 'How IoT and data analytics are revolutionizing modern farming practices.',
    content: 'Smart agriculture combines IoT sensors, satellite imagery, and data analytics to optimize crop yields while minimizing environmental impact...',
    coverImage: '',
    author: 'Yggrasoft Labs Team',
    tags: ['Agriculture', 'IoT', 'Sustainability', 'Innovation'],
    isPublished: true,
    publishedAt: new Date('2024-10-15'),
    views: 890,
  },
  {
    title: 'Blockchain Beyond Cryptocurrency',
    slug: 'blockchain-beyond-cryptocurrency',
    excerpt: 'Discovering the practical applications of blockchain technology in various industries.',
    content: 'While blockchain is often associated with cryptocurrency, its potential extends far beyond digital currencies...',
    coverImage: '',
    author: 'Yggrasoft Labs Team',
    tags: ['Blockchain', 'Technology', 'Finance', 'Innovation'],
    isPublished: true,
    publishedAt: new Date('2024-10-01'),
    views: 1450,
  },
];

const admin = {
  username: 'admin',
  email: 'admin@yggrasoft.com',
  password: 'admin123', // Will be hashed by the model
  role: 'superadmin',
  isActive: true,
};

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yggdrasil';
    await mongoose.connect(mongoURI);

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Domain.deleteMany({});
    await Project.deleteMany({});
    await Settings.deleteMany({});
    await Review.deleteMany({});
    await Blog.deleteMany({});
    await Admin.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Insert domains
    await Domain.insertMany(domains);
    console.log('✅ Seeded domains');

    // Insert projects
    const createdProjects = await Project.insertMany(projects);
    console.log('✅ Seeded projects');

    // Insert settings
    await Settings.create(settings);
    console.log('✅ Seeded settings');

    // Insert general reviews
    await Review.insertMany(generalReviews);
    console.log('✅ Seeded general reviews');

    // Insert project-specific reviews and link them to projects
    for (const reviewData of projectReviews) {
      const { projectTitle, ...reviewFields } = reviewData;
      const project = createdProjects.find(p => p.title === projectTitle);
      
      if (project) {
        const review = await Review.create({
          ...reviewFields,
          projectId: project._id,
        });
        
        // Add review to project's reviews array
        await Project.findByIdAndUpdate(project._id, {
          $push: { reviews: review._id },
        });
      }
    }
    console.log('✅ Seeded project reviews and linked to projects');

    // Insert blogs
    await Blog.insertMany(blogs);
    console.log('✅ Seeded blogs');

    // Create admin user
    await Admin.create(admin);
    console.log('✅ Created admin user (username: admin, password: admin123)');

    console.log('🌳 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Domain from './models/Domain';
import Settings from './models/Settings';

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

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yggdrasil';
    await mongoose.connect(mongoURI);

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Domain.deleteMany({});
    await Settings.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Insert domains
    await Domain.insertMany(domains);
    console.log('✅ Seeded domains');

    // Insert settings
    await Settings.create(settings);
    console.log('✅ Seeded settings');

    console.log('🌳 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

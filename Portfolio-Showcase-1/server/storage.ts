import { db } from "./db";
import {
  messages, projects, skills, experience,
  type InsertMessage, type Message,
  type Project, type Skill, type Experience
} from "@shared/schema";

// Mock data to match Manasvi's information
const mockProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "Developed a responsive e-commerce website with user-friendly UI. Implemented product listing, cart functionality, and order flow.",
    techStack: ["PHP", "MySQL"],
    githubUrl: "https://github.com/manasvi009",
    demoUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Alumni Management System",
    description: "Designed a system to manage alumni records and communication. Enabled data management and easy retrieval of alumni information.",
    techStack: ["MERN Stack"],
    githubUrl: "https://github.com/manasvi009",
    demoUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "AI-Powered Smart Analysis and Assistant Platform",
    description: "Developing an AI-based platform for smart data analysis and assistance. Focused on automation, insights generation, and intelligent responses.",
    techStack: ["Python", "Fullstack", "LLM"],
    githubUrl: "https://github.com/manasvi009",
    demoUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1677442135722-5f11f06a1e72?q=80&w=1923&auto=format&fit=crop",
  }
];

const mockSkills: Skill[] = [
  { id: 1, name: "PHP", category: "frontend", icon: null },
  { id: 2, name: "Python", category: "frontend", icon: null },
  { id: 3, name: "C++", category: "frontend", icon: null },
  { id: 4, name: "JavaScript", category: "frontend", icon: null },
  { id: 5, name: "C", category: "frontend", icon: null },
  { id: 6, name: "HTML", category: "backend", icon: null },
  { id: 7, name: "CSS", category: "backend", icon: null },
  { id: 8, name: "React", category: "backend", icon: null },
  { id: 9, name: "Android", category: "ai_ml", icon: null },
  { id: 10, name: "Flutter", category: "ai_ml", icon: null },
  { id: 11, name: "MySQL", category: "tools", icon: null },
  { id: 12, name: "MongoDB", category: "tools", icon: null },
];

const mockExperience: Experience[] = [
  {
    id: 1,
    role: "Master of Science (Information Technology)",
    company: "Uka Tarsadia University, Bardoli, Gujarat",
    duration: "July 2025 (Pursuing)",
    description: "Currently pursuing MSc in Information Technology at Uka Tarsadia University.",
  },
  {
    id: 2,
    role: "Bachelor of Computer Application (BCA)",
    company: "VNSGU, Surat, Gujarat",
    duration: "May 2025",
    description: "Completed Bachelor of Computer Application from VNSGU, Surat, Gujarat.",
  },
  {
    id: 3,
    role: "Looking for Placement Opportunities",
    company: "Open to Opportunities",
    duration: "Currently Available",
    description: "Seeking a placement opportunity where I can contribute effectively while gaining valuable industry exposure.",
  },
];

// Simple in-memory storage for messages
let messagesData: Message[] = [];

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
}

// Use database if available, otherwise use in-memory
export class StorageManager implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    // If DB is available, use it; otherwise use in-memory
    if (db) {
      try {
        const [message] = await db.insert(messages).values(insertMessage).returning();
        return message;
      } catch (error) {
        console.warn('Database insert failed, using in-memory:', error);
      }
    }
    
    const newMessage: Message = {
      id: messagesData.length + 1,
      ...insertMessage,
      createdAt: new Date(),
    };
    messagesData.push(newMessage);
    return newMessage;
  }

  async getProjects(): Promise<Project[]> {
    if (db) {
      try {
        return await db.select().from(projects);
      } catch (error) {
        console.warn('Database query failed, using mock data:', error);
      }
    }
    return mockProjects;
  }

  async getSkills(): Promise<Skill[]> {
    if (db) {
      try {
        return await db.select().from(skills);
      } catch (error) {
        console.warn('Database query failed, using mock data:', error);
      }
    }
    return mockSkills;
  }

  async getExperience(): Promise<Experience[]> {
    if (db) {
      try {
        return await db.select().from(experience).orderBy(experience.id);
      } catch (error) {
        console.warn('Database query failed, using mock data:', error);
      }
    }
    return mockExperience;
  }
}

export const storage = new StorageManager();

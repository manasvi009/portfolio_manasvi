import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { projects, skills, experience } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === API ROUTES ===

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.projects.list.path, async (req, res) => {
    const data = await storage.getProjects();
    res.json(data);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const data = await storage.getSkills();
    res.json(data);
  });

  app.get(api.experience.list.path, async (req, res) => {
    const data = await storage.getExperience();
    res.json(data);
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: "AI Image Generator",
        description: "A full-stack application that uses Stable Diffusion to generate images from text prompts. Features include user galleries, image editing, and social sharing.",
        techStack: ["React", "Python", "TensorFlow", "FastAPI", "PostgreSQL"],
        imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3caf?q=80&w=1000&auto=format&fit=crop",
        githubUrl: "https://github.com",
        demoUrl: "https://demo.com"
      },
      {
        title: "E-Commerce Dashboard",
        description: "Comprehensive analytics dashboard for online retailers. Visualize sales trends, inventory levels, and customer demographics with interactive charts.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Recharts"],
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        githubUrl: "https://github.com",
        demoUrl: "https://demo.com"
      },
      {
        title: "Smart Home Controller",
        description: "IoT interface for managing smart home devices. Supports voice commands, automation routines, and energy consumption monitoring.",
        techStack: ["React Native", "Node.js", "MQTT", "MongoDB"],
        imageUrl: "https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=1000&auto=format&fit=crop",
        githubUrl: "https://github.com",
        demoUrl: "https://demo.com"
      },
      {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website built with React and Framer Motion. Features smooth scrolling, dark mode, and dynamic content loading.",
        techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
        githubUrl: "https://github.com",
        demoUrl: "https://demo.com"
      }
    ]);
  }

  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    await db.insert(skills).values([
      // Frontend
      { name: "React", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Next.js", category: "frontend" },
      { name: "Framer Motion", category: "frontend" },
      // Backend
      { name: "Node.js", category: "backend" },
      { name: "Express", category: "backend" },
      { name: "PostgreSQL", category: "backend" },
      { name: "Python", category: "backend" },
      // AI/ML
      { name: "TensorFlow", category: "ai_ml" },
      { name: "PyTorch", category: "ai_ml" },
      { name: "Scikit-learn", category: "ai_ml" },
      { name: "OpenCV", category: "ai_ml" },
      // Tools
      { name: "Docker", category: "tools" },
      { name: "Git", category: "tools" },
      { name: "AWS", category: "tools" },
      { name: "Figma", category: "tools" }
    ]);
  }

  const existingExperience = await storage.getExperience();
  if (existingExperience.length === 0) {
    await db.insert(experience).values([
      {
        role: "Senior Full Stack Developer",
        company: "Tech Innovations Inc.",
        duration: "2023 - Present",
        description: "Leading the development of enterprise-scale web applications. Architecting scalable microservices and mentoring junior developers. Improved system performance by 40%."
      },
      {
        role: "AI/ML Engineer",
        company: "DataSystems Corp",
        duration: "2021 - 2023",
        description: "Developed and deployed machine learning models for predictive analytics. Collaborated with cross-functional teams to integrate AI features into existing products."
      },
      {
        role: "Frontend Developer",
        company: "Creative Web Solutions",
        duration: "2019 - 2021",
        description: "Built responsive and interactive user interfaces for client websites. Collaborated with designers to ensure pixel-perfect implementation of UI/UX designs."
      }
    ]);
  }
}

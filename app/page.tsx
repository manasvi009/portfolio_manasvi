"use client";

import React from "react"
import Image from "next/image";

import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Send,
  Download,
  Phone,
  User,
} from "lucide-react";
import { Navbar } from "@/components/portfolio/navbar";
import { SectionWrapper, SectionHeader } from "@/components/portfolio/section-wrapper";
import { ProjectCard } from "@/components/portfolio/project-card";
import { SkillCard } from "@/components/portfolio/skill-card";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Static data
const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description:
      "Developed a responsive e-commerce website with user-friendly UI. Implemented product listing, cart functionality, and order flow.",
    techStack: ["Php", "MySQL"],
    githubUrl: "https://github.com/manasvi009",
    demoUrl: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Alumni Management System",
    description:
      "Designed a system to manage alumni records and communication. Enabled data management and easy retrieval of alumni information.",
    techStack: ["MERN Stack"],
    githubUrl: "https://github.com/manasvi009",
    demoUrl: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "AI-Powered Smart Analysis and Assistant Platform",
    description:
      "Developing an AI-based platform for smart data analysis and assistance. Focused on automation, insights generation, and intelligent responses.",
    techStack: ["Python", "Fullstack", "LLM"],
    githubUrl: "https://github.com/manasvi009",
    demoUrl: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1677442135722-5f11f06a1e72?q=80&w=1923&auto=format&fit=crop",
  },
];

const skills = [
  // Programming Languages
  { id: 1, name: "PHP", category: "frontend", icon: "Code" },
  { id: 2, name: "Python", category: "frontend", icon: "FileCode" },
  { id: 3, name: "C++", category: "frontend", icon: "Code" },
  { id: 4, name: "JavaScript", category: "frontend", icon: "Code" },
  { id: 5, name: "C", category: "frontend", icon: "Code" },
  // Web Technologies
  { id: 6, name: "HTML", category: "backend", icon: "Code" },
  { id: 7, name: "CSS", category: "backend", icon: "Code" },
  { id: 8, name: "React", category: "backend", icon: "Code" },
  // Mobile Development
  { id: 9, name: "Android", category: "ai_ml", icon: "Code" },
  { id: 10, name: "Flutter", category: "ai_ml", icon: "Code" },
  // Database Management
  { id: 11, name: "MySQL", category: "tools", icon: "Database" },
  { id: 12, name: "MongoDB", category: "tools", icon: "Database" },
];

const experience = [
  {
    id: 1,
    role: "Master of Science (Information Technology)",
    company: "Uka Tarsadia University, Bardoli, Gujarat",
    duration: "July 2025 (Pursuing)",
    description:
      "Currently pursuing MSc in Information Technology at Uka Tarsadia University.",
  },
  {
    id: 2,
    role: "Bachelor of Computer Application (BCA)",
    company: "VNSGU, Surat, Gujarat",
    duration: "May 2025",
    description:
      "Completed Bachelor of Computer Application from VNSGU, Surat, Gujarat.",
  },
];

// Group skills by category
const groupedSkills = skills.reduce(
  (acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  },
  {} as Record<string, typeof skills>
);

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary selection:text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-20 animate-pulse" />
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background shadow-2xl overflow-hidden relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <User className="w-16 h-16 text-primary" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Hi, I'm <span className="text-gradient">Manasvi Limbasiya</span>
              </h1>

              <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-mono mb-8 h-12">
                <span>MSc (IT) Student | Web Developer | Looking for Placement Opportunities</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                  onClick={() =>
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Projects
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-12 text-lg border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-300 bg-transparent"
                  asChild
                >
                  <a href="/resume.pdf" download="Manasvi_Limbasiya_Resume.pdf">
                    <Download className="mr-2 h-5 w-5" /> Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <button
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce cursor-pointer"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </section>

        {/* ABOUT SECTION */}
        <SectionWrapper id="about" className="bg-secondary/20">
          <SectionHeader title="About Me" subtitle="Get to know me better" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <Image
                src="/profile.jpg"
                alt="Profile Picture"
                width={600}
                height={600}
                priority
                className="relative z-10 rounded-2xl shadow-2xl border border-white/10 w-full object-cover aspect-video"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Dedicated MSc (IT) Student with Hands-On Experience</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                A dedicated MSc (IT) student with hands-on experience in web development and project-
                based learning. I enjoy building practical solutions using modern technologies and
                continuously improving my technical skills.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                I am looking for a placement opportunity where I can contribute effectively while
                gaining valuable industry exposure.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                {[
                  { icon: Github, href: "https://github.com/manasvi009", label: "GitHub" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/manasvi-limbasiya-8b873037b/",
                    label: "LinkedIn",
                  },
                  { icon: Mail, href: "mailto:manasvilimbasiya1007@gmail.com", label: "Email" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-300 bg-transparent"
                  asChild
                >
                  <a href="/resume.pdf" download="Manasvi_Limbasiya_Resume.pdf">
                    <Download className="mr-2 h-4 w-4" /> Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* SKILLS SECTION */}
        <SectionWrapper id="skills">
          <SectionHeader title="Technical Skills" subtitle="My technology stack" />

          <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-secondary/40 p-1 rounded-xl mb-8">
              <TabsTrigger
                value="frontend"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
              >
                Frontend
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
              >
                Backend
              </TabsTrigger>
              <TabsTrigger
                value="ai_ml"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
              >
                AI / ML
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
              >
                Tools
              </TabsTrigger>
            </TabsList>

            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {categorySkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </SectionWrapper>

        {/* PROJECTS SECTION */}
        <SectionWrapper id="projects" className="bg-secondary/20">
          <SectionHeader title="Featured Projects" subtitle="Some of my recent work" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </SectionWrapper>

        {/* EXPERIENCE SECTION */}
        <SectionWrapper id="experience">
          <SectionHeader title="Experience" subtitle="My professional journey" />
          <ExperienceTimeline experience={experience} />
        </SectionWrapper>

        {/* CONTACT SECTION */}
        <SectionWrapper id="contact" className="bg-gradient-to-b from-secondary/20 to-background pb-32">
          <SectionHeader title="Get In Touch" subtitle="Let's build something amazing together" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="glass-card p-8 rounded-2xl space-y-6">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-muted-foreground">
                Feel free to reach out to me through any of these channels.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:manasvilimbasiya1007@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-primary/10 transition-colors group"
                >
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">manasvilimbasiya1007@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+918780654959"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-primary/10 transition-colors group"
                >
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+91 8780654959</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/manasvi-limbasiya-8b873037b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-primary/10 transition-colors group"
                >
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <p className="font-medium">Manasvi Limbasiya</p>
                  </div>
                </a>

                <a
                  href="https://github.com/manasvi009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-primary/10 transition-colors group"
                >
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Github className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GitHub</p>
                    <p className="font-medium">manasvi009</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50 border-white/10 focus:border-primary/50 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50 border-white/10 focus:border-primary/50 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="min-h-[120px] bg-background/50 border-white/10 focus:border-primary/50 resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-3 rounded-lg bg-green-500/20 text-green-600 text-sm">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3 rounded-lg bg-red-500/20 text-red-600 text-sm">
                    ✗ Failed to send message. Please try again or contact me directly.
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send size={18} />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* FOOTER */}
      <footer className="bg-background border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Manasvi Limbasiya</h3>
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/manasvi009"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/manasvi-limbasiya-8b873037b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:manasvilimbasiya1007@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

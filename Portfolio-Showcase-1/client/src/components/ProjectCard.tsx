import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 z-20 flex gap-2">
          {project.githubUrl && (
            <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} />
              </a>
            </Button>
          )}
          {project.demoUrl && (
            <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
              </a>
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-primary/5 border-primary/20 text-primary-foreground/80 hover:bg-primary/10">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

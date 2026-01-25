import { motion } from "framer-motion";
import { Experience } from "@shared/schema";
import { Briefcase } from "lucide-react";

interface ExperienceTimelineProps {
  experience: Experience[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <div className="relative border-l border-primary/20 ml-4 md:ml-0 md:pl-0 space-y-12">
      {/* Center Line for desktop */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

      {experience.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`relative flex flex-col md:flex-row gap-8 ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Timeline Dot */}
          <div className="absolute left-[-5px] md:left-1/2 md:translate-x-[-50%] top-0 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] z-10">
            <div className="absolute inset-[-4px] rounded-full border border-primary/50 animate-ping" />
          </div>

          {/* Content */}
          <div className="flex-1 ml-6 md:ml-0 md:w-1/2">
            <div className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-primary font-medium text-sm uppercase tracking-wider">
                <Briefcase size={14} />
                <span>{item.duration}</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-1">{item.role}</h3>
              <div className="text-lg text-primary/80 font-medium mb-4">{item.company}</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
          
          {/* Empty space for the other side */}
          <div className="flex-1 hidden md:block" />
        </motion.div>
      ))}
    </div>
  );
}

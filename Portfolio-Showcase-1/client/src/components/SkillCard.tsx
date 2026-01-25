import { motion } from "framer-motion";
import { Skill } from "@shared/schema";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

// Map string icon names to Lucide components safely
const getIcon = (iconName: string | null) => {
  if (!iconName) return Icons.Code;
  
  // Cast to any to access by string key
  const IconComponent = (Icons as any)[iconName];
  return IconComponent || Icons.Code;
};

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = getIcon(skill.icon);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-3 text-center hover:bg-primary/5 transition-colors group cursor-default"
    >
      <div className="p-3 rounded-full bg-secondary/50 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <Icon size={24} />
      </div>
      <span className="font-medium text-sm md:text-base">{skill.name}</span>
    </motion.div>
  );
}

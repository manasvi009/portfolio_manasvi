"use client";

import {
  Code,
  Cpu,
  Database,
  Globe,
  Layout,
  Server,
  Settings,
  Smartphone,
  Terminal,
  Wrench,
  Brain,
  Layers,
  FileCode,
  GitBranch,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  Code,
  Cpu,
  Database,
  Globe,
  Layout,
  Server,
  Settings,
  Smartphone,
  Terminal,
  Wrench,
  Brain,
  Layers,
  FileCode,
  GitBranch,
  Cloud,
};

const getIcon = (iconName: string | null): LucideIcon => {
  if (!iconName) return Code;
  return iconMap[iconName] || Code;
};

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const Icon = getIcon(skill.icon);

  return (
    <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-3 text-center hover:bg-primary/5 transition-colors group cursor-default">
      <div className="p-3 rounded-full bg-secondary/50 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <Icon size={24} />
      </div>
      <span className="font-medium text-sm md:text-base">{skill.name}</span>
    </div>
  );
}

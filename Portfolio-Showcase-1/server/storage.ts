import { db } from "./db";
import {
  messages, projects, skills, experience,
  type InsertMessage, type Message,
  type Project, type Skill, type Experience
} from "@shared/schema";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getExperience(): Promise<Experience[]> {
    // Sort by most recent (assuming ID order loosely correlates with entry, or add date field sorting if needed)
    return await db.select().from(experience).orderBy(experience.id);
  }
}

export const storage = new DatabaseStorage();

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown, 
  Send,
  Download,
  Phone
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProjects, useSkills, useExperience, useSendMessage } from "@/hooks/use-portfolio";
import { Navbar } from "@/components/Navbar";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillCard } from "@/components/SkillCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { api } from "@shared/routes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form Schema
const formSchema = api.messages.create.input;

export default function Home() {
  const { data: projects = [] } = useProjects();
  const { data: skills = [] } = useSkills();
  const { data: experience = [] } = useExperience();
  const sendMessageMutation = useSendMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    sendMessageMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

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
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-20 animate-pulse" />
                {/* Placeholder avatar - use real one in production */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background shadow-2xl overflow-hidden relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <span className="text-4xl">👨‍💻</span>
                </div>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hi, I'm <span className="text-gradient">Manasvi Limbasiya</span>
              </motion.h1>

              <motion.div 
                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-mono mb-8 h-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'AI/ML Engineer',
                    2000,
                    'UI/UX Enthusiast',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Projects
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full px-8 h-12 text-lg border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  asChild
                >
                  <a href="/resume.pdf" download="Manasvi_Limbasiya_Resume.pdf">
                    <Download className="mr-2 h-5 w-5" /> Download Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <SectionWrapper id="about" className="bg-secondary/20">
          <SectionHeader title="About Me" subtitle="Get to know me better" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              {/* Using Unsplash for demo */}
              {/* computer setup developer coding dark */}
              <img 
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop" 
                alt="Coding Setup" 
                className="relative z-10 rounded-2xl shadow-2xl border border-white/10 w-full object-cover aspect-video"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-display">
                Passionate about building scalable solutions
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                I am a full-stack developer with a deep interest in Artificial Intelligence and Machine Learning. 
                With over 4 years of experience in building web applications, I combine creativity with technical 
                expertise to deliver exceptional user experiences.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                My journey began with frontend development, but my curiosity led me to explore the backend 
                and eventually the fascinating world of AI. I love solving complex problems and turning ideas into reality.
              </p>
              
              <div className="flex gap-4 pt-4">
                {[
                  { icon: Github, href: "https://github.com/manasvi009", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/manasvi-limbasiya-8b873037b/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:manasvilimbasiya1007@gmail.com", label: "Email" }
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
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* SKILLS SECTION */}
        <SectionWrapper id="skills">
          <SectionHeader title="Technical Skills" subtitle="My technology stack" />
          
          <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-secondary/40 p-1 rounded-xl mb-8">
              <TabsTrigger value="frontend" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Frontend</TabsTrigger>
              <TabsTrigger value="backend" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Backend</TabsTrigger>
              <TabsTrigger value="ai_ml" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">AI / ML</TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">Tools</TabsTrigger>
            </TabsList>
            
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {categorySkills.map((skill, index) => (
                    <SkillCard key={skill.id} skill={skill} index={index} />
                  ))}
                </div>
              </TabsContent>
            ))}
            
            {/* Fallback empty states if data is missing */}
            {!groupedSkills['frontend'] && (
              <TabsContent value="frontend">
                <div className="text-center text-muted-foreground py-10">No skills added yet.</div>
              </TabsContent>
            )}
          </Tabs>
        </SectionWrapper>

        {/* PROJECTS SECTION */}
        <SectionWrapper id="projects" className="bg-secondary/20">
          <SectionHeader title="Featured Projects" subtitle="Some of my recent work" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            {projects.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                Projects loading or none found...
              </div>
            )}
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
              <h3 className="text-2xl font-bold font-display">Contact Information</h3>
              <p className="text-muted-foreground">Feel free to reach out to me through any of these channels.</p>
              
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
              <h3 className="text-2xl font-bold font-display mb-6">Send a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            {...field} 
                            required
                            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12"
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your.email@example.com" 
                            {...field} 
                            required
                            className="bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-12"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="min-h-[120px] bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/20 resize-none"
                            {...field} 
                            required
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                    disabled={sendMessageMutation.isPending}
                    data-testid="button-submit"
                  >
                    {sendMessageMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send size={18} />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* FOOTER */}
      <footer className="bg-background border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold font-display mb-2">Manasvi Limbasiya</h3>
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com/manasvi009" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/manasvi-limbasiya-8b873037b/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
            <a href="mailto:manasvilimbasiya1007@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Hero } from "@/src/components/home/Hero";
import { AboutSection } from "@/src/components/home/AboutSection";
import { ResumeSection } from "@/src/components/home/ResumeSection";
import { ProjectsSection } from "@/src/components/home/ProjectsSection";
import { ContactSection } from "@/src/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ResumeSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

import ZigZagList from "../components/ZigZagList";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  return (
    <section className="content-page" aria-label="projects">
      <h1>Projects</h1>
      <ZigZagList items={projects} />
    </section>
  );
}

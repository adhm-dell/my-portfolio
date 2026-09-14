import { Projects } from '../components/sections/Projects';

export function ProjectsPage() {
  return (
    <div className="pt-24 min-h-screen">
      <Projects featuredOnly={false} />
    </div>
  );
}

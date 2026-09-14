import { TechStack } from '../components/sections/TechStack';

export function TechStackPage() {
  return (
    <div className="pt-24 min-h-screen">
      <TechStack featuredOnly={false} />
    </div>
  );
}

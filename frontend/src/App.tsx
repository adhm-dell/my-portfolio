import { Routes, Route, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { TechStack } from './components/sections/TechStack';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';

// Admin imports
import { Login } from './pages/admin/Login';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { ProjectsManager } from './pages/admin/ProjectsManager';
import { MediaManager } from './pages/admin/MediaManager';
import { SkillsManager } from './pages/admin/SkillsManager';
import { ExperienceManager } from './pages/admin/ExperienceManager';
import { ProfileManager } from './pages/admin/ProfileManager';
import { MessagesManager } from './pages/admin/MessagesManager';

import { ProjectsPage } from './pages/ProjectsPage';
import { TechStackPage } from './pages/TechStackPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectDetails } from './pages/ProjectDetails';

const PublicLayout = () => (
  <div className="relative">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

const Home = () => (
  <>
    <Hero />
    <About />
    <Projects featuredOnly={true} />
    <TechStack featuredOnly={true} />
    <Experience featuredOnly={true} />
    <Contact />
  </>
);

function App() {
  const { i18n } = useTranslation();

  // Sync HTML dir attribute with language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Routes>
      {/* Public Site */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="project/:slug" element={<ProjectDetails />} />
        <Route path="tech" element={<TechStackPage />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      
      {/* Admin Login (without layout) */}
      <Route path="/admin/login" element={<Login />} />
      
      {/* Admin Panel (with protected layout) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="media" element={<MediaManager />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="experience" element={<ExperienceManager />} />
        <Route path="profile" element={<ProfileManager />} />
        <Route path="messages" element={<MessagesManager />} />
      </Route>
    </Routes>
  );
}

export default App;

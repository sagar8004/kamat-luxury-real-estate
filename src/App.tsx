import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { PagePreloader } from './components/PagePreloader';

// Pages
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { OngoingPage } from './pages/OngoingPage';
import { CompletedPage } from './pages/CompletedPage';
import { LocationsPage } from './pages/LocationsPage';
import { AboutPage } from './pages/AboutPage';
import { FinancePage } from './pages/FinancePage';
import { ContactPage } from './pages/ContactPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';

// Data & Types
import { PROPERTIES } from './data/propertyService';
import { PropertyItem, ProjectStatus } from './types/property';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [initialFilterStatus, setInitialFilterStatus] = useState<ProjectStatus>('all');
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [tourProperty, setTourProperty] = useState<PropertyItem | null>(null);

  // Sync with URL Hash for natural multi-page browser navigation & bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash.startsWith('property/')) {
        const propId = hash.replace('property/', '');
        const found = PROPERTIES.find((p) => p.id === propId);
        if (found) {
          setSelectedPropertyId(propId);
          setCurrentPage('property-detail');
          return;
        }
      }

      if (['projects', 'ongoing', 'completed', 'locations', 'about', 'finance', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string, params?: { propertyId?: string; filterStatus?: string }) => {
    if (page === 'property-detail' && params?.propertyId) {
      setSelectedPropertyId(params.propertyId);
      setCurrentPage('property-detail');
      window.location.hash = `#/property/${params.propertyId}`;
    } else {
      if (params?.filterStatus) {
        setInitialFilterStatus(params.filterStatus as ProjectStatus);
      }
      setCurrentPage(page);
      window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (property: PropertyItem) => {
    setSelectedPropertyId(property.id);
    setCurrentPage('property-detail');
    window.location.hash = `#/property/${property.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTourModal = (property?: PropertyItem) => {
    setTourProperty(property || (selectedPropertyId ? PROPERTIES.find(p => p.id === selectedPropertyId) || null : null));
    setTourModalOpen(true);
  };

  const currentProperty = PROPERTIES.find((p) => p.id === selectedPropertyId) || PROPERTIES[0];

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-[#1a1a1a] selection:bg-[#044F92] selection:text-white font-sans flex flex-col justify-between">
      {/* Full-Screen Global Initial Page Preloader */}
      <PagePreloader minDuration={2000} />

      {/* Luxury Brand Cursor */}
      <CustomCursor />

      {/* Persistent Multi-Page Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenTourModal={() => handleOpenTourModal()}
      />

      {/* Main Multi-Page View Container with Smooth Motion Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedPropertyId || '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {currentPage === 'home' && (
              <HomePage
                onSelectProperty={handleSelectProperty}
                onNavigate={handleNavigate}
                onOpenTourModal={handleOpenTourModal}
              />
            )}

            {currentPage === 'projects' && (
              <ProjectsPage
                initialStatus={initialFilterStatus}
                onSelectProperty={handleSelectProperty}
                onNavigate={handleNavigate}
                onOpenTourModal={handleOpenTourModal}
              />
            )}

            {currentPage === 'ongoing' && (
              <OngoingPage
                onSelectProperty={handleSelectProperty}
                onNavigate={handleNavigate}
                onOpenTourModal={handleOpenTourModal}
              />
            )}

            {currentPage === 'completed' && (
              <CompletedPage
                onSelectProperty={handleSelectProperty}
                onNavigate={handleNavigate}
                onOpenTourModal={handleOpenTourModal}
              />
            )}

            {currentPage === 'locations' && (
              <LocationsPage
                onSelectProperty={handleSelectProperty}
                onNavigate={handleNavigate}
                onOpenTourModal={() => handleOpenTourModal()}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onNavigate={handleNavigate}
                onOpenTourModal={() => handleOpenTourModal()}
              />
            )}

            {currentPage === 'finance' && (
              <FinancePage
                onOpenTourModal={() => handleOpenTourModal()}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                onOpenTourModal={() => handleOpenTourModal()}
              />
            )}

            {currentPage === 'property-detail' && currentProperty && (
              <PropertyDetailPage
                property={currentProperty}
                onBack={() => handleNavigate('projects')}
                onOpenTourModal={handleOpenTourModal}
                onNavigate={handleNavigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global VIP Chauffeured Tour Modal */}
      <ScheduleTourModal
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
        preselectedProperty={tourProperty}
      />

      {/* Persistent Multi-Page Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTourModal={() => handleOpenTourModal()}
      />
    </div>
  );
}

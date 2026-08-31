'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PropertyItem } from '../types/property';
import { ScheduleTourModal } from '../components/ScheduleTourModal';

interface TourModalContextType {
  isOpen: boolean;
  selectedProperty: PropertyItem | null;
  openTourModal: (property?: PropertyItem | null) => void;
  closeTourModal: () => void;
}

const TourModalContext = createContext<TourModalContextType | undefined>(undefined);

export const TourModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);

  const openTourModal = (property?: PropertyItem | null) => {
    setSelectedProperty(property || null);
    setIsOpen(true);
  };

  const closeTourModal = () => {
    setIsOpen(false);
    setSelectedProperty(null);
  };

  return (
    <TourModalContext.Provider value={{ isOpen, selectedProperty, openTourModal, closeTourModal }}>
      {children}
      <ScheduleTourModal
        isOpen={isOpen}
        onClose={closeTourModal}
        preselectedProperty={selectedProperty}
      />
    </TourModalContext.Provider>
  );
};

export const useTourModal = () => {
  const context = useContext(TourModalContext);
  if (!context) {
    throw new Error('useTourModal must be used within a TourModalProvider');
  }
  return context;
};

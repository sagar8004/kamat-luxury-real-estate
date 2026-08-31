'use client';

import React from 'react';
import { useTourModal } from '../context/TourModalContext';
import { ScheduleTourModal } from './ScheduleTourModal';

export const GlobalTourModal: React.FC = () => {
  const { isOpen, selectedProperty, closeTourModal } = useTourModal();

  return (
    <ScheduleTourModal
      isOpen={isOpen}
      onClose={closeTourModal}
      preselectedProperty={selectedProperty}
    />
  );
};

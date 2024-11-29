import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { Settings } from 'lucide-react';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/settings" element={<Settings/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  );
};
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function Company() {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: '/about', search, hash: hash || '#about-us' }} replace />;
}

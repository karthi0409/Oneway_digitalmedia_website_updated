import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function Contact() {
  const { search, hash } = useLocation();
  const destinationHash = hash === '#enquiry'
    ? '#contact-form'
    : hash === '#contact-main'
      ? '#contact-information'
      : hash || '#contact-information';

  return <Navigate to={{ pathname: '/about', search, hash: destinationHash }} replace />;
}

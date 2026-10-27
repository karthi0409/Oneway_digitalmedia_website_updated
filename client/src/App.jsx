import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Company from './pages/Company.jsx';
import Services from './pages/Services.jsx';
import Packages from './pages/Packages.jsx';
import Experience from './pages/Experience.jsx';
import Projects from './pages/Projects.jsx';
import Blog, { BlogArticle } from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="company" element={<Company />} />
        <Route path="services" element={<Services />} />
        <Route path="packages" element={<Packages />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects" element={<Projects />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogArticle />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

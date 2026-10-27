import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import PageHero from '../components/ui/PageHero.jsx';
import Heading from '../components/ui/Heading.jsx';
import AboutIntro from '../components/sections/AboutIntro.jsx';
import ContactDetails from '../components/sections/ContactDetails.jsx';
import EnquiryForm from '../components/forms/EnquiryForm.jsx';
import MarketingServices from '../components/sections/ServiceStrip.jsx';
import WhyChooseUs from '../components/sections/WhyChooseUs.jsx';
import StatsBand from '../components/sections/StatsBand.jsx';
import { blogArticles, getArticleSlug } from '../data/blogArticles.js';
import { company } from '../data/company.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function About() {
  useDocumentTitle(
    'About Us | One Way Digital Media',
    'Learn about One Way Digital Media, our services and team, and contact our Bangalore digital marketing agency.'
  );

  return (
    <>
      <PageHero
        tag="About Oneway Digital Media"
        title="ABOUT"
        highlight="US"
        lead="Who we are, how we work, and the ideas shaping better digital growth."
      />

      <div id="about-us">
        <AboutIntro />
      </div>

      <section className="section section-navy" id="mission-vision">
        <div className="container">
          <Heading
            tag="Our Purpose"
            title="Our Mission"
            highlight="and Vision"
            subtitle="A clear purpose guides the way we build lasting digital growth with our clients."
            theme="dark"
          />
          <div className="about-purpose-grid">
            <article className="about-purpose-card">
              <h3>Our Mission</h3>
              <p>
                Help businesses grow with clear digital strategy, creative work, and performance-focused
                marketing that turns attention into measurable results.
              </p>
            </article>
            <article className="about-purpose-card">
              <h3>Our Vision</h3>
              <p>
                Be a trusted growth partner for ambitious brands, bringing the right people, platforms,
                and ideas together to build sustainable progress.
              </p>
            </article>
          </div>
        </div>
      </section>

      <div id="about-services">
        <MarketingServices />
      </div>

      <WhyChooseUs theme="dark" />
      <StatsBand />

      <section className="section section-light" id="our-team">
        <div className="container">
          <Heading
            tag="Our Team"
            title="The people behind"
            highlight="the work"
            subtitle="A dedicated account strategist works with a cross-functional digital team to keep every part of your growth plan moving together."
            theme="light"
          />
          <div className="company-team-note">
            <p>
              Our work brings strategy, performance marketing, content, design and web development together around
              your business goals. Your account strategist provides a consistent point of contact while specialists
              collaborate on the work behind each campaign.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-navy" id="careers">
        <div className="container">
          <Heading
            tag="Careers"
            title="Do meaningful"
            highlight="digital work"
            subtitle="Join DigiMark"
            theme="dark"
          />
          <div className="company-careers-card">
            <p>
              We value thoughtful strategy, curiosity and work that makes a measurable difference. Career
              opportunities and role details will be shared here when they are available.
            </p>
            <Link to="/about#contact-form" className="btn btn-outline btn-sm">
              Ask about working with us
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="company-blog">
        <div className="container">
          <Heading
            tag="Blog"
            title="SEO, GEO &"
            highlight="growth insights"
            subtitle="Field notes for operators working through search, content and the messy middle of the buyer journey."
            theme="dark"
          />
          <div className="company-blog-grid">
            {blogArticles.slice(0, 3).map((article) => (
              <article className="company-blog-card" key={article.number}>
                <p>{article.category} <span aria-hidden="true">·</span> {article.readingTime} read</p>
                <h3>
                  <Link to={`/blog/${getArticleSlug(article.title)}`}>{article.title}</Link>
                </h3>
                <span>{article.date}</span>
              </article>
            ))}
          </div>
          <div className="company-blog-action">
            <Link to="/blog" className="btn btn-outline btn-sm">Explore the blog</Link>
          </div>
        </div>
      </section>

      <section className="section section-light" id="contact-information">
        <div className="container">
          <Heading
            tag="Get in touch"
            title="Contact"
            highlight="Information"
            subtitle="Talk with our Bangalore team about your next digital growth opportunity."
            theme="light"
          />
          <ContactDetails />
        </div>
      </section>

      <section className="section section-light" id="contact-form">
        <div className="container">
          <Heading
            tag="Let's Connect"
            title="Request a Free"
            highlight="Consultation"
            subtitle="Tell us what you are working toward. Our team will get back to you with the next steps."
            theme="light"
          />
          <div className="about-contact-form">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section className="section section-navy" id="social-media">
        <div className="container">
          <Heading
            tag="Stay Connected"
            title="Follow"
            highlight="One Way"
            subtitle="Connect with us for updates, ideas, and conversations about digital growth."
            theme="dark"
          />
          <div className="about-social-links">
            <a href={company.social.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram aria-hidden="true" />
              <span>Instagram</span>
            </a>
            <a href={company.social.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebookF aria-hidden="true" />
              <span>Facebook</span>
            </a>
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle, FiArrowRight, FiMessageCircle, FiExternalLink } from 'react-icons/fi';
import { submitEnquiry } from '../../api.js';
import { company } from '../../data/company.js';

const SERVICE_OPTIONS = [
  { value: 'social-media', label: 'Social Media Marketing' },
  { value: 'performance-ads', label: 'Performance Marketing (Ads)' },
  { value: 'website', label: 'Website Design & Development' },
  { value: 'video', label: 'Video Editing & Production' },
  { value: 'full-growth', label: 'Full Digital Growth Retainer' },
  { value: 'other', label: 'Other / Custom Request' },
];

export default function EnquiryForm() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'social-media',
    message: '',
    botcheck: '', // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsAppLink, setWhatsAppLink] = useState('');

  // Pre-fill service from URL if provided
  useEffect(() => {
    const s = searchParams.get('service');
    const p = searchParams.get('package');
    const plan = searchParams.get('plan');

    if (s && SERVICE_OPTIONS.some((opt) => opt.value === s)) {
      setFormData((prev) => ({ ...prev, service: s }));
    }

    if (p) {
      setFormData((prev) => ({
        ...prev,
        service: 'full-growth',
        message: prev.message || `Hi One Way Team, I am interested in the ${p.toUpperCase()} marketing package. Please share details and availability.`,
      }));
    } else if (plan) {
      setFormData((prev) => ({
        ...prev,
        service: 'website',
        message: prev.message || `Hi One Way Team, I would like to inquire about the ${plan.toUpperCase()} website plan.`,
      }));
    }
  }, [searchParams]);

  // Validation function
  const validate = (values) => {
    const errs = {};

    if (!values.name || !values.name.trim()) {
      errs.name = 'Please provide your full name.';
    } else if (values.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters long.';
    } else if (values.name.trim().length > 100) {
      errs.name = 'Name cannot exceed 100 characters.';
    }

    if (!values.email || !values.email.trim()) {
      errs.email = 'Please provide a valid email address.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(values.email.trim())) {
        errs.email = 'Please enter a valid email address (e.g., name@company.com).';
      }
    }

    if (values.phone && values.phone.trim()) {
      const cleanPhone = values.phone.replace(/[\s\-\+\(\)]/g, '');
      if (cleanPhone.length < 8 || cleanPhone.length > 15 || !/^\d+$/.test(cleanPhone)) {
        errs.phone = 'Please enter a valid phone number (8-15 digits).';
      }
    }

    if (!values.service) {
      errs.service = 'Please select a primary service of interest.';
    }

    if (!values.message || !values.message.trim()) {
      errs.message = 'Please share a brief message about your project or growth goals.';
    } else if (values.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters describing your inquiry.';
    } else if (values.message.trim().length > 2000) {
      errs.message = 'Message must be under 2000 characters.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Honeypot check - if botcheck filled, fail silently or fake success
    if (formData.botcheck) {
      setIsSuccess(true);
      return;
    }

    const serviceLabel = SERVICE_OPTIONS.find((option) => option.value === formData.service)?.label || formData.service;
    const whatsappMessage = [
      'Hello One Way Digital Media, I would like to enquire about your services.',
      '',
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      formData.phone.trim() ? `Phone: ${formData.phone.trim()}` : '',
      `Service: ${serviceLabel}`,
      `Project details: ${formData.message.trim()}`,
    ].filter(Boolean).join('\n');
    const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
    setWhatsAppLink(whatsappUrl);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitting(true);

    try {
      await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone ? formData.phone.trim() : '',
        service: formData.service,
        message: formData.message.trim(),
        botcheck: formData.botcheck,
      });

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'social-media',
        message: '',
        botcheck: '',
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      setServerError(
        err.message || 'Unable to submit your enquiry at this time. Please try again or contact us directly on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setServerError(null);
    setWhatsAppLink('');
  };

  if (isSuccess) {
    return (
      <div className="enquiry-card form-success-view" id="enquiry">
        <div className="success-icon-wrap">
          <FiCheckCircle />
        </div>
        <h3 style={{ fontSize: '1.85rem', marginBottom: '0.75rem', color: 'var(--navy)' }}>
          Enquiry saved — finish in WhatsApp
        </h3>
        <p style={{ color: 'var(--muted)', maxWidth: '420px', margin: '0 auto 1.75rem auto' }}>
          Your details are saved. WhatsApp should open with your enquiry ready; press Send there to deliver it to our team.
        </p>
        {whatsAppLink && (
          <a href={whatsAppLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            <FiMessageCircle />
            <span>Open WhatsApp enquiry</span>
            <FiExternalLink />
          </a>
        )}
        <button type="button" onClick={handleReset} className="btn btn-outline-dark">
          <span>Submit Another Inquiry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="enquiry-card" id="enquiry">
      <h3 style={{ fontSize: '1.85rem', marginBottom: '0.5rem', color: 'var(--navy)' }}>
        Request a Free Consultation
      </h3>
      <p style={{ color: 'var(--muted)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
        Fill out the form below. We'll analyze your current digital presence and respond with actionable insights.
      </p>

      {serverError && (
        <div className="form-alert form-alert-error" role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiAlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>{serverError}</span>
          </div>
          {whatsAppLink && (
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="form-whatsapp-fallback">
              Continue with WhatsApp <FiExternalLink />
            </a>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot anti-spam field */}
        <input
          type="text"
          name="botcheck"
          value={formData.botcheck}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
          className="honeypot-field"
          aria-hidden="true"
        />

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="enquiry-name" className="form-label">
            Your Full Name <span className="required">*</span>
          </label>
          <input
            id="enquiry-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Karthik Sharma"
            className="form-input"
            aria-required="true"
            aria-invalid={touched.name && Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={isSubmitting}
          />
          {touched.name && errors.name && (
            <p id="name-error" className="form-error-msg" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="form-group">
          <label htmlFor="enquiry-email" className="form-label">
            Business / Work Email <span className="required">*</span>
          </label>
          <input
            id="enquiry-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. karthik@company.com"
            className="form-input"
            aria-required="true"
            aria-invalid={touched.email && Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isSubmitting}
          />
          {touched.email && errors.email && (
            <p id="email-error" className="form-error-msg" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Number (Optional) */}
        <div className="form-group">
          <label htmlFor="enquiry-phone" className="form-label">
            Phone / WhatsApp Number <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(Optional)</span>
          </label>
          <input
            id="enquiry-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. +91 98765 43210"
            className="form-input"
            aria-invalid={touched.phone && Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            disabled={isSubmitting}
          />
          {touched.phone && errors.phone && (
            <p id="phone-error" className="form-error-msg" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Primary Service */}
        <div className="form-group">
          <label htmlFor="enquiry-service" className="form-label">
            Service of Interest <span className="required">*</span>
          </label>
          <select
            id="enquiry-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-select"
            aria-required="true"
            aria-invalid={touched.service && Boolean(errors.service)}
            aria-describedby={errors.service ? 'service-error' : undefined}
            disabled={isSubmitting}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {touched.service && errors.service && (
            <p id="service-error" className="form-error-msg" role="alert">
              {errors.service}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="enquiry-message" className="form-label">
            Project Goals / Message <span className="required">*</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="4"
            placeholder="Tell us about your brand, target audience, current monthly revenue or ad spend, and what goals you want to achieve..."
            className="form-textarea"
            aria-required="true"
            aria-invalid={touched.message && Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            disabled={isSubmitting}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {touched.message && errors.message ? (
              <p id="message-error" className="form-error-msg" role="alert">
                {errors.message}
              </p>
            ) : <span />}
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
              {formData.message.length}/2000 chars
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary btn-block btn-lg"
          disabled={isSubmitting}
          style={{ marginTop: '0.5rem' }}
        >
          {isSubmitting ? (
            <span>Sending Inquiry...</span>
          ) : (
            <>
              <span>Send enquiry on WhatsApp</span>
                <FiMessageCircle />
            </>
          )}
        </button>

        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center', marginTop: '1rem' }}>
          🔒 Your privacy is strictly protected. We never spam or sell your details.
        </p>
      </form>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMessageCircle, FiMinus, FiSend, FiX } from 'react-icons/fi';
import { company } from '../../data/company.js';

const SUGGESTED_QUESTIONS = [
  'What services do you offer?',
  'How can digital marketing help my business?',
  'Do you provide website development?',
  'How can I contact your team?',
  'How can I get a quotation?',
];

const WELCOME_MESSAGE = 'Hi! Welcome to One Way Digital Media. How can we help you grow your business today?';

function getFaqAnswer(question) {
  const text = question.toLowerCase();

  if (/quotation|quote|pricing|price|cost|package|budget/.test(text)) {
    return {
      text: 'Our marketing and website plans are listed on the packages page. For a tailored quotation, share your goals and requirements with our team.',
      action: { label: 'View packages', to: '/packages' },
      secondaryAction: { label: 'Request a consultation', to: '/about#contact-form' },
    };
  }

  if (/website|web development|web design|e-commerce|ecommerce|online store/.test(text)) {
    return {
      text: 'Yes. We design and develop responsive business, portfolio and e-commerce websites, including landing pages and ongoing support.',
      action: { label: 'Explore website services', to: '/services#website' },
    };
  }

  if (/contact|reach|talk|speak|phone|email|whatsapp|team|human/.test(text)) {
    return {
      text: `You can call us at +91 ${company.phone}, email ${company.email}, or message our team on WhatsApp.`,
      action: { label: 'Chat on WhatsApp', href: `https://wa.me/${company.whatsapp}`, external: true },
      secondaryAction: { label: 'Email our team', href: `mailto:${company.email}` },
    };
  }

  if (/help|benefit|grow|business|marketing|lead|customer|sales/.test(text)) {
    return {
      text: 'Digital marketing can help more of the right people discover your business, build trust and become qualified enquiries. We bring social media, performance ads, websites and video together around your growth goals.',
      action: { label: 'Explore our services', to: '/services' },
    };
  }

  if (/service|offer|social|advert|ads|video|content/.test(text)) {
    return {
      text: 'Our services include social media marketing, performance marketing with Google and Meta ads, website design and development, and video editing and production.',
      action: { label: 'See all services', to: '/services' },
    };
  }

  return {
    text: `I’m a website FAQ assistant, so I can help with our services, website development, packages and contact details. For anything else, our team can help directly.`,
    action: { label: 'Message our team', href: `https://wa.me/${company.whatsapp}`, external: true },
  };
}

function ChatAction({ action }) {
  if (!action) return null;

  const className = 'chat-message-action';
  if (action.to) {
    return (
      <Link className={className} to={action.to}>
        {action.label}
        <FiArrowRight aria-hidden="true" />
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={action.href}
      target={action.external ? '_blank' : undefined}
      rel={action.external ? 'noopener noreferrer' : undefined}
    >
      {action.label}
      <FiArrowRight aria-hidden="true" />
    </a>
  );
}

export default function FaqChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'assistant', text: WELCOME_MESSAGE },
  ]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const nextMessageId = useRef(2);
  const replyTimer = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  useEffect(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'nearest' });
  }, [messages, isReplying]);

  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  useEffect(() => {
    if (!isOpen || isMinimized) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMinimized]);

  const sendMessage = (value) => {
    const question = value.trim();
    if (!question) {
      setInputError('Type a question or choose a suggestion.');
      return;
    }
    if (question.length > 500) {
      setInputError('Please keep your question under 500 characters.');
      return;
    }
    if (isReplying) return;

    const userMessage = { id: nextMessageId.current++, sender: 'user', text: question };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setInputError('');
    setIsReplying(true);

    replyTimer.current = window.setTimeout(() => {
      const answer = getFaqAnswer(question);
      setMessages((current) => [
        ...current,
        { id: nextMessageId.current++, sender: 'assistant', ...answer },
      ]);
      setIsReplying(false);
    }, 420);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="faq-chatbot">
      {isOpen && !isMinimized && (
        <section
          className="faq-chat-window"
          role="dialog"
          aria-modal="false"
          aria-labelledby="faq-chat-title"
          aria-describedby="faq-chat-disclosure"
        >
          <header className="faq-chat-header">
            <span className="faq-chat-avatar" aria-hidden="true"><FiMessageCircle /></span>
            <div className="faq-chat-heading">
              <h2 id="faq-chat-title">One Way assistant</h2>
              <p>Quick answers from our website</p>
            </div>
            <div className="faq-chat-controls">
              <button
                type="button"
                className="faq-chat-control"
                aria-label="Minimize chat"
                onClick={() => setIsMinimized(true)}
              >
                <FiMinus />
              </button>
              <button
                type="button"
                className="faq-chat-control"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
              >
                <FiX />
              </button>
            </div>
          </header>

          <p id="faq-chat-disclosure" className="faq-chat-disclosure">
            Website FAQ assistant — answers are based on published company information.
          </p>

          <div className="faq-chat-messages" aria-live="polite" aria-relevant="additions text">
            {messages.map((message) => (
              <div key={message.id} className={`faq-chat-message ${message.sender}`}>
                <p>{message.text}</p>
                {message.action && <ChatAction action={message.action} />}
                {message.secondaryAction && <ChatAction action={message.secondaryAction} />}
              </div>
            ))}
            {isReplying && (
              <div className="faq-chat-message assistant faq-chat-typing" role="status" aria-label="Preparing an answer">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="faq-chat-suggestions" aria-label="Suggested questions">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button key={question} type="button" onClick={() => sendMessage(question)}>
                  {question}
                </button>
              ))}
            </div>
          )}

          <form className="faq-chat-form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="faq-chat-input">Ask a question</label>
            <input
              ref={inputRef}
              id="faq-chat-input"
              type="text"
              value={input}
              maxLength={500}
              onChange={(event) => {
                setInput(event.target.value);
                if (inputError) setInputError('');
              }}
              placeholder="Ask us a question..."
              aria-describedby={inputError ? 'faq-chat-input-error' : undefined}
              aria-invalid={Boolean(inputError)}
              disabled={isReplying}
            />
            <button type="submit" aria-label="Send message" disabled={isReplying || !input.trim()}>
              <FiSend />
            </button>
          </form>
          {inputError && <p id="faq-chat-input-error" className="faq-chat-error" role="alert">{inputError}</p>}
        </section>
      )}

      <button
        type="button"
        className={`float-btn faq-chat-launcher ${isOpen && !isMinimized ? 'is-open' : ''}`}
        aria-label={isOpen && !isMinimized ? 'Close FAQ chat' : 'Open FAQ chat'}
        aria-expanded={isOpen && !isMinimized}
        title="Ask us"
        onClick={() => {
          if (isOpen && !isMinimized) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
          setIsMinimized(false);
        }}
      >
        {isOpen && !isMinimized ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>
  );
}

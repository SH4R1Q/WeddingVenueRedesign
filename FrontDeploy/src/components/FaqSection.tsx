import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md transition-all duration-300">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full p-6 focus:outline-none transition-colors duration-300 hover:bg-gray-100"
      >
        <p className="font-semibold text-gray-800 text-lg">{question}</p>
        <div
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-blue-500' : 'text-gray-500'
          }`}
        >
          <FaChevronDown />
        </div>
      </button>
      {isOpen && (
        <div className="p-6 text-gray-600 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept payments via credit/debit cards, PayPal, and bank transfers.',
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking up to 24 hours before the scheduled event for a full refund.',
    },
    {
      question: 'Do you provide catering services?',
      answer: 'Yes, we offer a variety of catering options including vegetarian, non-vegetarian, and vegan menus.',
    },
    {
      question: 'Is parking available at the venue?',
      answer: 'Yes, we have ample parking space available for guests.',
    },
    {
      question: 'Do you offer discounts for large events?',
      answer: 'Yes, we offer special discounts for events with a large number of attendees. Please contact us for more information.',
    },
  ];

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

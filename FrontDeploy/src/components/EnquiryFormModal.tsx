import React, { useState } from 'react';
import Modal from 'react-modal';
import "./EnquiryFormModal.css";
Modal.setAppElement('#root');

interface EnquiryFormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (formData: any) => void;
}

const EnquiryFormModal: React.FC<EnquiryFormModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    guests: '',
    date: '',
    address: '',
    message: '',
    typeOfEvent: ''
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'contact') {
      setContactError('');
    }
  };

  const [contactError, setContactError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if contact is exactly 10 digits
    if (!/^\d{10}$/.test(formData.contact)) {
      setContactError('Contact must be exactly 10 digits');
      return;
    }

    onSubmit(formData);
    onRequestClose();
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Enquiry Form"
      className="fixed inset-0 flex items-center justify-center p-4 "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm "
      style={{
        content: {
          zIndex: 1000,
        },
        overlay: {
          zIndex: 999,
        },
      }}
    >
      <div className="bg-gradient-to-r from-[#e9c6e8] to-[#a56cc1] scrollbar text-gray-900 rounded-lg shadow-xl p-8 w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-black">Send Enquiry</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${contactError ? 'border-red-500' : ''}`}
            />
            {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="guests">Guests:</label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="typeOfEvent">Type of Event:</label>
            <input
              type="text"
              id="typeOfEvent"
              name="typeOfEvent"
              value={formData.typeOfEvent}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 h-32"
            />
          </div>

          <div className="col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-400 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>

    </Modal>


  );
};

export default EnquiryFormModal;



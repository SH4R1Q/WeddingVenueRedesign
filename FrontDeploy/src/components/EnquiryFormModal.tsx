import React, { useState } from 'react';
import Modal from 'react-modal';
import "./EnquiryFormModal.css";
Modal.setAppElement('#root');

interface EnquiryFormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (formData: any) => void;
  isLoggedIn: boolean;
}

const EnquiryFormModal: React.FC<EnquiryFormModalProps> = ({ isLoggedIn,isOpen, onRequestClose, onSubmit }) => {
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
    className="fixed inset-0 flex items-center justify-center p-4"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
    style={{
      content: {
        zIndex: 1000,
      },
      overlay: {
        zIndex: 999,
      },
    }}
  >
    {isLoggedIn ? (
      <div className="bg-gradient-to-r from-[#e9c6e8] to-[#a56cc1] scrollbar text-gray-900 rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-black">
          Send Enquiry
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Name */}
          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
  
          {/* Contact */}
          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className={`w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                contactError ? 'border-red-500' : ''
              }`}
            />
            {contactError && <p className="text-red-500 text-xs">{contactError}</p>}
          </div>
  
          {/* Location */}
          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
  
          {/* Guests */}
          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
              Guests:
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
  
          {/* Date */}
          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
  
          {/* Address */}
          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
  
          {/* Type of Event */}
          <div className="space-y-1 sm:space-y-2">
            <label htmlFor="typeOfEvent" className="block text-sm font-medium text-gray-700">
              Type of Event:
            </label>
            <input
              type="text"
              id="typeOfEvent"
              name="typeOfEvent"
              value={formData.typeOfEvent}
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
  
          {/* Message */}
          <div className="col-span-1 sm:col-span-2 space-y-1 sm:space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 h-28 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none"
            />
          </div>
  
          {/* Buttons */}
          <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-end sm:space-x-4 mt-4 space-y-2 sm:space-y-0">
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-400 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full text-center">
          <h2 className="text-lg font-semibold mb-4">Log In</h2>
          <p className="text-gray-600 mb-4">You must be logged in to send an enquiry</p>
          <button
            onClick={onRequestClose}
            className="bg-pink-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-pink-700 w-full"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </Modal>
  

  );
};

export default EnquiryFormModal;



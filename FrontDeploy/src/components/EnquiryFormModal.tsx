import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
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
    // <Modal
    //   isOpen={isOpen}
    //   onRequestClose={onRequestClose}
    //   contentLabel="Enquiry Form"
    //   className="fixed inset-0 flex items-center justify-center p-4"
    //   overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    // >
    //   <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
    //     <h2 className="text-2xl font-semibold mb-4 text-center">Send Enquiry</h2>
    //     <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
    //       <div>
    //         <label className="block text-sm font-medium mb-1" htmlFor="name">Name:</label>
    //         <input
    //           type="text"
    //           id="name"
    //           name="name"
    //           value={formData.name}
    //           onChange={handleChange}
    //           required
    //           className="w-full p-2 border border-gray-300 rounded"
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium mb-1" htmlFor="contact">Contact:</label>
    //         <input
    //           type="text"
    //           id="contact"
    //           name="contact"
    //           value={formData.contact}
    //           onChange={handleChange}
    //           required
    //           className={`w-full p-2 border ${contactError ? 'border-red-500' : 'border-gray-300'} rounded`}
    //         />
    //         {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium mb-1" htmlFor="location">Location:</label>
    //         <input
    //           type="text"
    //           id="location"
    //           name="location"
    //           value={formData.location}
    //           onChange={handleChange}
    //           required
    //           className="w-full p-2 border border-gray-300 rounded"
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium mb-1" htmlFor="guests">Guests:</label>
    //         <input
    //           type="number"
    //           id="guests"
    //           name="guests"
    //           value={formData.guests}
    //           onChange={handleChange}
    //           required
    //           className="w-full p-2 border border-gray-300 rounded"
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium mb-1" htmlFor="date">Date:</label>
    //         <input
    //           type="date"
    //           id="date"
    //           name="date"
    //           value={formData.date}
    //           onChange={handleChange}
    //           required
    //           className="w-full p-2 border border-gray-300 rounded"
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium mb-1" htmlFor="address">Address:</label>
    //         <input
    //           type="text"
    //           id="address"
    //           name="address"
    //           value={formData.address}
    //           onChange={handleChange}
    //           required
    //           className="w-full p-2 border border-gray-300 rounded"
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium mb-1" htmlFor="typeOfEvent">Type of Event:</label>
    //         <input
    //           type="text"
    //           id="typeOfEvent"
    //           name="typeOfEvent"
    //           value={formData.typeOfEvent}
    //           onChange={handleChange}
    //           required
    //           className="w-full p-2 border border-gray-300 rounded"
    //         />
    //       </div>
    //       <div className="col-span-2">
    //         <label className="block text-sm font-medium mb-1" htmlFor="message">Message:</label>
    //         <textarea
    //           id="message"
    //           name="message"
    //           value={formData.message}
    //           onChange={handleChange}
    //           required
    //           className="w-full p-2 border border-gray-300 rounded h-24"
    //         />
    //       </div>
    //       <div className="col-span-2 flex justify-end space-x-2">
    //         <button type="button" onClick={onRequestClose} className="bg-gray-400 text-white font-medium py-2 px-4 rounded hover:bg-gray-500 transition duration-300">Close</button>
    //         <button type="submit" className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Send</button>
    //       </div>
    //     </form>
    //   </div>
    // </Modal>

    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Enquiry Form"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
    >
      <div className="bg-gradient-to-r from-[#e9c6e8] to-[#a56cc1] text-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg mx-auto relative">
        <button onClick={onRequestClose} className="absolute top-4 right-4 text-gray-200 hover:text-white transition duration-300">
          <FaTimes size={18} />
        </button>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Send Enquiry</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className={`w-full p-3 border ${contactError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200`}
            />
            {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="guests">Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="typeOfEvent">Type of Event</label>
            <input
              type="text"
              id="typeOfEvent"
              name="typeOfEvent"
              value={formData.typeOfEvent}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200 h-32 resize-none"
            />
          </div>
          <div className="md:col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
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

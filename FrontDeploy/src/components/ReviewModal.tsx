import { useState } from "react";
import { FaTimes, FaUser, FaEnvelope, FaStar } from "react-icons/fa";

const ReviewModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, rating, message });
    onClose();
  };

  const handleStarClick = (value: number) => setRating(value);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-2xl relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes className="text-2xl" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">Write a Review</h2>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-200 transition duration-200"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-200 transition duration-200"
              required
            />
          </div>

          {/* Star Rating */}
          <div className="flex items-center justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-2xl cursor-pointer ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                } hover:text-yellow-500 transition duration-200`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>

          {/* Review Message */}
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-200 transition duration-200"
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold rounded-lg hover:bg-gradient-to-l transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

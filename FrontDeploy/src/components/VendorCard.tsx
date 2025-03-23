// src/components/VendorCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface VendorCardProps {
  vendorId: string;
  imageUrl: string;
  name?: string;
  redirectUrl?: string;
  title?: string | undefined;
}

const VendorCard: React.FC<VendorCardProps> = ({ imageUrl, name, redirectUrl, title }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`${redirectUrl}${title ? `?title=${encodeURIComponent(title)}` : ''}`);
  };

  return (
    <div
      className="relative w-full h-48 bg-cover bg-center cursor-pointer rounded-lg shadow-md"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <h2 className="text-white text-xl font-bold">{name}</h2>
      </div>
    </div>
  );
};

export default VendorCard;
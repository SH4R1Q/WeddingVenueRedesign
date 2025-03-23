import React from 'react';
import { Link } from 'react-router-dom';

interface VendorCardProps {
    id?: string;
    image?: string;
    title?: string;
    description?: string;
    date?: string;
}

const ArticleCard: React.FC<VendorCardProps> = ({
    id,
    image = '/public/delhi.jpg',
    title = 'Kundan Mehandi Art, Delhi',
    description = 'How about hiring a guy with 27 years of experience just in bridal mehandi art? Yes, that\'s true!',
    date = '12/12/2022'
}) => {
    const maxTitleLength = 28;
    const maxDescriptionLength = 60;

    const truncatedTitle = title.length > maxTitleLength ? `${title.slice(0, maxTitleLength)}...` : title;
    const truncatedDescription = description.length > maxDescriptionLength ? `${description.slice(0, maxDescriptionLength)}...` : description;

    return (
        <Link to={`/blogs/${id}`} className="block transition-transform transform hover:scale-105">
            <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                {/* Image Section (Smaller Height) */}
                <div className="h-36 w-full">
                    <img
                        src={image}
                        alt="Article"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="p-3">
                    <h2 className="text-md font-bold text-gray-800 mb-1 truncate">{truncatedTitle}</h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{truncatedDescription}</p>

                    {/* Date Section */}
                    <div className="text-gray-500 text-xs">
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;

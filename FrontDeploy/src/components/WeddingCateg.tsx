import React, { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Photographer",
        description: "Professional wedding photographers",
        image: "/public/home1.jpg",
        bgColor: "bg-orange-100",
    },
    {
        title: "Makeup Artist",
        description: "Bridal and family makeup services",
        image: "/public/home1.jpg",
        bgColor: "bg-rose-200",
    },
    {
        title: "Mehendi Artist",
        description: "Beautiful bridal mehendi designs",
        image: "/public/home1.jpg",
        bgColor: "bg-yellow-200",
    },
    {
        title: "Decorator",
        description: "Wedding planners and decorators",
        image: "/public/home1.jpg",
        bgColor: "bg-green-100",
    },
    {
        title: "Caterer",
        description: "Delicious catering services",
        image: "/public/home1.jpg",
        bgColor: "bg-purple-100",
    },
    {
        title: "Band Baja",
        description: "Traditional wedding bands",
        image: "/public/home1.jpg",
        bgColor: "bg-blue-200",
    },
    {
        title: "Dhol",
        description: "Energetic dhol players",
        image: "/public/home1.jpg",
        bgColor: "bg-orange-200",
    },
    {
        title: "Tattoo Artist",
        description: "Unique wedding tattoos",
        image: "/public/home1.jpg",
        bgColor: "bg-rose-300",
    },
    {
        title: "Messkot",
        description: "Fun mascots for events",
        image: "/public/home1.jpg",
        bgColor: "bg-yellow-300",
    },
    {
        title: "Magicians",
        description: "Magical performances for guests",
        image: "/public/home1.jpg",
        bgColor: "bg-green-200",
    },
    {
        title: "Fog Event",
        description: "Fog effects for grand entrances",
        image: "/public/home1.jpg",
        bgColor: "bg-purple-200",
    },
    {
        title: "Game Coordinator",
        description: "Fun games and activities",
        image: "/public/home1.jpg",
        bgColor: "bg-blue-300",
    },
    {
        title: "Anchor",
        description: "Professional event anchors",
        image: "/public/home1.jpg",
        bgColor: "bg-orange-300",
    },
    {
        title: "Live Singer",
        description: "Live music performances",
        image: "/public/home1.jpg",
        bgColor: "bg-rose-400",
    },
    {
        title: "Welcome Girls",
        description: "Traditional welcome girls",
        image: "/public/home1.jpg",
        bgColor: "bg-yellow-400",
    },
    {
        title: "Waiter Service",
        description: "Experienced waitstaff",
        image: "/public/home1.jpg",
        bgColor: "bg-green-300",
    },
    {
        title: "Valet Parking",
        description: "Hassle-free valet services",
        image: "/public/home1.jpg",
        bgColor: "bg-purple-300",
    },
    {
        title: "DJ",
        description: "DJ and music entertainment",
        image: "/public/home1.jpg",
        bgColor: "bg-blue-400",
    },
    {
        title: "Birthday Entry",
        description: "Special birthday entries",
        image: "/public/home1.jpg",
        bgColor: "bg-orange-400",
    },
    {
        title: "Jagran Setup",
        description: "Spiritual jagran setup",
        image: "/public/home1.jpg",
        bgColor: "bg-rose-500",
    },
    {
        title: "Mata Chowki Setup",
        description: "Mata chowki arrangements",
        image: "/public/home1.jpg",
        bgColor: "bg-yellow-500",
    },
    {
        title: "Bartender",
        description: "Professional bartending services",
        image: "/public/home1.jpg",
        bgColor: "bg-green-400",
    },
    {
        title: "Rooms Booking",
        description: "Accommodation for guests",
        image: "/public/home1.jpg",
        bgColor: "bg-purple-400",
    },
];

const WeddingCategories: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-12 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Wedding Categories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`${category.bgColor} rounded-lg flex flex-col space-y-2 cursor-pointer transition-all duration-300`}
                        onClick={() => handleToggle(index)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="p-4">
                                <h3 className="text-xl font-bold inline">{category.title}</h3>
                                <button className="text-lg ml-4 font-bold text-gray-700">
                                    {expandedIndex === index ? "▲" : "▼"}
                                </button>
                                <p className="text-sm text-gray-600">{category.description}</p>
                            </div>
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-24 h-24 object-cover rounded-r-lg"
                            />
                        </div>
                        {expandedIndex === index && (
                            <div className="mt-2 text-sm p-4 text-gray-700">
                                <p>Explore our wide range of services for {category.title}.</p>
                                <Link to={`/vendor/${category.title.replace(/ /g, "")}`} className="text-pink-600 hover:underline">
                                    Learn More
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeddingCategories;

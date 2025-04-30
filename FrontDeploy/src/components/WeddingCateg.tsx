import React, { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Photographer",
        description: "Professional wedding photographers",
        image: "/category/photographer.jpg",
    
    },
    {
        title: "Makeup Artist",
        description: "Bridal and family makeup services",
        image: "/category/makeup.jpeg",
    },
    {
        title: "Mehendi Artist",
        description: "Beautiful bridal mehendi designs",
        image: "/category/mehndi.jpeg",
    
    },
    {
        title: "Decorator",
        description: "Wedding planners and decorators",
        image: "/category/decorator.jpg",

    },
    {
        title: "Caterer",
        description: "Delicious catering services",
        image: "/category/caterers.jpg",
    
    },
    {
        title: "Band Baja",
        description: "Traditional wedding bands",
        image: "/category/band.jpeg",
    },
    {
        title: "Dhol",
        description: "Energetic dhol players",
        image: "/category/dhol.jpg",
    
    },
    {
        title: "Tattoo Artist",
        description: "Unique wedding tattoos",
        image: "/category/tattoo.jpg",
    },
    {
        title: "Messkot",
        description: "Fun mascots for events",
        image: "/category/mascot.png",
    
    },
    {
        title: "Magicians",
        description: "Magical performances for guests",
        image: "/category/magic.jpeg",

    },
    {
        title: "Fog Event",
        description: "Fog effects for grand entrances",
        image: "/category/fog.jpg",
    
    },
    {
        title: "Game Coordinator",
        description: "Fun games and activities",
        image: "/category/game.jpeg",
    },
    {
        title: "Anchor",
        description: "Professional event anchors",
        image: "/category/anchor.jpeg",
    
    },
    {
        title: "Live Singer",
        description: "Live music performances",
        image: "/category/singer.jpg",
    },
    {
        title: "Welcome Girls",
        description: "Traditional welcome girls",
        image: "/category/welcome.jpeg",
    
    },
    {
        title: "Waiter Service",
        description: "Experienced waitstaff",
        image: "/category/waitor.jpg",

    },
    {
        title: "Valet Parking",
        description: "Hassle-free valet services",
        image: "/category/valet.png",
    
    },
    {
        title: "DJ",
        description: "DJ and music entertainment",
        image: "/category/dj.jpg",
    },
    {
        title: "Birthday Entry",
        description: "Special birthday entries",
        image: "/category/birthday.jpg",
    
    },
    {
        title: "Jagran Setup",
        description: "Spiritual jagran setup",
        image: "/category/jagran.jpg",
    },
    {
        title: "Mata Chowki Setup",
        description: "Mata chowki arrangements",
        image: "/category/mata.jpg",
    
    },
    {
        title: "Bartender",
        description: "Professional bartending services",
        image: "/category/bar.jpeg",

    },
    {
        title: "Rooms Booking",
        description: "Accommodation for guests",
        image: "/category/room.jpg",
    
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="rounded-lg flex flex-col space-y-2 cursor-pointer transition-all duration-300"
                        onClick={() => handleToggle(index)}

                    >
                        <div className="relative flex items-center justify-between p-4" style={{
                            backgroundImage: `url(${category.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}>
                            {/* Overlay Layer */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

                            {/* Text Content */}
                            <div className="relative z-1">
                                <h3 className="text-xl font-bold text-white inline">
                                    {category.title}
                                </h3>
                                <button className="text-lg ml-4 font-bold text-white">
                                    {expandedIndex === index ? "▲" : "▼"}
                                </button>
                                <p className="text-sm text-gray-300">{category.description}</p>
                            </div>
                        </div>

                        {expandedIndex === index && (
                            <div className=" text-sm text-gray-700 
                        p-4 bg-gray-100">
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

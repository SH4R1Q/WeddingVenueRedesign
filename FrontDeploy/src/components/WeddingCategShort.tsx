import React, { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Photographer",
        description: "Professional wedding photographers",
        image: "/public/photographer.jpg",
        bgColor: "bg-orange-100",
    },
    {
        title: "Makeup Artist",
        description: "Bridal and family makeup services",
        image: "/public/makeup.jpeg",
        bgColor: "bg-rose-200",
    },
    {
        title: "Mehendi Artist",
        description: "Beautiful bridal mehendi designs",
        image: "/public/mehndi.jpeg",
        bgColor: "bg-yellow-200",
    },
    {
        title: "Decorator",
        description: "Wedding planners and decorators",
        image: "/public/decorator.jpg",
        bgColor: "bg-green-100",
    },
    {
        title: "Caterer",
        description: "Delicious catering services",
        image: "/public/caterers.jpg",
        bgColor: "bg-purple-100",
    },
    {
        title: "Band Baja",
        description: "Traditional wedding bands",
        image: "/public/band.jpeg",
        bgColor: "bg-blue-200",
    },
];

const WeddingCategoriesShort: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Wedding Categories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`${category.bgColor} rounded-lg p-4 flex flex-col space-y-2 cursor-pointer transition-all duration-300`}
                        onClick={() => handleToggle(index)}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold inline">{category.title}</h3>
                                <button className="text-lg ml-4 font-bold text-gray-700">
                                    {expandedIndex === index ? "▲" : "▼"}
                                </button>
                                <p className="text-sm text-gray-600">{category.description}</p>
                            </div>
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                        </div>
                        {expandedIndex === index && (
                            <div className="mt-2 text-sm text-gray-700">
                                <p>Explore our wide range of services for {category.title}.</p>
                                <Link to={`/vendor/${category.title.toLowerCase().replace(/ /g, "-")}`} className="text-pink-600 hover:underline">
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

export default WeddingCategoriesShort;

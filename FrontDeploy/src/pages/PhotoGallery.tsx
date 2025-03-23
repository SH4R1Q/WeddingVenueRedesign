import React from 'react';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';

// const categories = ['Weddings', 'Engagements', 'Pre-Wedding Shoots', 'Bridal Portraits'];
// const locations = ['Jaipur', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'];
// const themes = ['Traditional', 'Modern', 'Vintage', 'Boho', 'Rustic'];

const PhotosPage: React.FC = () => {
    // const [selectedCategory, setSelectedCategory] = useState('All Categories');
    // const [selectedLocation, setSelectedLocation] = useState('All Locations');
    // const [selectedTheme, setSelectedTheme] = useState('All Themes');

    // Placeholder image URLs
    const photos = [
        '/ap.jpg',
        '/ap1.jpg',
        '/ap2.jpg',
        '/home1.jpg',
        '/home2.jpg',
        '/home3.jpg',
        '/home4.jpg',
        '/home5.jpg',
        '/aboutusLeft.jpg',
        '/aboutusRight.jpg',
        '/aboutusMiddle.png',
      ];
      // for test purpose

    const imageStyle = {
        width: "100%",
        height: "100%",
      };
    

    return (
        <>
            <NavBar />

            {/* Hero Section */}
            <div className="relative h-[350px] bg-repeat bg-contain py-20 text-center" style={{ backgroundImage: `url('/weddingImg.jpg')` }}>
                <div
                    className="absolute inset-0 bg-black opacity-50"
                    style={{ zIndex: 1 }}
                ></div>
                <h1 className="text-5xl font-playfair font-bold text-[#ffffff]" style={{ position: "relative", zIndex: 2 }}>Wedding Photo Gallery</h1>
                <p className="text-lg text-white-500 mt-4" style={{ position: "relative", zIndex: 2 }}>Discover beautiful moments from real weddings.</p>
            </div>

            {/* Filter Section */}
            {/* <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <select
                    className="border border-gray-300 p-3 rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option>All Categories</option>
                    {categories.map((category) => (
                        <option key={category}>{category}</option>
                    ))}
                </select>

                <select
                    className="border border-gray-300 p-3 rounded-md"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option>All Locations</option>
                    {locations.map((location) => (
                        <option key={location}>{location}</option>
                    ))}
                </select>

                <select
                    className="border border-gray-300 p-3 rounded-md"
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                >
                    <option>All Themes</option>
                    {themes.map((theme) => (
                        <option key={theme}>{theme}</option>
                    ))}
                </select>
            </div> */}

            {/* Photo Grid Section */}
            <div className="container mx-auto px-4 py-10">
                <div className="columns-1 sm:columns-2 lg:columns-4 gap-2 space-y-2">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden group"
                        >
                            <img
                                // src="https://picsum.photos/200"
                                src={photo}
                                alt={`Wedding Photo ${index + 1}`}
                                className="object-cover transition-opacity duration-300"
                                style={imageStyle}
                            />
                            <a
                                href={`https://www.pinterest.com/pin/create/button/?url=${window.location.href}&media=${photo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-2 right-2 opacity-0 group-hover:!opacity-100 transition-opacity duration-300"
                            >
                                <img
                                    src="/icons/pinterest.svg"
                                    alt="Pin on Pinterest"
                                    className="w-10 h-10 rounded-full bg-[#e81489] p-1 hover:!bg-[#c3207a]"
                                />
                            </a>
                            <p className="text-center font-marcellus">Image Title</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default PhotosPage;

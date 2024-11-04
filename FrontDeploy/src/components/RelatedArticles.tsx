// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useGetAllBlogsQuery } from '../redux/api/blog';
// import SkeletonBlogCard from '../components/skeleton/Blog';
// import { Blog } from '../types/types';

// const RelatedArticles: React.FC = () => {
//   const { data: blogData, error, isLoading } = useGetAllBlogsQuery('');
//   const blogs: any = blogData?.data.blog || [];

//   const errorMessageBlogs = error
//     ? 'status' in error
//       ? `Error: ${error.status} - ${JSON.stringify(error.data)}` 
//       : error.message
//     : null;

//   if (error) {      
//     return <h1>Error while loading data</h1>;
//   }

//   return (
//     <div className="py-12 bg-gray-100">
//       <h2 className="text-4xl text-gray-900 font-bold text-center mb-10">Latest Blog Posts</h2>
//       {isLoading ? (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {Array.from({ length: 4 }).map((_, index) => (
//             <SkeletonBlogCard key={index} />
//           ))}
//         </div>
//       ) : error ? (
//         <div className="text-red-500 text-center">{errorMessageBlogs}</div>
//       ) : blogs.length > 0 ? (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {blogs.slice(0, 4).map((blog: Blog) => {
//             const imageUrl = Array.isArray(blog.images) ? blog.images[0] : blog.images || '/default-image.jpg';
//             const contentPreview = blog.content ? blog.content.substring(0, 100) : 'No content available';
//             return (
//               <div key={blog._id} className="bg-white border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
//                 <img src={imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
//                 <div className="p-5">
//                   <h3 className="text-2xl font-semibold mb-3">{blog.title}</h3>
//                   <p className="text-gray-600 mb-4">{contentPreview}...</p>
//                   <Link to={`/blogs/${blog._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
//                     Read More
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p className="text-center text-gray-600">No blogs available</p>
//       )}
//     </div>
//   );
// };

// export default RelatedArticles;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const RelatedArticles: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-8">
          Discover the Best Venues on Our Platform
        </h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied users and experience top-notch content, insights, and more with our platform. Explore exclusive offers and become part of a thriving community today!
        </p>
        <Link 
          to="/aboutus1"
          className="inline-flex items-center bg-white text-pink-500 hover:bg-gray-200 font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
        >
          About Weddingz Venue
          <FaArrowRight className="ml-3" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedArticles;

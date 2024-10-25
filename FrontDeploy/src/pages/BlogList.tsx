// src/pages/BlogList.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import { useGetAllBlogsQuery } from '../redux/api/blog';
import SkeletonBlogCard from '../components/skeleton/Blog';


interface BlogPost {
  _id: string;  // Assuming MongoDB ObjectId is used
  title: string;
  images: string;
  content: string;
}

const BlogList: React.FC = () => {
  const { data: blogData, error, isLoading } = useGetAllBlogsQuery('');
  const blogs: any = blogData?.data.blog || [];

  if (error) {
    return <h1>Error while loading data</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-12 font-roboto">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
        <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonBlogCard key={index} />
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog: BlogPost) => (
              // <div key={blog._id} className="border rounded-lg overflow-hidden shadow-lg">
              //   <img src={blog.images} alt={blog.title} className="w-full h-48 object-cover" />
              //   <div className="p-4">
              //     <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              //     <p className="text-gray-700">{blog.content.substring(0, 100)}...</p>
              //     <Link to={`/blogs/${blog._id}`} className="text-blue-500 hover:underline mt-2 block">
              //       Read More
              //     </Link>
              //   </div>
              // </div>
              <div key={blog._id} className="group border-2 border-solid border-majenta rounded-lg overflow-hidden hover:!shadow-2xl relative !h-50 
                                            transition-transform transform hover:scale-105">
                <img src={blog.images} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                  <h2 className="text-white text-shadow-sm text-xl font-bold px-4 text-center">{blog.title}</h2>
                </div>
                <div className="absolute inset-0 p-4 bg-white-500-a transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-gray-700">{blog.content.substring(0, 200)}...</p>
                  <Link to={`/blogs/${blog._id}`} className="text-pink-600 hover:underline mt-2 block">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogList;

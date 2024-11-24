// BlogCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  blog: {
    _id: string | undefined; // Allow _id to be string or undefined
    title: string | undefined; // Allow title to be string or undefined
    images: string[] | string | undefined; // Allow images to be string, string[] or undefined
    content: string | undefined; // Allow content to be string or undefined
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  // Provide default values to handle undefined cases
  const imageUrl = Array.isArray(blog.images)
    ? blog.images[0]
    : blog.images || "/default-image.jpg";
  const contentPreview = blog.content
    ? blog.content.substring(0, 200)
    : "No content available";
  const title = blog.title || "Untitled"; // Fallback for title

  return (
    <div
      key={blog._id}
      className="group border-2 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 relative"
    >
      <img
        src={imageUrl}
        alt={title} // Use title for alt text
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
          {title}
        </h2>
        <p className="mt-2 text-gray-600">{contentPreview}...</p>
        <Link
          to={`/blogs/${blog._id}`}
          className="inline-block mt-4 bg-pink-400 text-white py-2 px-4 rounded hover:bg-pink-700 transition-colors duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

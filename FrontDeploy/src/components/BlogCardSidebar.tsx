// import React from "react";
import BlogCard from "./BlogCard";
import { useGetAllBlogsQuery } from '../redux/api/blog';

interface BlogPost {
  _id: string;  // Assuming MongoDB ObjectId is used
  title: string;
  images: string;
  content: string;
}

const BlogCardSidebar: React.FC = () => {
  const { data: blogData, error } = useGetAllBlogsQuery('');
  const blogs: any = blogData?.data.blog || [];
  if (error) {
    return <h1>Error while loading data</h1>;
  }
<style>
        {`
          .no-scrollbar {
            -ms-overflow-style: none; 
            scrollbar-width: none; 
          }
        `}
      </style>
  return (
    <div className="h-[700px]  overflow-y-scroll space-y-4 p-2 border rounded-sm no-scrollbar "  style={{
        scrollbarWidth: "none", 
        msOverflowStyle: "none", 
      }}>
      {blogs.map((blog: BlogPost) => (
        <div key={blog._id} className="h-[410px]">
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default BlogCardSidebar;

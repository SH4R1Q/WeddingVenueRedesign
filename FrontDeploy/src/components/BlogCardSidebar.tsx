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
  // const blogs = [
  //   {
  //     _id: "1",
  //     title: "How to Plan Your Wedding",
  //     images: ["/aboutusbanner.jpg"],
  //     content: "A comprehensive guide to planning your wedding effectively.",
  //   },
  //   {
  //     _id: "2",
  //     title: "Top Wedding Destinations",
  //     images: ["/caterers.jpg"],
  //     content: "Discover the most beautiful wedding destinations in the world.",
  //   },
  //   {
  //     _id: "3",
  //     title: "Wedding Photography Tips",
  //     images: ["/ap2.jpg"],
  //     content: "Learn how to capture the best moments of your wedding day.",
  //   },
  //   {
  //     _id: "4",
  //     title: "Budget-Friendly Weddings",
  //     images: ["/ap1.jpg"],
  //     content: "Plan a beautiful wedding without breaking the bank.",
  //   },
  // ];
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

import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import { useGetAllBlogsQuery } from '../redux/api/blog';
import SkeletonBlogCard from '../components/skeleton/Blog';
import Loader from '../components/skeleton/Loader';


interface BlogPost {
  _id: string;  // Assuming MongoDB ObjectId is used
  title: string;
  images: string;
  content: string;
  author: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogList: React.FC = () => {
  const { data: blogData, error, isLoading } = useGetAllBlogsQuery('');
  const blogs: any = blogData?.data.blog || [];
  console.log(blogs);

  if (error) {
    return <h1>Error while loading data</h1>;
  }

  return (
    <>
      <NavBar />
      <section id='HeroSectionBlog'>
        {blogs.length > 0 ? (
          <div className="flex flex-col lg:flex-row">
            {/* Left Blog Banner */}
            <Link
              to={`/blogs/${blogs[0]._id}`}
              className="relative w-full lg:w-1/2 h-[400px] bg-cover bg-center group"
              style={{
                backgroundImage: `url(${Array.isArray(blogs[0].images)
                  ? blogs[0].images[0]
                  : blogs[0].images || "/default-image.jpg"
                  })`,
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-2">
                  {blogs[0].title}
                </h2>
              </div>
            </Link>

            {/* Right Blog Banner */}
            <Link
              to={`/blogs/${blogs[1]._id}`}
              className="relative w-full lg:w-1/2 h-[400px] bg-cover bg-center group"
              style={{
                backgroundImage: `url(${Array.isArray(blogs[1].images)
                  ? blogs[1].images[0]
                  : blogs[1].images || "/default-image.jpg"
                  })`,
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-2">
                  {blogs[1].title}
                </h2>
              </div>
            </Link>
          </div>
        ) : (
          <p></p>
                )}
      </section>

      <section id='blogs'>
        <div className="container mx-auto p-12 font-roboto">
          <h1 className="text-5xl font-playfair font-bold mb-12 text-center">Weddingz Venue Blog Posts</h1>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <>
              <SkeletonBlogCard key={index} />
              <Loader/>
              </>
            ))
            
          ) : blogs.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {blogs.map((blog: BlogPost) => {
                const imageUrl = Array.isArray(blog.images)
                  ? blog.images[0]
                  : blog.images || "/default-image.jpg";
                const contentPreview = blog.content
                  ? blog.content.substring(0, 200)
                  : "No content available";

                return (
                  <Link
                    key={blog._id}
                    to={`/blogs/${blog._id}`}
                    className="block overflow-hidden mb-8 cursor-pointer"
                  >
                    {/* Image Section */}
                    <div className="w-full mb-4">
                      <img
                        src={imageUrl}
                        alt={blog.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    {/* Text Content Section */}
                    <h2 className="text-3xl font-playfair font-semibold text-gray-700 mb-2 leading-tight">
                      {blog.title}
                    </h2>

                    {/* Meta Information */}
                    <div className="text-almost font-roboto text-black my-4">
                      BY {blog.author || "Unknown"} | {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })} | {blog.category || "Wedding Blog"}
                    </div>

                    {/* Content Preview */}
                    <p className="text-gray-500 text-almost font-merriweather mt-4">
                      {contentPreview}...
                    </p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogList;

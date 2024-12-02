import { useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../redux/api/blog';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import Loader from '../components/skeleton/Loader';

const BlogView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blogData, error, isLoading } = useGetBlogByIdQuery(id || '');

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  if (error || !blogData?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-600">Blog post not found</div>
      </div>
    );
  }

  const blog = blogData?.data.blog;

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6 md:p-10 font-roboto bg-white">
        {/* Social Icons Section */}
        <div className="relative flex">
          <div className="hidden lg:flex flex-col items-center fixed top-1/4 left-10 space-y-4">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
              <img src="/public/icons/facebook.svg" alt="Share on Facebook" className="w-16 h-16 rounded-full bg-[#e81489] p-1 hover:bg-[#c3207a]" />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
              <img src="/public/icons/twitter.svg" alt="Share on Twitter" className="w-16 h-16 rounded-full bg-[#e81489] p-1 hover:bg-[#c3207a]" />
            </a>
            <a href="https://www.instagram.com/weddingzvenue.in_?igsh=cG90dXR2Nml2NHMy&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <img src="/public/icons/instagram.svg" alt="Go to Instagram" className="w-16 h-16 rounded-full bg-[#e81489] p-1 hover:bg-[#c3207a]" />
            </a>
          </div>

          {/* Main Blog Content */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-playfair font-bold mb-4 text-center">{blog?.title}</h1>
            <p className="text-center text-sm font-roboto text-black my-12">
              BY {blog?.author || 'Unknown'} | {new Date(blog?.createdAt || '').toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })} | {blog.category}
            </p>

            <div className="prose text-justify font-serif font-light max-w-3xl mx-auto text-gray-700 leading-loose text-lg">
              <p>{blog?.content?.slice(0, 500)}</p>
            </div>

            {blog?.images && blog?.images[0] && (
              <div className="flex justify-center my-12">
                <img
                  src={blog?.images[0]}
                  alt={blog?.title}
                  className="w-full h-[500px] object-cover rounded-sm shadow-md"
                />
              </div>
            )}

            <div className="prose text-justify font-serif font-light max-w-3xl mx-auto text-gray-700 leading-loose text-lg">
              {blog?.content}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogView;

import { useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '../redux/api/blog';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';

const BlogView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blogData, error, isLoading } = useGetBlogByIdQuery(id || '');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
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
      <div className="container mx-auto p-6 md:p-10 font-roboto bg-pink-50">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg p-8 md:p-12 lg:p-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">{blog?.title}</h1>
          {blog?.images && blog?.images[0] && (
            <div className="flex justify-center mb-8">
              <img
                src={blog?.images[0]}
                alt={blog?.title}
                className="w-full h-80 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
          <div className="prose max-w-none mx-auto text-gray-700 leading-relaxed text-lg">
            {blog?.content}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogView;

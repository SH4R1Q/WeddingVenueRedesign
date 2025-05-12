import { useParams } from 'react-router-dom';
import { useGetRealWeddingsPostByIdQuery } from '../redux/api/realWeddings';
import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Loader from '../components/skeleton/Loader';

const RealWeddingsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: realWeddingData, error, isLoading } = useGetRealWeddingsPostByIdQuery(id || '');

  if (isLoading) {
    return <Loader/>;
  }

  if (error || !realWeddingData?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-600">Real Wedding post not found</div>
      </div>
    );
  }

  const realWedding = realWeddingData?.data.realWeddings;

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6 md:p-10 font-roboto bg-white">
        {/* Social Icons Section */}
        <div className="relative flex">
          <div className="hidden lg:flex flex-col items-center fixed top-1/4 left-10 space-y-4">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
              <img src="/public/icons/facebook.svg" alt="Share on Facebook" className="w-16 h-16 rounded-full bg-[#04004c] p-1 hover:bg-[#c3207a]" />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
              <img src="/public/icons/twitter.svg" alt="Share on Twitter" className="w-16 h-16 rounded-full bg-[#04004c] p-1 hover:bg-[#c3207a]" />
            </a>
            <a href="https://www.instagram.com/weddingzvenue.in_?igsh=cG90dXR2Nml2NHMy&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <img src="/public/icons/instagram.svg" alt="Go to Instagram" className="w-16 h-16 rounded-full bg-[#04004c] p-1 hover:bg-[#c3207a]" />
            </a>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-playfair font-bold mb-4 text-center">{realWedding?.title}</h1>
            <p className="text-center text-sm font-roboto text-black my-12">
              BY {realWedding?.author || 'Unknown'} |{' '}
              {new Date(realWedding?.createdAt || '').toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>

            {/* Image Carousel */}
            {realWedding?.images && realWedding?.images.length > 0 && (
              <div className="flex justify-center my-12">
                <Carousel
                  showArrows
                  showStatus={false}
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  interval={5000}
                  transitionTime={500}
                  className="shadow-lg rounded-sm"
                >
                  {realWedding.images.map((image: string, index: number) => (
                    <div key={index} className="w-full">
                      <img
                        src={image}
                        alt={`Real Wedding Image ${index + 1}`}
                        className="w-full h-[500px] object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}

            {/* Content Section */}
            <div className="prose text-justify font-serif font-light max-w-3xl mx-auto text-gray-700 leading-loose text-lg">
              {realWedding?.content}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RealWeddingsView;


// import { useParams } from 'react-router-dom';
// import { useGetRealWeddingsPostByIdQuery } from '../redux/api/realWeddings';
// import NavBar from '../components/navbar';
// // import Footer from '../../../../../components/Footer';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// // interface RealWeddingPostInterface {
// //   id: string;
// //   title: string;
// //   images: string[];
// //   content: string;
// // }

// const RealWeddingsView: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data: realWeddingData, error, isLoading } = useGetRealWeddingsPostByIdQuery(id || '');




//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (error || !realWeddingData?.data) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-xl">Real Wedding post not found</div>
//       </div>
//     );
//   }

//   const realWedding = realWeddingData?.data.realWeddings;


//   return (
//     <>
//     <NavBar />
//     <div className="min-h-screen flex flex-col">
//       <div className="flex-grow container mx-auto py-8">
       
//           <div className="max-w-4xl mx-auto">
//             <h1 className="text-4xl font-bold mb-8 text-center text-[#173445]">
//               {realWedding?.title}
//             </h1>
//             {realWedding?.images && realWedding?.images.length > 0 && (
//               <div className="mb-8">
//                 <Carousel
//                   showArrows={true}
//                   showStatus={false}
//                   showThumbs={false}
//                   infiniteLoop={true}
//                   autoPlay={true}
//                   interval={5000}
//                   transitionTime={500}
//                 >
//                   {realWedding.images.map((image:any, index:any) => (
//                     <div key={index}>
//                       <img
//                         src={image}
//                         alt={`Real Wedding Image ${index + 1}`}
//                         className="w-full h-96 object-cover rounded-lg shadow-lg"
//                       />
//                     </div>
//                   ))}
//                 </Carousel>
//               </div>
//             )}
//             <div className="prose max-w-none mx-auto text-gray-700 leading-relaxed mb-8">
//               {realWedding?.content}
//             </div>
           
//             </div>
//           </div>
        
//           </div>
        
      
//       {/* <Footer /> */}

//     </>
//   );
// };

// export default RealWeddingsView;

import { useParams } from 'react-router-dom';
import { useGetRealWeddingsPostByIdQuery } from '../redux/api/realWeddings';
import NavBar from '../components/navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const RealWeddingsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: realWeddingData, error, isLoading } = useGetRealWeddingsPostByIdQuery(id || '');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error || !realWeddingData?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Real Wedding post not found</div>
      </div>
    );
  }

  const realWedding = realWeddingData?.data.realWeddings;

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-pink-50">
        <div className="container mx-auto px-4 py-10 lg:py-16 flex flex-col items-center">
          <div className="max-w-3xl w-full">
            <h1 className="text-5xl font-bold mb-6 text-center text-[#1A202C]">{realWedding?.title}</h1>

            {realWedding?.images && realWedding?.images.length > 0 && (
              <div className="mb-10">
                <Carousel
                  showArrows
                  showStatus={false}
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  interval={5000}
                  transitionTime={500}
                  className="shadow-lg rounded-lg"
                >
                  {realWedding.images.map((image: string, index: number) => (
                    <div key={index} className="w-full bg-gradient-to-r from-blue-50 to-blue-100 h-80 lg:h-96">
                      <img
                        src={image}
                        alt={`Real Wedding Image ${index + 1}`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}

            <div className="prose lg:prose-lg prose-gray mx-auto leading-relaxed mb-10 text-justify">
              {realWedding?.content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RealWeddingsView;

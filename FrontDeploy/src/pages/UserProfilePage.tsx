import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import UserTabView from '../components/UserTabView';
import BlogCardSidebar from '../components/BlogCardSidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetUserQuery } from '../redux/api/user';

const VenueProfilePage = () => {
    const userId = useSelector((state: RootState) => state?.auth?.user?._id);
    const { data: user } = useGetUserQuery(userId || "");
    const userData = user?.data?.user;
    console.log("user : ",userData);
    return (
        <>
            <NavBar />
            <main className="flex flex-col items-center min-h-screen py-8 bg-gray-100">
                <div className="w-full flex flex-col lg:flex-row px-4 space-y-6 lg:space-y-0 lg:space-x-6">
                    {/* Main Content */}
                    <section className="flex-grow bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                            My Dashboard
                        </h2>
                        <UserTabView />
                    </section>

                    {/* Blog Sidebar */}
                    <aside className="bg-white rounded-lg shadow-lg p-6 lg:w-1/4">
                        <div>
                            <BlogCardSidebar />
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default VenueProfilePage;

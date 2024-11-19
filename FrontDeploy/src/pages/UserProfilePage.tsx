import NavBar from '../components/navbar';
import Footer from '../components/Footer';
import UserSidebar from '../components/UserSidebar';
import UserTabView from '../components/UserTabView';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetUserQuery } from '../redux/api/user';

const VenueProfilePage = () => {
    const userId = useSelector((state: RootState) => state?.auth?.user?._id);
    const { data: user } = useGetUserQuery(userId || "");
    const userData = user?.data?.user;

    return (
        <>
            <NavBar />
            <main className="flex flex-col items-center min-h-screen py-8"
            >
                <div className="w-full flex flex-col lg:flex-row px-6 space-y-6 lg:space-y-0 lg:space-x-6 " >
                   
                    

                    {/* Main Content */}
                    <section className="flex flex-col ">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-3 ml-2">
                            My Dashboard
                        </h2>
                        <UserTabView />
                    </section>
                    <aside className="flex-shrink-0 lg:w-1/4 p-6" >
                       
                    </aside>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default VenueProfilePage;

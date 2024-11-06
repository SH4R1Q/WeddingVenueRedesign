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
            <main className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
                <div className="w-full max-w-7xl grid grid-cols-12 gap-6 px-6">
                    
                    {/* Sidebar */}
                    <aside className="col-span-3 bg-white rounded-lg shadow-lg p-6">
                        <UserSidebar
                            yourName={userData?.fullName}
                            phone={userData?.phone}
                            email={userData?.email}
                            id={userId}
                            profile={userData?.avatarUrl || '/userAvatar.jpg'}
                        />
                    </aside>

                    {/* Main Content */}
                    <section className="col-span-9 bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Your Profile
                        </h2>
                        <UserTabView />
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default VenueProfilePage;

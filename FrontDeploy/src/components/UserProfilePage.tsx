
import React, { useState, useEffect, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetWishlistQuery } from '../redux/api/wishlist';
import { useGetUserQuery, useUpdateUserMutation } from '../redux/api/user';
import VenueCard from './VenueCard';
import VendorCard from './VendorCard';


interface ProfileData {
    name: string;
    phoneNumber: string;
    address: string;
    email: string;
    avatarUrl: string;
  }
  const UserTabView: React.FC = () => {
    const userId = useSelector((state: RootState) => state.auth.user?._id) as string | undefined;
    const { data: user, refetch } = useGetUserQuery(userId ?? "");
    const [updateUser] = useUpdateUserMutation();
    const [activeTab, setActiveTab] = useState<string>('Profile');
    const [isEditing, setIsEditing] = useState<boolean>(false);
  
    const userData = user?.data?.user;
    const [profileData, setProfileData] = useState<ProfileData>({
      name: userData?.fullName || '',
      phoneNumber: userData?.phone || '',
      address: userData?.city || '',
      email: userData?.email || '',
      avatarUrl: userData?.avatarUrl || '/userAvatar.jpg',
    });
  
    useEffect(() => {
      if (userData) {
        setProfileData({
          name: userData.fullName ?? "",
          phoneNumber: userData.phone ?? "",
          address: userData.city ?? "",
          email: userData.email ?? "",
          avatarUrl: userData.avatarUrl ?? '/userAvatar.jpg',
        });
      }
    }, [userData]);
  
    const handleEditClick = () => setIsEditing(!isEditing);
  
    const handleSaveClick = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsEditing(false);
      try {
        await updateUser({ id: userId ?? "", user: profileData }).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    };
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 bg-gradient-to-r from-blue-800 via-blue-500 to-indigo-500 p-6 overflow-auto">
          {activeTab === 'Profile' ? (
            <ProfileSection
              profileData={profileData}
              isEditing={isEditing}
              onEditClick={handleEditClick}
              onSaveClick={handleSaveClick}
              onChange={handleChange}
            />
          ) : (
            <Wishlist userId={userId} />
          )}
        </main>
      </div>
    );
  };
  
  interface SidebarProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => (
    <nav className="md:w-1/4 bg-blue-800 p-4 text-white">
      {['Profile', 'Wishlist'].map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`p-3 mb-4 w-full text-center text-lg font-semibold transition-colors rounded ${
            activeTab === tab ? 'bg-blue-700' : 'hover:bg-blue-600'
          }`}
        >
          <FontAwesomeIcon icon={tab === 'Profile' ? faHome : faHeart} className="mr-2" />
          {tab}
        </button>
      ))}
    </nav>
  );
  
  interface ProfileSectionProps {
    profileData: ProfileData;
    isEditing: boolean;
    onEditClick: () => void;
    onSaveClick: (e: React.FormEvent) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }
  
  const ProfileSection: React.FC<ProfileSectionProps> = ({
    profileData,
    isEditing,
    onEditClick,
    onSaveClick,
    onChange,
  }) => (
  <div className="bg-white p-10 shadow-md rounded-xl w-full md:w-3/4 lg:w-1/2 mx-auto ">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Profile</h2>
    
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <img
          src={profileData.avatarUrl}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <button
          onClick={onEditClick}
          className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md transform hover:scale-105 transition-all"
        >
          <FontAwesomeIcon icon={isEditing ? faTimes : faEdit} />
        </button>
      </div>
      <p className="text-lg font-semibold mt-4">{profileData.name}</p>
    </div>
  
    {isEditing ? (
      <form onSubmit={onSaveClick} className="space-y-5">
        {['name', 'phoneNumber', 'address', 'email'].map(field => (
          <div key={field}>
            <label className="block text-gray-600 font-medium mb-2 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={profileData[field as keyof ProfileData]}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}
        <div className="flex justify-end mt-6 space-x-4">
          <button type="button" onClick={onEditClick} className="text-gray-500 hover:text-gray-700">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
            Save
          </button>
        </div>
      </form>
    ) : (
      <div className="space-y-5">
        {Object.entries(profileData).map(([label, value]) => (
          label !== 'avatarUrl' && (
            <div key={label} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow">
              <span className="font-medium text-gray-600 capitalize">{label}</span>
              <span className="text-gray-700">{value}</span>
            </div>
          )
        ))}
      </div>
    )}
  </div>
  
  );
  
  interface WishlistProps {
    userId: string | undefined;
  }
  
  const Wishlist: React.FC<WishlistProps> = ({ userId }) => {
    const { data: wishlistData, isLoading, error } = useGetWishlistQuery(userId ?? "");
    const wishlistItems = wishlistData?.wishlist?.items || [];
  
    if (isLoading) {
      return <div>Loading your wishlist...</div>;
    }
  
    if (error) {
      return <div>Failed to load wishlist. Please try again later.</div>;
    }
  
    if (wishlistItems.length === 0) {
      return <div>Your wishlist is empty.</div>;
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => {
          return item.itemType === "venue" ? (
            <VenueCard key={item.itemId} venue={item.itemId} />
          ) : (
            <VendorCard
              key={item.itemId}
              vendorId={item.itemId}
              imageUrl={item.imageUrl}
            />
          );
        })}
      </div>
    );
  };
  
  export default UserTabView;
  
  
  
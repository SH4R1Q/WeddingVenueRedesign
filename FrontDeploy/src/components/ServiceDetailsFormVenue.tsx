import React, { useState, useEffect } from "react";
// import Caro from "./Carousel3";
import { useUpdateVenueMutation } from "../redux/api/venue";
import Loader from "../components/skeleton/Loader"
import VenueImageGallery from "./VenueImageGallery";

interface Props {
  phone?: string;
  address?: string;
  images?: string[] | undefined;
  featuresOfVenue?: string;
  guestCapacity?: string | undefined;
  howToReach?: string | undefined;
  summary?: string;
  venuePolicies?: string | undefined; // Ensure this is optional
  id?: string | undefined;
  foodPackages?: string | undefined;
  venueType?: string[] | undefined;
  facilities?: string[] | undefined;
  [key: string]: any;
}

const ServiceDetailsFormVenue: React.FC<Props> = ({
  phone = "",
  address = "",
  images = [],
  featuresOfVenue = "",
  guestCapacity = "",
  howToReach = "",
  summary = "",
  venuePolicies = "",
  id = "",
  foodPackages = "",
  venueType = [],
  facilities = [],
}) => {
  const [updateVenue] = useUpdateVenueMutation();

  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [imagedata, setImageData] = useState<File[]>([]);
  // const [progress, setProgress] = useState(0);  // Progress state
  // const [isUploading, setIsUploading] = useState(false);  // Uploading state
  const [progress, setProgress] = useState(0); // For progress bar
  const [formData, setFormData] = useState<Props>({
    phone,
    address,
    images,
    featuresOfVenue,
    guestCapacity,
    howToReach,
    summary,
    venuePolicies,
    id,
    foodPackages,
    venueType,
    facilities,
  });

  // Update formData when props change (e.g., on edit)
  useEffect(() => {
    setFormData({
      phone,
      address,
      images,
      featuresOfVenue,
      guestCapacity,
      howToReach,
      summary,
      venuePolicies,
      id,
      foodPackages,
      venueType,
      facilities,
    });
  }, [phone, images, featuresOfVenue, guestCapacity, howToReach, summary, venuePolicies, id, foodPackages, venueType, facilities, address]);

  // Simulate rapid progress


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setImageData(Array.from(e.target.files));
  //     simulateProgress(); // Start progress simulation on image upload
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageData(files);
      uploadFiles(files); // Call the file upload function here
    }
  };

  const uploadFiles = (files: File[]) => {
    const formDataToSend = new FormData();
    files.forEach((file) => formDataToSend.append('images', file));

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://weddingzvenue.in/api/api/v1/venue/${id}`, true); // Update with your endpoint URL

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const uploadProgress = (event.loaded / event.total) * 100;
        console.log('Upload progress:', uploadProgress); // Add this line
        setProgress(Math.round(uploadProgress));
        // console.log("progress iss", progress);
        if (uploadProgress == 100) {
          alert("File uploaded");
        }
      }
    };

    // Handle successful upload
    xhr.onload = () => {
      if (xhr.status === 200) {

        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    };

    // Handle errors
    xhr.onerror = () => {
      console.error('File upload error');
    };

    // Send the form data with the files
    xhr.send(formDataToSend);
  };

  const handleVenueTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedVenueType = checked
        ? [...(prevState.venueType || []), value]
        : (prevState.venueType || []).filter((type) => type !== value);
      return {
        ...prevState,
        venueType: updatedVenueType,
      };

    });
  };

  const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedFacilities = new Set(prevState.facilities || []);
      if (checked) {
        updatedFacilities.add(value);
      } else {
        updatedFacilities.delete(value);
      }
      return {
        ...prevState,
        facilities: Array.from(updatedFacilities),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting

    const formDataToSend = new FormData();

    // Append each field from formData that are not files
    Object.keys(formData).forEach((key) => {
      if (key !== 'images') {
        formDataToSend.append(key, String(formData[key]));
      }
    });

    // Append images if they exist
    imagedata.forEach((image) => {
      formDataToSend.append('images', image);
    });

    try {
      const result = await updateVenue({ venueId: id || "", formData: formDataToSend }).unwrap();
      console.log('Venue updated:', result);
      // alert("Venue Updated")
      // Handle success (e.g., show a success message, redirect)
    } catch (error) {
      console.error('Failed to update venue:', error);
      // Handle error (e.g., show error message)
    }
    setIsLoading(false);
    setEditing(false);
  };

  const handleEditClick = () => {
    // Populate the formData state with the current values
    setProgress(0);

    setFormData({
      phone,
      images,
      featuresOfVenue,
      guestCapacity,
      howToReach,
      summary,
      venuePolicies,
      id,
      foodPackages,
      venueType,
      facilities,
    });

    // Enter editing mode
    setEditing(true);
  };

  const venueTypeOptions = [
    "Conference Halls",
    "Banquet Hall",
    "Wedding Lawns",
    "Beachside Venues",
    "Garden Venues",
    "Rooftop Venues",
    "Resorts",
    "Community Centers",
  ];

  const facilitiesOptions = [
    "Food provided by venue",
    "Alcohol allowed",
    "Outside food allowed",
    "Music allowed late",
    "Valet parking",
    "Sea view",
    "Catering services",
    "Live music",
    "City view",
    "Open bar",
    "AV equipment",
    "Free WiFi",
    "Swimming pool",
    "Spa services",
    "Ample parking",
    "Air conditioning",
    "Private beach",
    "Water sports",
    "In-house decor",
    "DJ services",
  ];

  const handleCancelClick = () => {
    setEditing(false);
}
  return (
    <div className="bg-white-500 rounded-lg p-8 mx-auto max-w-full mb-12">
      {isLoading && <Loader />} {/* Add Loader component */}
      <div className="flex items-center justify-center">
        <div className="flex-grow">
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-10 pb-8">
                <label htmlFor="phone" className="block mb-3 font-bold text-2xl text-[#110069]">
                  Contact :
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  placeholder="Phone number"
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                />
              </div>
              <div className="mb-10">
                <label htmlFor="images" className="block mb-2 font-bold text-2xl text-[#110069]">
                  Images:
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleImageChange}
                  multiple
                  className="w-full  bg-transparent"
                />
                {progress > 0 && (
                  <div className="w-3/4 bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                    {/* Displaying the progress percentage */}
                    <p className="mt-2 text-sm font-semibold text-[#110069]">{progress}%</p>
                  </div>
                )}
              </div>

              <div className="mb-10 pb-8">
                <label htmlFor="featuresOfVenue" className="block mb-3 font-bold text-2xl text-[#110069]">
                  Features Of Venue:
                </label>
                <input
                  type="text"
                  id="featuresOfVenue"
                  name="featuresOfVenue"
                  placeholder="Venue Features"
                  value={formData.featuresOfVenue}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                />
              </div>

              <div className="mb-10 pb-8">
                <label htmlFor="foodPackages" className="block mb-3 font-bold text-2xl text-[#110069]">
                  Food Packages:
                </label>
                <input
                  type="text"
                  id="foodPackages"
                  name="foodPackages"
                  placeholder="Food Packages"
                  value={formData.foodPackages}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                />
              </div>

              <div className="mb-3 pb-8">
                <label htmlFor="venueType" className="block mb-3 font-bold text-2xl text-[#110069]">
                  Venue Type:
                </label>
                <div className="w-3/4 text-lg text-[#110069]">
                  {venueTypeOptions.map((option) => (
                    <div key={option} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`venueType-${option}`}
                        name="venueType"
                        placeholder="Venue Types"
                        value={option}
                        checked={formData.venueType?.includes(option) || false}
                        onChange={handleVenueTypeChange}
                        className="mr-2"
                      />
                      <label htmlFor={`venueType-${option}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10 pb-8">
                <label htmlFor="facilities" className="block mb-3 font-bold text-2xl text-[#110069]">
                  Facilities:
                </label>
                <div className="w-3/4 text-lg text-[#110069]">
                  {facilitiesOptions.map((option) => (
                    <div key={option} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`facilities-${option}`}
                        name="facilities"
                        value={option}
                        checked={formData.facilities?.includes(option) || false}
                        onChange={handleFacilitiesChange}
                        className="mr-2"
                      />
                      <label htmlFor={`facilities-${option}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-10 pb-8">
                <label htmlFor="guestCapacity" className="block mb-3 font-bold text-2xl text-[#110069]">
                  Guest Capacity:
                </label>
                <input
                  type="text"
                  id="guestCapacity"
                  name="guestCapacity"
                  placeholder="0"
                  value={formData.guestCapacity}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                />
              </div>

              <div className="mb-10 pb-8">
                <label htmlFor="address" className="block mb-3 font-bold text-2xl text-[#110069]">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                />
              </div>

              <div className="mb-10 pb-8">
                <label htmlFor="howToReach" className="block mb-3 font-bold text-2xl text-[#110069]">
                  How To Reach:
                </label>
                <input
                  type="text"
                  id="howToReach"
                  name="howToReach"
                  placeholder="Tell us how to reach"
                  value={formData.howToReach}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                />
              </div>

              <div className="mb-10 pb-8">
                <label htmlFor="summary" className="block mb-3 font-bold text-2xl text-[#110069]">
                  Summary:
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  placeholder="summary"
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                />
              </div>

              <div className="mb-10 pb-8">
                <label htmlFor="venuePolicies" className="block mb-3 font-bold text-2xl text-[#110069]">
                  Venue Policies:
                </label>
                <textarea
                  id="venuePolicies"
                  name="venuePolicies"
                  value={formData.venuePolicies}
                  placeholder="Our Policies"
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-400 focus:border-[#110069] focus:outline-none text-lg text-[#110069] bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="text-white bg-pink-400 px-4 py-3 rounded-md text-l"
              >
                Update
              </button>
              <button onClick={handleCancelClick} className="ml-4 text-pink-400 bg-white-500 px-4 py-3 border border-pink-400 rounded-md text-l">
                                Cancel
                            </button>
            </form>
          ) : (
            <>
            <div className="mb-10">
              <label
                htmlFor="address"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                readOnly
                placeholder=""
                className="w-3/4 text-lg bg-transparent text-[#110069]"
              />
            </div>
          
            <div className="mb-10">
              <label
                htmlFor="contact"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                Contact:
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={phone}
                readOnly
                placeholder=""
                className="w-3/4 text-lg bg-transparent text-[#110069]"
              />
            </div>
          
            <div className="mb-10">
              <label
                htmlFor="featuresOfVenue"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                Features of Venue:
              </label>
              <textarea
                id="featuresOfVenue"
                name="featuresOfVenue"
                value={featuresOfVenue}
                readOnly
                placeholder=""
                className="w-3/4 text-lg bg-transparent text-[#110069]"
              />
            </div>
          
            <div className="mb-10">
              <label
                htmlFor="foodPackages"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                Food Packages:
              </label>
              <textarea
                id="foodPackages"
                name="foodPackages"
                value={foodPackages}
                readOnly
                placeholder=""
                className="w-3/4 text-lg bg-transparent text-[#110069]"
              />
            </div>
          
            <div className="mb-10">
              <label
                htmlFor="venueType"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                Venue Type:
              </label>
              <ul className="list-disc list-inside text-lg text-[#110069]">
                {venueType?.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          
            <div className="mb-10">
              <label
                htmlFor="facilities"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                Facilities:
              </label>
              <ul className="list-disc list-inside text-lg text-[#110069]">
                {facilities?.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </div>
          
            <div className="mb-10">
              <label
                htmlFor="guestCapacity"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                Guest Capacity:
              </label>
              <input
                type="text"
                id="guestCapacity"
                name="guestCapacity"
                value={guestCapacity}
                readOnly
                placeholder=""
                className="w-3/4 text-lg bg-transparent text-[#110069]"
              />
            </div>
          
            <div className="mb-10">
              <label
                htmlFor="howToReach"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                How to Reach:
              </label>
              <textarea
                id="howToReach"
                name="howToReach"
                value={howToReach}
                readOnly
                placeholder=""
                className="w-3/4 text-lg bg-transparent text-[#110069]"
              />
            </div>
          
            <div className="mb-10">
              <label
                htmlFor="summary"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                Summary:
              </label>
              <textarea
                id="summary"
                name="summary"
                value={summary}
                readOnly
                placeholder=""
                className="w-3/4 text-lg bg-transparent text-[#110069]"
              />
            </div>
          
            <div className="mb-10">
              <label
                htmlFor="venuePolicies"
                className="block mb-4 font-bold text-xl text-[#110069]"
              >
                Venue Policies:
              </label>
              <textarea
                id="venuePolicies"
                name="venuePolicies"
                value={venuePolicies}
                readOnly
                placeholder=""
                className="w-3/4 text-lg bg-transparent text-[#110069]"
              />
            </div>
          
            <div className="mb-8">
                  <h3 className="font-bold text-lg text-[#110069]">Images:</h3>
                  <VenueImageGallery images={images} />
                </div>
          
            <button
              onClick={handleEditClick}
              className="bg-pink-400 text-white text-[#110069] px-4 py-3 rounded-md text-l"
            >
              Edit
            </button>
          </>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsFormVenue;
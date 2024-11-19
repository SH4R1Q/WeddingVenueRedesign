import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import { Venue } from "../models/venue.js";
import jwt from 'jsonwebtoken';
//Register Venu
export const Register = asyncHandler(async (req, res, next) => {
    const { businessName, yourName, email, password, phone, city, comments, venueType, facilities, foodPackages } = req.body;
    console.log(businessName, yourName, email, password, phone, city, comments);
    const venue = await Venue.create({
        businessName, yourName, email, password, phone, city, comments, venueType, facilities, foodPackages
    });
    if (!venue) {
        throw new ApiError(500, "something went wrong while registering the vendor!!");
    }
    return res.status(201).json(new ApiResponse(200, { venue }, "vendor regiested successfully"));
});
// Login vendor
export const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email or Password is missing!!");
    }
    // Finding vendor from database using email
    const venue = await Venue.findOne({ email });
    if (!venue) {
        throw new ApiError(404, "Email/User doesn't exist!!");
    }
    // Check password
    const isPasswordValid = await venue.isPasswordCorrect(password);
    //  const  isPasswordValid = venue.password === password
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid venue credentials");
    }
    // Generate access token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
    const accessToken = jwt.sign({ id: venue._id }, accessTokenSecret, { expiresIn: '1h' });
    // Fetch logged-in vendor details excluding password
    const loggedInVenue = await Venue.findById(venue._id).select("-password");
    // Return response with logged-in vendor details and access token
    return res.status(200)
        .cookie("accesToken", accessToken) //put tokens in cookies
        .json(new ApiResponse(200, { loggedInVenue, accessToken }, "Here is the vendor"));
});
//Get Venue By ID
export const GetVenueById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const venue = await Venue.findById(id);
    if (!venue) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    return res.status(200).json(new ApiResponse(200, { venue }, "Here is the Vendor"));
});
//update Venue
export const UpdateVenue = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // const venueData = JSON.parse(req.body.venueData);
    // if (req.files && Array.isArray(req.files)) {
    //   venueData.images = (req.files as Express.Multer.File[]).map(file => `/uploads/${file.filename}`);
    //   console.log("venueimage" ,venueData.images );
    // }
    // console.log("venuedata" , venueData);
    const updateFields = req.body;
    console.log("data", updateFields);
    const givenFiles = req.files;
    const venue = await Venue.findById(id);
    if (!venue) {
        throw new ApiError(404, "No Venue Found!!!");
    }
    // console.log("fff" , givenFiles)
    if (givenFiles?.length > 0) {
        // console.log("inside", givenFiles);
        const imageUrls = await uploadOnCloudinary(givenFiles);
        if (imageUrls)
            venue.images = imageUrls;
    }
    // Update all fields present in req.body
    for (const [key, value] of Object.entries(updateFields)) {
        if (key !== '_id' && key !== '_v') {
            venue[key] = value;
        }
    }
    console.log(venue);
    await venue.save();
    return res.status(200).json(new ApiResponse(200, "Venue Updated Successfully!!"));
});
//Delete venue bY ID
export const DeleteVenueById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    console.log("users ", user);
    const venue = await Venue.findById(id);
    if (!venue) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    const respose = await Venue.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, { respose }, "Vendor Deleted Successfully "));
});


// Function to get all venues with optional filters
export const filterVenues = async (req, res) => {
    try {
        const { city, minGuests, maxGuests, foodPackage, facilities, venueTypes, guests } = req.query;

        const filterCriteria = {};

        // City filter
        if (city) {
            filterCriteria.city = city;
        }

        // Guest capacity filter
        if (minGuests || maxGuests || guests) {
            filterCriteria.guestCapacity = {};

            // Handle guest capacity range
            if (minGuests && maxGuests) {
                filterCriteria.guestCapacity.$gte = Number(minGuests);
                filterCriteria.guestCapacity.$lte = Number(maxGuests);
            }

            // Handle guests query like "<100", ">200", or a single value
            if (guests) {
                if (guests.includes('-')) {
                    // If guestCapacity is provided as a range, e.g., "500-700"
                    const [min, max] = guests.split('-').map(Number);
                    filterCriteria.guestCapacity.$gte = min;
                    filterCriteria.guestCapacity.$lte = max;
                } else if (guests.startsWith('<')) {
                    filterCriteria.guestCapacity.$lt = Number(guests.replace('<', ''));
                } else if (guests.startsWith('>')) {
                    filterCriteria.guestCapacity.$gt = Number(guests.replace('>', ''));
                } else {
                    // Exact value match (e.g., guests=300)
                    filterCriteria.guestCapacity.$eq = Number(guests);
                }
            }
        }

        // Food package filter
        if (foodPackage) {
            filterCriteria.foodPackages = foodPackage;
        }

        // Facilities filter
        if (facilities) {
            filterCriteria.facilities = { $all: facilities.split(',') };
        }

        // Venue types filter
        if (venueTypes) {
            filterCriteria.venueType = { $in: venueTypes.split(',') };
        }

        // Perform the query
        const venues = await Venue.find(filterCriteria);

        res.status(200).json({
            success: true,
            data: venues,
        });
    } catch (error) {
        console.error('Error fetching venues:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching venues',
            error: error.message,
        });
    }
};

// export const filterVenues = async (req, res) => {
//     try {
//         // Extract filter criteria from query parameters
//         const {
//             city,
//             minGuests,
//             maxGuests,
//             foodPackage,
//             facilities,
//             venueTypes,
//             rating,
//             guests,
//         } = req.query;

//         console.log(city, minGuests, maxGuests, foodPackage, facilities, venueTypes, rating, guests);

//         // Build the filter criteria object
//         const filterCriteria = {};

//         // City filter
//         if (city) {
//             filterCriteria.city = city;
//         }

//         // Guest capacity filter
//         if (minGuests || maxGuests) {
//             filterCriteria.guestCapacity = {};
//             if (minGuests) filterCriteria.guestCapacity.$gte = Number(minGuests);
//             if (maxGuests) filterCriteria.guestCapacity.$lte = Number(maxGuests);
//         }

//         // Food package filter
//         if (foodPackage) {
//             filterCriteria.foodPackages = foodPackage;
//         }

//         // Facilities filter (expects a comma-separated list)
//         if (facilities) {
//             filterCriteria.facilities = { $all: facilities.split(',') };
//         }

//         // Venue types filter (expects a comma-separated list)
//         if (venueTypes) {
//             filterCriteria.venueType = { $in: venueTypes.split(',') };
//         }

//         // Rating filter (expects a comma-separated list)
//         if (rating) {
//             const ratingValues = rating.split(',').map(Number);
//             filterCriteria.rating = { $in: ratingValues };
//         }

//         // Guests filter (expects a comma-separated list of ranges)
//         if (guests) {
//             const guestValues = guests.split(',').map((value) => {
//                 if (value.includes('<')) {
//                     return { $lt: Number(value.replace('<', '')) };
//                 }
//                 if (value.includes('>')) {
//                     return { $gt: Number(value.replace('>', '')) };
//                 }
//                 return Number(value);
//             });
//             filterCriteria.guestCapacity = { $in: guestValues };
//         }

//         // Perform the query
//         const venues = await Venue.find(filterCriteria);
//         // console.log("hi");

//         // Return the filtered venues
//         res.status(200).json({
//             success: true,
//             data: venues,
//         });
//     } catch (error) {
//         console.error('Error fetching venues:', error);
//         res.status(500).json({
//             success: false,
//             message: 'An error occurred while fetching venues',
//             error: error.message,
//         });
//     }
// };


// search by the city
export const searchvenuesByCity = async (req, res) => {
    const { city } = req.params; // Get the city query parameter from the request
    try {
        let venues;
        // Check if the city parameter exists
        if (city && typeof city === "string") {
            // Query the Vendor collection for vendors with the specified city
            venues = await Venue.find({ city: city });
        }
        else {
            // If city parameter is not provided or is not a string, return an error
            return res.status(400).json({ message: "City parameter is required and must be a string" });
        }
        // If no vendors are found, return an empty array
        if (!venues || venues.length === 0) {
            return res.status(404).json({ message: "No venues found for the specified city" });
        }
        // If vendors are found, return them in the response
        return res.status(200).json({ venues });
    }
    catch (error) {
        // If an error occurs during the database query, return a 500 error
        return res.status(500).json({ message: "Internal server error" });
    }
};
// //Get Ranked venues
// export const topVenues = asyncHandler(async (req: Request, res: Response) => {
//   // Inside this function, we assume Venue is a Mongoose model
//   const venues = await Venue.find({rank:{1:5}});
//   // Return a JSON response with a custom API response format
//   return res.status(200).json(new ApiResponse(200, { venues }, "Here are the Vendors by rank"));
// });
// Assuming Venue is a Mongoose model and asyncHandler is used for error handling
export const topVenues = asyncHandler(async (req, res) => {
    // Query to find venues where rank is between 1 and 5
    const venues = await Venue.find({ rank: { $gte: 1, $lte: 10 } }).sort({rank : 1});
    // Return a JSON response with a custom API response format
    return res.status(200).json(new ApiResponse(200, venues, "Here are the Vendors by rank"));
});

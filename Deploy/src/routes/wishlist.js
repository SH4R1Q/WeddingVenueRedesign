import express from 'express';
import { addItemToWishlist, getUserWishlist, removeItemFromWishlist } from '../controllers/wishlist.js';
import { checkAdmin } from "../middlewares/Admin.js";
const router = express.Router();
// Route to add an item to the wishlist
router.post('/wishlist/add', addItemToWishlist);
// Route to remove an item from the wishlist
router.delete('/wishlist/remove', checkAdmin, removeItemFromWishlist);
// Route to get the user's wishlist
router.get('/wishlist/:userId', getUserWishlist);
export default router;

import { Router } from "express";
import { submitEnquiryForm, allEnquiries, updateReadStatus, NewAdminForm } from "../controllers/enquiry.js";
const router = Router();
router.route("/submit").post(submitEnquiryForm);
router.get('/all/enquiry', allEnquiries);
router.patch('/:id', updateReadStatus);
router.post('/new/buisness', NewAdminForm);
export default router;


// name:
// contact:
// location:
// message:
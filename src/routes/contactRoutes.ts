import express from "express";
import { 
    getContacts, 
    getContact, 
    createContactItem, 
    deleteContactItem, 
    updateContactItem 
} from "../controllers/contactController";

const router = express.Router();

// Routes
router.get('/contacts', getContacts);
router.post('/contacts', createContactItem);
router.get('/contacts/:id', getContact);
router.delete('/contacts/:id', deleteContactItem);
router.put('/contacts/:id', updateContactItem);

export default router;

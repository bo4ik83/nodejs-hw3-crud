import express from 'express';
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    updateContactController,
    deleteContactController,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getContactsController);
router.get('/:contactId', getContactByIdController);
router.get('/', createContactController);
router.get('/:contactId', updateContactController);
router.get('/:contactId', deleteContactController);

export default router;
import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  patchContact,
  deleteContact,
  getContactByPhoneNumber,
} from '../services/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

export const getContactsController = ctrlWrapper(async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

export const getContactByIdController = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});

export const createContactController = ctrlWrapper(async (req, res) => {
  const { name, phoneNumber, email, isFavorite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Missing required fields: name, phoneNumber, or contactType',
    );
  }

  const existingContact = await getContactByPhoneNumber(phoneNumber);

  if (existingContact) {
    return res.status(201).json({
      status: 201,
      message: 'Contact with this phone number already exists.',
      data: existingContact,
    });
  }

  const newContact = await createContact({
    name,
    phoneNumber,
    email,
    isFavorite,
    contactType,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
});

export const updateContactController = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;

  if (!Object.keys(updateData).lenght) {
    throw createHttpError(400, 'Missing fields for update');
  }

  const updatedContact = await updateContact(contactId, updateData);

  if (!updateContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a contact!',
    data: updatedContact,
  });
});

export const patchContactController = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await patchContact(contactId, req.body);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
});

export const deleteContactController = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContact(contactId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
});

import Contact from '../db/models/contact.js';
import createHttpError from 'http-errors';

export const getAllContacts = async () => {
  return await Contact.find({});
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (contactData) => {
  try {
    const newContact = new Contact(contactData);
    return await newContact.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw createHttpError(400, error.message);
    }
    throw error;
  }
};

export const updateContact = async (contactId, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    updateData,
    { new: true, runValidators: true },
  );

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  return updatedContact;
};

export const patchContact = async (contactId, updateData) => {
  const patchedContact = await Contact.findByIdAndUpdate(
    contactId,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!patchedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  return patchedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  return deletedContact;
};

export const getContactByPhoneNumber = async (phoneNumber) => {
  return Contact.findOne({ phoneNumber });
};

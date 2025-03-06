import Contact from '../db/models/contact.js';
import createHttpError from 'http-errors';

export const getAllContacts = async () => {
  return await Contact.find({});
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createHttpError(404, { message: 'Contact not found' });
  }
  return contact;
};

export const createContact = async (contactData) => {
  const newContact = new Contact(contactData);
  return await newContact.save();
};

export const updateContact = async (contactId, contactData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    contactData,
    { new: true },
  );
  if (!updatedContact) {
    throw createHttpError(404, { message: 'Contact not found' });
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
    throw createHttpError(404, { message: 'Contact not found' });
  }
  return patchedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw createHttpError(404, { message: 'Contact not found' });
  }
  return deletedContact;
};

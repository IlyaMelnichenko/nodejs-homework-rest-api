const contacts = require("../models/contacts");

const { HttpError, ControllerWrapper } = require("../helpers");


const getAll = async (req, res) => {
  const contact = await contacts.listContacts();
  res.json(contact);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
}
  res.json(contact);
};

const postContact = async (req, res) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

module.exports = {
  getAll: ControllerWrapper(getAll),
  getById: ControllerWrapper(getById),
  postContact: ControllerWrapper(postContact),
  deleteContact: ControllerWrapper(deleteContact),
  putContact: ControllerWrapper(putContact),
};
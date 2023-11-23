const fs = require("node:fs/promises");
const path = require("node:path");
const filePath = path.join(__dirname, "contacts.json");
const crypto = require("node:crypto");

const listContacts = async () => {
  const data = await fs.readFile(filePath, { endcoding: "UTF-8" });
  return JSON.parse(data);
  
};

const getContactById = async (contactId) => {
  const data =  await listContacts();
  
  const result = data.find((contact) => contact.id === contactId);
  return result || undefined;
};

const removeContact = async (contactId) => {
  const data =  await listContacts();
  
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return undefined;
  }
  const newContacts = [
    ...data.slice(0, index),
    ...data.slice(index + 1),
  ];
  await fs.writeFile(filePath, JSON.stringify(newContacts, undefined, 2));
  return data[index];
};

const addContact = async (body) => {
  const data = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };
  data.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(data, undefined, 2));
  return newContact;
};
const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((i) => i.id === contactId);
  if (index === -1) {
    return null;
  }

  data[index] = { id: contactId, ...body };

  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return data[index];
};
module.exports = {
  addContact,
  listContacts,
  removeContact,
  getContactById,
  updateContact,
};

import { Request, Response } from 'express';
import { deleteContact, getAllContacts, createContact, updateContact, getContactById } from '../service/contactServices';

// Reading all contacts
export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await getAllContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Reading a contact by ID
export const getContact = async (req: Request, res: Response) => {
    const contactIdParam = req.params.id;

    if (!contactIdParam || isNaN(parseInt(contactIdParam, 10))) {
        res.status(400).json({ error: "Invalid contact ID provided" });
        return;
    }

    const contactId = parseInt(contactIdParam, 10);

    try {
        const contact = await getContactById(contactId);
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ error: "Contact not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Adding a contact
export const createContactItem = async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;

    if (typeof name !== 'string' || name.trim() === '' || typeof email !== 'string' || email.trim() === '' || typeof phone !== 'string' || phone.trim() === '') {
        res.status(400).json({ error: "Invalid or missing parameters. Make sure name, email, and phone are non-empty strings." });
        return;
    }

    try {
        const newContact = await createContact(name, email, phone);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Deleting a contact by ID
export const deleteContactItem = async (req: Request, res: Response) => {
    const contactIdParam = req.params.id;

    if (!contactIdParam || isNaN(parseInt(contactIdParam, 10))) {
        res.status(400).json({ error: "Invalid contact ID provided" });
        return;
    }

    const contactId = parseInt(contactIdParam, 10);

    try {
        await deleteContact(contactId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Updating a contact by ID
export const updateContactItem = async (req: Request, res: Response) => {
    const contactIdParam = req.params.id;
    const { name, email, phone } = req.body;

    if (!contactIdParam || isNaN(parseInt(contactIdParam, 10))) {
        res.status(400).json({ error: "Invalid contact ID provided" });
        return;
    }

    const contactId = parseInt(contactIdParam, 10);

    if (name && (typeof name !== 'string' || name.trim() === '') || email && (typeof email !== 'string' || email.trim() === '') || phone && (typeof phone !== 'string' || phone.trim() === '')) {
        res.status(400).json({ error: "Invalid or missing parameters. Make sure name, email, and phone are non-empty strings." });
        return;
    }

    try {
        const updatedContact = await updateContact(contactId, name, email, phone);
        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllContacts = async () => {
    return prisma.contact.findMany();
};

export const getContactById = async (contactId: number) => {
    return prisma.contact.findUnique({
        where: {
            id: contactId,
        },
    });
};

export const createContact = async (name: string, email: string, phone: string) => {
    return prisma.contact.create({
        data: {
            name,
            email,
            phone,
        },
    });
};

export const deleteContact = async (contactId: number) => {
    return prisma.contact.delete({
        where: {
            id: contactId,
        },
    });
};

export const updateContact = async (contactId: number, name?: string, email?: string, phone?: string) => {
    return prisma.contact.update({
        where: {
            id: contactId,
        },
        data: {
            ...(name && { name }),
            ...(email && { email }),
            ...(phone && { phone }),
        },
    });
};

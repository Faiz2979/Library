import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function registerUser(request: NextApiRequest, response: NextApiResponse) {

    if (request.method !== "POST") {
        return response.status(405).json({ message: "Method not allowed" });
    }
    try{
        const {username, email, password, name} = request.body;
        if (!username || !email || !password || !name) {
            return response.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return response.status(409).json({ message: "User already registered" });
        }
        const usernameExists = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (usernameExists) {
            return response.status(409).json({ message: "Username already used" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                name,
                role: "USER",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        if (!user) {
            return response.status(500).json({ message: "Error creating user" });
        }

        return response.status(201).json({ 
            message: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return response.status(500).json({ message: "Internal server error" });
    }
}
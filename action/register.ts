"use server";
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
export async function UserRegister(formData: FormData) {
    
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as string;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
        }
    })
        return {
            status: "200",
            message: "Success"
        }
    } catch (error) {
        const  errorlog  = console.log(error)
        return {
            status: "500",
            message: errorlog
        }
    }
}
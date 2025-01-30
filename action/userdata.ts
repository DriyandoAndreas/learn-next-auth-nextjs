"use server";
import prisma from "@/lib/prisma"

export async function UserData(UserData:string) {
    const mail = UserData;
    const data  =  await prisma.user.findMany({
        where: {
            email : mail,
        }
    })
    return data;
}
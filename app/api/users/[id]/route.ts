import { prisma } from "@/prisma/prisma";
import { userSchema } from "@/ValidationSchemas/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest,{params}:Props) {
  const body = await request.json();
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {
            status: 400,
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });
    if (!existingUser) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
        );
    }

    if (body.password) {
        const hashPassword = await bcrypt.hash(body.password, 10);
        body.password = hashPassword;
    } else {
        body.password = existingUser.password; // Keep the existing password if not provided
    }

    if (existingUser.username !== body.username) {
        const duplicateUser = await prisma.user.findUnique({
            where: {
                username: body.username,
            },
        });

        if (duplicateUser) {
            return NextResponse.json(
                { message: "Username already exists" },
                { status: 400 }
            );
        }
        
    } else {
        body.username = existingUser.username; // Keep the existing username if not provided
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(params.id),
        },
        data: {
            ...body,
        },
    });

    return NextResponse.json(updatedUser, {
        status: 200,
    });
  
}
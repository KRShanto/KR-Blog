"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const updateProfile = async (
  userId: number,
  updatedData: Partial<User>,
) => {
  try {
    const getUpdatedData = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: updatedData.name,
        email: updatedData.email,
        bio: updatedData.bio,
        image: updatedData.image,
      },
    });
    if (getUpdatedData) {
      return { success: true, data: getUpdatedData };
    } else {
      return { success: false, message: "Failed to update user profile" };
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

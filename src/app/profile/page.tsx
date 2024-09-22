import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileForm from "./ProfileForm";
import { db } from "@/lib/db";
import { auth } from "../auth";

export default async function ProfileEditPage() {
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your profile information and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm user={user!} />
      </CardContent>
    </Card>
  );
}

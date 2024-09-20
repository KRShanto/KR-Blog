"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { toast, useToast } from "@/components/ui/use-toast";
import { updateProfile } from "@/actions/profile/updateProfile";

// Mock Firebase utility function for image upload

type TProps = {
  user: User;
};

const uploadImageToFirebase = async (acceptedFiles: File) => {
  const file = acceptedFiles;
  if (file) {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
};

export default function ProfileForm({ user }: TProps) {
  const [userProfile, setUserProfile] = useState({
    name: user ? user?.name : "",
    email: user ? user?.email : "",
    bio: user ? user?.bio : "",
    isGoogleUser: false,
    image: user ? user?.image : "",
  });

  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const url = await uploadImageToFirebase(e.target.files[0]);
        setUserProfile({ ...userProfile, image: url ? url : "" });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {
        data: updatedUser,
        success,
        message,
      } = (await updateProfile(user.id, userProfile)) || {};
      if (success && updatedUser) {
        setUserProfile((prevUserProfile) => ({
          ...prevUserProfile,
          name: updatedUser?.name,
          email: updatedUser?.email,
          bio: updatedUser?.bio,
          image: updatedUser?.image,
        }));
        setIsEditing(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: message,
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "something went wrong",
        description: err.message,
      });
    }
  };
  console.log(user?.image);
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userProfile?.image!} alt={userProfile?.name!} />
          <AvatarFallback>
            {userProfile
              .name!.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <Input
            ref={fileRef}
            type="file"
            accept="image/*"
            id="avatar"
            className="hidden"
            onChange={handleImageUpload}
            disabled={!isEditing || isUploading}
          />
          <Label htmlFor="avatar" className="cursor-pointer">
            <Button
              onClick={() => {
                fileRef.current?.click();
              }}
              variant="outline"
              size="sm"
              type="button"
              disabled={!isEditing || isUploading}
            >
              {isUploading ? "Uploading..." : "Change Picture"}
            </Button>
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={userProfile.name!}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={user?.email}
          onChange={handleInputChange}
          disabled={!isEditing || userProfile.isGoogleUser}
        />
        {userProfile.isGoogleUser && (
          <p className="text-sm text-muted-foreground">
            Email cannot be changed for Google accounts.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={userProfile.bio!}
          onChange={handleInputChange}
          disabled={!isEditing}
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-4">
        {isEditing ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </form>
  );
}

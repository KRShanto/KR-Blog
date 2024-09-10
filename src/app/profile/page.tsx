"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCircle,
  BookMarked,
  Settings,
  Menu,
  Bookmark,
  Eye,
  ThumbsUp,
  MessageSquare,
  Bell,
} from "lucide-react";

// Mock Firebase utility function for image upload
const uploadImageToFirebase = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(URL.createObjectURL(file));
    }, 2000);
  });
};

function ProfileEdit() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "I love reading about technology and science.",
    isGoogleUser: false,
    avatarUrl: "/placeholder.svg?height=80&width=80",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const url = await uploadImageToFirebase(e.target.files[0]);
        setUser({ ...user, avatarUrl: url });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user:", user);
    setIsEditing(false);
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your profile information and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <Input
                type="file"
                id="avatar"
                className="hidden"
                onChange={handleImageUpload}
                disabled={!isEditing || isUploading}
              />
              <Label htmlFor="avatar" className="cursor-pointer">
                <Button
                  variant="outline"
                  size="sm"
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
              value={user.name}
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
              value={user.email}
              onChange={handleInputChange}
              disabled={!isEditing || user.isGoogleUser}
            />
            {user.isGoogleUser && (
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
              value={user.bio}
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
      </CardContent>
    </Card>
  );
}

function SavedPosts() {
  const savedPosts = [
    {
      id: 1,
      title: "10 Tips for Better Writing",
      excerpt: "Improve your writing skills with these simple tips...",
    },
    {
      id: 2,
      title: "The Future of AI",
      excerpt: "Exploring the potential impacts of artificial intelligence...",
    },
    {
      id: 3,
      title: "Healthy Eating Habits",
      excerpt:
        "Learn how to maintain a balanced diet and improve your health...",
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Saved Posts</CardTitle>
        <CardDescription>
          Your bookmarked articles for later reading.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {savedPosts.map((post) => (
            <div key={post.id} className="mb-4 rounded-lg border p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="mr-2">
                  <Eye className="mr-2 h-4 w-4" />
                  Read
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function LikedPosts() {
  const likedPosts = [
    { id: 1, title: "The Rise of Quantum Computing", author: "Alice Johnson" },
    { id: 2, title: "Sustainable Living in Urban Areas", author: "Bob Smith" },
    {
      id: 3,
      title: "The Impact of Social Media on Mental Health",
      author: "Charlie Brown",
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Liked Posts</CardTitle>
        <CardDescription>
          Articles you've enjoyed and appreciated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {likedPosts.map((post) => (
            <div key={post.id} className="mb-4 rounded-lg border p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">By {post.author}</p>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="mr-2">
                  <Eye className="mr-2 h-4 w-4" />
                  Read
                </Button>
                <Button variant="outline" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Unlike
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function Comments() {
  const comments = [
    {
      id: 1,
      postTitle: "The Future of AI",
      content: "Great article! Very informative.",
      date: "2023-06-15",
    },
    {
      id: 2,
      postTitle: "10 Tips for Better Writing",
      content: "I found point #3 particularly helpful. Thanks!",
      date: "2023-06-10",
    },
    {
      id: 3,
      postTitle: "Sustainable Living",
      content: "Could you elaborate more on the second point?",
      date: "2023-06-05",
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Your Comments</CardTitle>
        <CardDescription>
          Manage your comments on various posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4 rounded-lg border p-4">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-lg font-semibold">{comment.postTitle}</h3>
                <span className="text-sm text-muted-foreground">
                  {comment.date}
                </span>
              </div>
              <p className="mb-2 text-sm">{comment.content}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function UserSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    publicProfile: true,
    language: "english",
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account preferences and settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            defaultValue={settings.language}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, language: value }))
            }
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive email updates about new posts and comments
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={settings.emailNotifications}
            onCheckedChange={() => handleToggle("emailNotifications")}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications on your devices
            </p>
          </div>
          <Switch
            id="push-notifications"
            checked={settings.pushNotifications}
            onCheckedChange={() => handleToggle("pushNotifications")}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">
              Use dark theme across your account
            </p>
          </div>
          <Switch
            id="dark-mode"
            checked={settings.darkMode}
            onCheckedChange={() => handleToggle("darkMode")}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="public-profile">Public Profile</Label>
            <p className="text-sm text-muted-foreground">
              Allow others to view your profile and activity
            </p>
          </div>
          <Switch
            id="public-profile"
            checked={settings.publicProfile}
            onCheckedChange={() => handleToggle("publicProfile")}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const NavItems = [
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "saved", label: "Saved Posts", icon: BookMarked },
    { id: "liked", label: "Liked Posts", icon: ThumbsUp },
    { id: "comments", label: "Your Comments", icon: MessageSquare },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const NavLink = ({ item, isMobile = false }) => (
    <Button
      variant={activeTab === item.id ? "default" : "ghost"}
      className={`w-full justify-start ${isMobile ? "flex" : "hidden sm:flex"}`}
      onClick={() => setActiveTab(item.id)}
    >
      <item.icon className="mr-2 h-4 w-4" />
      {item.label}
    </Button>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 flex-col border-r p-4 sm:flex">
        <ScrollArea className="flex-grow">
          <nav className="space-y-2">
            {NavItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="fixed left-4 top-4 z-50 sm:hidden">
            <Menu className="h-6 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 sm:hidden">
          <nav className="mt-8 space-y-2">
            {NavItems.map((item) => (
              <NavLink key={item.id} item={item} isMobile />
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <main className="flex-grow overflow-auto p-6">
        {activeTab === "profile" && <ProfileEdit />}
        {activeTab === "saved" && <SavedPosts />}
        {activeTab === "liked" && <LikedPosts />}
        {activeTab === "comments" && <Comments />}
        {activeTab === "notifications" && (
          <Card className="mx-auto w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>Notifications content here</CardContent>
          </Card>
        )}
        {activeTab === "settings" && <UserSettings />}
      </main>
    </div>
  );
}

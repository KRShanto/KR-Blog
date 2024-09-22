"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function UserSettingsPage() {
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

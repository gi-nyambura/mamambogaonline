
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, UserCircle, Mail, Phone, Lock, Save } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useState, useEffect, type FormEvent } from "react";

export const dynamic = 'force-dynamic';

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleProfileUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, update user profile in Firebase Auth & Firestore
    alert("Profile update submitted (check console for data).");
    console.log({ firstName, lastName, email, phone });
  };
  
  const handlePasswordChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, handle password change logic
    alert("Password change submitted (not functional yet).");
  };


  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-8">
            <Settings className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                Account Settings
            </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Information Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary"/>Profile Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileUpdate}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Your first name" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Your last name" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" disabled/> {/* Email usually not directly editable like this */}
                    </div>
                    <p className="text-xs text-muted-foreground">Contact support to change your email address.</p>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                     <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0712 345 678" className="pl-10" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button type="submit"><Save className="mr-2 h-4 w-4"/>Save Profile Changes</Button>
                </CardFooter>
              </form>
            </Card>

            {/* Change Password Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center"><Lock className="mr-2 h-5 w-5 text-primary"/>Change Password</CardTitle>
                <CardDescription>Update your account password.</CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordChange}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter your current password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter your new password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                    <Input id="confirmNewPassword" type="password" placeholder="Confirm your new password" />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button type="submit">Update Password</Button>
                </CardFooter>
              </form>
            </Card>
        </div>

        {/* Placeholder for other settings like Notifications, Addresses etc. */}
        <div className="mt-12 text-center text-muted-foreground">
          More settings options (e.g., Notification Preferences, Manage Addresses) will be added here.
        </div>
      </div>
    </AppShell>
  );
}

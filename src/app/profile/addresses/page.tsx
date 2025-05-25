
"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Home, PlusCircle, Edit2, Trash2, CheckCircle, Star } from "lucide-react";
import type React from "react";

interface Address {
  id: string;
  label: string; // e.g., "Home", "Work"
  fullName: string;
  streetAddress: string;
  estateArea: string;
  city: string;
  phoneNumber: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: "addr1",
    label: "Home",
    fullName: "Jane Buyer",
    streetAddress: "Apartment A2, Rose Garden Towers",
    estateArea: "Kilimani",
    city: "Nairobi",
    phoneNumber: "0712 345 678",
    isDefault: true,
  },
  {
    id: "addr2",
    label: "Work",
    fullName: "Jane Buyer",
    streetAddress: "ABC Plaza, 5th Floor",
    estateArea: "Westlands",
    city: "Nairobi",
    phoneNumber: "0712 345 678",
    isDefault: false,
  },
];

export default function ManageAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Form state (could be more robust with react-hook-form)
  const [label, setLabel] = useState("");
  const [fullName, setFullName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [estateArea, setEstateArea] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDefault, setIsDefault] = useState(false);


  const openAddForm = () => {
    setEditingAddress(null);
    setLabel("");
    setFullName("");
    setStreetAddress("");
    setEstateArea("");
    setCity("Nairobi"); // Default city
    setPhoneNumber("");
    setIsDefault(false);
    setIsFormOpen(true);
  };

  const openEditForm = (address: Address) => {
    setEditingAddress(address);
    setLabel(address.label);
    setFullName(address.fullName);
    setStreetAddress(address.streetAddress);
    setEstateArea(address.estateArea);
    setCity(address.city);
    setPhoneNumber(address.phoneNumber);
    setIsDefault(address.isDefault);
    setIsFormOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      // In a real app, call API to delete
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    // In a real app, call API to update default status
  };
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newAddressData = { label, fullName, streetAddress, estateArea, city, phoneNumber, isDefault };

    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => addr.id === editingAddress.id ? { ...editingAddress, ...newAddressData } : addr));
      // In a real app, call API to update
    } else {
      // Add new address
      setAddresses(prev => [...prev, { id: `addr${Date.now()}`, ...newAddressData }]);
      // In a real app, call API to add
    }
    setIsFormOpen(false);
    setEditingAddress(null);
  };


  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Home className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
              Manage Your Addresses
            </h1>
          </div>
          <Button onClick={openAddForm}>
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Address
          </Button>
        </div>

        {addresses.length === 0 ? (
          <Card className="shadow-lg text-center">
            <CardContent className="py-12">
              <MapPin className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold font-poppins mb-2">No Saved Addresses</h2>
              <p className="text-muted-foreground mb-6">Add your delivery addresses for faster checkout.</p>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add First Address
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <Card key={address.id} className={`shadow-md hover:shadow-lg transition-shadow ${address.isDefault ? 'border-2 border-primary' : ''}`}>
                <CardHeader>
                  <CardTitle className="font-poppins flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-primary" /> {address.label}
                    </div>
                    {address.isDefault && (
                      <Badge className="bg-primary/10 text-primary border-primary flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Default
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{address.fullName}</p>
                  <p>{address.streetAddress}</p>
                  <p>{address.estateArea}, {address.city}</p>
                  <p>Phone: {address.phoneNumber}</p>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  {!address.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                      <Star className="mr-2 h-4 w-4" /> Set as Default
                    </Button>
                  )}
                  {address.isDefault && <div className="w-1/3"></div>} {/* Placeholder for spacing */}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditForm(address)} title="Edit Address">
                      <Edit2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)} title="Delete Address" className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-poppins">{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
              <DialogDescription>
                {editingAddress ? "Update the details for this address." : "Enter the details for your new delivery address."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="label" className="text-right">Label</Label>
                  <Input id="label" value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g., Home, Office" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">Full Name</Label>
                  <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="streetAddress" className="text-right">Street Address</Label>
                  <Input id="streetAddress" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} placeholder="Apt, Building, Street Name" className="col-span-3" required/>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estateArea" className="text-right">Estate/Area</Label>
                  <Input id="estateArea" value={estateArea} onChange={e => setEstateArea(e.target.value)} placeholder="e.g., Kilimani, Westlands" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">City/Town</Label>
                  <Input id="city" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g., Nairobi" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">Phone</Label>
                  <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="0712 345 678" className="col-span-3" required/>
                </div>
                 <div className="col-span-4 flex items-center space-x-2 justify-end pt-2">
                    <Checkbox id="isDefault" checked={isDefault} onCheckedChange={checked => setIsDefault(checked as boolean)} />
                    <Label htmlFor="isDefault" className="font-normal">Set as default address</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button type="submit">{editingAddress ? "Save Changes" : "Add Address"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </AppShell>
  );
}

export const dynamic = 'force-dynamic';
    
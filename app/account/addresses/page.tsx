"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Loader2, MapPin, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import type { Address } from "@/types";

export default function AddressesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [showAddressDialog, setShowAddressDialog] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login?returnUrl=/account/addresses");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // In a real app, this would fetch from your API
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data
        const mockAddresses: Address[] = [
          {
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "US",
          },
          {
            street: "456 Park Avenue",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
            country: "US",
          },
        ];

        setAddresses(mockAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddAddress = () => {
    setIsEditingAddress(false);
    setCurrentAddress(null);
    setFormData({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    });
    setShowAddressDialog(true);
  };

  const handleEditAddress = (address: Address, index: number) => {
    setIsEditingAddress(true);
    setCurrentAddress({ ...address, index });
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setShowAddressDialog(true);
  };

  const handleDeleteAddress = async (index: number) => {
    try {
      // In a real app, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newAddresses = [...addresses];
      newAddresses.splice(index, 1);
      setAddresses(newAddresses);

      toast.success("Address deleted", {
        description: "The address has been removed from your account.",
        richColors: true,
      });
    } catch (error) {
      toast.error("Delete failed", {
        description:
          "There was an error deleting the address. Please try again.",
        richColors: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditingAddress) {
      setIsAddingAddress(true);

      try {
        // In a real app, this would call an API endpoint
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (currentAddress && typeof currentAddress.index === "number") {
          const newAddresses = [...addresses];
          newAddresses[currentAddress.index] = formData;
          setAddresses(newAddresses);

          toast.success("Address updated", {
            description: "Your address has been updated successfully.",
            richColors: true,
          });
        }
      } catch (error) {
        toast.success("Update failed", {
          description:
            "There was an error updating your address. Please try again.",
          richColors: true,
        });
      } finally {
        setIsAddingAddress(false);
        setShowAddressDialog(false);
      }
    } else {
      setIsAddingAddress(true);

      try {
        // In a real app, this would call an API endpoint
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setAddresses([...addresses, formData]);

        toast.success("Address added", {
          description: "Your new address has been added successfully.",
          richColors: true,
        });
      } catch (error) {
        toast.error("Add failed", {
          description:
            "There was an error adding your address. Please try again.",
          richColors: true,
        });
      } finally {
        setIsAddingAddress(false);
        setShowAddressDialog(false);
      }
    }
  };

  if (isLoading || isLoadingAddresses) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Address Book</h1>
        <p className="text-muted-foreground">
          Manage your shipping and billing addresses
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <Button onClick={handleAddAddress}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No addresses found</h3>
            <p className="text-muted-foreground mb-4">
              You haven't added any addresses yet.
            </p>
            <Button onClick={handleAddAddress}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((address, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Address {index + 1}</CardTitle>
                <CardDescription>Shipping and billing address</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>
                    {address.country === "US"
                      ? "United States"
                      : address.country}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditAddress(address, index)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteAddress(index)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditingAddress ? "Edit Address" : "Add New Address"}
            </DialogTitle>
            <DialogDescription>
              {isEditingAddress
                ? "Update your address information below"
                : "Enter your address information below"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      handleSelectChange("country", value)
                    }
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isAddingAddress}>
                {isAddingAddress ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditingAddress ? "Updating..." : "Adding..."}
                  </>
                ) : isEditingAddress ? (
                  "Update Address"
                ) : (
                  "Add Address"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

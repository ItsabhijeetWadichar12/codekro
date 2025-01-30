"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDetails } from "@/context/UserDetails";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

function Profile() {
  const { userDetail, setUserDetail } = useContext(UserDetails);
  const [userInput, setUserInput] = useState({
    name: userDetail?.name ,
    email: userDetail?.email,
  });

  const UpdateUser = useMutation(api.users.UpdateUser);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(()=>{
    console.log(userInput);
  })

  const handleSave = async () => {
    try {
      await UpdateUser({
        userId: userDetail?._id, // Ensure the user ID is passed correctly
        name: userInput.name,
        email: userInput.email,
      });

      setUserDetail((prev) => ({
        ...prev,
        name: userInput.name,
        email: userInput.email,
      }));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Input
        name="email"
        placeholder={userDetail?.email}
        value={userInput.email}
        onChange={handleChange}
      />
      <Input
        name="name"
        placeholder={userDetail?.name}
        value={userInput.name}
        onChange={handleChange}
      />
      {userDetail?.picture && (
        <Image
          src={userDetail.picture}
          width={50}
          height={50}
          alt="Profile Picture"
          className="rounded-full"
        />
      )}
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}

export default Profile;
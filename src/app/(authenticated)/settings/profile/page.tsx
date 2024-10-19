'use client';

import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { selectEmail, selectName, selectPhone, selectProfilePicture } from '@/contexts/userSlice';

export default function ProfilePage(): React.JSX.Element {
  const dispatch = useDispatch();
  const fullName = useSelector(selectName);
  const preferredName = useSelector(selectName);
  const phone = useSelector(selectPhone);
  const profilePicture = useSelector(selectProfilePicture);
  const email = useSelector(selectEmail);

  const [isEditing, setIsEditing] = useState(false);
  const [editedFullName, setEditedFullName] = useState(fullName);
  const [editedPreferredName, setEditedPreferredName] = useState(preferredName);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedFullName(fullName);
      setEditedPreferredName(preferredName);
      setEditedPhone(phone);
      setNewProfilePicture(null);
    }
  };

  const handleSave = () => {
    // dispatch(updateFullName(editedFullName));
    // dispatch(updatePreferredName(editedPreferredName));
    // dispatch(updatePhone(editedPhone));
    if (newProfilePicture) {
      // In a real application, you would upload the file to a server here
      // and get back a URL to store in the Redux state
      const fakeUrl = URL.createObjectURL(newProfilePicture);
      //   dispatch(updateProfilePicture(fakeUrl));
    }
    setIsEditing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewProfilePicture(event.target.files[0]);
    }
  };

  return (
    <Card className='mx-auto w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='text-2xl'>Profile</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <Avatar className='h-20 w-20'>
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt={`${preferredName}'s profile`}
                width={80}
                height={80}
                className='rounded-full object-cover'
              />
            ) : (
              <AvatarFallback>
                <FaUserCircle className='h-20 w-20 text-gray-400' />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h2 className='text-xl font-semibold'>{preferredName || fullName}</h2>
            <p className='text-sm text-muted-foreground'>{email}</p>
          </div>
        </div>
        <div>
          <Button>Upload Profile Picture</Button>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='fullName'>Full Name</Label>
            <Input
              id='fullName'
              value={isEditing ? editedFullName : fullName}
              onChange={(e) => setEditedFullName(e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='preferredName'>What should we call you?</Label>
            <Input
              id='preferredName'
              value={isEditing ? editedPreferredName : preferredName}
              onChange={(e) => setEditedPreferredName(e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={email}
              readOnly
            />
          </div>
          <Button
            onClick={handleSave}
            className='w-full'
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

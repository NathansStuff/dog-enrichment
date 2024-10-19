'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

function PreferencesPage(): React.JSX.Element {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReminder, setWeeklyReminder] = useState(true);
  const [activitySuggestions, setActivitySuggestions] = useState(true);

  const handleSave = () => {
    // Here you would typically save these preferences to your backend
    console.log('Preferences saved:', { emailNotifications, weeklyReminder, activitySuggestions });
  };

  return (
    <Card className=' w-full max-w-2xl'>
      <CardHeader>
        <h1 className='text-2xl font-bold'>Preferences</h1>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center justify-between'>
          <Label
            htmlFor='emailNotifications'
            className='flex flex-col'
          >
            <span className='text-base font-semibold'>Email Notifications</span>
            <span className='text-sm text-muted-foreground'>Receive updates and newsletters via email</span>
          </Label>
          <Switch
            id='emailNotifications'
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <div className='flex items-center justify-between'>
          <Label
            htmlFor='weeklyReminder'
            className='flex flex-col'
          >
            <span className='text-base font-semibold'>Weekly Activity Reminder</span>
            <span className='text-sm text-muted-foreground'>Get a reminder to download your weekly PDF</span>
          </Label>
          <Switch
            id='weeklyReminder'
            checked={weeklyReminder}
            onCheckedChange={setWeeklyReminder}
          />
        </div>
        <div className='flex items-center justify-between'>
          <Label
            htmlFor='activitySuggestions'
            className='flex flex-col'
          >
            <span className='text-base font-semibold'>Personalized Activity Suggestions</span>
            <span className='text-sm text-muted-foreground'>Receive tailored activity recommendations</span>
          </Label>
          <Switch
            id='activitySuggestions'
            checked={activitySuggestions}
            onCheckedChange={setActivitySuggestions}
          />
        </div>
        <Button
          onClick={handleSave}
          className='w-full'
        >
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}

export default PreferencesPage;

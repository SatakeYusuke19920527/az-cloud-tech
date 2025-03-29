'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { QIITA_USERS, ZENN_USERS } from '@/lib/config';
import { useState } from 'react';
import { toast } from 'sonner';

interface UserSetting {
  username: string;
  enabled: boolean;
  platform: 'zenn' | 'qiita';
}

export default function SettingsPage() {
  const [userSettings, setUserSettings] = useState<UserSetting[]>([
    ...ZENN_USERS.map((user) => ({
      username: user.username,
      enabled: true,
      platform: 'zenn' as const,
    })),
    ...QIITA_USERS.map((user) => ({
      username: user.username,
      enabled: true,
      platform: 'qiita' as const,
    })),
  ]);

  const handleToggleUser = (username: string) => {
    setUserSettings((prev) =>
      prev.map((setting) =>
        setting.username === username
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleSave = () => {
    // Here you would typically save the settings to a backend or local storage
    // For now, we'll just show a success message
    toast.success('Settings saved successfully');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Dashboard Settings</h1>
          <p className="text-muted-foreground">
            Configure which users&apos; articles appear in the dashboard.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Zenn Users</CardTitle>
            <CardDescription>
              Toggle visibility of Zenn users in the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userSettings
              .filter((setting) => setting.platform === 'zenn')
              .map((setting) => (
                <div
                  key={setting.username}
                  className="flex items-center justify-between space-x-4"
                >
                  <Label
                    htmlFor={`zenn-${setting.username}`}
                    className="flex-1"
                  >
                    {setting.username}
                  </Label>
                  <Switch
                    id={`zenn-${setting.username}`}
                    checked={setting.enabled}
                    onCheckedChange={() => handleToggleUser(setting.username)}
                  />
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Qiita Users</CardTitle>
            <CardDescription>
              Toggle visibility of Qiita users in the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userSettings
              .filter((setting) => setting.platform === 'qiita')
              .map((setting) => (
                <div
                  key={setting.username}
                  className="flex items-center justify-between space-x-4"
                >
                  <Label
                    htmlFor={`qiita-${setting.username}`}
                    className="flex-1"
                  >
                    {setting.username}
                  </Label>
                  <Switch
                    id={`qiita-${setting.username}`}
                    checked={setting.enabled}
                    onCheckedChange={() => handleToggleUser(setting.username)}
                  />
                </div>
              ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

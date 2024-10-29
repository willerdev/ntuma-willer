'use client';

import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import {
  Bell,
  CreditCard,
  Lock,
  LogOut,
  Moon,
  User,
  Wallet,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container max-w-2xl py-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <Button>Change Photo</Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input placeholder="Enter your full name" />
          </div>
          
          <div className="space-y-2">
            <Label>Email</Label>
            <Input placeholder="Enter your email" type="email" />
          </div>
          
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input placeholder="Enter your phone number" type="tel" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Moon className="w-5 h-5" />
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Toggle dark mode theme
                </p>
              </div>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5" />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive order updates
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Wallet className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-medium">Wallet Balance</p>
              <p className="text-sm text-muted-foreground">
                Current balance: $150.00
              </p>
            </div>
            <Button variant="outline">Top Up</Button>
          </div>

          <div className="flex items-center space-x-4">
            <CreditCard className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-medium">Payment Methods</p>
              <p className="text-sm text-muted-foreground">
                Manage your payment methods
              </p>
            </div>
            <Button variant="outline">Manage</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Lock className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-muted-foreground">
                Update your password
              </p>
            </div>
            <Button variant="outline">Update</Button>
          </div>

          <div className="flex items-center space-x-4">
            <LogOut className="w-5 h-5 text-destructive" />
            <div className="flex-1">
              <p className="font-medium text-destructive">Sign Out</p>
              <p className="text-sm text-muted-foreground">
                Sign out of your account
              </p>
            </div>
            <Button variant="destructive" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

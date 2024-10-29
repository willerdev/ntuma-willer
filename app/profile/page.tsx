'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../../components/auth-provider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { 
  User, 
  Wallet, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';
import Link from 'next/link';
import { Settings } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  walletBalance: number;
  createdAt: string;
}

export default function ProfilePage() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="container max-w-2xl py-6 space-y-6">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container max-w-2xl py-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-[400px]">
            <p className="text-xl text-muted-foreground">Profile not found</p>
            <Button className="mt-4">Create Profile</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-6 space-y-6">
      <Card>
        <CardHeader className="text-center relative">
          <div className="absolute right-4 top-4">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">{profile.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Member since {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Wallet className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Wallet Balance</p>
              <p className="text-2xl font-bold">${profile.walletBalance.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-muted-foreground">{profile.phone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[100px] text-muted-foreground">
              <ShoppingBag className="w-8 h-8 mr-2" />
              <span>No recent orders</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Saved Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[100px] text-muted-foreground">
              <MapPin className="w-8 h-8 mr-2" />
              <span>No saved addresses</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

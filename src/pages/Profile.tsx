import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupportMessages from '@/components/SupportMessages';

interface Profile {
  full_name: string;
  avatar_url: string;
  bio: string;
}

const Profile = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    avatar_url: '',
    bio: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setProfile({
        full_name: data.full_name || '',
        avatar_url: data.avatar_url || '',
        bio: data.bio || '',
      });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id);

      if (error) throw error;

      toast.success('پروفایل با موفقیت به‌روزرسانی شد');
    } catch (error: any) {
      toast.error(error.message || 'خطا در به‌روزرسانی پروفایل');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">پروفایل کاربری</h1>
              <Button variant="outline" onClick={signOut}>
                خروج
              </Button>
            </div>

            <Tabs defaultValue="profile" dir="rtl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">اطلاعات پروفایل</TabsTrigger>
                <TabsTrigger value="support">پیام های پشتیبانی</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>ویرایش پروفایل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={profile.avatar_url} />
                          <AvatarFallback>
                            {profile.full_name.charAt(0) || user.email?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="full_name">نام و نام خانوادگی</Label>
                        <Input
                          id="full_name"
                          value={profile.full_name}
                          onChange={(e) =>
                            setProfile({ ...profile, full_name: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">ایمیل</Label>
                        <Input id="email" value={user.email || ''} disabled />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="avatar_url">آدرس تصویر پروفایل</Label>
                        <Input
                          id="avatar_url"
                          placeholder="https://example.com/avatar.jpg"
                          value={profile.avatar_url}
                          onChange={(e) =>
                            setProfile({ ...profile, avatar_url: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">درباره من</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="support">
                <SupportMessages />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

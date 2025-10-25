import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { faIR } from 'date-fns/locale';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SupportMessage {
  id: string;
  user_id: string;
  message: string;
  admin_reply: string | null;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
  } | null;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && user && !isAdmin) {
      navigate('/');
      toast.error('شما دسترسی به این صفحه ندارید');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [user, isAdmin]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('support_messages')
      .select(`
        *,
        profiles:user_id (
          full_name
        )
      `)
      .order('created_at', { ascending: false });

    if (data) {
      setMessages(data as any);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('admin_support_messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'support_messages',
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleReply = async (messageId: string) => {
    if (!replyText.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('support_messages')
        .update({
          admin_reply: replyText,
          status: 'replied',
        })
        .eq('id', messageId);

      if (error) throw error;

      setReplyText('');
      setReplyingTo(null);
      toast.success('پاسخ با موفقیت ارسال شد');
    } catch (error: any) {
      toast.error(error.message || 'خطا در ارسال پاسخ');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (messageId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('support_messages')
        .update({ status: newStatus })
        .eq('id', messageId);

      if (error) throw error;

      toast.success('وضعیت پیام به‌روزرسانی شد');
    } catch (error: any) {
      toast.error(error.message || 'خطا در به‌روزرسانی وضعیت');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'secondary',
      replied: 'default',
      closed: 'destructive',
    };

    const labels: Record<string, string> = {
      pending: 'در انتظار پاسخ',
      replied: 'پاسخ داده شده',
      closed: 'بسته شده',
    };

    return <Badge variant={variants[status] || 'default'}>{labels[status] || status}</Badge>;
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">پنل مدیریت - پیام های پشتیبانی</h1>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    هیچ پیامی وجود ندارد
                  </CardContent>
                </Card>
              ) : (
                messages.map((msg) => (
                  <Card key={msg.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {msg.profiles?.full_name || 'کاربر'}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(msg.created_at), 'PPP', { locale: faIR })}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          {getStatusBadge(msg.status)}
                          <Select
                            value={msg.status}
                            onValueChange={(value) => handleStatusChange(msg.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">در انتظار</SelectItem>
                              <SelectItem value="replied">پاسخ داده شده</SelectItem>
                              <SelectItem value="closed">بسته شده</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2">پیام کاربر:</p>
                        <p className="text-muted-foreground">{msg.message}</p>
                      </div>

                      {msg.admin_reply && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="font-semibold mb-2">پاسخ شما:</p>
                          <p>{msg.admin_reply}</p>
                        </div>
                      )}

                      {replyingTo === msg.id ? (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="پاسخ خود را بنویسید..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button onClick={() => handleReply(msg.id)} disabled={loading}>
                              {loading ? 'در حال ارسال...' : 'ارسال پاسخ'}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                              }}
                            >
                              انصراف
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            setReplyingTo(msg.id);
                            setReplyText(msg.admin_reply || '');
                          }}
                        >
                          {msg.admin_reply ? 'ویرایش پاسخ' : 'پاسخ دادن'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

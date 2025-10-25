import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { faIR } from 'date-fns/locale';

interface SupportMessage {
  id: string;
  message: string;
  admin_reply: string | null;
  status: string;
  created_at: string;
}

const SupportMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('support_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setMessages(data);
    }
  };

  const subscribeToMessages = () => {
    if (!user) return;

    const channel = supabase
      .channel('support_messages_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'support_messages',
          filter: `user_id=eq.${user.id}`,
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('support_messages').insert({
        user_id: user.id,
        message: newMessage,
      });

      if (error) throw error;

      setNewMessage('');
      toast.success('پیام شما ارسال شد');
    } catch (error: any) {
      toast.error(error.message || 'خطا در ارسال پیام');
    } finally {
      setLoading(false);
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ارسال پیام جدید</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <Textarea
              placeholder="پیام خود را بنویسید..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'در حال ارسال...' : 'ارسال پیام'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">پیام های قبلی</h3>
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
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(msg.created_at), 'PPP', { locale: faIR })}
                    </p>
                  </div>
                  {getStatusBadge(msg.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">پیام شما:</p>
                  <p className="text-muted-foreground">{msg.message}</p>
                </div>
                {msg.admin_reply && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">پاسخ پشتیبانی:</p>
                    <p>{msg.admin_reply}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SupportMessages;

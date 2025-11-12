
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, Info, AlertCircle } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Welcome to Pulse Vision.AI',
      message: 'Your account has been successfully created. Start exploring our AI-powered features!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'success',
      title: 'Idea Analysis Complete',
      message: 'Your latest idea analysis has been completed. Check out the insights we generated for you.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Subscription Reminder',
      message: 'Your free trial will expire in 3 days. Upgrade to continue using premium features.',
      time: '2 days ago',
      read: false,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Notifications
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with your latest activities and important updates
          </p>
        </div>
        <Button variant="outline">
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`transition-all ${!notification.read ? 'border-primary/20 bg-primary/5' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{notification.time}</span>
                      {!notification.read && (
                        <Badge variant="default" className="h-2 w-2 p-0 bg-primary"></Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-muted-foreground">
              When you have notifications, they'll appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default Notifications;

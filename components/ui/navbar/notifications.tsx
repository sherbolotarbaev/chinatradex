'use client';

import React from 'react';

import scss from '@/components/scss/notifications.module.scss';
import { CloseSvg } from '@/public/svg';

type Notification = {
  uid: string;
  style?: React.CSSProperties | undefined;
  text?: string[];
  show: boolean;
};

export default function Notifications() {
  const [currentNotification, setCurrentNotification] =
    React.useState<Notification | null>(null);

  const handleNotificationHide = (uid: string) => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      const notifications: Notification[] = JSON.parse(storedNotifications);
      const updatedNotifications = notifications.map((notification) =>
        notification.uid === uid ? { ...notification, show: false } : notification,
      );
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      setCurrentNotification((prevNotification) =>
        prevNotification?.uid === uid ? null : prevNotification,
      );
    }
  };

  React.useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      const notifications: Notification[] = JSON.parse(storedNotifications).filter(
        (notification: Notification) => notification.show === true,
      );
      if (notifications.length > 0) {
        setCurrentNotification(notifications[notifications.length - 1]);
      }
    } else {
      localStorage.setItem(
        'notifications',
        JSON.stringify([
          {
            uid: '0aa20647-9d7d-4f33-b7dc-4ebdd071bdf3',
            text: ['ПРЕКРАТИТЕ ВОЙНУ В ПАЛЕСТИНЕ 🇵🇸'],
            style: {
              background: 'var(--bg-main)',
              color: 'var(--accent-1)',
            },
            show: true,
          },
        ]),
      );
    }
  }, []);

  return (
    <>
      {currentNotification && (
        <div className={scss.notification} style={currentNotification.style}>
          {currentNotification.text &&
            currentNotification.text.map((text, idx) => (
              <span key={idx} className={scss.text}>
                {text}
              </span>
            ))}

          <CloseSvg
            className={scss.clear}
            onClick={() => handleNotificationHide(currentNotification.uid)}
          />
        </div>
      )}
    </>
  );
}

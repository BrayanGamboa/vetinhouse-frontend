import React from 'react';
import { useNotifications } from './NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  const topNotifications = notifications.filter(n => n.position === 'top');
  const bottomRightNotifications = notifications.filter(n => n.position === 'bottom-right');

  return (
    <>
      {/* Top Notifications (Success) */}
      {topNotifications.length > 0 && (
        <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
          <div className="flex flex-col items-center pt-8 px-4 space-y-3">
            {topNotifications.map((notification) => (
              <div key={notification.id} className="pointer-events-auto">
                <NotificationItem
                  notification={notification}
                  onRemove={removeNotification}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Right Notifications (Error/Warning/Info) */}
      {bottomRightNotifications.length > 0 && (
        <div className="fixed bottom-0 right-0 z-[9999] pointer-events-none">
          <div className="flex flex-col items-end p-6 space-y-3">
            {bottomRightNotifications.map((notification) => (
              <div key={notification.id} className="pointer-events-auto">
                <NotificationItem
                  notification={notification}
                  onRemove={removeNotification}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationContainer;

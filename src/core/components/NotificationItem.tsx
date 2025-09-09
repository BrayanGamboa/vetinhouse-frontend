import React, { useEffect, useState } from 'react';
import type { Notification } from '../types/notification.types';

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <i className="fas fa-check-circle text-[#4CAF50] text-xl"></i>;
      case 'error':
        return <i className="fas fa-exclamation-circle text-[#ff6b6b] text-xl"></i>;
      case 'warning':
        return <i className="fas fa-exclamation-triangle text-[#FF9800] text-xl"></i>;
      case 'info':
        return <i className="fas fa-info-circle text-[#2196F3] text-xl"></i>;
      default:
        return <i className="fas fa-bell text-[#4CAF50] text-xl"></i>;
    }
  };

  const getBaseClasses = () => {
    const baseClasses = `
      bg-white/15 backdrop-blur-[20px] border border-white/20 rounded-[15px] p-4 
      shadow-[0_15px_35px_rgba(0,0,0,0.2)] max-w-sm w-full transition-all duration-300
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] cursor-pointer group
    `;

    if (notification.position === 'top') {
      return `${baseClasses} transform transition-all duration-300 ease-out ${
        isVisible && !isRemoving 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-[-100px] opacity-0 scale-95'
      }`;
    } else {
      return `${baseClasses} transform transition-all duration-300 ease-out ${
        isVisible && !isRemoving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-[400px] opacity-0 scale-95'
      }`;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-l-4 border-l-[#4CAF50]';
      case 'error':
        return 'border-l-4 border-l-[#ff6b6b]';
      case 'warning':
        return 'border-l-4 border-l-[#FF9800]';
      case 'info':
        return 'border-l-4 border-l-[#2196F3]';
      default:
        return 'border-l-4 border-l-[#4CAF50]';
    }
  };

  return (
    <div 
      className={`${getBaseClasses()} ${getBorderColor()}`}
      onClick={handleRemove}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#4CAF50] transition-colors duration-200">
            {notification.title}
          </h4>
          <p className="text-white/80 text-xs leading-relaxed">
            {notification.message}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          className="flex-shrink-0 text-white/50 hover:text-white text-sm transition-all duration-200 hover:rotate-90"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Progress bar for auto-dismiss */}
      {notification.duration && notification.duration > 0 && (
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all linear ${
              notification.type === 'success' 
                ? 'bg-gradient-to-r from-[#4CAF50] to-[#45a049]' 
                : notification.type === 'error'
                ? 'bg-gradient-to-r from-[#ff6b6b] to-[#ff5252]'
                : 'bg-gradient-to-r from-[#2196F3] to-[#1976D2]'
            }`}
            style={{
              width: '100%',
              animation: `progress-bar ${notification.duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationItem;

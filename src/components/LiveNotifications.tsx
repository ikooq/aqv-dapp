"use client";
import { useState, useEffect } from "react";

interface Notification {
    id: number;
    type: 'deposit' | 'withdraw' | 'reward' | 'nft' | 'referral';
    message: string;
    amount?: string;
    user?: string;
    timestamp: number;
}

export default function LiveNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Генерируем случайные уведомления
        const generateNotification = (): Notification => {
            const types: Notification['type'][] = ['deposit', 'withdraw', 'reward', 'nft', 'referral'];
            const type = types[Math.floor(Math.random() * types.length)];

            const messages = {
                deposit: 'New deposit detected!',
                withdraw: 'Withdrawal completed',
                reward: 'Reward claimed!',
                nft: 'NFT minted successfully!',
                referral: 'New referral joined!'
            };

            const amounts = ['$1,250', '$5,000', '$12,500', '$25,000', '$50,000'];
            const users = ['7xKX...9mN2', '3pL8...4kR7', '9mN2...7xKX', '4kR7...3pL8', '2kL9...8mP3'];

            return {
                id: Date.now() + Math.random(),
                type,
                message: messages[type],
                amount: Math.random() > 0.5 ? amounts[Math.floor(Math.random() * amounts.length)] : undefined,
                user: Math.random() > 0.3 ? users[Math.floor(Math.random() * users.length)] : undefined,
                timestamp: Date.now()
            };
        };

        // Добавляем уведомления каждые 3-8 секунд
        const addNotification = () => {
            const notification = generateNotification();
            setNotifications(prev => [notification, ...prev].slice(0, 5)); // Максимум 5 уведомлений
        };

        const interval = setInterval(addNotification, Math.random() * 5000 + 3000);

        // Добавляем первое уведомление сразу
        addNotification();

        return () => clearInterval(interval);
    }, []);

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'deposit': return '💰';
            case 'withdraw': return '💸';
            case 'reward': return '🎁';
            case 'nft': return '🎨';
            case 'referral': return '👥';
            default: return '📢';
        }
    };

    const getNotificationColor = (type: Notification['type']) => {
        switch (type) {
            case 'deposit': return 'border-green-500/30 bg-green-500/10';
            case 'withdraw': return 'border-blue-500/30 bg-blue-500/10';
            case 'reward': return 'border-yellow-500/30 bg-yellow-500/10';
            case 'nft': return 'border-purple-500/30 bg-purple-500/10';
            case 'referral': return 'border-pink-500/30 bg-pink-500/10';
            default: return 'border-gray-500/30 bg-gray-500/10';
        }
    };

    const formatTime = (timestamp: number) => {
        const now = Date.now();
        const diff = now - timestamp;
        const seconds = Math.floor(diff / 1000);

        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    };

    if (!isVisible || notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
            {notifications.map((notification, index) => (
                <div
                    key={notification.id}
                    className={`p-3 rounded-lg border backdrop-blur-md transition-all duration-500 transform ${getNotificationColor(notification.type)
                        } ${index === 0 ? 'animate-slideInRight' : 'opacity-90'
                        }`}
                    style={{
                        animationDelay: `${index * 0.1}s`,
                        transform: `translateX(${index * 5}px) scale(${1 - index * 0.05})`
                    }}
                >
                    <div className="flex items-start gap-3">
                        <div className="text-2xl animate-bounce">
                            {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white">
                                {notification.message}
                            </div>
                            {notification.amount && (
                                <div className="text-xs text-green-400 font-bold">
                                    {notification.amount}
                                </div>
                            )}
                            {notification.user && (
                                <div className="text-xs text-gray-400">
                                    {notification.user}
                                </div>
                            )}
                            <div className="text-xs text-gray-500">
                                {formatTime(notification.timestamp)}
                            </div>
                        </div>
                        <button
                            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}

            {/* Кнопка закрыть все */}
            <div className="text-center">
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1 bg-gray-800/50 rounded-full"
                >
                    Hide notifications
                </button>
            </div>
        </div>
    );
}



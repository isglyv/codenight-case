// assets/api.js

// Mock Görevler (Quests)
const mockQuests = [
    { quest_id: 1, quest_name: "Günlük Giriş", quest_type: "DAILY", condition: "login_count_today >= 1", reward_points: 20, priority: 3, is_active: true },
    { quest_id: 2, quest_name: "PvP Ustası", quest_type: "DAILY", condition: "pvp_wins_today >= 3", reward_points: 100, priority: 1, is_active: true },
    { quest_id: 3, quest_name: "Coop Takım Oyunu", quest_type: "DAILY", condition: "coop_minutes_today >= 60", reward_points: 50, priority: 2, is_active: true },
    { quest_id: 4, quest_name: "Kesintisiz Seri", quest_type: "STREAK", condition: "login_streak_days >= 3", reward_points: 75, priority: 2, is_active: true },
    { quest_id: 5, quest_name: "Haftalık Maraton", quest_type: "WEEKLY", condition: "play_minutes_7d >= 600", reward_points: 150, priority: 2, is_active: true },
    { quest_id: 6, quest_name: "Harcamaya Ödül", quest_type: "WEEKLY", condition: "topup_try_7d >= 200", reward_points: 200, priority: 1, is_active: true }
];

// Mock Rozetler (Badges)
const mockBadges = [
    { badge_id: 1, badge_name: "Bronz", badge_icon: "🥉", condition: "total_points >= 300", is_active: true },
    { badge_id: 2, badge_name: "Gümüş", badge_icon: "🥈", condition: "total_points >= 800", is_active: true },
    { badge_id: 3, badge_name: "Altın", badge_icon: "🥇", condition: "total_points >= 1500", is_active: true },
    { badge_id: 4, badge_name: "Elmas", badge_icon: "💎", condition: "total_points >= 3000", is_active: true }
];

const mockUsers = [
    { user_id: "u_1054", total_points: 3250 },
    { user_id: "u_1021", total_points: 2800 },
    { user_id: "u_1089", total_points: 2150 },
    { user_id: "u_1004", total_points: 1900 },
    { user_id: "u_1033", total_points: 1500 },
    { user_id: "u_1077", total_points: 1450 },
    { user_id: "u_1012", total_points: 1200 },
    { user_id: "u_1099", total_points: 950 },
    { user_id: "u_1045", total_points: 800 },
    { user_id: "u_1002", total_points: 600 },
    { user_id: "u_1105", total_points: 450 }
];

const api = {
    getAllUsers: async () => {
        return new Promise((resolve) => { setTimeout(() => { resolve(mockUsers); }, 300); });
    },
    getLeaderboard: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const sorted = [...mockUsers].sort((a, b) => b.total_points - a.total_points).slice(0, 10);
                resolve(sorted.map((user, index) => ({ ...user, rank: index + 1 })));
            }, 300);
        });
    },
    getUserData: async (userId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = mockUsers.find(u => u.user_id === userId);
                if (user) {
                    // Metrikler
                    const metrics = {
                        login_count_today: Math.floor(Math.random() * 3) + 1,
                        play_minutes_today: Math.floor(Math.random() * 180) + 30,
                        pvp_wins_today: Math.floor(Math.random() * 6) + 1,
                        coop_minutes_today: Math.floor(Math.random() * 120) + 10,
                        topup_try_today: Math.floor(Math.random() * 500),
                        play_minutes_7d: Math.floor(Math.random() * 1000) + 300,
                        topup_try_7d: Math.floor(Math.random() * 1500) + 200
                    };

                    // Tetiklenen görevleri kontrol et
                    const triggeredQuests = mockQuests.filter(q => {
                        if (q.quest_name === "Günlük Giriş") return metrics.login_count_today >= 1;
                        if (q.quest_name === "PvP Ustası") return metrics.pvp_wins_today >= 3;
                        if (q.quest_name === "Coop Takım Oyunu") return metrics.coop_minutes_today >= 60;
                        if (q.quest_name === "Kesintisiz Seri") return Math.floor(Math.random() * 10) + 1 >= 3;
                        if (q.quest_name === "Haftalık Maraton") return metrics.play_minutes_7d >= 600;
                        if (q.quest_name === "Harcamaya Ödül") return metrics.topup_try_7d >= 200;
                        return false;
                    });

                    // Seçilen görev (en düşük priority = en yüksek öncelik)
                    const selectedQuest = triggeredQuests.length > 0 
                        ? triggeredQuests.reduce((prev, curr) => curr.priority < prev.priority ? curr : prev)
                        : null;

                    // Bastırılan görevler
                    const suppressedQuests = selectedQuest 
                        ? triggeredQuests.filter(q => q.quest_id !== selectedQuest.quest_id)
                        : [];

                    // Rozetleri kontrol et
                    const earnedBadges = mockBadges.filter(b => {
                        if (b.badge_name === "Bronz") return user.total_points >= 300;
                        if (b.badge_name === "Gümüş") return user.total_points >= 800;
                        if (b.badge_name === "Altın") return user.total_points >= 1500;
                        if (b.badge_name === "Elmas") return user.total_points >= 3000;
                        return false;
                    });

                    // Bildirimler
                    const notifications = [
                        { id: 1, message: `Tebrikler! ${selectedQuest ? selectedQuest.quest_name : "Görev"} görevinden ${selectedQuest ? selectedQuest.reward_points : 0} XP kazandın!`, time: "Bugün, 14:30" },
                        { id: 2, message: "🎖️ Yeni rozet kazandın: Altın!", time: "Bugün, 13:15" },
                        { id: 3, message: "🏆 Leaderboard'da 5. sıraya çıktın!", time: "Dün, 18:45" }
                    ];

                    resolve({
                        id: user.user_id,
                        points: user.total_points,
                        streak: Math.floor(Math.random() * 10) + 1,
                        rank: "Gümüş",
                        ...metrics,
                        triggeredQuests,
                        selectedQuest,
                        suppressedQuests,
                        badges: earnedBadges,
                        notifications
                    });
                } else {
                    resolve(null);
                }
            }, 300);
        });
    }
};
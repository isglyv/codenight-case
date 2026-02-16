// assets/api.js

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
    }
};
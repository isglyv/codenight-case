// assets/main.js

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

async function initDashboard() {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const userListContainer = document.getElementById('user-list-container');
    
    if (!leaderboardContainer || !userListContainer) return; 

    const [leaderboardData, allUsersData] = await Promise.all([
        api.getLeaderboard(),
        api.getAllUsers()
    ]);
    
    renderLeaderboard(leaderboardData, leaderboardContainer);
    renderUserList(allUsersData, userListContainer);
}

function renderLeaderboard(data, container) {
    let html = `<table class="data-table"><thead><tr><th>Sıra</th><th>Kullanıcı ID</th><th>Puan</th></tr></thead><tbody>`;
    data.forEach(user => {
        let rankDisplay = user.rank;
        if (user.rank === 1) rankDisplay = '🥇 1.';
        if (user.rank === 2) rankDisplay = '🥈 2.';
        if (user.rank === 3) rankDisplay = '🥉 3.';

        html += `<tr><td class="rank-cell">${rankDisplay}</td><td>${user.user_id}</td><td class="points-cell">${user.total_points} XP</td></tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
}

function renderUserList(data, container) {
    let html = `<table class="data-table"><thead><tr><th>Kullanıcı ID</th><th>Puan</th><th>İşlem</th></tr></thead><tbody>`;
    data.forEach(user => {
        html += `<tr><td>${user.user_id}</td><td class="points-cell">${user.total_points} XP</td>
                 <td><a href="users.html" class="btn-detail">Detay Gör</a></td></tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
}
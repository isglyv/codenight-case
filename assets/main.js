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
                 <td><a href="users.html?userId=${user.user_id}" class="btn-detail">Detay Gör</a></td></tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
}
// assets/main.js (Dosyanın sonuna ekle)

// Sayfa yüklendiğinde eğer users.html sayfasındaysak çalıştır
if (window.location.pathname.includes('users.html')) {
    initUserDetail();
}

async function initUserDetail() {
    // 1. URL'den kullanıcı ID'sini al (Örn: ?userId=u_1021)
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId') || "u_1054"; // ID yoksa varsayılan olarak u_1054 göster

    try {
        // 2. API'den bu kullanıcıya özel verileri iste
        const userData = await api.getUserData(userId);
        
        if (!userData) {
            console.error("Kullanıcı bulunamadı:", userId);
            return;
        }

        // 3. Ekrandaki yazıları bu ID'ye göre güncelle
        document.querySelector('.profile-header .highlight').textContent = userData.id;
        document.getElementById('user-total-points').textContent = userData.points + " XP";
        document.getElementById('login-streak').textContent = "🔥 " + userData.streak + " Gün";
        
        // Bugünün Aktiviteleri
        const todayMetrics = document.querySelectorAll('.stats-mini-grid')[0].querySelectorAll('.stat-item');
        todayMetrics[0].querySelector('.val').textContent = userData.login_count_today;
        todayMetrics[1].querySelector('.val').textContent = userData.play_minutes_today;
        todayMetrics[2].querySelector('.val').textContent = userData.pvp_wins_today;

        // Son 7 Gün Metrikleri
        const weekMetrics = document.querySelectorAll('.stats-mini-grid')[1].querySelectorAll('.stat-item');
        weekMetrics[0].querySelector('.val').textContent = userData.play_minutes_7d;
        weekMetrics[1].querySelector('.val').textContent = userData.topup_try_7d;

        // Triggered Quests Render
        renderTriggeredQuests(userData.triggeredQuests);

        // Selected Quest Render
        renderSelectedQuest(userData.selectedQuest);

        // Suppressed Quests Render
        renderSuppressedQuests(userData.suppressedQuests);

        // Badges Render
        renderBadges(userData.badges);

        // Notifications Render
        renderNotifications(userData.notifications);
        
        console.log(`${userId} kullanıcısı için veriler yüklendi.`, userData);

    } catch (error) {
        console.error("Kullanıcı detayları yüklenemedi:", error);
    }
}

// Tetiklenen görevleri render et
function renderTriggeredQuests(quests) {
    let container = document.getElementById('triggered-quests-container');
    if (!container) {
        console.warn("triggered-quests-container bulunamadı");
        return;
    }
    
    if (quests.length === 0) {
        container.innerHTML = '<p style="color: #999;">Tetiklenen görev yok</p>';
        return;
    }

    let html = '<table style="width:100%; border-collapse:collapse;"><tbody>';
    quests.forEach(q => {
        html += `<tr style="border-bottom:1px solid #ddd; padding:8px;">
                    <td style="padding:8px;"><strong>${q.quest_name}</strong></td>
                    <td style="padding:8px; text-align:right;"><em>+${q.reward_points} XP (P:${q.priority})</em></td>
                </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Seçilen görevi render et
function renderSelectedQuest(quest) {
    let container = document.querySelector('.quest-display .quest-box.selected');
    if (!container || !quest) return;

    container.innerHTML = `<div class="q-header">
                                <span class="q-tag">SEÇİLEN ÖDÜL</span>
                                <span class="q-priority">Priority: ${quest.priority}</span>
                            </div>
                            <h3>${quest.quest_name}</h3>
                            <p>Tür: ${quest.quest_type}</p>
                            <span class="q-reward">+${quest.reward_points} XP</span>`;
}

// Bastırılan görevleri render et
function renderSuppressedQuests(quests) {
    let container = document.getElementById('suppressed-quests-container');
    if (!container) {
        console.warn("suppressed-quests-container bulunamadı");
        return;
    }
    
    if (quests.length === 0) {
        container.innerHTML = '<p style="color: #999;">Bastırılan görev yok</p>';
        return;
    }

    let html = '';
    quests.forEach(q => {
        html += `<div class="quest-box suppressed">
                    <div class="q-header"><span>${q.quest_name}</span><span>P: ${q.priority}</span></div>
                    <span class="q-reward"><s>+${q.reward_points} XP</s></span>
                </div>`;
    });
    container.innerHTML = html;
}

// Rozetleri render et
function renderBadges(badges) {
    let container = document.getElementById('badge-awards');
    if (!container) {
        console.warn("badge-awards bulunamadı");
        return;
    }

    let html = '';
    if (badges.length === 0) {
        html = '<span style="color:#999;">Henüz rozet kazanılmadı</span>';
    } else {
        badges.forEach(b => {
            html += `<span class="badge" style="display:inline-block; padding:6px 12px; margin:4px; background:#f0ad4e; border-radius:4px; color:white;">
                        ${b.badge_icon} ${b.badge_name}
                    </span>`;
        });
    }
    container.innerHTML = html;
}

// Bildirimleri render et
function renderNotifications(notifications) {
    let container = document.getElementById('notification-container');
    if (!container) {
        console.warn("notification-container bulunamadı");
        return;
    }

    let html = '';
    if (notifications.length === 0) {
        html = '<p style="color:#999;">Bildirim yok</p>';
    } else {
        notifications.forEach(notif => {
            html += `<div class="notif-item">
                        <p><strong>📢</strong> ${notif.message}</p>
                        <small>${notif.time}</small>
                    </div>`;
        });
    }
    container.innerHTML = html;
}
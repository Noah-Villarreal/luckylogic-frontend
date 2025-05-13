import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileDashboard.css';

const defaultAvatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
];

const rankTitles = [
  { minXP: 0, title: 'Rookie' },
  { minXP: 50, title: 'Strategist' },
  { minXP: 150, title: 'Sharp Eye' },
  { minXP: 300, title: 'Logic Master' },
  { minXP: 500, title: 'Jackpot Legend' },
];

export default function ProfileDashboard() {
  const [username, setUsername] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(defaultAvatars[0]);
  const [customAvatar, setCustomAvatar] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [xp, setXp] = useState(0);
  const [bgTheme, setBgTheme] = useState('default');
  const [badges, setBadges] = useState([]);
  const [newBadge, setNewBadge] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem('username') || 'Lucky Player';
    const savedAvatar = localStorage.getItem('userAvatar') || defaultAvatars[0];
    const savedCustom = localStorage.getItem('customAvatar');
    const savedDark = localStorage.getItem('darkMode') === 'true';
    const savedXP = parseInt(localStorage.getItem('userXP')) || 0;
    const savedTheme = localStorage.getItem('profileTheme') || 'default';

    setUsername(savedName);
    setAvatar(savedAvatar);
    if (savedCustom) setCustomAvatar(savedCustom);
    setDarkMode(savedDark);
    setXp(savedXP);
    setBgTheme(savedTheme);
    updateBadges(savedXP);
  }, []);

  const handleNameSave = () => {
    localStorage.setItem('username', username);
    setEditMode(false);
  };

  const handleAvatarSelect = (src) => {
    setAvatar(src);
    setCustomAvatar(null);
    localStorage.setItem('userAvatar', src);
    localStorage.removeItem('customAvatar');
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomAvatar(reader.result);
      localStorage.setItem('customAvatar', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const toggleDarkMode = () => {
    const updated = !darkMode;
    setDarkMode(updated);
    localStorage.setItem('darkMode', updated.toString());
  };

  const getRankTitle = () => {
    const tier = [...rankTitles].reverse().find(t => xp >= t.minXP);
    return tier ? tier.title : 'Rookie';
  };

  const updateBadges = (xp) => {
    const unlocked = [];
    if (xp >= 25) unlocked.push('🏅 XP Starter');
    if (xp >= 100) unlocked.push('🔥 Grinder');
    if (xp >= 250) unlocked.push('💡 SmartLogic Fanatic');
    if (xp >= 500) unlocked.push('👑 Max Rank');
    setBadges(unlocked);

    const lastBadge = localStorage.getItem('lastBadge');
    if (unlocked.length > (badges.length || 0)) {
      const newUnlocked = unlocked.find(b => b !== lastBadge);
      if (newUnlocked) {
        setNewBadge(newUnlocked);
        localStorage.setItem('lastBadge', newUnlocked);
        setTimeout(() => setNewBadge(null), 4000);
      }
    }
  };

  const handleThemeChange = (theme) => {
    setBgTheme(theme);
    localStorage.setItem('profileTheme', theme);
  };

  const themeClass = darkMode ? 'dark-theme' : bgTheme;

  return (
    <div className={`profile-dashboard ${themeClass}`}>
      <h2>My LuckyLogic Profile</h2>

      <div className="toggle-dark">
        <label>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} /> Dark Mode
        </label>
      </div>

      <div className="profile-header">
        <img
          src={customAvatar || avatar}
          alt="avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          {editMode ? (
            <>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="name-input"
              />
              <button onClick={handleNameSave} className="save-name-btn">Save</button>
            </>
          ) : (
            <>
              <h3>{username}</h3>
              <p className="rank-title">{getRankTitle()}</p>
              <button onClick={() => setEditMode(true)} className="edit-name-btn">Edit</button>
            </>
          )}
        </div>
      </div>

      <div className="avatar-selector">
        {defaultAvatars.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`avatar-${idx}`}
            className={`avatar-option ${avatar === src && !customAvatar ? 'selected' : ''}`}
            onClick={() => handleAvatarSelect(src)}
          />
        ))}
        <label className="avatar-upload">
          + Upload
          <input type="file" accept="image/*" onChange={handleUpload} />
        </label>
      </div>

      <div className="profile-grid">
        <div className="stat-box"><h3>{xp}</h3><p>Total XP</p></div>
        <div className="stat-box"><h3>{getRankTitle()}</h3><p>Rank</p></div>
        <div className="stat-box"><h3>{badges.length}</h3><p>Badges</p></div>
        <div className="stat-box"><h3>{bgTheme}</h3><p>Theme</p></div>
      </div>

      <div className="theme-buttons">
        <button onClick={() => handleThemeChange('default')}>Default</button>
        <button onClick={() => handleThemeChange('gold-theme')}>Gold</button>
        <button onClick={() => handleThemeChange('neon-theme')}>Neon</button>
      </div>

      <div className="badge-section">
        <h4>Achievements</h4>
        {badges.length === 0 ? (
          <p>No badges yet. Keep playing!</p>
        ) : (
          <div className="badge-list">
            {badges.map((badge, idx) => (
              <span key={idx} className="badge">{badge}</span>
            ))}
          </div>
        )}
        {newBadge && (
          <div className="badge-reveal">New Badge: {newBadge}</div>
        )}
      </div>

      <button className="view-history-btn" onClick={() => navigate('/fantasy-history')}>
        View Fantasy History
      </button>

      <p className="public-link">Public Profile: <em>coming soon</em></p>
    </div>
  );
}
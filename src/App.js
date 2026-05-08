import React, { useState } from 'react';
import './App.css';

const TABS = ['Overview', 'Users', 'Analytics', 'Settings'];

const MOCK_STATS = [
  { label: 'Total Users', value: '2,847', change: '+12.5%' },
  { label: 'Active Sessions', value: '184', change: '+3.2%' },
  { label: 'Revenue (MTD)', value: '$48,290', change: '+8.1%' },
  { label: 'Conversion Rate', value: '3.6%', change: '-0.4%' },
];

const MOCK_USERS = [
  { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'David Kim', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Lisa Wang', email: 'lisa@example.com', role: 'Admin', status: 'Active' },
];

const MOCK_ACTIVITY = [
  { time: '2 min ago', action: 'User sarah@example.com logged in' },
  { time: '5 min ago', action: 'New deployment triggered for prod' },
  { time: '12 min ago', action: 'Config updated: rate_limit = 100' },
  { time: '28 min ago', action: 'User marcus@example.com created API key' },
  { time: '1 hr ago', action: 'Database backup completed successfully' },
];

function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Internal Local Dashboard Build</h1>
        </div>
        <nav className="sidebar-nav">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="env-badge">LOCAL DEV</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <h2>{activeTab}</h2>
          <span className="timestamp">{new Date().toLocaleDateString()}</span>
        </header>

        <div className="content-area">
          {activeTab === 'Overview' && <OverviewPanel />}
          {activeTab === 'Users' && <UsersPanel />}
          {activeTab === 'Analytics' && <AnalyticsPanel />}
          {activeTab === 'Settings' && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
}

function OverviewPanel() {
  return (
    <div className="panel">
      <div className="stats-grid">
        {MOCK_STATS.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
            <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="activity-section">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          {MOCK_ACTIVITY.map((item, i) => (
            <li key={i} className="activity-item">
              <span className="activity-time">{item.time}</span>
              <span className="activity-action">{item.action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function UsersPanel() {
  return (
    <div className="panel">
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_USERS.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className="role-badge">{user.role}</span></td>
              <td><span className={`status-dot ${user.status.toLowerCase()}`}>{user.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="panel">
      <div className="placeholder-chart">
        <p>Analytics charts would render here.</p>
        <p className="muted">Connect a data source in Settings to populate.</p>
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="panel">
      <div className="settings-group">
        <h3>Environment</h3>
        <div className="setting-row">
          <span>Mode</span>
          <span className="setting-value">Development (localhost:3000)</span>
        </div>
        <div className="setting-row">
          <span>Build</span>
          <span className="setting-value">Internal Local Dashboard Build</span>
        </div>
        <div className="setting-row">
          <span>Version</span>
          <span className="setting-value">1.0.0</span>
        </div>
      </div>
    </div>
  );
}

export default App;

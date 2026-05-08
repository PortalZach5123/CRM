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
  {
    id: 1, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', status: 'Active',
    linkedin: {
      headline: 'VP of Engineering at TechCorp',
      location: 'San Francisco, CA',
      connections: 1240,
      experience: [
        { title: 'VP of Engineering', company: 'TechCorp', duration: '2022 - Present' },
        { title: 'Senior Engineer', company: 'StartupXYZ', duration: '2019 - 2022' },
      ],
      skills: ['React', 'Node.js', 'System Design', 'Team Leadership'],
      profile_url: 'https://linkedin.com/in/sarah-chen',
    }
  },
  {
    id: 2, name: 'Marcus Johnson', email: 'marcus@example.com', role: 'Editor', status: 'Active',
    linkedin: {
      headline: 'Product Manager at FinServe',
      location: 'New York, NY',
      connections: 890,
      experience: [
        { title: 'Product Manager', company: 'FinServe', duration: '2021 - Present' },
        { title: 'Associate PM', company: 'BigBank Inc', duration: '2018 - 2021' },
      ],
      skills: ['Product Strategy', 'Agile', 'SQL', 'User Research'],
      profile_url: 'https://linkedin.com/in/marcus-johnson',
    }
  },
  {
    id: 3, name: 'Emily Rodriguez', email: 'emily@example.com', role: 'Viewer', status: 'Inactive',
    linkedin: {
      headline: 'UX Designer at DesignLab',
      location: 'Austin, TX',
      connections: 560,
      experience: [
        { title: 'UX Designer', company: 'DesignLab', duration: '2023 - Present' },
        { title: 'UI Designer', company: 'AgencyOne', duration: '2020 - 2023' },
      ],
      skills: ['Figma', 'User Testing', 'Prototyping', 'Design Systems'],
      profile_url: 'https://linkedin.com/in/emily-rodriguez',
    }
  },
  {
    id: 4, name: 'David Kim', email: 'david@example.com', role: 'Editor', status: 'Active',
    linkedin: {
      headline: 'Data Scientist at AnalyticsCo',
      location: 'Seattle, WA',
      connections: 720,
      experience: [
        { title: 'Data Scientist', company: 'AnalyticsCo', duration: '2020 - Present' },
        { title: 'ML Engineer', company: 'DeepTech', duration: '2017 - 2020' },
      ],
      skills: ['Python', 'TensorFlow', 'SQL', 'Statistical Modeling'],
      profile_url: 'https://linkedin.com/in/david-kim',
    }
  },
  {
    id: 5, name: 'Lisa Wang', email: 'lisa@example.com', role: 'Admin', status: 'Active',
    linkedin: {
      headline: 'CTO at CloudNative',
      location: 'Denver, CO',
      connections: 2100,
      experience: [
        { title: 'CTO', company: 'CloudNative', duration: '2021 - Present' },
        { title: 'Director of Engineering', company: 'MegaCorp', duration: '2016 - 2021' },
      ],
      skills: ['AWS', 'Kubernetes', 'Architecture', 'Executive Leadership'],
      profile_url: 'https://linkedin.com/in/lisa-wang',
    }
  },
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
          <span className="version-badge">v1.1.0 — LinkedIn Integration</span>
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
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="panel">
      {selectedUser && (
        <ContactDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      <div className="users-header">
        <h3>Contact Directory</h3>
        <span className="linkedin-badge">LinkedIn Enrichment Active</span>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>LinkedIn</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_USERS.map((user) => (
            <tr key={user.id}>
              <td>
                <button
                  className="name-link"
                  onClick={() => setSelectedUser(user)}
                >
                  {user.name}
                </button>
              </td>
              <td>{user.email}</td>
              <td><span className="role-badge">{user.role}</span></td>
              <td><span className={`status-dot ${user.status.toLowerCase()}`}>{user.status}</span></td>
              <td><span className="linkedin-connected">Connected</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactDetailModal({ user, onClose }) {
  const { linkedin } = user;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>x</button>

        <div className="contact-header">
          <div className="contact-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
          <div className="contact-title">
            <h2>{user.name}</h2>
            <p className="contact-headline">{linkedin.headline}</p>
            <p className="contact-location">{linkedin.location}</p>
          </div>
        </div>

        <div className="contact-meta">
          <div className="meta-item">
            <span className="meta-label">Email</span>
            <span className="meta-value">{user.email}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Role</span>
            <span className="meta-value">{user.role}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Connections</span>
            <span className="meta-value">{linkedin.connections.toLocaleString()}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">LinkedIn</span>
            <a className="meta-value link" href={linkedin.profile_url} target="_blank" rel="noreferrer">
              View Profile
            </a>
          </div>
        </div>

        <div className="contact-section">
          <h4>Experience (from LinkedIn)</h4>
          {linkedin.experience.map((exp, i) => (
            <div key={i} className="experience-item">
              <span className="exp-title">{exp.title}</span>
              <span className="exp-company">{exp.company}</span>
              <span className="exp-duration">{exp.duration}</span>
            </div>
          ))}
        </div>

        <div className="contact-section">
          <h4>Skills</h4>
          <div className="skills-list">
            {linkedin.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="contact-section source-note">
          <p>Data sourced via LinkedIn API integration (PR #1)</p>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const apiBase = process.env.REACT_APP_API_BASE_URL;
  return (
    <div className="panel">
      <div className="placeholder-chart">
        {apiBase ? (
          <>
            <p>Analytics endpoint: <code>{apiBase}/analytics</code></p>
            <p className="muted">API configured. Charts would render from live data.</p>
          </>
        ) : (
          <>
            <p>Analytics charts would render here.</p>
            <p className="muted">Set REACT_APP_API_BASE_URL in .env to connect a data source.</p>
          </>
        )}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const apiBase = process.env.REACT_APP_API_BASE_URL || '(not configured)';
  const linkedinKey = process.env.REACT_APP_LINKEDIN_API_KEY;
  const keyConfigured = linkedinKey && linkedinKey !== 'your-linkedin-api-key-here';
  const maskedKey = keyConfigured ? linkedinKey.slice(0, 4) + '••••' + linkedinKey.slice(-4) : null;

  return (
    <div className="panel">
      <div className="settings-group">
        <h3>Environment</h3>
        <div className="setting-row">
          <span>Mode</span>
          <span className="setting-value">Development (localhost:3000)</span>
        </div>
        <div className="setting-row">
          <span>API Base URL</span>
          <span className="setting-value">{apiBase}</span>
        </div>
        <div className="setting-row">
          <span>Build</span>
          <span className="setting-value">Internal Local Dashboard Build v1.1.0</span>
        </div>
        <div className="setting-row">
          <span>Version</span>
          <span className="setting-value">1.1.0</span>
        </div>
      </div>
      <div className="settings-group" style={{ marginTop: 16 }}>
        <h3>Integrations</h3>
        <div className="setting-row">
          <span>LinkedIn API Key</span>
          <span className={`setting-value ${keyConfigured ? 'connected' : ''}`}>
            {keyConfigured ? maskedKey : 'Not configured — set REACT_APP_LINKEDIN_API_KEY in .env'}
          </span>
        </div>
        <div className="setting-row">
          <span>LinkedIn API</span>
          <span className={`setting-value ${keyConfigured ? 'connected' : ''}`}>
            {keyConfigured ? 'Connected' : 'Disconnected (needs API key)'}
          </span>
        </div>
        <div className="setting-row">
          <span>Data Enrichment</span>
          <span className={`setting-value ${keyConfigured ? 'connected' : ''}`}>
            {keyConfigured ? 'Enabled' : 'Disabled (needs API key)'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;

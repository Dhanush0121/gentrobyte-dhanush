import { useState } from "react";
import "./App.css";

const stats = [
  {
    title: "Total Revenue",
    value: "$84,240",
    change: "+12.5%",
    positive: true,
    icon: "💰",
  },
  {
    title: "Total Users",
    value: "24,892",
    change: "+8.2%",
    positive: true,
    icon: "👥",
  },
  {
    title: "Total Orders",
    value: "8,549",
    change: "+5.7%",
    positive: true,
    icon: "🛒",
  },
  {
    title: "Conversion Rate",
    value: "6.84%",
    change: "-1.2%",
    positive: false,
    icon: "📈",
  },
];

const transactions = [
  {
    name: "Olivia Martin",
    email: "olivia@example.com",
    amount: "$1,250.00",
    status: "Completed",
    date: "Today, 10:24 AM",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson@example.com",
    amount: "$890.00",
    status: "Completed",
    date: "Today, 09:15 AM",
    initials: "JL",
  },
  {
    name: "Sophia Brown",
    email: "sophia@example.com",
    amount: "$2,430.00",
    status: "Pending",
    date: "Yesterday, 04:32 PM",
    initials: "SB",
  },
  {
    name: "Ethan Wilson",
    email: "ethan@example.com",
    amount: "$670.00",
    status: "Completed",
    date: "Yesterday, 02:18 PM",
    initials: "EW",
  },
  {
    name: "Mia Davis",
    email: "mia@example.com",
    amount: "$1,890.00",
    status: "Failed",
    date: "Yesterday, 11:47 AM",
    initials: "MD",
  },
];

const activities = [
  {
    icon: "🛒",
    title: "New order received",
    description: "Order #ORD-28491 was placed",
    time: "2 minutes ago",
  },
  {
    icon: "👤",
    title: "New customer registered",
    description: "Alex Johnson created an account",
    time: "18 minutes ago",
  },
  {
    icon: "💳",
    title: "Payment received",
    description: "Payment of $1,250 was completed",
    time: "42 minutes ago",
  },
  {
    icon: "📦",
    title: "Order shipped",
    description: "Order #ORD-28472 has been shipped",
    time: "1 hour ago",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((transaction) =>
    `${transaction.name} ${transaction.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="logo">
          <div className="logo-mark">G</div>
          <div>
            <h2>Gentro</h2>
            <span>Admin Dashboard</span>
          </div>
        </div>

        <nav className="navigation">
          <p className="nav-label">MAIN MENU</p>

          {[
            ["Dashboard", "⌂"],
            ["Analytics", "◫"],
            ["Customers", "♙"],
            ["Orders", "▣"],
            ["Products", "◈"],
          ].map(([name, icon]) => (
            <button
              key={name}
              className={`nav-item ${activePage === name ? "active" : ""}`}
              onClick={() => {
                setActivePage(name);
                setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{icon}</span>
              <span>{name}</span>
            </button>
          ))}

          <p className="nav-label settings-label">SYSTEM</p>

          {[
            ["Messages", "✉"],
            ["Settings", "⚙"],
            ["Help Center", "?"],
          ].map(([name, icon]) => (
            <button
              key={name}
              className={`nav-item ${activePage === name ? "active" : ""}`}
              onClick={() => {
                setActivePage(name);
                setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{icon}</span>
              <span>{name}</span>

              {name === "Messages" && <span className="message-count">4</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>
            <strong>Upgrade to Pro</strong>
            <p>Unlock advanced analytics and more.</p>
            <button>Upgrade now</button>
          </div>

          <div className="user-profile">
            <div className="avatar">DH</div>
            <div className="user-info">
              <strong>Dhanush</strong>
              <span>Administrator</span>
            </div>
            <button className="more-button">•••</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Header */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <div>
              <p className="breadcrumb">Workspace / {activePage}</p>
              <h1>{activePage}</h1>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <kbd>⌘ K</kbd>
            </div>

            <button className="icon-button notification">
              🔔
              <span />
            </button>

            <div className="top-avatar">DH</div>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          {/* Welcome */}
          <section className="welcome">
            <div>
              <h2>Good afternoon, Dhanush 👋</h2>
              <p>
                Here's what's happening with your business today.
              </p>
            </div>

            <button className="date-button">
              <span>▣</span>
              Aug 22, 2026
              <span>⌄</span>
            </button>
          </section>

          {/* Stats */}
          <section className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.title}>
                <div className="stat-header">
                  <span>{stat.title}</span>
                  <div className="stat-icon">{stat.icon}</div>
                </div>

                <div className="stat-value">{stat.value}</div>

                <div className="stat-footer">
                  <span
                    className={`change ${
                      stat.positive ? "positive" : "negative"
                    }`}
                  >
                    {stat.positive ? "↗" : "↘"} {stat.change}
                  </span>

                  <span>vs last month</span>
                </div>
              </div>
            ))}
          </section>

          {/* Charts */}
          <section className="dashboard-grid">
            <div className="panel revenue-panel">
              <div className="panel-header">
                <div>
                  <h3>Revenue Overview</h3>
                  <p>Monthly revenue performance</p>
                </div>

                <select defaultValue="6months">
                  <option value="6months">Last 6 months</option>
                  <option value="year">This year</option>
                  <option value="month">This month</option>
                </select>
              </div>

              <div className="revenue-summary">
                <strong>$84,240</strong>
                <span className="positive">+12.5%</span>
              </div>

              <div className="chart">
                <div className="chart-y-axis">
                  <span>$100k</span>
                  <span>$75k</span>
                  <span>$50k</span>
                  <span>$25k</span>
                  <span>$0</span>
                </div>

                <div className="chart-area">
                  <div className="grid-line line-1" />
                  <div className="grid-line line-2" />
                  <div className="grid-line line-3" />
                  <div className="grid-line line-4" />
                  <div className="grid-line line-5" />

                  <svg
                    className="revenue-svg"
                    viewBox="0 0 700 260"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#6366f1"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#6366f1"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 205 C55 190 70 175 115 185 C160 195 185 145 230 155 C275 165 300 110 350 125 C400 140 420 90 465 105 C510 120 540 65 585 85 C630 105 650 45 700 60 L700 260 L0 260 Z"
                      fill="url(#areaGradient)"
                    />

                    <path
                      d="M0 205 C55 190 70 175 115 185 C160 195 185 145 230 155 C275 165 300 110 350 125 C400 140 420 90 465 105 C510 120 540 65 585 85 C630 105 650 45 700 60"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    <circle cx="700" cy="60" r="6" fill="#6366f1" />
                  </svg>

                  <div className="chart-months">
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Traffic */}
            <div className="panel traffic-panel">
              <div className="panel-header">
                <div>
                  <h3>Traffic Sources</h3>
                  <p>Visitors by source</p>
                </div>

                <button className="dots">•••</button>
              </div>

              <div className="donut-container">
                <div className="donut">
                  <div className="donut-inner">
                    <strong>48.2K</strong>
                    <span>Visitors</span>
                  </div>
                </div>
              </div>

              <div className="traffic-list">
                <div>
                  <span className="traffic-name">
                    <i className="dot purple" />
                    Direct
                  </span>
                  <strong>42%</strong>
                </div>

                <div>
                  <span className="traffic-name">
                    <i className="dot blue" />
                    Search
                  </span>
                  <strong>28%</strong>
                </div>

                <div>
                  <span className="traffic-name">
                    <i className="dot cyan" />
                    Social
                  </span>
                  <strong>18%</strong>
                </div>

                <div>
                  <span className="traffic-name">
                    <i className="dot gray" />
                    Referral
                  </span>
                  <strong>12%</strong>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom section */}
          <section className="bottom-grid">
            {/* Transactions */}
            <div className="panel transactions-panel">
              <div className="panel-header">
                <div>
                  <h3>Recent Transactions</h3>
                  <p>Your latest customer transactions</p>
                </div>

                <button className="view-all">View all →</button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>CUSTOMER</th>
                      <th>DATE</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.email}>
                        <td>
                          <div className="customer">
                            <div className="customer-avatar">
                              {transaction.initials}
                            </div>

                            <div>
                              <strong>{transaction.name}</strong>
                              <span>{transaction.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="date-cell">{transaction.date}</td>

                        <td className="amount">{transaction.amount}</td>

                        <td>
                          <span
                            className={`status ${transaction.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            <i />
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredTransactions.length === 0 && (
                  <div className="empty-state">
                    No transactions found.
                  </div>
                )}
              </div>
            </div>

            {/* Activity */}
            <div className="panel activity-panel">
              <div className="panel-header">
                <div>
                  <h3>Recent Activity</h3>
                  <p>Latest updates</p>
                </div>

                <button className="dots">•••</button>
              </div>

              <div className="activity-list">
                {activities.map((activity) => (
                  <div className="activity" key={activity.title}>
                    <div className="activity-icon">{activity.icon}</div>

                    <div className="activity-content">
                      <strong>{activity.title}</strong>
                      <p>{activity.description}</p>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
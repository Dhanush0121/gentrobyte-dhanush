import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { formatLiveDate, getTimeGreeting } from './time'

const initialTransactions = [
  { id: 'INV-1048', customer: 'Northstar Studio', date: 'Aug 21, 2024', amount: '$4,280.00', status: 'Paid', initials: 'NS', color: 'coral' },
  { id: 'INV-1047', customer: 'Oak & Pine Co.', date: 'Aug 20, 2024', amount: '$2,156.40', status: 'Pending', initials: 'OP', color: 'blue' },
  { id: 'INV-1046', customer: 'Vertex Systems', date: 'Aug 19, 2024', amount: '$8,940.00', status: 'Paid', initials: 'VS', color: 'green' },
  { id: 'INV-1045', customer: 'Morrow Goods', date: 'Aug 18, 2024', amount: '$1,820.75', status: 'Overdue', initials: 'MG', color: 'purple' },
]

const modules = [
  ['Overview', '⌂'], ['Sales', '↗'], ['Purchasing', '↙'], ['Inventory', '▦'], ['Customers', '◎'], ['Reports', '▤'],
]

const moduleDetails = {
  Sales: { eyebrow: 'Revenue workspace', title: 'Sales pipeline', description: 'Track invoices, orders, and incoming revenue from one focused workspace.', primary: 'Create invoice', stats: [['Pipeline value', '$42,680'], ['Open deals', '18'], ['Conversion rate', '68%']], rows: ['Northstar Studio', 'Vertex Systems', 'Oak & Pine Co.'] },
  Purchasing: { eyebrow: 'Supply workspace', title: 'Purchasing center', description: 'Keep supplier orders and incoming stock moving without losing context.', primary: 'New purchase order', stats: [['Committed spend', '$18,420'], ['Awaiting delivery', '7'], ['Active suppliers', '24']], rows: ['Morrow Goods', 'Brightline Supply', 'Atlas Materials'] },
  Inventory: { eyebrow: 'Stock workspace', title: 'Inventory control', description: 'See what is available, what is running low, and what needs attention next.', primary: 'Add product', stats: [['Inventory value', '$248,600'], ['Low stock items', '12'], ['Warehouse units', '8,420']], rows: ['Wireless keyboard', 'Packaging set', 'Studio monitor'] },
  Customers: { eyebrow: 'Relationship workspace', title: 'Customer directory', description: 'Understand customer activity and keep your most important relationships moving.', primary: 'Add customer', stats: [['Active customers', '186'], ['New this month', '24'], ['Retention rate', '94%']], rows: ['Northstar Studio', 'Vertex Systems', 'Morrow Goods'] },
  Reports: { eyebrow: 'Insights workspace', title: 'Business reports', description: 'Turn your operational data into clear decisions with ready-to-review summaries.', primary: 'Generate report', stats: [['Reports ready', '8'], ['Data freshness', 'Live'], ['Forecast confidence', '91%']], rows: ['Revenue performance', 'Inventory valuation', 'Supplier spend'] },
}

function App() {
  const [activeModule, setActiveModule] = useState('Overview')
  const [range, setRange] = useState('Last 30 days')
  const [status, setStatus] = useState('All')
  const [query, setQuery] = useState('')
  const [transactions, setTransactions] = useState(initialTransactions)
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ customer: '', amount: '', status: 'Pending' })
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    setActiveModule('Overview')
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const filteredTransactions = useMemo(() => transactions.filter((item) => {
    const matchesStatus = status === 'All' || item.status === status
    const matchesQuery = `${item.id} ${item.customer}`.toLowerCase().includes(query.toLowerCase())
    return matchesStatus && matchesQuery
  }), [query, status, transactions])

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const addTransaction = (event) => {
    event.preventDefault()
    const initials = form.customer.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    setTransactions((current) => [{ id: `INV-${1049 + current.length}`, customer: form.customer, date: 'Aug 22, 2024', amount: `$${Number(form.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, status: form.status, initials, color: 'blue' }, ...current])
    setForm({ customer: '', amount: '', status: 'Pending' })
    setShowForm(false)
    notify('Transaction added successfully')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">G</span><span>gentrobyte</span></div>
        <div className="workspace-switcher"><span className="workspace-dot"></span><span><strong>Northstar Ops</strong><small>Business account</small></span><span className="chevron">⌄</span></div>
        <p className="nav-label">Workspace</p>
        <nav>{modules.map(([label, icon]) => <button key={label} className={activeModule === label ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveModule(label); notify(`${label} module selected`) }}><span className="nav-icon">{icon}</span>{label}{label === 'Sales' && <span className="nav-badge">12</span>}</button>)}</nav>
        <div className="sidebar-bottom"><button className="nav-item"><span className="nav-icon">?</span>Help center</button><div className="profile"><span className="avatar">JD</span><span><strong>Jordan Davis</strong><small>Admin</small></span><span className="more">•••</span></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="mobile-brand"><span className="brand-mark">G</span> gentrobyte</div><div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>{activeModule}</strong></div><div className="top-actions"><label className="search"><span>⌕</span><input aria-label="Search" placeholder="Search anything" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label><button className="icon-button" aria-label="Notifications" onClick={() => notify('You are all caught up')}>♧<i></i></button><button className="icon-button" aria-label="Settings">⚙</button></div></header>
        <div className="page-wrap">
          {activeModule !== 'Overview' && <ModuleView module={activeModule} onAction={() => notify(`${moduleDetails[activeModule].primary} opened`)} />}
          {activeModule === 'Overview' && <>
          <section className="page-heading"><div><div className="headline-pill"><span className="pulse-dot"></span> Live operations</div><p className="eyebrow">{formatLiveDate(now)}</p><h1>{getTimeGreeting(now)}, Jordan <span>✦</span></h1><p className="subheading">Here is what is happening across your business today.</p></div><button className="primary-button" onClick={() => setShowForm(true)}><span>+</span> Add transaction</button></section>
          <section className="metric-grid"><Metric label="Total revenue" value="$84,290" trend="+12.8%" note="vs. previous period" color="mint" chart="revenue" /><Metric label="Open invoices" value="$12,460" trend="+4.2%" note="vs. previous period" color="peach" chart="invoice" /><Metric label="Orders" value="1,284" trend="+8.7%" note="vs. previous period" color="lavender" chart="orders" /><Metric label="Inventory value" value="$248,600" trend="-2.1%" note="vs. previous period" color="yellow" chart="inventory" /></section>
          <section className="content-grid"><div className="panel revenue-panel"><div className="panel-heading"><div><h2>Revenue overview</h2><p>Track your income performance over time</p></div><select value={range} onChange={(event) => setRange(event.target.value)} aria-label="Revenue range"><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select></div><div className="chart"><div className="chart-y"><span>$40k</span><span>$30k</span><span>$20k</span><span>$10k</span><span>$0</span></div><div className="chart-area"><div className="grid-lines"><i></i><i></i><i></i><i></i><i></i></div><div className="line secondary"></div><div className="line primary"></div><div className="chart-tooltip"><strong>$32,840</strong><small>Aug 18, 2024</small></div><div className="chart-x"><span>Jul 24</span><span>Jul 31</span><span>Aug 07</span><span>Aug 14</span><span>Aug 21</span></div></div></div><div className="chart-legend"><span><i className="legend-dot indigo"></i>Revenue</span><span><i className="legend-dot pale"></i>Expenses</span></div></div><div className="panel goal-panel"><div className="panel-heading"><div><h2>Monthly goal</h2><p>Revenue target for August</p></div><button className="dots">•••</button></div><div className="goal-ring"><div><strong>72%</strong><span>achieved</span></div></div><div className="goal-amount"><strong>$84,290</strong><span>of $117,000</span></div><div className="goal-footer"><span><i className="legend-dot indigo"></i>On track</span><b>+ $32,710 to go</b></div></div></section>
          <section className="panel transactions-panel"><div className="panel-heading table-heading"><div><h2>Recent transactions</h2><p>Keep an eye on your latest business activity</p></div><button className="text-button" onClick={() => notify('Showing all transactions')}>View all <span>→</span></button></div><div className="table-tools"><div className="tabs">{['All', 'Paid', 'Pending', 'Overdue'].map((item) => <button key={item} className={status === item ? 'tab active' : 'tab'} onClick={() => setStatus(item)}>{item}{item !== 'All' && <span>{transactions.filter((transaction) => transaction.status === item).length}</span>}</button>)}</div><button className="filter-button" onClick={() => notify(`Filter set to ${range}`)}>≡ Filter</button></div><div className="table-wrap"><table><thead><tr><th>Invoice</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead><tbody>{filteredTransactions.map((transaction) => <tr key={transaction.id}><td><strong>{transaction.id}</strong></td><td><span className={`customer-avatar ${transaction.color}`}>{transaction.initials}</span>{transaction.customer}</td><td>{transaction.date}</td><td><strong>{transaction.amount}</strong></td><td><span className={`status ${transaction.status.toLowerCase()}`}><i></i>{transaction.status}</span></td><td><button className="row-menu" aria-label={`More options for ${transaction.id}`}>•••</button></td></tr>)}</tbody></table>{filteredTransactions.length === 0 && <div className="empty-state">No transactions match your search.</div>}</div></section>
          <section className="bottom-grid"><div className="panel inventory-panel"><div className="panel-heading"><div><h2>Inventory health</h2><p>Stock levels that need your attention</p></div><button className="text-button" onClick={() => setActiveModule('Inventory')}>Manage inventory <span>→</span></button></div><div className="stock-row"><div className="stock-icon red">!</div><div className="stock-info"><strong>Low stock</strong><span>12 products need reordering</span></div><div className="stock-bar"><i style={{ width: '68%' }}></i></div><b className="stock-number">12</b></div><div className="stock-row"><div className="stock-icon amber">◷</div><div className="stock-info"><strong>Expiring soon</strong><span>8 products expire within 30 days</span></div><div className="stock-bar amber-bar"><i style={{ width: '42%' }}></i></div><b className="stock-number">8</b></div></div><div className="panel activity-panel"><div className="panel-heading"><div><h2>Team activity</h2><p>Latest updates from your team</p></div><button className="dots">•••</button></div><div className="activity"><span className="avatar small coral-bg">AM</span><p><strong>Alex Morgan</strong> updated <b>INV-1048</b><small>12 minutes ago</small></p></div><div className="activity"><span className="avatar small green-bg">SK</span><p><strong>Sam Kim</strong> added a new product<small>46 minutes ago</small></p></div></div></section>
          </>}
        </div>
      </main>
      {showForm && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowForm(false)}><form className="modal" onSubmit={addTransaction}><div className="modal-heading"><div><p className="eyebrow">Sales ledger</p><h2>Add transaction</h2></div><button type="button" className="close-button" onClick={() => setShowForm(false)}>×</button></div><label>Customer name<input required autoFocus value={form.customer} onChange={(event) => setForm({ ...form, customer: event.target.value })} placeholder="e.g. Northstar Studio" /></label><label>Amount (USD)<input required min="0" step="0.01" type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0.00" /></label><label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Pending</option><option>Paid</option><option>Overdue</option></select></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="primary-button">Save transaction</button></div></form></div>}
      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  )
}

function Metric({ label, value, trend, note, color, chart }) {
  return <article className={`metric-card ${color}`}><div className="metric-top"><p>{label}</p><button className="metric-menu">•••</button></div><h2>{value}</h2><div className="metric-bottom"><span className={trend.startsWith('-') ? 'trend down' : 'trend'}>{trend}</span><span>{note}</span></div><div className={`mini-chart ${chart}`}><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></article>
}

function ModuleView({ module, onAction }) {
  const details = moduleDetails[module]

  return (
    <section className="module-view">
      <div className="module-view-heading">
        <div><p className="eyebrow">{details.eyebrow}</p><h1>{details.title}</h1><p className="subheading">{details.description}</p></div>
        <button className="primary-button" onClick={onAction}><span>+</span> {details.primary}</button>
      </div>
      <div className="module-stat-grid">{details.stats.map(([label, value]) => <article className="module-stat" key={label}><span>{label}</span><strong>{value}</strong><small>Updated just now</small></article>)}</div>
      <div className="panel module-list"><div className="panel-heading"><div><h2>Latest {module.toLowerCase()} activity</h2><p>Review and manage the latest records in this workspace.</p></div><button className="filter-button" onClick={onAction}>≡ Filter</button></div><div className="module-rows">{details.rows.map((row, index) => <button className="module-row" key={row} onClick={onAction}><span className={`customer-avatar ${['coral', 'blue', 'green'][index]}`}>{row.slice(0, 2).toUpperCase()}</span><span><strong>{row}</strong><small>{module === 'Reports' ? 'Ready to review' : 'Active record'}</small></span><b>View details →</b></button>)}</div></div>
    </section>
  )
}

export default App

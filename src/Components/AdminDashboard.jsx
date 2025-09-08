import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Globe,
  CreditCard,
  BarChart,
  MessageCircle,
  Moon,
  Sun,
  Download,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Settings from "../Components/Settings";
import { Settings as SettingsIcon } from "lucide-react";
import Chatbot from "../Components/Chatbot";
import { API_URL } from "../config";

// CSV Export Helper
const exportCSV = (data, filename) => {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));
  for (const row of data) {
    csvRows.push(headers.map((h) => `"${row[h]}"`).join(","));
  }
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  // Sidebar Menus
  const menus = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "leads", label: "Leads", icon: <Users size={20} /> },
    { id: "bookings", label: "Bookings", icon: <FileText size={20} /> },
    { id: "services", label: "Services", icon: <Globe size={20} /> },
    { id: "payments", label: "Payments", icon: <CreditCard size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart size={20} /> },
    { id: "chatbot", label: "Chatbot", icon: <MessageCircle size={20} /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon size={20} /> },
  ];

  const payments = [
    { id: 1, client: "Ali Khan", amount: "$200", method: "Stripe", status: "Paid" },
    { id: 2, client: "Sara Ahmed", amount: "$350", method: "PayPal", status: "Pending" },
  ];

  const analyticsData = [
    { month: "Jan", leads: 30, bookings: 15 },
    { month: "Feb", leads: 45, bookings: 25 },
    { month: "Mar", leads: 60, bookings: 40 },
    { month: "Apr", leads: 80, bookings: 50 },
    { month: "May", leads: 100, bookings: 70 },
  ];

  // Search Filter
  const filterData = (data, keys) =>
    data.filter((item) =>
      keys.some((key) =>
        item[key].toString().toLowerCase().includes(search.toLowerCase())
      )
    );

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/leads`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const [Leads, setLeads] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/business`)
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Render Content
  const renderContent = () => {
    switch (activeTab) {
      case "leads": {
        const filteredLeads = filterData(Leads, [
          "fullName",
          "businessType",
          "date",
          "status",
        ]);

        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">👥 Leads</h2>
              <button
                onClick={() => exportCSV(filteredLeads, "leads.csv")}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow"
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4 border p-2 rounded">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search leads..."
                className="flex-1 outline-none bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <table className="w-full border shadow rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Business Type</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="text-center border-b">
                    <td className="p-2">{lead.fullName}</td>
                    <td className="p-2">{lead.businessType}</td>
                    <td className="p-2">{lead.date}</td>
                    <td className="p-2">{lead.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      case "bookings": {
        const filteredBookings = filterData(bookings, [
          "fullName",
          "serviceType",
          "status",
        ]);
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">📅 Bookings</h2>
            <table className="w-full border shadow rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Client</th>
                  <th className="p-2">Service Type</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b._id || b.id} className="text-center border-b">
                    <td className="p-2">{b.fullName}</td>
                    <td className="p-2">{b.serviceType}</td>
                    <td className="p-2">{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      case "payments": {
        const filteredPayments = filterData(payments, [
          "client",
          "amount",
          "method",
          "status",
        ]);
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">💳 Payments</h2>
            <table className="w-full border shadow rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Client</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Method</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="text-center border-b">
                    <td className="p-2">{p.client}</td>
                    <td className="p-2">{p.amount}</td>
                    <td className="p-2">{p.method}</td>
                    <td className="p-2">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      case "analytics": {
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">📈 Analytics</h2>
            <div className="w-full h-72 min-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#8884d8" />
                  <Line type="monotone" dataKey="bookings" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      }

      case "settings": {
        return <Settings />;
      }

      case "dashboard": {
        return (
          <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="p-6 rounded-xl shadow bg-blue-600 text-white">
                <h3 className="text-lg font-semibold">Total Leads</h3>
                <p className="text-2xl font-bold">{Leads.length}</p>
              </div>
              <div className="p-6 rounded-xl shadow bg-green-600 text-white">
                <h3 className="text-lg font-semibold">Bookings</h3>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <div className="p-6 rounded-xl shadow bg-yellow-500 text-white">
                <h3 className="text-lg font-semibold">Payments</h3>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
              <div className="p-6 rounded-xl shadow bg-purple-600 text-white">
                <h3 className="text-lg font-semibold">Revenue</h3>
                <p className="text-2xl font-bold">
                  $
                  {payments.reduce(
                    (sum, p) => sum + Number(p.amount.replace("$", "")),
                    0
                  )}
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Line Chart */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow w-full overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">
                  Leads & Bookings Growth
                </h3>
                <div className="w-full h-72 min-w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="leads"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#10b981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow w-full overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Payments Overview</h3>
                <div className="w-full h-72 min-w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={payments.map((p) => ({
                        name: p.client,
                        amount: Number(p.amount.replace("$", "")),
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#f59e0b"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "chatbot": {
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">💬 Chatbot</h2>
            <Chatbot />
          </div>
        );
      }

      default:
        return <h2 className="text-xl">🚀 Welcome to Admin Panel</h2>;
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      } flex h-screen`}
    >
      {/* Sidebar */}
      <aside
        className={`w-64 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg flex flex-col`}
      >
        <div className="p-4 font-bold text-lg border-b">Admin Panel</div>
        <nav className="flex-1 p-2">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left mb-2 transition ${
                activeTab === menu.id
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-200"
              }`}
            >
              {menu.icon}
              {menu.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <span className="text-gray-600 dark:text-gray-300">Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>
        <section
          className={`${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          } rounded-lg shadow p-6`}
        >
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

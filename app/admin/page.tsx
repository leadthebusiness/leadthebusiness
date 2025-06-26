"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  DollarSign,
  BookOpen,
  Clock,
  MoreVertical,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  amount: number;
  paymentStatus: "Paid" | "Pending" | "Partial";
  applicationDate: string;
  status: "Active" | "Under Review" | "Completed" | "Pending";
  address: string;
  experience: string;
}

type SortBy = "date" | "name" | "amount";
type SortOrder = "asc" | "desc";
type PaymentStatus = User["paymentStatus"];
type UserStatus = User["status"];

const setCookie = (name: string, value: string, hours: number) => {
  const expires = new Date(Date.now() + hours * 3600000).toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/;secure;samesite=strict`;
};

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [key, val] = cookie.trim().split("=");
    if (key === name) return val;
  }
  return null;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getUser")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setFilteredUsers(data.data);
      })
      .catch(() => setUsers([]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let filtered = users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm);
      const matchCourse = selectedCourse === "all" || user.course === selectedCourse;

      const matchDate = !dateFilter ||
        new Date(user.applicationDate).toISOString().slice(0, 10) === dateFilter;

      return matchSearch && matchCourse && matchDate;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortBy as keyof User];
      let bVal = b[sortBy as keyof User];

      if (sortBy === "amount") {
        return sortOrder === "asc"
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      }
      if (sortBy === "date") {
        const dateA = new Date(a.applicationDate).getTime();
        const dateB = new Date(b.applicationDate).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, sortBy, sortOrder, selectedCourse, dateFilter]);

  useEffect(() => {
    const auth = getCookie("admin_auth");
    const authTime = getCookie("admin_auth_time");
    if (auth === "authenticated" && authTime) {
      const loginTime = parseInt(authTime);
      const isValid = Date.now() - loginTime < 86400000;
      if (isValid) setIsAuthenticated(true);
      else {
        deleteCookie("admin_auth");
        deleteCookie("admin_auth_time");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setCookie("admin_auth", "authenticated", 24);
      setCookie("admin_auth_time", Date.now().toString(), 24);
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    deleteCookie("admin_auth");
    deleteCookie("admin_auth_time");
  };

  const getStatusColor = (status: UserStatus) => {
    const colorMap = {
      Active: "text-emerald-400 bg-emerald-500/10",
      Pending: "text-amber-400 bg-amber-500/10",
      "Under Review": "text-blue-400 bg-blue-500/10",
      Completed: "text-purple-400 bg-purple-500/10",
    };
    return colorMap[status] || "text-gray-400 bg-gray-500/10";
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    const colorMap = {
      Paid: "text-emerald-400 bg-emerald-500/10",
      Pending: "text-red-400 bg-red-500/10",
      Partial: "text-amber-400 bg-amber-500/10",
    };
    return colorMap[status] || "text-gray-400 bg-gray-500/10";
  };

  const totalRevenue = users.reduce((sum, user) => sum + user.amount, 0);
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const pendingPayments = users.filter((user) => user.paymentStatus === "Pending").length;

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-lg border border-zinc-800/50 w-full max-w-sm">
          <h1 className="text-2xl font-light text-white mb-2 text-center">Admin</h1>
          <p className="text-zinc-400 text-sm text-center mb-6">Enter credentials to access</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 bg-zinc-800/50 border border-zinc-700/50 rounded text-white text-sm placeholder-zinc-500"
            placeholder="Password"
            required
          />
          <button type="submit" className="w-full py-2 bg-white text-black rounded text-sm font-medium hover:bg-zinc-200">Access</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
        <h1 className="text-lg font-light">Admin Panel</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-1.5 rounded text-sm text-white hover:bg-red-500">Logout</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-zinc-900 p-4 rounded shadow">
          <p className="text-zinc-400 text-xs">Users</p>
          <p className="text-lg font-light">{users.length}</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded shadow">
          <p className="text-zinc-400 text-xs">Revenue</p>
          <p className="text-lg font-light">₹{(totalRevenue / 1000).toFixed(0)}k</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded shadow">
          <p className="text-zinc-400 text-xs">Active</p>
          <p className="text-lg font-light">{activeUsers}</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded shadow">
          <p className="text-zinc-400 text-xs">Pending</p>
          <p className="text-lg font-light">{pendingPayments}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white placeholder-zinc-500"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-2 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white"
        >
          <option value="all">All Courses</option>
          <option value="Full Stack Development">Full Stack</option>
          <option value="Data Science">Data Science</option>
          <option value="UI/UX Design">UI/UX</option>
          <option value="Machine Learning">ML</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-2 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white"
        />
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split("-");
            setSortBy(field as SortBy);
            setSortOrder(order as SortOrder);
          }}
          className="px-2 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white"
        >
          <option value="date-desc">Latest</option>
          <option value="date-asc">Oldest</option>
          <option value="name-asc">A-Z</option>
          <option value="amount-desc">Amount ↓</option>
          <option value="amount-asc">Amount ↑</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-zinc-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-900 text-left text-xs text-zinc-400">
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2">Course</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Payment</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                <td className="px-3 py-3">
                  <div className="text-white text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-zinc-400">{user.email}</div>
                  <div className="text-xs text-zinc-500">{user.phone}</div>
                </td>
                <td className="px-3 py-3">{user.course}</td>
                <td className="px-3 py-3">₹{user.amount.toLocaleString()}</td>
                <td className="px-3 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(user.paymentStatus)}`}>
                    {user.paymentStatus}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-3 py-3">{new Date(user.applicationDate).toLocaleDateString("en-GB")}</td>
                <td className="px-3 py-3">
                  <button className="text-zinc-400 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-zinc-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

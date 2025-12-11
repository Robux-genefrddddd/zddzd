import { Link } from "react-router-dom";
import { Files, Users, Palette, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userEmail: string;
  theme: string;
}

const navItems = [
  { id: "files", label: "Files", icon: Files },
  { id: "users", label: "Manage Users", icon: Users },
  { id: "theme", label: "Theme", icon: Palette },
];

export function DashboardSidebar({
  activeTab,
  onTabChange,
  userName,
  userEmail,
  theme,
}: DashboardSidebarProps) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside
      className="w-64 text-white p-6 flex flex-col fixed left-0 top-0 h-screen overflow-y-auto border-r"
      style={{
        backgroundColor: theme === "dark" ? "#111214" : "#F3F4F6",
        borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
        color: theme === "dark" ? "#FFFFFF" : "#111827",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
          style={{
            backgroundColor: theme === "dark" ? "#1A2647" : "#DBEAFE",
            color: theme === "dark" ? "#60A5FA" : "#1E40AF",
          }}
        >
          📦
        </div>
        <span className="text-lg font-bold">FileShare</span>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left"
              style={{
                backgroundColor: isActive
                  ? theme === "dark"
                    ? "rgba(59, 130, 246, 0.15)"
                    : "#DBEAFE"
                  : "transparent",
                color: isActive
                  ? theme === "dark"
                    ? "#60A5FA"
                    : "#1E40AF"
                  : theme === "dark"
                    ? "#9CA3AF"
                    : "#6B7280",
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Card */}
      <div
        className="mt-6 p-4 rounded-lg border space-y-4"
        style={{
          backgroundColor: theme === "dark" ? "#141518" : "#F9FAFB",
          borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold"
            style={{
              backgroundColor: theme === "dark" ? "#1A2647" : "#DBEAFE",
              color: theme === "dark" ? "#60A5FA" : "#1E40AF",
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold truncate"
              style={{ color: theme === "dark" ? "#FFFFFF" : "#111827" }}
            >
              {userName}
            </p>
            <p
              className="text-xs truncate"
              style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}
            >
              {userEmail}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors border font-medium"
          style={{
            backgroundColor: theme === "dark" ? "#0F1113" : "#F3F4F6",
            borderColor: theme === "dark" ? "#1F2124" : "#D1D5DB",
            color: theme === "dark" ? "#9CA3AF" : "#6B7280",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color =
              theme === "dark" ? "#FFFFFF" : "#111827";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color =
              theme === "dark" ? "#9CA3AF" : "#6B7280";
          }}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

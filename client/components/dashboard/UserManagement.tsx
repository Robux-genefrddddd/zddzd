import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface UserManagementProps {
  users: User[];
  theme: string;
  onAddUser: (name: string, email: string, role: "admin" | "user") => void;
  onDeleteUser: (userId: string) => void;
  onUpdateUserRole: (userId: string, role: "admin" | "user") => void;
}

export function UserManagement({
  users,
  theme,
  onAddUser,
  onDeleteUser,
  onUpdateUserRole,
}: UserManagementProps) {
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "user">("user");

  const handleSubmit = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert("Please fill all fields");
      return;
    }
    onAddUser(newUserName, newUserEmail, newUserRole);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("user");
  };

  return (
    <div className="space-y-6">
      {/* Add User Form */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: theme === "dark" ? "#111214" : "#F9FAFB",
          borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
        }}
      >
        <h3
          className="text-lg font-bold mb-4"
          style={{ color: theme === "dark" ? "#FFFFFF" : "#111827" }}
        >
          Add New User
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className="px-4 py-2 rounded-lg border text-sm focus:outline-none"
            style={{
              backgroundColor: theme === "dark" ? "#141518" : "#FFFFFF",
              borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
              color: theme === "dark" ? "#FFFFFF" : "#111827",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor =
                theme === "dark" ? "#2A2E33" : "#D1D5DB";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor =
                theme === "dark" ? "#1F2124" : "#E5E7EB";
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            className="px-4 py-2 rounded-lg border text-sm focus:outline-none"
            style={{
              backgroundColor: theme === "dark" ? "#141518" : "#FFFFFF",
              borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
              color: theme === "dark" ? "#FFFFFF" : "#111827",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor =
                theme === "dark" ? "#2A2E33" : "#D1D5DB";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor =
                theme === "dark" ? "#1F2124" : "#E5E7EB";
            }}
          />
          <select
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value as "admin" | "user")}
            className="px-4 py-2 rounded-lg border text-sm focus:outline-none"
            style={{
              backgroundColor: theme === "dark" ? "#141518" : "#FFFFFF",
              borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
              color: theme === "dark" ? "#FFFFFF" : "#111827",
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-80"
            style={{
              backgroundColor: theme === "dark" ? "#1A2647" : "#DBEAFE",
              color: theme === "dark" ? "#60A5FA" : "#1E40AF",
            }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>
      </div>

      {/* Users List */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: theme === "dark" ? "#111214" : "#FFFFFF",
          borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
        }}
      >
        <div
          className="px-6 py-4 border-b"
          style={{
            borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
          }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: theme === "dark" ? "#FFFFFF" : "#111827" }}
          >
            Team Members {users.length > 0 && `(${users.length})`}
          </h2>
        </div>

        <div
          className="divide-y"
          style={{
            borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
          }}
        >
          {users.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p
                style={{
                  color: theme === "dark" ? "#9CA3AF" : "#6B7280",
                }}
              >
                No team members yet. Add one to get started!
              </p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="px-6 py-4 flex items-center justify-between hover:opacity-75 transition-opacity"
                style={{
                  backgroundColor: theme === "dark" ? "transparent" : "#F9FAFB",
                }}
              >
                <div className="flex-1">
                  <p
                    className="font-medium"
                    style={{
                      color: theme === "dark" ? "#FFFFFF" : "#111827",
                    }}
                  >
                    {user.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: theme === "dark" ? "#9CA3AF" : "#6B7280",
                    }}
                  >
                    {user.email}
                  </p>
                </div>

                <div className="flex items-center gap-3 ml-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      onUpdateUserRole(user.id, e.target.value as "admin" | "user")
                    }
                    className="px-3 py-1 rounded text-sm border focus:outline-none"
                    style={{
                      backgroundColor: theme === "dark" ? "#141518" : "#FFFFFF",
                      borderColor: theme === "dark" ? "#1F2124" : "#E5E7EB",
                      color: theme === "dark" ? "#FFFFFF" : "#111827",
                    }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="p-2 rounded hover:opacity-60 transition-opacity"
                    title="Delete user"
                    style={{
                      color: "#EF4444",
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

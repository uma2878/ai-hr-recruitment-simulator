import React, { useState, useEffect } from "react";
import "./CandidateSettings.css";

function CandidateSettings({ darkMode, setDarkMode }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    const settings =
      JSON.parse(
        localStorage.getItem("settings")
      ) || {};

    setEmail(settings.email || "");

    const savedNotifications =
      JSON.parse(
        localStorage.getItem(
          "notifications"
        )
      ) || [
        {
          id: 1,
          text:
            "📄 Resume uploaded successfully",
          read: false
        },
        {
          id: 2,
          text:
            "💼 New Frontend Developer jobs available",
          read: false
        },
        {
          id: 3,
          text:
            "🎤 Mock Interview completed",
          read: true
        }
      ];

    setNotifications(savedNotifications);

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

  }, [notifications]);

  const saveSettings = () => {

    const settings = {
      email,
      darkMode
    };

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    alert(
      "✅ Settings Saved Successfully"
    );
  };

  const updatePassword = () => {

    if (password.length < 6) {
      alert(
        "Password should be at least 6 characters"
      );
      return;
    }

    localStorage.setItem(
      "userPassword",
      password
    );

    alert(
      "✅ Password Updated Successfully"
    );

    setPassword("");
  };

  const markAllRead = () => {

    const updated =
      notifications.map((item) => ({
        ...item,
        read: true
      }));

    setNotifications(updated);
  };

  const deleteAccount = () => {

    const confirmDelete =
      window.confirm(
        "Delete account permanently?"
      );

    if (!confirmDelete) return;

    localStorage.clear();

    alert(
      "✅ Account Deleted Successfully"
    );

    window.location.reload();
  };

  const unreadCount =
    notifications.filter(
      (item) => !item.read
    ).length;

  return (
    <div className="settings-container">

      <h1>⚙️ Settings</h1>

      {/* Notification Center */}

      <div className="settings-card">

        <button
          className="notification-btn"
          onClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
        >
          🔔 Notifications

          <span className="badge">
            {unreadCount}
          </span>

        </button>

        {showNotifications && (

          <div className="notification-panel">

            <h3>
              Your Notifications
            </h3>

            {notifications.length === 0 ? (

              <p>
                No Notifications
              </p>

            ) : (

              notifications.map(
                (item) => (
                  <div
                    key={item.id}
                    className={
                      item.read
                        ? "notification-card read"
                        : "notification-card unread"
                    }
                  >
                    {item.text}
                  </div>
                )
              )
            )}

            <button
              className="mark-read-btn"
              onClick={markAllRead}
            >
              Mark All Read
            </button>

          </div>

        )}

      </div>

      {/* Email */}

      <div className="settings-card">

        <h3>
          👤 Edit Profile
        </h3>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

      </div>

      {/* Password */}

      <div className="settings-card">

        <h3>
          🔐 Change Password
        </h3>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="action-btn"
          onClick={
            updatePassword
          }
        >
          Update Password
        </button>

      </div>

      {/* Dark Mode */}

      <div className="settings-card">

        <h3>
          🌙 Appearance
        </h3>

        <label>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(
                !darkMode
              )
            }
          />

          Enable Dark Mode

        </label>

      </div>

      {/* Buttons */}

      <div className="settings-buttons">

        <button
          className="save-btn"
          onClick={saveSettings}
        >
          Save Settings
        </button>

        <button
          className="delete-btn"
          onClick={deleteAccount}
        >
          Delete Account
        </button>

      </div>

    </div>
  );
}

export default CandidateSettings;
import { useEffect, useState } from "react";
import { API_URL } from "../config";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "",
    logoUrl: "",
    footer: {
      contactEmail: "",
      contactPhone: "",
      address: "",
    },
  });

  // Fetch existing settings
  const loadSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`❌ Failed: ${res.status}`);
      const data = await res.json();

      setSettings({
        companyName: data.settings.companyName || "",
        logoUrl: data.settings.logoUrl || "",
        footer: {
          contactEmail: data.settings.footer?.email || "",
          contactPhone: data.settings.footer?.phone || "",
          address: data.settings.footer?.address || "",
        },
      });
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("logo", file);

    try {
   const res = await fetch(`${API_URL}/api/upload/logo`, {
  method: "POST",
  body: formData,
  credentials: "include",
});
const data = await res.json();
      if (data.success) {
  // save only filename to be persisted on PUT
  setSettings(prev => ({ ...prev, logoUrl: data.fileUrl }));
      } else {
        alert("❌ Upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  // Save updated settings
const handleSave = async () => {
  try {
    const res = await fetch(`${API_URL}/api/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        companyName: settings.companyName,
        logoUrl: settings.logoUrl.split("/").pop(), // send only filename
        footer: {
          email: settings.footer.contactEmail,
          phone: settings.footer.contactPhone,
          address: settings.footer.address,
        },
      }),
    });

    if (!res.ok) throw new Error(`❌ Failed to save: ${res.status}`);
    const data = await res.json();

    // ✅ Always use backend response for state
    setSettings({
      companyName: data.settings.companyName,
      logoUrl: data.settings.logoUrl,
      footer: {
        contactEmail: data.settings.footer.email,
        contactPhone: data.settings.footer.phone,
        address: data.settings.footer.address,
      },
    });

    alert("✅ Settings updated!");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to update settings");
  }
};


  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-0">
      <h2 className="text-2xl font-bold text-center sm:text-left">
        ⚙️ Website Settings
      </h2>

      {/* Company Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <label className="block font-semibold">Company Name</label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) =>
              setSettings({ ...settings, companyName: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Logo upload & URL */}
        <div className="col-span-1 sm:col-span-2">
          <label className="block font-semibold mt-2">Logo</label>

          {/* Preview */}
          {settings.logoUrl && (
 <img
  src={
    settings.logoUrl.startsWith("http")
      ? settings.logoUrl
      : `${API_URL}/uploads/${settings.logoUrl}`
  }
  alt="Logo"
  className="w-32 h-32 object-contain mb-2"
/>


          )}

          {/* URL Input */}
          <input
            type="text"
            placeholder="Paste logo URL"
            value={settings.logoUrl}
            onChange={(e) =>
              setSettings({ ...settings, logoUrl: e.target.value })
            }
            className="border p-2 rounded w-full mb-2"
          />

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="text"
            value={settings.footer.contactEmail}
            onChange={(e) =>
              setSettings({
                ...settings,
                footer: { ...settings.footer, contactEmail: e.target.value },
              })
            }
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Phone</label>
          <input
            type="text"
            value={settings.footer.contactPhone}
            onChange={(e) =>
              setSettings({
                ...settings,
                footer: { ...settings.footer, contactPhone: e.target.value },
              })
            }
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold">Address</label>
          <input
            type="text"
            value={settings.footer.address}
            onChange={(e) =>
              setSettings({
                ...settings,
                footer: { ...settings.footer, address: e.target.value },
              })
            }
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto block sm:ml-auto"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;

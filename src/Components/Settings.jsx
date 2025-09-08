import { useEffect, useState } from "react";
import { API_URL } from "../config"

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

  // Fetch existing settings from backend
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/settings")
  //     .then((res) => res.json())
  //     .then((data) =>
  //       setSettings({
  //         companyName: data.companyName || "",
  //         logoUrl: data.logoUrl || "",
  //         footer: {
  //           contactEmail: data.footer?.contactEmail || "",
  //           contactPhone: data.footer?.contactPhone || "",
  //           address: data.footer?.address || "",
  //         },
  //       })
  //     )
  //     .catch((err) => console.error("Error fetching settings:", err));
  // }, []);


//   useEffect(() => {
//   fetch("http://localhost:5000/api/settings")
//     .then((res) => res.json())
//     .then((data) =>
//       setSettings({
//         companyName: data.settings.companyName || "",
//         logoUrl: data.settings.logoUrl || "",
//         footer: {
//           contactEmail: data.settings.footer?.email || "",
//           contactPhone: data.settings.footer?.phone || "",
//           address: data.settings.footer?.address || "",
//         },
//       })
//     )
//     .catch((err) => console.error("Error fetching settings:", err));
// }, []);




useEffect(() => {
  fetch(`${API_URL}/api/settings`)
    .then((res) => res.json())
    .then((data) => {
      setSettings({
        companyName: data.settings.companyName,
        logoUrl: data.settings.logoUrl,
        footer: {
          contactEmail: data.settings.footer?.email || "",
          contactPhone: data.settings.footer?.phone || "",
          address: data.settings.footer?.address || "",
        },
      });
    })
    .catch((err) => console.error("Error fetching settings:", err));
}, [  ]);



  // Save updated settings
 const handleSave = async () => {
  await fetch(`${API_URL}/api/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      companyName: settings.companyName,
      logoUrl: settings.logoUrl,
      footer: {
        email: settings.footer.contactEmail,
        phone: settings.footer.contactPhone,
        address: settings.footer.address,
      },
    }),
  });
  alert("✅ Settings updated!");
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

        <div className="col-span-1 sm:col-span-2">
          <label className="block font-semibold mt-2">Logo URL</label>
          <input
            type="text"
            value={settings.logoUrl}
            onChange={(e) =>
              setSettings({ ...settings, logoUrl: e.target.value })
            }
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

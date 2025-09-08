import React, { useState } from "react";



const Chatbot = () => {
  const [activeTab, setActiveTab] = useState("company");

  // Company Info
  const [company, setCompany] = useState({
    address: "",
    email: "",
    phone: "",
    services: "",
  });

  // FAQs
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  // Docs
  const [documents, setDocuments] = useState([]);

  // Handle FAQ add/remove
  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => {
    const newFaqs = [...faqs];
    newFaqs.splice(index, 1);
    setFaqs(newFaqs);
  };

  // Handle Document Upload
  const handleFileUpload = (e) => {
    setDocuments([...documents, ...Array.from(e.target.files)]);
  };

  // Sync with Chatbase
  const handleSync = async () => {
  try {
    const response = await fetch("https://www.chatbase.co/api/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_API_KEY", // replace with real key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatbotId: "H111N1NlZHuYwiizxYEAI",
        messages: [
          { role: "user", content: "Train the bot with latest data" }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error("❌ Failed: " + response.status);
    }

    const data = await response.json();
    console.log("✅ Chatbase Response:", data);
  } catch (err) {
    console.error("Error syncing chatbot:", err);
  }
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🤖 Chatbot Training</h2>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {["company", "faqs", "documents"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab === "company"
              ? "🏢 Company Info"
              : tab === "faqs"
              ? "❓ FAQs"
              : "📄 Documents"}
          </button>
        ))}
      </div>

      {/* Company Info */}
      {activeTab === "company" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Address"
            value={company.address}
            onChange={(e) =>
              setCompany({ ...company, address: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={company.email}
            onChange={(e) => setCompany({ ...company, email: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Phone"
            value={company.phone}
            onChange={(e) => setCompany({ ...company, phone: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Services (comma separated)"
            value={company.services}
            onChange={(e) =>
              setCompany({ ...company, services: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>
      )}

      {/* FAQs */}
      {activeTab === "faqs" && (
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border p-4 rounded space-y-2">
              <input
                type="text"
                placeholder="Question"
                value={faq.question}
                onChange={(e) => {
                  const updated = [...faqs];
                  updated[idx].question = e.target.value;
                  setFaqs(updated);
                }}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) => {
                  const updated = [...faqs];
                  updated[idx].answer = e.target.value;
                  setFaqs(updated);
                }}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={() => removeFaq(idx)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addFaq}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ➕ Add FAQ
          </button>
        </div>
      )}

      {/* Documents */}
      {activeTab === "documents" && (
        <div className="space-y-4">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500"
          />
          <ul className="list-disc pl-5">
            {documents.map((doc, idx) => (
              <li key={idx}>{doc.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Sync Button */}
      <div className="mt-6">
        <button
          onClick={handleSync}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          🔄 Update Chatbot Training
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

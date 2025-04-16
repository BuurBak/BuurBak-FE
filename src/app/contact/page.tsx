// src/app/contact/page.tsx
"use client";
import React, { ChangeEvent, useState } from "react";
import { sendEmail } from "./sendEmail";
import SuccessPopup from "./SuccesPopup";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    try {
      await sendEmail(data);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Fout bij verzenden e-mail:", error);
      alert("Er is een probleem opgetreden bij het verzenden van de e-mail.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      {showPopup && <SuccessPopup message="E-mail succesvol verzonden!" />}

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Contacteer ons
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Naam
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full px-3 py-2 border border-primary-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Uw naam"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full px-3 py-2 border border-primary-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Uw email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Bericht
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full px-3 py-2 border border-primary-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Uw bericht"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary-100 text-white font-semibold rounded-md hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50"
          >
            Verstuur
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;

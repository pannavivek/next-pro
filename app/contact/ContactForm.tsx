'use client';

import { useState } from 'react';

const FORM_ID = process.env.NEXT_PUBLIC_CF7_FORM_ID;

const CF7_ENDPOINT =
  `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`;

export default function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const [formData, setFormData] = useState({
    your_name: '',
    your_email: '',
    your_subject: '',
    your_message: '',
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setStatus('sending');

    const body = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      body.append(key, value);
    });

    try {
      const response = await fetch(CF7_ENDPOINT, {
        method: 'POST',
        body,
      });

      const result = await response.json();

      if (result.status === 'mail_sent') {
        setStatus('success');

        setFormData({
          your_name: '',
          your_email: '',
          your_subject: '',
          your_message: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      {status === 'success' && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-700">
          Message sent successfully.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          Something went wrong. Please try again.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="block mb-2 text-sm">
            Name
          </label>

          <input
            type="text"
            required
            value={formData.your_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                your_name: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">
            Email
          </label>

          <input
            type="email"
            required
            value={formData.your_email}
            onChange={(e) =>
              setFormData({
                ...formData,
                your_email: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">
            Subject
          </label>

          <input
            type="text"
            value={formData.your_subject}
            onChange={(e) =>
              setFormData({
                ...formData,
                your_subject: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">
            Message
          </label>

          <textarea
            rows={5}
            required
            value={formData.your_message}
            onChange={(e) =>
              setFormData({
                ...formData,
                your_message: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-8 py-3 rounded-lg bg-black text-white disabled:opacity-50"
        >
          {status === 'sending'
            ? 'Sending...'
            : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
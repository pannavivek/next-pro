'use client';

import { useState } from 'react';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL!;
const FORM_ID = process.env.NEXT_PUBLIC_CF7_FORM_ID!;

const CF7_ENDPOINT = `${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`;

console.log('===================================='); 
console.log('WP_URL:', WP_URL); 
console.log('FORM_ID:', FORM_ID);
console.log('CF7_ENDPOINT:', CF7_ENDPOINT); 
console.log('====================================');

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

    // Contact Form 7 required hidden fields
    body.append('_wpcf7', FORM_ID);
    body.append('_wpcf7_version', '6.1.6');
    body.append('_wpcf7_locale', 'en_US');
    body.append('_wpcf7_unit_tag', `wpcf7-f${FORM_ID}-o1`);
    body.append('_wpcf7_container_post', '0');

    // Form fields
    body.append('your_name', formData.your_name);
    body.append('your_email', formData.your_email);
    body.append('your_subject', formData.your_subject);
    body.append('your_message', formData.your_message);

    try {
      const response = await fetch(CF7_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body,
      });

      const result = await response.json();

      if (
        response.ok &&
        result.status === 'mail_sent'
      ) {
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
          <label className="mb-2 block text-sm">
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
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">
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
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">
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
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">
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
            className="w-full resize-none rounded-lg border px-4 py-3"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-lg bg-black px-8 py-3 text-white disabled:opacity-50"
        >
          {status === 'sending'
            ? 'Sending...'
            : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
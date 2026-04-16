import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { portfolioData } from "../data";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setFormError(null);

    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setFormError("Please verify the email id you entered.");
      return;
    }

    // NOTE: Frontend-only "email sending" isn't possible without a backend/email service.
    // Instead, we open the user's mail client with a prefilled message.
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);

    const to = portfolioData.email; // sreehari9011@gmail.com
    const subject = `Contact: ${formData.name || "New message"}`;
    const body = `Name: ${formData.name}\nEmail: ${email}\n\nMessage:\n${formData.message}\n`;
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-zinc-800/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Get in Touch</h2>
          <div className="h-px w-12 bg-zinc-700 mb-8"></div>
          <p className="text-zinc-400 mb-12 max-w-md leading-relaxed">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Mail size={20} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium mb-1">Email</p>
                <a href={`mailto:${portfolioData.email}`} className="hover:text-white transition-colors">
                  {portfolioData.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Phone size={20} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium mb-1">Phone</p>
                <a href={`tel:${portfolioData.phone}`} className="hover:text-white transition-colors">
                  {portfolioData.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <MapPin size={20} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium mb-1">Location</p>
                <p>Kollam, Kerala, India</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormError(null);
                  setFormData({ ...formData, email: e.target.value });
                }}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                placeholder="john@example.com"
              />
              {formError ? (
                <p className="mt-2 text-sm text-red-400" role="alert">
                  {formError}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className="w-full flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 py-4 rounded-xl font-medium hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Sending..."
              ) : submitted ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

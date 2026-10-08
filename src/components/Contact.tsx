import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { portfolioData } from "../data";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessNotice(null);

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) {
      setFormError("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!message) {
      setFormError("Please write your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _replyto: email,
          message: message,
          _subject: `New Portfolio Message from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== "false") {
        setSubmitted(true);
        setSuccessNotice(`Thank you, ${name}! Your message has been sent to ${portfolioData.email}.`);
        setFormData({ name: "", email: "", message: "" });
      } else if (data?.message && data.message.toLowerCase().includes("activation")) {
        setSubmitted(true);
        setSuccessNotice(
          `Form submitted! Note for ${portfolioData.email}: FormSubmit sent a 1-click 'Activate Form' confirmation email to your inbox. Once clicked, all future submissions will deliver directly to your inbox.`
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data?.message || "Failed to send message");
      }
    } catch {
      setFormError(
        "Could not send message automatically. You can send it directly through your email client instead."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoFallback = () => {
    const to = portfolioData.email;
    const subject = `Contact: ${formData.name || "Portfolio Inquiry"}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-zinc-800/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Get in Touch</h2>
          <div className="h-px w-12 bg-zinc-700 mb-8"></div>
          <p className="text-zinc-400 mb-12 max-w-md leading-relaxed">
            I'm currently open to new opportunities. Send me a message below and it will be delivered directly to my inbox at <span className="text-zinc-200 font-medium">{portfolioData.email}</span>.
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
          {submitted ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-zinc-100 mb-2">Message Sent!</h3>
                <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
                  {successNotice || `Your message has been delivered to ${portfolioData.email}. I'll get back to you shortly.`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSuccessNotice(null);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-700 text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
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
                  onChange={(e) => {
                    setFormError(null);
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-600"
                  placeholder="Your Name"
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
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-600"
                  placeholder="your.email@example.com"
                />
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
                  onChange={(e) => {
                    setFormError(null);
                    setFormData({ ...formData, message: e.target.value });
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all resize-none placeholder:text-zinc-600"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              {formError && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-900/50 text-red-300 text-sm flex flex-col gap-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
                    <p>{formError}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleMailtoFallback}
                    className="self-start text-xs underline font-medium hover:text-red-200 transition-colors"
                  >
                    Open email client with prefilled message →
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 py-4 rounded-xl font-medium hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending to {portfolioData.email}...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}


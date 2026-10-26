import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Globe, MessageSquare } from "lucide-react";
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
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
        {/* Left Column: Direct Contact Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0284c7] dark:text-[#61dafb] font-semibold mb-2">
              <MessageSquare size={14} />
              <span>Direct Inquiries</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Available for Senior Software Engineer roles, mobile consulting, and collaborative React Native projects.
            </p>

            <div className="space-y-4">
              <motion.a
                whileHover={{ x: 4 }}
                href={`mailto:${portfolioData.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-[#61dafb]/40 transition-colors group shadow-2xs"
              >
                <div className="w-11 h-11 rounded-xl bg-[#61dafb]/10 text-[#0284c7] dark:text-[#61dafb] flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-medium">Email Address</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#0284c7] dark:group-hover:text-[#61dafb] transition-colors">
                    {portfolioData.email}
                  </p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ x: 4 }}
                href={`tel:${portfolioData.phone}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-[#61dafb]/40 transition-colors group shadow-2xs"
              >
                <div className="w-11 h-11 rounded-xl bg-[#61dafb]/10 text-[#0284c7] dark:text-[#61dafb] flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-medium">Phone</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#0284c7] dark:group-hover:text-[#61dafb] transition-colors">
                    {portfolioData.phone}
                  </p>
                </div>
              </motion.a>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-2xs">
                <div className="w-11 h-11 rounded-xl bg-[#61dafb]/10 text-[#0284c7] dark:text-[#61dafb] flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-medium">Location</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    {portfolioData.address}
                  </p>
                </div>
              </div>

              <motion.a
                whileHover={{ x: 4 }}
                href={portfolioData.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-[#61dafb]/40 transition-colors group shadow-2xs"
              >
                <div className="w-11 h-11 rounded-xl bg-[#61dafb]/10 text-[#0284c7] dark:text-[#61dafb] flex items-center justify-center shrink-0">
                  <Globe size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-medium">Custom Domain</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#0284c7] dark:group-hover:text-[#61dafb] transition-colors">
                    sreeharis.co.in
                  </p>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-7 p-8 sm:p-9 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm"
        >
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={28} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Message Delivered
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  {successNotice || `Your note was routed directly to ${portfolioData.email}. I'll respond as soon as possible.`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSuccessNotice(null);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-[#61dafb] hover:text-[#0284c7] dark:hover:text-[#61dafb] transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4.5">
              <div>
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
                  Full Name
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
                  className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#61dafb] focus:ring-2 focus:ring-[#61dafb]/10 transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
                  Email Address
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
                  className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#61dafb] focus:ring-2 focus:ring-[#61dafb]/10 transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
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
                  className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#61dafb] focus:ring-2 focus:ring-[#61dafb]/10 transition-all resize-none"
                  placeholder="Tell me about your mobile project, tech stack, or open role..."
                />
              </div>

              {formError && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex flex-col gap-1.5">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-500" />
                    <span>{formError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleMailtoFallback}
                    className="self-start text-[11px] underline font-medium hover:text-red-900 dark:hover:text-red-100"
                  >
                    Open email client instead →
                  </button>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#61dafb] hover:bg-[#38bdf8] text-[#0b0f19] py-4 rounded-xl font-extrabold text-sm transition-all shadow-md hover:shadow-[#61dafb]/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#0b0f19]" />
                    Sending to {portfolioData.email}...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

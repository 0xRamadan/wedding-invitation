import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookHeart, Send, Heart, Quote, User } from "lucide-react";

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

const defaultMessages: GuestMessage[] = [
  {
    id: "default-1",
    name: "أم العروسة",
    message: "ربنا يتمم لكم على خير ويبارك لكم في حياتكم يا حبايبي ❤️",
    timestamp: new Date("2026-09-20T14:30:00"),
  },
  {
    id: "default-2",
    name: "أحمد خالد",
    message: "ألف مبروك يا رشاد! عقبال الفرح الكبير إن شاء الله 🎉",
    timestamp: new Date("2026-09-21T10:15:00"),
  },
  {
    id: "default-3",
    name: "سارة محمود",
    message: "ما شاء الله عليكم! أحلى ثنائي، ربنا يسعدكم دايماً 💍",
    timestamp: new Date("2026-09-22T18:45:00"),
  },
  {
    id: "default-4",
    name: "عم العريس",
    message: "بارك الله لكما وبارك عليكما وجمع بينكما في خير",
    timestamp: new Date("2026-09-23T09:00:00"),
  },
];

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return "اليوم";
  if (days === 1) return "أمس";
  if (days < 7) return `منذ ${days} أيام`;
  if (days < 30) return `منذ ${Math.floor(days / 7)} أسابيع`;
  return `منذ ${Math.floor(days / 30)} شهور`;
}

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>(defaultMessages);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSent, setJustSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newMessage: GuestMessage = {
        id: `msg-${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [newMessage, ...prev]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
      setJustSent(true);
      setTimeout(() => setJustSent(false), 2000);
    }, 800);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto mb-24 flex flex-col items-center relative"
    >
      {/* Background Watermark */}
      <span className="absolute text-[60px] sm:text-[110px] font-sans font-black text-brand-faint -z-10 opacity-60 uppercase tracking-tighter pointer-events-none select-none top-0">
        WISHES
      </span>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-accent">
          <BookHeart size={20} strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="font-serif tracking-[0.25em] text-sm uppercase font-bold text-brand-primary mb-2">
        GUESTBOOK
      </h2>
      <h3 className="font-arabic text-2xl sm:text-3xl font-bold text-brand-accent mb-3">
        دفتر التهاني
      </h3>
      <p className="font-arabic text-sm text-brand-secondary max-w-sm mx-auto mb-10 font-medium">
        اكتب لنا كلمة حلوة تفرحنا 💕
      </p>

      {/* Submit Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-4 mb-10"
        dir="rtl"
      >
        <div className="bg-gradient-to-b from-white/90 to-brand-faint/70 backdrop-blur-sm border border-brand-border/40 rounded-2xl p-5 shadow-sm">
          {/* Name Input */}
          <div className="mb-4">
            <label className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest text-brand-secondary mb-1.5">
              <User size={12} />
              <span>الاسم</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اكتب اسمك"
              className="w-full px-4 py-2.5 bg-white/80 border border-brand-border/40 rounded-xl font-arabic text-sm text-brand-primary placeholder:text-brand-border focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
            />
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest text-brand-secondary mb-1.5">
              <Heart size={12} />
              <span>التهنئة</span>
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب تهنئتك هنا..."
              rows={3}
              className="w-full px-4 py-2.5 bg-white/80 border border-brand-border/40 rounded-xl font-arabic text-sm text-brand-primary placeholder:text-brand-border focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 text-[11px] uppercase tracking-[0.2em] font-sans font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer border-none transition-all duration-300 ${
              justSent
                ? "bg-green-600 text-white"
                : "bg-brand-primary text-brand-bg hover:bg-brand-accent"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-brand-bg/30 border-t-brand-bg rounded-full"
              />
            ) : justSent ? (
              "✓ تم الإرسال"
            ) : (
              <>
                <Send size={14} />
                <span>إرسال التهنئة</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Messages Grid */}
      <div className="w-full px-4 columns-1 sm:columns-2 gap-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index < 4 ? index * 0.1 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="break-inside-avoid bg-gradient-to-br from-white/90 to-brand-faint/70 backdrop-blur-sm border border-brand-border/40 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote icon */}
              <Quote size={16} className="text-brand-accent/40 mb-2 rotate-180" />

              {/* Message */}
              <p className="font-arabic text-sm text-brand-primary leading-relaxed mb-3 font-medium" dir="rtl">
                {msg.message}
              </p>

              {/* Author & Time */}
              <div className="flex items-center justify-between border-t border-brand-border/30 pt-2.5" dir="rtl">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center">
                    <span className="font-arabic text-[10px] font-bold text-brand-accent">
                      {msg.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-arabic text-xs font-bold text-brand-primary">
                    {msg.name}
                  </span>
                </div>
                <span className="font-arabic text-[10px] text-brand-secondary">
                  {formatTimeAgo(msg.timestamp)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

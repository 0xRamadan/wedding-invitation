import React, { useState } from "react";
import { motion } from "motion/react";
import { BookHeart, Send, Heart, User, CheckCircle } from "lucide-react";
import { saveMessage } from "../utils/guestbookStorage";

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveMessage(name, message);
      setName("");
      setMessage("");
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleSendAnother = () => {
    setIsSubmitted(false);
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

      {!isSubmitted ? (
        /* Submit Form */
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md px-4"
          dir="rtl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
              className="w-full py-3 text-[11px] uppercase tracking-[0.2em] font-sans font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer border-none transition-all duration-300 bg-brand-primary text-brand-bg hover:bg-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-brand-bg/30 border-t-brand-bg rounded-full"
                />
              ) : (
                <>
                  <Send size={14} />
                  <span>إرسال التهنئة</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      ) : (
        /* Success State */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="w-full max-w-md px-4 text-center"
        >
          <div className="bg-gradient-to-b from-white/90 to-brand-faint/70 backdrop-blur-sm border border-brand-border/40 rounded-2xl p-8 shadow-sm">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
              className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle size={32} className="text-green-600" strokeWidth={1.5} />
            </motion.div>

            <h4 className="font-arabic text-xl font-bold text-brand-primary mb-2">
              تم إرسال تهنئتك بنجاح 💌
            </h4>
            <p className="font-arabic text-sm text-brand-secondary mb-6">
              شكراً لكلماتك الحلوة، هتوصل للعروسين مباشرة
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSendAnother}
              className="px-8 py-2.5 bg-brand-faint text-brand-primary text-[11px] uppercase tracking-[0.2em] font-sans font-bold border border-brand-border/50 rounded-full hover:bg-brand-border/30 transition-colors cursor-pointer"
            >
              إرسال تهنئة أخرى
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}

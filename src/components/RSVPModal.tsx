import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, UserCheck, Users, MessageSquare, Sparkles, Send } from "lucide-react";

interface RSVPData {
  name: string;
  guests: number;
  message: string;
}

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const [formData, setFormData] = useState<RSVPData>({
    name: "",
    guests: 1,
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", guests: 1, message: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gradient-to-b from-white via-brand-bg to-brand-faint border border-brand-border/50 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
          >
            {/* Background decorative corners */}
            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-brand-border/40 m-3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-brand-border/40 m-3 pointer-events-none" />

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-faint border border-brand-border/40 flex items-center justify-center text-brand-secondary hover:text-brand-primary hover:bg-brand-border/30 transition-colors cursor-pointer z-20"
            >
              <X size={16} />
            </motion.button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center mx-auto mb-4">
                      <UserCheck size={24} className="text-brand-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-brand-primary mb-1">
                      RSVP
                    </h3>
                    <p className="font-arabic text-lg text-brand-accent font-bold">
                      أكّد حضورك
                    </p>
                    <p className="font-arabic text-sm text-brand-secondary mt-2">
                      يسعدنا تأكيدكم لحضور حفل خطوبتنا
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-brand-secondary mb-2">
                        <UserCheck size={14} />
                        <span>الاسم الكريم</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أدخل اسمك الكريم"
                        className="w-full px-4 py-3 bg-white/80 border border-brand-border/50 rounded-xl font-arabic text-brand-primary placeholder:text-brand-border focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
                      />
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-brand-secondary mb-2">
                        <Users size={14} />
                        <span>عدد المرافقين</span>
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-white/80 border border-brand-border/50 rounded-xl font-arabic text-brand-primary focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n === 1 ? "شخص واحد" : `${n} أشخاص`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-brand-secondary mb-2">
                        <MessageSquare size={14} />
                        <span>رسالة (اختياري)</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="كلمة حلوة..."
                        rows={3}
                        className="w-full px-4 py-3 bg-white/80 border border-brand-border/50 rounded-xl font-arabic text-brand-primary placeholder:text-brand-border focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.name.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 bg-brand-primary text-brand-bg text-[11px] uppercase tracking-[0.25em] font-sans font-bold hover:bg-brand-accent transition-all duration-300 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-none"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-brand-bg/30 border-t-brand-bg rounded-full"
                        />
                      ) : (
                        <>
                          <Send size={14} />
                          <span>تأكيد الحضور</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 relative"
                >
                  {/* Success sparkles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 200],
                          y: [0, (Math.random() - 0.5) * 200],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          ease: "easeOut",
                        }}
                        className="absolute top-1/2 left-1/2"
                      >
                        <Sparkles size={12 + Math.random() * 8} className="text-brand-accent" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    >
                      <UserCheck size={32} className="text-green-600" strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>

                  <h3 className="font-arabic text-2xl font-bold text-brand-primary mb-2">
                    تم تأكيد حضورك! 🎉
                  </h3>
                  <p className="font-arabic text-brand-secondary mb-1">
                    شكراً <span className="font-bold text-brand-accent">{formData.name}</span>
                  </p>
                  <p className="font-arabic text-sm text-brand-secondary">
                    {formData.guests === 1
                      ? "بانتظارك يوم الفرحة"
                      : `بانتظاركم (${formData.guests} أشخاص) يوم الفرحة`}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="mt-8 px-8 py-3 bg-brand-faint text-brand-primary text-[11px] uppercase tracking-[0.2em] font-sans font-bold border border-brand-border/50 rounded-full hover:bg-brand-border/30 transition-colors cursor-pointer"
                  >
                    إغلاق
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookHeart, ChevronLeft, ChevronRight, BookOpen, Heart } from "lucide-react";
import { getMessages, formatArabicDate } from "../utils/guestbookStorage";
import type { GuestMessage } from "../utils/guestbookStorage";

export default function PrivateGuestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // 0 = cover
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const totalPages = messages.length + 2; // cover + messages + back cover

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") goToPrev();
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const goToNext = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage, totalPages]);

  const goToPrev = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext(); // swipe left → next
      else goToPrev(); // swipe right → prev
    }
    setTouchStartX(null);
  };

  // Page flip animation variants
  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const pageTransition = {
    type: "tween" as const,
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
  };

  const renderPage = () => {
    // Cover page
    if (currentPage === 0) {
      return (
        <motion.div
          key="cover"
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="book-page book-cover"
        >
          <div className="flex flex-col items-center justify-center h-full text-center p-8 relative">
            {/* Decorative corner ornaments */}
            <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-brand-accent/50" />
            <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-brand-accent/50" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-brand-accent/50" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-brand-accent/50" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="w-20 h-20 rounded-full bg-brand-accent/10 border-2 border-brand-accent/40 flex items-center justify-center mb-8"
            >
              <BookHeart size={36} className="text-brand-accent" strokeWidth={1} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="font-calligraphy text-4xl sm:text-5xl text-brand-primary mb-4 leading-relaxed">
                دفتر التهاني
              </h1>
              <div className="w-24 h-[1px] bg-brand-accent/60 mx-auto mb-6" />
              <p className="font-serif text-2xl sm:text-3xl text-brand-primary italic mb-2">
                Rashad & Esraa
              </p>
              <p className="font-calligraphy text-xl text-brand-accent mt-4">
                رشاد و إسراء
              </p>
              <div className="w-24 h-[1px] bg-brand-accent/60 mx-auto mt-6 mb-4" />
              <p className="font-sans text-xs text-brand-secondary tracking-[0.3em] uppercase">
                25 September 2026
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-0 right-0 text-center"
            >
              <p className="font-arabic text-xs text-brand-secondary animate-pulse">
                اقلب الصفحة لتقرأ التهاني ←
              </p>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    // Back cover
    if (currentPage === totalPages - 1) {
      return (
        <motion.div
          key="back-cover"
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="book-page book-cover"
        >
          <div className="flex flex-col items-center justify-center h-full text-center p-8 relative">
            <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-brand-accent/50" />
            <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-brand-accent/50" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-brand-accent/50" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-brand-accent/50" />

            <Heart size={40} className="text-brand-accent/60 mb-6" strokeWidth={1} fill="currentColor" />

            <h2 className="font-calligraphy text-3xl text-brand-primary mb-4">
              شكراً لكل كلمة حلوة
            </h2>
            <div className="w-16 h-[1px] bg-brand-accent/50 mx-auto mb-4" />
            <p className="font-calligraphy text-lg text-brand-secondary leading-relaxed max-w-xs">
              كل رسالة منكم هي ذكرى جميلة هنفتكرها طول العمر
            </p>
            <p className="font-serif text-sm text-brand-accent italic mt-8">
              — R & E —
            </p>

            <div className="absolute bottom-8">
              <p className="font-arabic text-xs text-brand-secondary">
                {messages.length > 0
                  ? `${messages.length} تهنئة من الأحباب 💕`
                  : "في انتظار تهانيكم 💕"}
              </p>
            </div>
          </div>
        </motion.div>
      );
    }

    // Message pages
    const msg = messages[currentPage - 1];
    if (!msg) return null;

    return (
      <motion.div
        key={msg.id}
        custom={direction}
        variants={pageVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={pageTransition}
        className="book-page book-inner-page"
      >
        <div className="flex flex-col h-full p-6 sm:p-10 relative" dir="rtl">
          {/* Page corner ornament */}
          <div className="absolute top-4 right-4 w-10 h-10 border-r border-t border-brand-accent/30" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-l border-b border-brand-accent/30" />

          {/* Decorative top line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-[1px] bg-gradient-to-l from-brand-accent/40 to-transparent" />
            <Heart size={12} className="text-brand-accent/50" fill="currentColor" />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-brand-accent/40 to-transparent" />
          </div>

          {/* Guest name */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center shrink-0">
                <span className="font-calligraphy text-lg font-bold text-brand-accent">
                  {msg.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-calligraphy text-xl sm:text-2xl text-brand-primary leading-tight">
                  {msg.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Message body */}
          <div className="flex-1 flex items-center">
            <blockquote className="w-full">
              <p className="font-calligraphy text-xl sm:text-2xl text-brand-primary leading-[2.2] tracking-wide">
                "{msg.message}"
              </p>
            </blockquote>
          </div>

          {/* Bottom section */}
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-[1px] bg-gradient-to-l from-brand-accent/40 to-transparent" />
              <Heart size={10} className="text-brand-accent/40" fill="currentColor" />
              <div className="flex-1 h-[1px] bg-gradient-to-r from-brand-accent/40 to-transparent" />
            </div>
            <p className="font-arabic text-xs text-brand-secondary text-center">
              {formatArabicDate(msg.timestamp)}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden select-none relative">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-brand-faint)_0%,_var(--color-brand-bg)_70%)]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-10 z-10"
      >
        <div className="flex items-center gap-2 justify-center mb-2">
          <BookOpen size={18} className="text-brand-accent" strokeWidth={1.5} />
          <h1 className="font-serif text-sm tracking-[0.3em] uppercase text-brand-primary font-bold">
            Private Guestbook
          </h1>
        </div>
        <p className="font-calligraphy text-lg text-brand-secondary">
          دفتر التهاني الخاص
        </p>
      </motion.div>

      {/* Book Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="book-container z-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Book shadow */}
        <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/10 blur-xl rounded-full" />

        {/* Book spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-6 bg-gradient-to-r from-brand-primary/10 via-brand-primary/5 to-transparent z-20 pointer-events-none rounded-l-lg" />

        {/* Page content with 3D perspective */}
        <div className="book-perspective relative w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {renderPage()}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center gap-6 mt-6 sm:mt-10 z-10"
      >
        <motion.button
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToNext}
          disabled={currentPage >= totalPages - 1}
          className="w-12 h-12 rounded-full bg-white/80 border border-brand-border/50 flex items-center justify-center text-brand-primary hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-brand-primary shadow-sm"
        >
          <ChevronLeft size={20} />
        </motion.button>

        <div className="text-center min-w-[100px]">
          <p className="font-arabic text-sm text-brand-primary font-bold">
            {currentPage === 0
              ? "الغلاف"
              : currentPage === totalPages - 1
              ? "النهاية"
              : `صفحة ${currentPage}`}
          </p>
          <p className="font-sans text-[10px] text-brand-secondary tracking-wider uppercase mt-0.5">
            {currentPage + 1} / {totalPages}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToPrev}
          disabled={currentPage <= 0}
          className="w-12 h-12 rounded-full bg-white/80 border border-brand-border/50 flex items-center justify-center text-brand-primary hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-brand-primary shadow-sm"
        >
          <ChevronRight size={20} />
        </motion.button>
      </motion.div>

      {/* Empty state */}
      {messages.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-arabic text-sm text-brand-secondary mt-4 z-10"
        >
          لم يتم إرسال أي تهاني بعد — شارك رابط الدعوة مع أحبابك 💌
        </motion.p>
      )}

      {/* Back to invitation link */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        href="#/"
        className="mt-6 font-arabic text-xs text-brand-secondary hover:text-brand-accent transition-colors z-10 underline underline-offset-4 decoration-brand-border"
      >
        ← العودة للدعوة
      </motion.a>
    </div>
  );
}

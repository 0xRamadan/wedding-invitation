import { useState } from "react";
import { motion } from "motion/react";
import { Heart, CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";

const MONTH_NAMES_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES_AR = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

const ENGAGEMENT_DATE = new Date(2026, 8, 25); // September 25, 2026

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function generateICSFile(): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Rashad & Esraa//Engagement//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "DTSTART:20260925T190000",
    "DTEND:20260926T010000",
    "SUMMARY:💍 خطوبة رشاد وإسراء",
    "DESCRIPTION:حفل خطوبة رشاد وإسراء - نادي حرس الحدود، الزمالك - قاعة أوركيدا",
    "LOCATION:نادي حرس الحدود، الزمالك - قاعة أوركيدا",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:غداً حفل خطوبة رشاد وإسراء 💍",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "rashad-esraa-engagement.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function InteractiveCalendar() {
  const [currentMonth, setCurrentMonth] = useState(8); // September (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [saved, setSaved] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const today = new Date();

  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const isEngagementDay = (day: number) =>
    currentYear === 2026 && currentMonth === 8 && day === 25;

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const isToday = (day: number) =>
    currentYear === today.getFullYear() &&
    currentMonth === today.getMonth() &&
    day === today.getDate();

  const handleSaveCalendar = () => {
    generateICSFile();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto mb-24 flex flex-col items-center"
    >
      {/* Header */}
      <h2 className="font-serif tracking-[0.25em] text-sm uppercase font-bold text-brand-primary mb-2">
        CALENDAR
      </h2>
      <h3 className="font-arabic text-2xl sm:text-3xl font-bold text-brand-accent mb-8">
        احفظ الموعد
      </h3>

      {/* Calendar Card */}
      <div className="w-full bg-gradient-to-b from-white/90 to-brand-faint/80 backdrop-blur-sm border border-brand-border/50 rounded-2xl p-5 sm:p-6 shadow-lg">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(-1)}
            className="w-8 h-8 rounded-full border border-brand-border/50 flex items-center justify-center text-brand-secondary hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer bg-transparent"
          >
            <ChevronLeft size={16} />
          </motion.button>

          <div className="text-center">
            <div className="font-sans text-sm font-bold tracking-[0.15em] text-brand-primary uppercase">
              {new Date(currentYear, currentMonth).toLocaleDateString("en-US", { month: "long" })} {currentYear}
            </div>
            <div className="font-arabic text-sm text-brand-accent font-bold mt-0.5">
              {MONTH_NAMES_AR[currentMonth]} {currentYear}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(1)}
            className="w-8 h-8 rounded-full border border-brand-border/50 flex items-center justify-center text-brand-secondary hover:text-brand-primary hover:border-brand-primary transition-colors cursor-pointer bg-transparent"
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map((day, i) => (
            <div key={day} className="text-center py-1">
              <div className="text-[9px] font-sans font-bold uppercase tracking-wider text-brand-secondary">
                {day}
              </div>
              <div className="text-[9px] font-arabic text-brand-accent/70 font-bold">
                {DAY_NAMES_AR[i]}
              </div>
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div key={index} className="aspect-square flex items-center justify-center relative">
              {day !== null && (
                <motion.div
                  whileHover={isEngagementDay(day) ? { scale: 1.15 } : {}}
                  className={`w-full h-full flex items-center justify-center rounded-lg text-sm font-sans relative transition-all duration-200 ${
                    isEngagementDay(day)
                      ? "bg-brand-accent text-white font-bold shadow-md cursor-pointer"
                      : isToday(day)
                      ? "bg-brand-primary/10 text-brand-primary font-semibold border border-brand-primary/30"
                      : isPast(day)
                      ? "text-brand-border"
                      : "text-brand-primary hover:bg-brand-faint"
                  }`}
                >
                  {isEngagementDay(day) && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-1 -right-1 z-10"
                    >
                      <Heart size={12} className="fill-red-400 text-red-400" />
                    </motion.div>
                  )}
                  <span className="relative z-10">{day}</span>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-brand-border/30">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-brand-accent" />
            <span className="text-[10px] font-sans text-brand-secondary">يوم الخطوبة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm border border-brand-primary/30 bg-brand-primary/10" />
            <span className="text-[10px] font-sans text-brand-secondary">اليوم</span>
          </div>
        </div>
      </div>

      {/* Save to Calendar Button */}
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSaveCalendar}
        className={`mt-6 flex items-center gap-3 px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] font-sans font-bold transition-all duration-300 rounded-full border cursor-pointer ${
          saved
            ? "bg-green-600 text-white border-green-600"
            : "bg-brand-primary text-brand-bg border-brand-primary hover:bg-brand-accent hover:border-brand-accent"
        }`}
      >
        <CalendarPlus size={16} strokeWidth={1.5} />
        {saved ? "✓ تم الحفظ" : "حفظ في التقويم"}
      </motion.button>
    </motion.section>
  );
}

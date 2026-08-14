import { motion } from "motion/react";
import { DoorOpen, Gem, PartyPopper, UtensilsCrossed, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TimelineEvent {
  time: string;
  timeAr: string;
  title: string;
  titleEn: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

const events: TimelineEvent[] = [
  {
    time: "7:00 PM",
    timeAr: "٧:٠٠ مساءً",
    title: "الاستقبال",
    titleEn: "Reception",
    description: "استقبال الضيوف والترحيب بهم في القاعة",
    icon: DoorOpen,
    iconColor: "text-amber-600",
  },
  {
    time: "8:00 PM",
    timeAr: "٨:٠٠ مساءً",
    title: "مراسم العقد",
    titleEn: "Ceremony",
    description: "مراسم عقد القران الرسمية",
    icon: Gem,
    iconColor: "text-brand-accent",
  },
  {
    time: "9:00 PM",
    timeAr: "٩:٠٠ مساءً",
    title: "الحفل والتهاني",
    titleEn: "Celebration",
    description: "الاحتفال وتلقي التهاني من الأحباب",
    icon: PartyPopper,
    iconColor: "text-rose-500",
  },
  {
    time: "10:00 PM",
    timeAr: "١٠:٠٠ مساءً",
    title: "العشاء",
    titleEn: "Dinner",
    description: "حفل عشاء فاخر للضيوف",
    icon: UtensilsCrossed,
    iconColor: "text-emerald-600",
  },
];

export default function Timeline() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto mb-24 flex flex-col items-center relative"
    >
      {/* Background Watermark */}
      <span className="absolute text-[70px] sm:text-[120px] font-sans font-black text-brand-faint -z-10 opacity-60 uppercase tracking-tighter pointer-events-none select-none top-0">
        SCHEDULE
      </span>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-accent">
          <Clock size={20} strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="font-serif tracking-[0.25em] text-sm uppercase font-bold text-brand-primary mb-2">
        SCHEDULE
      </h2>
      <h3 className="font-arabic text-2xl sm:text-3xl font-bold text-brand-accent mb-10">
        فقرات الحفل
      </h3>

      {/* Timeline */}
      <div className="relative w-full max-w-md px-4">
        {/* Center Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-border/20 via-brand-accent/40 to-brand-border/20" />

        {/* Events */}
        <div className="space-y-0">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            const Icon = event.icon;

            return (
              <motion.div
                key={event.titleEn}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative flex items-center gap-4 py-6 ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div
                  className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}
                >
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    className={`inline-block bg-gradient-to-br from-white/90 to-brand-faint/80 backdrop-blur-sm border border-brand-border/40 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${
                      isLeft ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1" dir="ltr">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">
                        {event.time}
                      </span>
                    </div>
                    <h4 className="font-arabic text-lg font-bold text-brand-primary mb-0.5">
                      {event.title}
                    </h4>
                    <span className="font-serif italic text-[10px] text-brand-accent tracking-widest uppercase block mb-1.5">
                      {event.titleEn}
                    </span>
                    <p className="font-arabic text-xs text-brand-secondary leading-relaxed font-medium">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Icon Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: index * 0.15 + 0.2,
                  }}
                  className="relative z-10 flex-shrink-0"
                >
                  <div className="w-11 h-11 rounded-full bg-white border-2 border-brand-border/60 flex items-center justify-center shadow-md">
                    <Icon size={18} strokeWidth={1.5} className={event.iconColor} />
                  </div>
                  {/* Glow ring */}
                  <div className="absolute inset-[-3px] rounded-full border border-brand-accent/20" />
                </motion.div>

                {/* Empty space for opposite side */}
                <div className="flex-1" />
              </motion.div>
            );
          })}
        </div>

        {/* End dot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-accent/60 border-2 border-white shadow-sm" />
      </div>
    </motion.section>
  );
}

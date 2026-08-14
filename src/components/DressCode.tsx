import { motion } from "motion/react";
import { Shirt } from "lucide-react";

interface ColorSwatch {
  name: string;
  nameEn: string;
  hex: string;
  description: string;
}

const dressCodeColors: ColorSwatch[] = [
  {
    name: "الكريمي",
    nameEn: "Cream",
    hex: "#fcf9f5",
    description: "الأبيض الكريمي الدافئ",
  },
  {
    name: "البني الداكن",
    nameEn: "Dark Walnut",
    hex: "#3d332d",
    description: "البني الراقي",
  },
  {
    name: "الذهبي",
    nameEn: "Gold Accent",
    hex: "#c49b7a",
    description: "اللمسة الذهبية",
  },
  {
    name: "البيج",
    nameEn: "Warm Beige",
    hex: "#d4c5b9",
    description: "البيج الدافئ",
  },
  {
    name: "الرملي",
    nameEn: "Sand",
    hex: "#8c7e74",
    description: "الرملي الهادئ",
  },
  {
    name: "العاجي",
    nameEn: "Ivory",
    hex: "#f3ede6",
    description: "العاجي الناعم",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DressCode() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto mb-24 flex flex-col items-center text-center"
    >
      {/* Background Watermark */}
      <span className="absolute text-[70px] sm:text-[120px] font-sans font-black text-brand-faint -z-10 opacity-60 uppercase tracking-tighter pointer-events-none select-none">
        DRESS CODE
      </span>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-accent">
          <Shirt size={20} strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="font-serif tracking-[0.25em] text-sm uppercase font-bold text-brand-primary mb-2">
        DRESS CODE
      </h2>
      <h3 className="font-arabic text-2xl sm:text-3xl font-bold text-brand-accent mb-3">
        الدريس كود
      </h3>
      <p className="font-arabic text-sm text-brand-secondary max-w-sm mx-auto mb-10 leading-relaxed font-medium">
        نتمنى الالتزام بألوان البالتة الرسمية للحفل لتكتمل الصورة بأجمل شكل
      </p>

      {/* Color Swatches */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-5 w-full max-w-lg px-4"
      >
        {dressCodeColors.map((color) => (
          <motion.div
            key={color.hex}
            variants={itemVariants}
            className="flex flex-col items-center group"
          >
            {/* Swatch Circle */}
            <motion.div
              whileHover={{ scale: 1.15, y: -4 }}
              className="relative cursor-pointer mb-3"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md border-2 border-white transition-all duration-300 group-hover:shadow-lg"
                style={{ backgroundColor: color.hex }}
              />
              {/* Ring on hover */}
              <div className="absolute inset-[-4px] rounded-full border-2 border-brand-accent/0 group-hover:border-brand-accent/60 transition-all duration-300" />

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-brand-primary text-brand-bg text-[9px] font-mono rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-20"
              >
                {color.hex}
              </motion.div>
            </motion.div>

            {/* Label */}
            <span className="text-[10px] font-sans font-bold text-brand-primary tracking-wide">
              {color.nameEn}
            </span>
            <span className="text-[10px] font-arabic text-brand-secondary font-bold">
              {color.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Note */}
      <div className="mt-10 px-6 py-4 bg-brand-faint/80 border border-brand-border/40 rounded-xl max-w-sm">
        <p className="font-arabic text-xs text-brand-secondary leading-relaxed font-medium">
          💡 الألوان المفضلة: الكريمي، البيج، الذهبي، والبني بدرجاته.
          <br />
          يُرجى تجنب الألوان الزاهية والفلورية.
        </p>
      </div>
    </motion.section>
  );
}

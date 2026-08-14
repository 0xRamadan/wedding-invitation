export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  timestamp: string; // ISO string for JSON serialization
}

const STORAGE_KEY = "engagement_guestbook_messages";

export function saveMessage(name: string, message: string): GuestMessage {
  const newMessage: GuestMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
  };

  const existing = getMessages();
  existing.unshift(newMessage);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  return newMessage;
}

export function getMessages(): GuestMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GuestMessage[];
  } catch {
    return [];
  }
}

export function formatArabicDate(isoString: string): string {
  const date = new Date(isoString);
  const months = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "مساءً" : "صباحاً";
  const displayHour = hours % 12 || 12;

  return `${day} ${month} ${year} — ${displayHour}:${minutes} ${period}`;
}

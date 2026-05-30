import { portfolio } from "@/portfolio.config";

export function getAutoReply(message: string): string {
  const lower = message.toLowerCase();
  const { cannedReplies } = portfolio.messages;

  if (/\b(hire|job|work|available|opportunity|opportunities)\b/.test(lower)) {
    return cannedReplies.hire;
  }
  if (/\b(email|contact|reach|mail)\b/.test(lower)) {
    return cannedReplies.email;
  }
  if (/\b(project|portfolio|work|built|app)\b/.test(lower)) {
    return cannedReplies.project;
  }
  if (/\b(hi|hello|hey|thanks|thank)\b/.test(lower)) {
    return "Hey there! Glad you stopped by. Ask me about projects, skills, or availability!";
  }

  return cannedReplies.default;
}

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001",
  ENDPOINTS: {
    DISTRICTS: "/districts",
    USERS: "/users",
    PROBLEMS: "/problems",
    CHAT_MESSAGES: "/chat-messages",
    APPROVED_SOLUTIONS: "/approved-solutions",
    ACTIVITY_LOGS: "/activity-logs",
    NOTIFICATIONS: "/notifications",
  },
};

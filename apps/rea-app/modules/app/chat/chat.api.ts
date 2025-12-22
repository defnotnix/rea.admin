import { demoChatMessages } from "@/demoData/chat";
import { ChatMessage } from "./chat.store";

export async function getRecords() {
  return demoChatMessages;
}

/**
 * Dummy API function to send a new message
 * In a real app, this would make a POST request to your backend
 */
export async function sendMessage(
  chatId: string,
  messageText: string,
  userId: string
): Promise<ChatMessage> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newMessage: ChatMessage = {
    messageId: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    chatId,
    userId,
    messageText,
    isSolution: false,
    upvoteCount: 0,
    downvoteCount: 0,
    totalVotes: 0,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return newMessage;
}

/**
 * Dummy API function to upvote a message
 */
export async function upvoteMessageApi(messageId: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In a real app, this would update the vote count on the backend
  console.log(`Message ${messageId} upvoted`);
}

/**
 * Dummy API function to downvote a message
 */
export async function downvoteMessageApi(messageId: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In a real app, this would update the vote count on the backend
  console.log(`Message ${messageId} downvoted`);
}

/**
 * Dummy API function to delete a message
 */
export async function deleteMessageApi(
  messageId: string,
  deletedBy: string
): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In a real app, this would soft-delete the message on the backend
  console.log(`Message ${messageId} deleted by ${deletedBy}`);
}

/**
 * Dummy API function to mark a message as solution
 */
export async function markAsSolutionApi(messageId: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In a real app, this would update the isSolution flag on the backend
  console.log(`Message ${messageId} marked as solution`);
}

export interface ChatMessage {
  id?: string;
  sender: string;
  content: string;
  roomId: string;
  timestamp?: string;
}

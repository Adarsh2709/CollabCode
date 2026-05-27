import { useEffect, useRef, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import { ChatMessage } from '../types/ChatMessage';
import { CodeMessage } from '../types/CodeMessage';

interface UseWebSocketProps {
  roomId: string;
  senderName: string;
  onCodeReceived: (code: string) => void;
  onChatReceived: (message: ChatMessage) => void;
}

export const useWebSocket = ({
  roomId,
  senderName,
  onCodeReceived,
  onChatReceived,
}: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'CONNECTING' | 'CONNECTED' | 'DISCONNECTED' | 'ERROR'>('DISCONNECTED');
  const stompClientRef = useRef<Client | null>(null);

  const connect = useCallback(() => {
    if (stompClientRef.current?.active) return;

    setConnectionStatus('CONNECTING');
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws';

    const client = new Client({
      brokerURL: wsUrl,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        setIsConnected(true);
        setConnectionStatus('CONNECTED');

        // Subscribe to code updates
        client.subscribe(`/topic/code/${roomId}`, (message) => {
          try {
            const body = JSON.parse(message.body) as CodeMessage;
            // Only update code if it was sent by someone else
            if (body.sender !== senderName) {
              onCodeReceived(body.code);
            }
          } catch (err) {
            console.error('Error parsing code message:', err);
          }
        });

        // Subscribe to chat messages
        client.subscribe(`/topic/chat/${roomId}`, (message) => {
          try {
            const body = JSON.parse(message.body) as ChatMessage;
            onChatReceived(body);
          } catch (err) {
            console.error('Error parsing chat message:', err);
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
        setConnectionStatus('DISCONNECTED');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        setConnectionStatus('ERROR');
      },
      onWebSocketClose: () => {
        setIsConnected(false);
        setConnectionStatus('DISCONNECTED');
      },
    });

    client.activate();
    stompClientRef.current = client;
  }, [roomId, senderName, onCodeReceived, onChatReceived]);

  const disconnect = useCallback(() => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
      setIsConnected(false);
      setConnectionStatus('DISCONNECTED');
    }
  }, []);

  const sendCode = useCallback((code: string) => {
    if (stompClientRef.current?.connected) {
      const codeMessage: CodeMessage = {
        roomId,
        sender: senderName,
        code,
      };
      stompClientRef.current.publish({
        destination: '/app/code',
        body: JSON.stringify(codeMessage),
      });
    } else {
      console.warn('Cannot send code: STOMP client is not connected.');
    }
  }, [roomId, senderName]);

  const sendChat = useCallback((content: string) => {
    if (stompClientRef.current?.connected) {
      const chatMessage: ChatMessage = {
        roomId,
        sender: senderName,
        content,
      };
      stompClientRef.current.publish({
        destination: '/app/chat',
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.warn('Cannot send chat: STOMP client is not connected.');
    }
  }, [roomId, senderName]);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    connectionStatus,
    sendCode,
    sendChat,
    reconnect: connect,
  };
};

export default useWebSocket;

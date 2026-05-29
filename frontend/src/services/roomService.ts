import api from '../lib/axios';
import { Room } from '../types/Room';

export const roomService = {
  createRoom: async (): Promise<Room> => {
    const response = await api.post<Room>('/rooms', { language: 'java' });
    return response.data;
  },

  getAllRooms: async (): Promise<Room[]> => {
    const response = await api.get<Room[]>('/rooms');
    return response.data;
  },

  getRoomDetails: async (roomId: string): Promise<Room> => {
    const response = await api.get<Room>(`/rooms/${roomId}`);
    return response.data;
  },

  saveCode: async (roomId: string, code: string): Promise<Room> => {
    const response = await api.put<Room>(`/rooms/${roomId}`, code, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return response.data;
  },

  deleteRoom: async (roomId: string): Promise<string> => {
    const response = await api.delete<string>(`/rooms/${roomId}`);
    return response.data;
  },
};
export default roomService;

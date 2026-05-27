import { useState, useEffect, useCallback } from 'react';
import { Room } from '../types/Room';
import { roomService } from '../services/roomService';

export const useRoom = (roomId?: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchRoomDetails = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await roomService.getRoomDetails(id);
      setRoom(data);
    } catch (err: any) {
      console.error('Error fetching room details:', err);
      setError(err?.response?.data?.message || 'Failed to load room details. Make sure the room exists.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCode = useCallback(async (code: string) => {
    if (!roomId) return;
    setIsSaving(true);
    try {
      const updatedRoom = await roomService.saveCode(roomId, code);
      setRoom(updatedRoom);
      return updatedRoom;
    } catch (err) {
      console.error('Error saving code:', err);
    } finally {
      setIsSaving(false);
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      fetchRoomDetails(roomId);
    }
  }, [roomId, fetchRoomDetails]);

  return {
    room,
    setRoom,
    isLoading,
    error,
    isSaving,
    fetchRoomDetails,
    saveCode,
  };
};

export default useRoom;

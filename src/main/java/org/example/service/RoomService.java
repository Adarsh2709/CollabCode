package org.example.service;

import org.example.entity.Room;
import org.example.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public Room creatRoom(){
        String roomId = UUID.randomUUID().toString()
                .substring(0,6)
                .toUpperCase();
        while(roomRepository.existsByRoomId(roomId)){
            roomId = UUID.randomUUID()
                    .toString()
                    .substring(0, 6)
                    .toUpperCase();
        }
        Room room = new Room();
        room.setRoomId(roomId);
        room.setLanguage("javascript");
        room.setCode("");
        room.setCreatedAt(LocalDateTime.now());
        return roomRepository.save(room);
    }

    public Room getRoom(String roomId){
        return roomRepository.findByRoomId(roomId).orElseThrow(()->
                new RuntimeException("Room Not Found"));
    }

    public List<Room> getAllRooms(){
        return roomRepository.findAll();
    }

    public String deleteRoom(String roomId){
        Room room = roomRepository.findByRoomId(roomId).orElseThrow(()->
                new RuntimeException("Room Not Found"));
        roomRepository.delete(room);
        return "Room Deleted Successfully";
    }

    public Room saveCode(String roomId, String code){
        Room room = roomRepository.findByRoomId(roomId).orElseThrow(()->
                new RuntimeException("Room Not Found"));
        room.setCode(code);
        return roomRepository.save(room);
    }
}

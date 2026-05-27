package org.example.repository;

import org.example.entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {
    Optional<Room> findById(String roomId);
    boolean existByRoomId(String roomId);
    void deleteByRoomId(String roomId);
}

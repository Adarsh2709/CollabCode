package org.example.Controller;

import org.example.entity.Room;
import org.example.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public Room creatRoom(){
        return roomService.creatRoom();
    }

    @GetMapping("/{roomId}")
    public Room getRoom(@PathVariable String roomId){
        return roomService.getRoom(roomId);
    }

    @GetMapping
    public List<Room> getAllRooms(){
        return roomService.getAllRooms();
    }

    @DeleteMapping("/{roomId}")
    public String deleteRoom(@PathVariable String roomId){
        return roomService.deleteRoom(roomId);
    }

    @PutMapping("/{roomId}")
    public Room saveCode(@PathVariable String roomId, @RequestBody String code){
        return roomService.saveCode(roomId, code);
    }
}

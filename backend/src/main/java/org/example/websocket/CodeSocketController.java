package org.example.websocket;

import org.example.entity.ChatMessage;
import org.example.entity.CodeMessage;
import org.example.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class CodeSocketController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private RoomRepository roomRepository;

    @MessageMapping("/code")
    public void handleCodeUpdate(@Payload CodeMessage codeMessage){
        roomRepository.findByRoomId(codeMessage.getRoomId())
                .ifPresent(room->{
                    room.setCode(codeMessage.getCode());
                    roomRepository.save(room);
                });
        messagingTemplate.convertAndSend("/topic/code"+codeMessage.getRoomId(),codeMessage);
    }

    @MessageMapping("/chat")
    public void handleChatMessage(@Payload ChatMessage chatMessage){
        messagingTemplate.convertAndSend("/topic/chat"+chatMessage.getRoomId(),chatMessage);
    }
}

import { Controller, Post, Body, Req } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Post()
    chat(@Body('message') message: string, @Req() req: any) {
        return this.chatService.getReply(message);
    }
}
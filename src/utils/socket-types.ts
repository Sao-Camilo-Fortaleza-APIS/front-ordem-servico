import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
// Eventos que o CLIENTE envia para o SERVIDOR
export interface ClientToServerEvents {
    enter_the_room: (data: { user: string }) => void;
}

// Eventos que o SERVIDOR envia para o CLIENTE
export interface ServerToClientEvents {
    new_notification: (data: { message: string; order_id: number }) => void;
}

export type TypedSocket = Socket<
    ServerToClientEvents & DefaultEventsMap,
    ClientToServerEvents & DefaultEventsMap
>

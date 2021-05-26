import { io } from "socket.io-client"
const host = "http://192.168.60.91"
//64.227.115.0
export const socket = io(host)
import { envConfig } from '@/config/envConfig';
import { io } from 'socket.io-client';

const URL = envConfig.socketUrl; 


export const socketConnection = io(URL, {
  autoConnect: false
});
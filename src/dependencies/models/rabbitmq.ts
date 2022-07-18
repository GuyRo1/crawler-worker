import { Channel, Connection } from 'amqplib'


export type ConnectToQueue = () => Promise<Connection>

export type GetChannel = (connection: Connection) => Promise<Channel>

export type SendTaskToQueue = (channel:Channel,task:QueueMessage)=>Promise<void>

export type QueueMessage = {
    id:string,
    serverId:string,
    url:string,
}


export type QueueService = {
    connection: Connection,
    channel: Channel
}

export type CreateQueueService = () => Promise<QueueService>

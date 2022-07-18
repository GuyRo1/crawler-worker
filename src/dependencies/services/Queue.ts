
import rabbitMQ, { Connection, Channel, } from 'amqplib'
import {
    ConnectToQueue,
    GetChannel,
    CreateQueueService
} from '../models/rabbitmq'




const connectToQueue: ConnectToQueue = async () =>
    await rabbitMQ.connect('amqp://localhost:5672')

const getQueueChannel: GetChannel = async (connection: Connection) =>
    await connection.createChannel()




export const createQueueService: CreateQueueService = async () => {
    const connection: Connection = await connectToQueue()
    const channel: Channel = await getQueueChannel(connection)
    return {
        connection: connection,
        channel: channel
    }
}





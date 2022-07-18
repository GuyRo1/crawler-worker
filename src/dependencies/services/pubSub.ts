
import { Client, getRedisClient } from '../db/redis';



export type Publish = (channel: string, msg: string) => Promise<void>


export const createPublish = async () => {
    try {
        const publisher = await getRedisClient({})
        return (
            async (publisher: Client, channel: string, msg: string) => {
                await publisher.publish(channel, msg)
            }).bind(null, publisher)
    } catch (err) {
        console.log(err);

    }

}




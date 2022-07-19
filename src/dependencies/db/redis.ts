import { createClient } from 'redis';

export type Client = ReturnType<typeof createClient>
const createRedisClient = async () =>{
    try{
        return createClient()
    }catch(err){
        
       throw err
    }
}
   

const connectRedisClient = async (redisClient: Client) => {
    await redisClient.connect();
}

export type GetRedisClientOptions = {
    sourceClient?: Client;
}

type GetRedisClient = (options: GetRedisClientOptions) => Promise<Client>

export const getRedisClient: GetRedisClient =
    async ({ sourceClient }: GetRedisClientOptions) => {
        try {
            const client: Client = sourceClient ? sourceClient.duplicate() : await createRedisClient()
            client.on('error',
                (err: any) => console.error(err));
            await connectRedisClient(client)
            return client
        } catch (err) {
            console.log('error in creating redis client');
            throw err
        }

    }




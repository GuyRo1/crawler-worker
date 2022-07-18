
import { Client } from '../db/redis'
import { getRedisClient } from './../db/redis';

export type UpdateCache = (key: string, payload: string) => Promise<void>

export const createCacheUpdater = async (): Promise<UpdateCache | undefined> => {
    try {
        const updater = await getRedisClient({})
        return (
            async (updater: Client, key: string, payload: string) => {
                await updater.set(key, payload, {
                    EX: 36000    
                })
            }
        ).bind(null, updater)
    } catch (err) {
        console.log(err);
    }
}






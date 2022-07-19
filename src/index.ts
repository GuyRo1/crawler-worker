import { loadDependencies } from "./dependencies/index";
import createApp from "./expressApp";
import routers from './routers'

import http from 'http'

import 'dotenv/config'
import { DependenciesContainer } from './dependencies/models/classes';
import { QueueMessage, QueueService } from "./dependencies/models/rabbitmq";
import { Publish } from "./dependencies/services/pubSub";
import { ConsumeMessage, Message } from "amqplib";
import { GetRequest, Result } from "./dependencies/services/http";
import { GetLinksFromPage } from "./dependencies/services/scrape";
import { UpdateCache } from "./dependencies/services/cache";

const port = process.argv[2] ?? process.env.PORT ?? 3000

const workQueueName = 'work'

loadDependencies()
    .then(async (dependencies: DependenciesContainer) => {
        console.log(dependencies);
        const app = createApp(routers, dependencies)
        const server: http.Server = http.createServer(app)
        server.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
        const fetch: GetRequest = await dependencies.get('Http')
        const scrape: GetLinksFromPage = await dependencies.get('Scrape')
        const setCache: UpdateCache = await dependencies.get('UpdateCache')
        const queue: QueueService = await dependencies.get('Queue');
        const publish: Publish = await dependencies.get('Publish')
        queue.channel.assertQueue(workQueueName)
        queue.channel.consume(
            workQueueName,
            async (message: ConsumeMessage | null) => {
                const content = message?.content?.toString()
                if (!content) return
                const work: QueueMessage = JSON.parse(content)
                const result: Result = await fetch(work.url)
                if (result.status !== 'ok') {
                    queue.channel.ack(message as Message)
                    await publish(
                        work.serverId,
                        JSON.stringify({
                            serverId: work.serverId,
                            taskId: work.id,
                            srcUrl: work.url,
                            urls: []
                        }))
                    return
                }

                const urls: string[] = scrape(result.data)
                    .filter((item: string) => item[0] === 'h');

                await setCache(work.url, JSON.stringify(urls));

                console.log(`publishing to ${work.serverId}`);
                await publish(
                    work.serverId,
                    JSON.stringify({
                        serverId: work.serverId,
                        taskId: work.id,
                        srcUrl: work.url,
                        urls: urls
                    }))
                queue.channel.ack(message as Message)
            })
    })
    .catch(err => {
        console.log("we crushed!");
        
        console.log(err);
        process.exit(1);
    })


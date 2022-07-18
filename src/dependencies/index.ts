import { DependencyContainer } from "../expressApp/types/types"
import { DependenciesContainer } from './models/classes';
import { createQueueService } from './services/Queue';
import { getLinksFromPage } from "./services/scrape";
import { getRequest } from './services/http';
import { createPublish} from "./services/pubSub";
import { createCacheUpdater } from "./services/cache";

export const loadDependencies = async () => {
    const dependencies: DependencyContainer[] = []
    try {
        return new DependenciesContainer([
            {
                name: 'Queue',
                type: 'factory',
                dependency: createQueueService
            },
            {
                name: 'Publish',
                type: 'factory',
                dependency: createPublish
            },
            {
                name: 'Scrape',
                type: 'service',
                dependency: getLinksFromPage
            },
            {
                name: 'Http',
                type: 'service',
                dependency: getRequest
            },
            {
                name: 'UpdateCache',
                type: 'factory',
                dependency: createCacheUpdater
            }
        ])
    } catch (err) {
        throw err
    }
}


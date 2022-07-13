import { DependencyContainer } from "../expressApp/types/types"
import { DependenciesContainer } from './models/classes';



export const loadDependencies = async () => {
    const dependencies: DependencyContainer[] = []
    try {
        //async stuff to get dependencies

        // dependencies.push({
        //     name:dependencyName,
        //     dependency:Dependency currently any
        // })

        return new DependenciesContainer(dependencies)
    } catch (err) {
        throw err
    }
}

 
import 'babel-polyfill'
import * as sourcegraph from 'sourcegraph'
import defaults from './defaults'
import { registerProviders } from './providers'
import { Entity } from './types'

const CONFIG_KEY = 'customReferences'

const getEntities = (): Entity[] => {
    const config = sourcegraph.configuration.get()
    const entities = config.get(CONFIG_KEY) as Entity[]
    return entities || []
}

const populateDefaults = (): Promise<void> => {
    const config = sourcegraph.configuration.get()
    const entities = config.get(CONFIG_KEY)
    if (!entities) {
        return config.update(CONFIG_KEY, defaults)
    } else {
        return Promise.resolve()
    }
}

export function activate(): void {
    let providersRegistered = true
    sourcegraph.workspace.onDidOpenTextDocument.subscribe(async () => {
        if (!providersRegistered) {
            await populateDefaults()
            registerProviders(getEntities())
            providersRegistered = true
        }
    })
}

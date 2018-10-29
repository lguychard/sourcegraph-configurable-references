import { Entity } from './types'

export default [
    {
        name: 'String literal',
        preview: ': `"/$1"`',
        references: [
            {
                search: '/["\'`]$1["\'`]/',
            },
            {
                capture: "'([^']+[^\\])'",
            },
            {
                capture: '"([^"]+[^\\])"',
            },
            {
                capture: '`([^`]+[^\\])`',
            },
        ],
        definitions: [],
        implementations: [],
    },
] as Entity[]

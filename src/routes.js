import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'
import { FormatDatetimeNow } from './utils/format-date.js'

const database = new Database()

export const routes =[
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const { search } = request.query
            
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search,
            } : null)

            return response.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const { title, description } = request.body 

            if (!title) {
                return response.writeHead(400).end(
                    JSON.stringify({ message: 'title is required' }),
                )
            }
        
            if (!description) {
                return response.writeHead(400).end(
                    JSON.stringify({message: 'description is required' })
                )
            }

            let created_at = FormatDatetimeNow()

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: '',
                created_at,
                updated_at: ''
            }

            database.insert('tasks', task)

            return response.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            const { id } = request.params

            database.delete('tasks', id)

            return response.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            const { id } = request.params
            const { title, description } = request.body

            if (!title && !description) {
                return response.writeHead(400).end(
                    JSON.stringify({ message: 'title or description is required' }),
                )
            }

            const task = database.selectById('tasks', id)
            
            if (!task){
                return response.writeHead(404).end()
            }

            let updated_at = FormatDatetimeNow()

            database.update('tasks', id, {
                title: title ?? task.title,
                description: description ?? task.description,
                completed_at: task.completed_at,
                created_at: task.created_at,
                updated_at
            })

            return response.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (request, response) => {
            const { id } = request.params

            const task = database.selectById('tasks', id)
            
            if (!task){
                return response.writeHead(404).end()
            }

            let completed_at = FormatDatetimeNow()

            database.update('tasks', id, {
                title: task.title,
                description: task.description,
                completed_at,
                created_at: task.created_at,
                updated_at: task.updated_at
            })

            return response.writeHead(204).end()
        }
    }
]
import {rest} from "msw";
import todosMockData from "./data/todosMockData.json"
import type {Todo } from "../App.vue"

interface todoBody {
  todo: string
}
export const handlers = [
  rest.get('/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(todosMockData)
    )
  }),
  rest.post<todoBody, never, Todo>('/todos', async(req, res, ctx) => {
    const { todo } = await req.json();
    const todoObj: Todo = { 
      id: 100,
      title: todo,
      done: false,
    }
    return res(
      ctx.status(201),
      ctx.json(todoObj)
    )
  })
]
import { rest } from "msw";
import todosMockData from "../data/todosMockData.json"
import type { Todo as postResponseBody } from "../../App.vue"


interface postRequestBody {
  todo: string
}

const get_todos_200_Success = rest.get<never, never, postResponseBody[]>('/todos',
  (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json(todosMockData)
    )
  }
);

const post_todos_201_Success = rest.post<postRequestBody, never, postResponseBody>('/todos', async(req, res, ctx) => {
  const { todo } = await req.json<postRequestBody>();
  return res(
    ctx.status(201),
    ctx.json({ 
      id: Math.random(),
      title: todo,
    })
  )
});

export default {
  get_todos_200_Success,
  post_todos_201_Success,
}
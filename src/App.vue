<template>
  <ul v-if="todos.length > 0">
    <template v-for="todo in todos">
      <li>{{ todo.title }}</li>
    </template>
  </ul>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="inputValue" />
    <button type="submit">追加</button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

const todos = ref<Todo[]>([]);
const inputValue = ref<string>("");

onMounted(async () => {
  const res: Response = await fetch("/todos");
  todos.value = await res.json();
});

const handleSubmit = async () => {
  const res: Response = await fetch("/todos", {
    method: "POST",
    body: JSON.stringify({
      todo: inputValue.value,
    }),
  });
  const addTodo = await res.json();
  todos.value = [...todos.value, addTodo];
};
</script>

<template>
  <template v-if="apiLoading">
    <div>Loading...</div>
  </template>
  <template v-else>
    <ul v-if="todos.length > 0">
      <template v-for="todo in todos">
        <li>{{ todo.title }}</li>
      </template>
    </ul>
  </template>
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
};

const apiLoading = ref<Boolean>(false);
const todos = ref<Todo[]>([]);
const inputValue = ref<string>("");

onMounted(async () => {
  apiLoading.value = true;
  const res: Response = await fetch("/todos");
  apiLoading.value = false;
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

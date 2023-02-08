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

onMounted(() => {
  apiLoading.value = true;
  fetch("/todos")
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        return res.json().then((data: Todo[]) => {
          todos.value = data;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      apiLoading.value = false;
    });
});

const handleSubmit = () => {
  apiLoading.value = true;
  fetch("/todos", {
    method: "POST",
    body: JSON.stringify({
      todo: inputValue.value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        return res.json().then((data: Todo) => {
          todos.value = [...todos.value, data];
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      apiLoading.value = false;
    });
};
</script>

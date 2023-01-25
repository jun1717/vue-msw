<script setup lang="ts">
import { ref } from "vue";
import type { User } from "../App.vue";
import type { Ref } from "vue";
defineProps<{
  msg: string;
  user: User;
}>();
const emit = defineEmits<{
  (event: "changeName", firstName: string): void;
}>();
const changeName = (): void => {
  emit("changeName", inputValue.value);
};
const inputValue = ref<string>("");
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}{{ user.firstName }}</h1>
    <input type="text" v-model="inputValue" />
    <button @click="changeName">名前変更</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

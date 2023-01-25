<template>
  <div>
    {{ hello.message }}
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const hello = reactive({ message: "" });

    onMounted(async () => {
      const res = await fetch("/hello");
      hello.message = await res.json();
    });

    return { hello };
  },
});
</script>

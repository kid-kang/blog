<template>
  <div class="dialog" v-show="dialogVisible" @click.self="closeDialog">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject } from 'vue';
let dialogVisible = inject('dialogVisible');

function closeDialog() {
  dialogVisible.value = false;
}
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
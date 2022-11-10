import { onMounted, ref } from 'vue';

export function useFixed() {
  let isFixed = ref(false);

  onMounted(() => {
    window.addEventListener("scroll", () => {
      let top = document.documentElement.scrollTop;
      if (top > 0) isFixed.value = true;
      else isFixed.value = false;
    });
  });

  return isFixed
}
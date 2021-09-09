<template>
  <router-view></router-view>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'App',
  setup () {
    var jsSrc = (navigator.language || navigator.browserLanguage).toLowerCase();
    sessionStorage.setItem('locale', jsSrc);

    const locale = computed(() => {
      return sessionStorage.getItem('locale') 
    })
    return {
      locale
    }
  }
}
</script>
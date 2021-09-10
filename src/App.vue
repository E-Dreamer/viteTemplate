<template>
  <router-view></router-view>
</template>

<script>
import { useI18n } from 'vue-i18n';
export default {
  name: 'App',
  setup () {
    const i18n = useI18n()
    var jsSrc = (navigator.language || navigator.browserLanguage).toLowerCase();
    sessionStorage.setItem('locale', jsSrc);
    i18n.locale.value = jsSrc;
  }
}
</script>
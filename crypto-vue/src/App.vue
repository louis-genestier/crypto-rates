<template>
  <div id="app">
    <CryptoPrice />
  </div>
</template>

<script>
import CryptoPrice from './components/CryptoPrice.vue';

export default {
  name: 'app',
  components: {
    CryptoPrice,
  },
};
</script>

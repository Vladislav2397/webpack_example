<template>
  <div>
    <h1>App</h1>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class About extends Vue {}
</script>

<style lang="scss">
.h1 {
  color: red;
}
</style>

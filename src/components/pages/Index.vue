<template lang="pug">

.page
    h1._title Index Page
    button-component(
        theme="primary"
    ) Some content

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Button from '@/components/ui/Button/Button.vue'

@Component({
    components: {
        'button-component': Button
    }
})
export default class Index extends Vue {}
</script>

<style lang="scss">
.page {
    min-height: 100px;

    &__title {
        color: red;
    }
}
</style>
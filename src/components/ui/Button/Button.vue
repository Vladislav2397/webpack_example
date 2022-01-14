<template lang="pug">

button.button(
    :class="classes"
)
    slot

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
    @Prop() readonly theme!: 'primary' | 'secondary' | 'accent'

    get classes() {
        const classes = []

        if (this.theme) classes.push(`button--theme-${this.theme}`)

        return classes
    }
}
</script>

<style src="./button--critical.scss" lang="scss"></style>
<style src="./button--main.scss" lang="scss"></style>

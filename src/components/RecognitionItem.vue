<template>
    <q-item-label>
        - {{ item }}
    </q-item-label>
</template>
<script setup>

const props = defineProps({
    item: String,

})

console.log(props.item)


</script>

<template>
    <div class="col-md-3 col-sm-12">
        <q-card flat bordered class="my-card">
            <q-card-section class="bg-warning">
                <div class="text-h6">{{ tittle }}</div>
            </q-card-section>
            <q-separator inset />
            <q-card-section class="q-pt-xs">
                <q-list>
                    <q-item-section>
                        <recognition-item v-for="i in items" v-bind:key="i.id" :item="i.name">
                        </recognition-item>
                    </q-item-section>
                </q-list>
            </q-card-section>

        </q-card>
    </div>
</template>
<script setup>
import RecognitionItem from "./RecognitionItem.vue";

defineProps({
    tittle: String,
    items: Array,

})



</script>

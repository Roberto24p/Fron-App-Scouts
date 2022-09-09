<template>
    <div class="q-pa-md row items-start q-gutter-md justify-evenly">
        <div class="col-12">
            <q-card flat bordered class="my-card q-mr-lg">
                <q-card-section>
                    <div class="text-h6">{{ advancePlan.tittle }}</div>
                </q-card-section>
                <q-separator inset />

                <q-card-section class="q-pt-md">
                    {{ advancePlan.description }}
                </q-card-section>
            </q-card>
        </div>
        <div class="col-3" v-for="recognition in recognitionCards" v-bind:key="recognition.id">
            <recognition-card :tittle="recognition.name" :items="recognition.topics"></recognition-card>
        </div>

    </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import RecognitionCard from "src/components/RecognitionCard.vue"
import ServicesAdvancePlan from 'src/services/ServicesAdvancePlan'
import { reactive, ref } from "vue"
const router = useRoute()

const advancePlan = reactive({
    tittle: '',
    description: ''
})

const recognitionCards = ref([])
console.log(router.params)
ServicesAdvancePlan.advancePlanItems(router.params.idAdvancePlan)
    .then(data => {
        console.log(data)
        if (data.success) {
            advancePlan.description = data.advancePlan.Description
            advancePlan.tittle = data.advancePlan.tittle
            recognitionCards.value = data.advancePlan.recognitions
        }

    })

</script>

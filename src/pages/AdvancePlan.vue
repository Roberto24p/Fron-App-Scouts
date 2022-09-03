<template>
    <div class="q-pa-md row items-start q-gutter-md justify-center" >
    <h5 class="col-12 text-center q-mb-none">Planes de Adelanto</h5>
        <div class="col-md-3 col-sm-12" v-for="advancesPlans in advancesPlan" v-bind:key="advancesPlans.id">
            <card-advance-plan :tittle="advancesPlans.tittle" :description="advancesPlans.Description"
                :img_url="advancesPlans.image" :route="advancesPlans.id">

            </card-advance-plan>
        </div>

    </div>
</template>
<script setup>
import CardAdvancePlan from 'src/components/CardAdvancePlan.vue';
import ServicesAdvancePlan from 'src/services/ServicesAdvancePlan';
import {  ref } from 'vue'
const advancesPlan = ref([])
ServicesAdvancePlan.get()
    .then(data => {
        console.log(data)
        advancesPlan.value = data
    })


</script>

<style >
</style>
<template>
    <div class="q-pa-md row items-start q-gutter-md justify-center">
        <h5 class="col-12 text-center q-mb-none">Planes de Adelanto</h5>
        <div class="col-md-3 col-sm-12" v-for="advancesPlans in advancesPlan" v-bind:key="advancesPlans.id">
            <card-advance-plan :tittle="advancesPlans.tittle" :description="advancesPlans.Description" @getAdvancesPlan="getAdvancePlan"
                :img_url="advancesPlans.image" :route="advancesPlans.id" :state="advancesPlans.state">

            </card-advance-plan>
        </div>
    </div>
    <q-dialog v-model="newAdvancePlan">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">Nuevo Plan de Adelanto</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-form @submit.prevent="saveAdvancePlan">
                    <q-input v-model="newAdvPlan.tittle" label="Titulo" lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Escribe un nombre...']" />
                    <q-input v-model="newAdvPlan.description" label="Descripción" lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Escribe una descripción...']" />
                    <q-select label="Selecciona un tipo de unidad" option-label="name" option-value="name"
                        :options="ranges" v-model="newAdvPlan.range" />
                    <q-btn class="q-mt-md" label="Guardar" type="submit" color="primary" style="width: 100%;" />

                </q-form>
            </q-card-section>


        </q-card>
    </q-dialog>

</template>
<script setup>
import CardAdvancePlan from 'src/components/CardAdvancePlan.vue';
import ServicesAdvancePlan from 'src/services/ServicesAdvancePlan';
import ServicesRange from 'src/services/ServicesRange';
import { ref, reactive } from 'vue'
const newAdvPlan = reactive({
    tittle: '',
    description: '',
    type: ''
})
const advancesPlan = ref([])
const newAdvancePlan = ref(true)
const ranges = ref([])

const getRanges = async () => {
    const response = await ServicesRange.showAll()
    ranges.value = response.ranges
}

const saveAdvancePlan = async () => {
    console.log(newAdvPlan)
    // const response = await ServicesAdvancePlan.store()
}
const getAdvancePlan = () => {
    ServicesAdvancePlan.get()
        .then(data => {
            console.log(data)
            advancesPlan.value = data
        })
}
getAdvancePlan()
getRanges()

</script>

<style >

</style>
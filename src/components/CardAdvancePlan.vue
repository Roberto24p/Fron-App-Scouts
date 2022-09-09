<template>
    <div class="col-md-3 col-sm-12">
        <q-card class="my-card">

            <q-card-section>
                <div class="text-h6">{{ tittle }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                {{ description }}
            </q-card-section>

            <q-card-actions>
                <q-btn flat color="dark" label="Ver" @click="redirectAdvancePlan" />
                <q-btn flat color="primary" label="Editar" @click="redirectEditAdvancePlan" />
                <q-btn flat color="primary" v-show="state == 'A'" label="Desactivar"
                    @click="desactivarPlanDeAdelanto" />
                <q-btn flat color="primary" v-show="state != 'A'" label="Activar" @click="habilitarPlandeAdelanto" />
                <q-btn flat :color="state == 'A'? 'green-9': 'blue-grey-5'"  :label="state == 'A'? 'Activo' : 'Desactivado'"  />
            </q-card-actions>
        </q-card>
    </div>
    <q-dialog v-model="confirmDisable">
        <q-card style="width: 300px">
            <q-card-section>
                <div class="text-h6">¿Desea desactivar el plan de Adelanto?</div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Desactivar" @click="disable" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="confirmAvailable">
        <q-card style="width: 300px">
            <q-card-section>
                <div class="text-h6">¿Desea activar el plan de Adelanto?</div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Activar" @click="available" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>
import { useRouter } from "vue-router"
import ServicesAdvancePlan from "src/services/ServicesAdvancePlan";
import { ref } from "vue";
import { defineEmits } from "vue";
const emit = defineEmits(['getAdvancesPlan'])

const confirmDisable = ref(false)
const confirmAvailable = ref(false)
const router = useRouter()

const props = defineProps({
    tittle: String,
    description: String,
    img_url: String,
    route: Number,
    state: String
})
const redirectAdvancePlan = () => {
    router.push({ name: 'advancePlanDetails', params: { idAdvancePlan: props.route } })
}

const redirectEditAdvancePlan = () => {
    router.push({ name: 'AdvancePlanEdit', params: { idAdvancePlan: props.route } })
}

const desactivarPlanDeAdelanto = () => {
    confirmDisable.value = true
}

const disable = async () => {
    const response = await ServicesAdvancePlan.disableAdvancePlan(props.route)
    if (response.success)
        emit('getAdvancesPlan')
    console.log(response)
}

const habilitarPlandeAdelanto = () => {
    confirmAvailable.value = true
}

const available = async () => {
    const response = await ServicesAdvancePlan.enableAdvancePlan(props.route)
    if (response.success)
        emit('getAdvancesPlan')

}
</script>

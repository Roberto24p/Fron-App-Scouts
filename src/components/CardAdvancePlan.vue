<template>
    <div class="col-md-3 col-sm-12">
        <q-card class="my-card">
            <img :src="img_url">

            <q-card-section>
                <div class="text-h6">{{ tittle }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                {{ description }}
            </q-card-section>

            <q-card-actions>
                <q-btn flat color="dark" label="Ver" @click="redirectAdvancePlan" />
                <q-btn flat color="primary" label="Editar"  @click="redirectEditAdvancePlan"/>
            </q-card-actions>
        </q-card>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
    tittle: String,
    description: String,
    img_url: String,
    route: Number
})

const redirectAdvancePlan = () => {
    router.push({ name: 'advancePlanDetails', params: { idAdvancePlan: props.route } })
} 

const redirectEditAdvancePlan = () =>{
    router.push({ name: 'AdvancePlanEdit', params: { idAdvancePlan: props.route } })
    
}
</script>

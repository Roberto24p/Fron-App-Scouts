<script setup>
import { useRouter } from "vue-router"
import { useQuasar } from 'quasar'
import ServicesReport from "src/services/ServicesReport";

//DATA
const router = useRouter()
const $q = useQuasar()

//METHODS
const reporte = () => {
    router.push({
        name: 'ReportPeriods'
    })
}


const reportDirectings = async () => {
    $q.loading.show()
    await ServicesReport.reportDirectingsByGroups()
    $q.loading.hide()
}

const reportDirectingsDetails = async () => {
    $q.loading.show()
    await ServicesReport.reportDirectingsDetails()
    $q.loading.hide()
}


</script>
<template>
    <div class="q-pa-md ">
        <div class="row q-col-gutter-md">
            <div class="col-md-12 col-xs-12 q-mt-md">
                <q-card class="my-card ">
                    <q-item>
                        <p style="font-size: 25px;margin-top:10px ">Reportes</p>
                    </q-item>
                </q-card>
            </div>
            <div class="col-md-4 col-xs-12 q-mt-md">
                <q-card class="my-card text-center">
                    <q-item class="row justify-center">
                        <q-btn padding="xl" icon="summarize" @click="reporte" />
                    </q-item>
                    <p>Inscripciones</p>

                </q-card>
            </div>
            <div class="col-md-4 col-xs-12 q-mt-md">
                <q-card class="my-card text-center">
                    <q-item class="row justify-center">
                        <q-btn padding="xl" icon="explore" @click="reportDirectings" />
                    </q-item>
                    <p>Dirigentes</p>
                </q-card>
            </div>
            <div class="col-md-4 col-xs-12 q-mt-md">
                <q-card class="my-card text-center">
                    <q-item class="row justify-center">
                        <q-btn padding="xl" icon="explore" @click="reportDirectingsDetails" />
                    </q-item>
                    <p>Dirigentes por grupo</p>
                </q-card>
            </div>
        </div>
    </div>
</template>
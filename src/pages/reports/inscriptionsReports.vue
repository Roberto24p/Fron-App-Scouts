<template>

    <div class="q-pa-md">
        <q-table title="Periodos" :rows="periods" :columns="columns" row-key="name" :loading="loading">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn color="yellow" icon="printer" class="q-mx-sm" @click="generate(props.row.id)"></q-btn>

                </q-td>
            </template>
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>
        </q-table>
    </div>

</template>
<script setup>
import ServicesPeriod from "src/services/ServicesPeriod";
import {  ref } from "vue"
import axios from 'axios'

const periods = ref([])
const columns = [
    {
        namel: 'name',
        required: true,
        label: 'Descripción',
        align: 'left',
        field: row => row.description,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'date_start', align: 'center', label: 'Fecha de Inicio', field: 'date_start', },
    { name: 'date_end', label: 'Fecha de Finalización', align: 'center', field: 'date_end' },
    { name: 'actions', lable: 'Acctiones' }
]
const getPeriods = async () => {
    const response = await ServicesPeriod.all()
    if (response.success) {
        periods.value = response.data
    }
    console.log(response)
}

const generate = async (perioId) => {
    const response = await axios.get(`${process.env.BASE_API}/pdf/inscriptions/groups/${perioId}`, {
        responseType: "blob"
    })
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
    window.open(url, '_blank')
}
getPeriods()

</script>
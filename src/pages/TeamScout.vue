<template>
    <div class="q-pa-md">
        <q-toolbar class="bg-primary text-white shadow-2 rounded-borders">
            <q-tabs v-model="tab" shrink stretch>
                <q-tab :name="team.name" :label="team.name" v-for="team in teams" v-bind:key="team.name" />
            </q-tabs>
            <q-space />
            <q-separator />

            <q-btn flat label="Homepage" />
        </q-toolbar>
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel v-for="team in teams" v-bind:key="team.name" :name="team.name">
                <div class="q-pa-none" style="max-width: 350px">
                    <div class="text-h5" v-for="scout in scouts " v-bind:key="scout.id">
                        <h5> {{ scout.name }}</h5>
                    </div>
                </div>
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>
<script setup>
//Imports
import { ref } from 'vue';
import { useRoute } from "vue-router"
import ServicesTeam from 'src/services/ServicesTeam';
import ServicesScout from 'src/services/ServicesScout';

// Declaraciones
const tab = ref('EQUIPO PRUEBA CDUCUDU')
const route = useRoute()
const teams = ref([])
const scouts = ref([])
console.log(route.params)

// Funciones
ServicesTeam.teamsByUnit(route.params.unitId)
    .then(response => {
        teams.value = response.teams
    })
ServicesScout.getByUnit(route.params.unitId)
    .then(response => {
        scouts.value = response.scouts
        console.log(response)
    })
</script>
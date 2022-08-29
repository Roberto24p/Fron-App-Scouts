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
                <q-list bordered separator style="max-width: 318px" v-for="scout in scouts " v-bind:key="scout.scout_id"
                    v-show="scout.team_id == team.id">
                    <q-item  style="cursor: pointer" >
                        <q-item-section @click="redirect(scout.scout_id)">{{ scout.name }} {{ scout.last_name }}</q-item-section>
                    </q-item>
                </q-list>
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>
<script setup>
//Imports
import { ref } from 'vue';
import { useRoute, useRouter } from "vue-router"
import ServicesTeam from 'src/services/ServicesTeam';
import ServicesScout from 'src/services/ServicesScout';

// Declaraciones
const tab = ref('EQUIPO PRUEBA CDUCUDU')
const route = useRoute()
const router = useRouter()
const teams = ref([])
const scouts = ref([])
console.log(route.params)

// Funciones

const redirect = (scoutId) => {

    router.push({
        name: 'AdvancePlanScout', 
        params: {
            scoutId: scoutId
        }
    })
}
ServicesTeam.teamsByUnit(route.params.unitId)
    .then(response => {
        teams.value = response.teams
        console.log(response)
    })
ServicesScout.getByUnit(route.params.unitId)
    .then(response => {
        scouts.value = response.scouts
        console.log(response)
    })
</script>
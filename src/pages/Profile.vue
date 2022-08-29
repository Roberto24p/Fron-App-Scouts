<template >
  <div class="q-pa-md ">
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-card class="my-card  q-py-sm">
          <q-item>
            <q-item-section avatar>
              <q-avatar square>
                <img :src="store.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label><strong>{{ store.name }}</strong> </q-item-label>
              <q-item-label caption>
                {{ store.email }}
              </q-item-label>
            </q-item-section>

          </q-item>

          <q-separator />
          <q-separator />
          <q-item>
            <q-item-section>
              <q-btn color="primary" label="Inscripción" flat @click="redirect('InscriptionScout')" />
            </q-item-section>
            <q-item-section>
              <q-btn color="grey" label="Editar Información" @click="redirect('profileEdit')" />
            </q-item-section>
          </q-item>
        </q-card>

      </div>
      <div class="col-6">
        <q-card class="my-card ">
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Plan de Adelanto
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section avatar>
              <q-btn round color="blue-2" text-color="blue-8" icon="fas fa-bolt" />

            </q-item-section>

            <q-item-section>
              <q-badge color="white text-black">
                Progreso:
              </q-badge>
              <q-linear-progress size="25px" :value="percent" color="primary">
                <div class="absolute-full flex flex-center">
                </div>
              </q-linear-progress>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-btn color="primary" icon-right="fas fa-chevron-right" label="Detalle" flat />
            </q-item-section>
          </q-item>
        </q-card>
      </div>


    </div>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-toolbar>
          <q-toolbar-title class="text-overline">Información</q-toolbar-title>
          <q-btn flat text-color="light-blue-8" label="Show All" />
        </q-toolbar>

        <q-card class="my-card" style="padding: 33px 0px 33px 0px;">
          <q-item>
            <q-item-section avatar>
              <q-btn round color="blue-2" text-color="blue-8" icon="fas fa-bolt" />
            </q-item-section>

            <q-item-section>
              <q-item-label><strong>Grupo Scout</strong> </q-item-label>
              <q-item-label caption>
                {{ profile.grupoScout }}
              </q-item-label>
              <q-item-label><strong>{{ profile.type }}</strong> </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-green"><strong style="text-transform: capitalize;">{{ profile.statusInscription
              }}</strong> </q-item-label>
            </q-item-section>

          </q-item>
        </q-card>
      </div>
      <div class="col-6">
        <q-toolbar>
          <q-toolbar-title class="text-overline">Reconocimientos Obtenidos</q-toolbar-title>
          <q-btn flat text-color="light-blue-8" label="Show All"></q-btn>
        </q-toolbar>
        <q-card class="my-card q-py-sm">
          <q-item>
            <q-item-section>
              <q-item-label><strong>Aspirante</strong></q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
        <q-card class="my-card q-py-sm q-mt-sm">
          <q-item>
            <q-item-section>
              <q-item-label><strong>Primera Clase</strong></q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import ServicesProfile from 'src/services/ServicesProfile'
import ServicesInscription from 'src/services/ServicesInscription'
import ServicesAdvancePlan from 'src/services/ServicesAdvancePlan'
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUsersStore } from 'src/store/user-store'
const store = useUsersStore()

const router = useRouter()
const profile = reactive({
  name: '',
  email: '',
  type: '',
  grupoScout: '',
  statusInscription: ''
})
const percent = ref('')
ServicesProfile.getProfile()
  .then(data => {
    profile.name = data.user.name
    profile.email = data.user.email
    if (data.scout.type == '')
      profile.type = 'NO INSCRITO'
    console.log(data)
  })

ServicesInscription.getStatusInscription()
  .then(data => {
    profile.grupoScout = data.data.name
    profile.statusInscription = data.data.state_inscription
    getPercentAdvancePlan(data.data.scout_id)
  })
const getPercentAdvancePlan = (scout_id) => {
  ServicesAdvancePlan.getPercent(scout_id)
    .then(response => {
      percent.value = response
    })
}

const redirect = (ruta) => {
  router.push(ruta)
}

</script>

<style >
</style>
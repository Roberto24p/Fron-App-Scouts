<template >
  <div class="q-pa-md " v-show="store.role == 6">
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-xs-12">
        <q-card class="my-card  q-py-sm">
          <q-item>
            <q-item-section avatar>
              <q-avatar square>
                <img
                  :src="store.avatar == null || store.avatar == '' ? 'https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-vector-avatar-icon-png-image_322275.jpg' : store.avatar">
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
      <div class="col-md-6 col-xs-12">
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
              <q-btn round color="blue-2" text-color="blue-8" icon="cached" />
            </q-item-section>
            <q-item-section>
              <q-badge color="white text-black">
                Progreso:
              </q-badge>
              <q-linear-progress size="25px" :value="percent"
                :color="percent <= .5 ? 'secondary' : percent > .5 && percent < .99 ? 'warning' : 'positive'"
                style="border-radius: 10px;">
                <div class="absolute-full flex flex-center">
                  <q-badge color="white" text-color="accent" :label="(percent * 100) + '%'" />
                </div>
              </q-linear-progress>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <!-- <q-btn color="primary" icon-right="fas fa-chevron-right" label="Detalle" flat /> -->
            </q-item-section>
          </q-item>
        </q-card>
      </div>


    </div>
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-xs-12">
        <q-toolbar>
          <q-toolbar-title class="text-overline">Información</q-toolbar-title>
        </q-toolbar>

        <q-card class="my-card" style="padding: 33px 0px 33px 0px;">
          <q-item>
            <q-item-section avatar>
              <q-btn round color="blue-2" text-color="blue-8" :icon="!profile.grupoScout == '' ? 'done' : 'close'" />
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
      <div class="col-md-6 col-xs-12">
        <q-toolbar>
          <q-toolbar-title class="text-overline">Reconocimientos Obtenidos</q-toolbar-title>
          <q-btn color="green" @click="reporteAdvancePlan">Reporte de tu plan de adelanto</q-btn>
          <q-inner-loading :showing="visible">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </q-toolbar>
        <div>

          <q-card v-for="recog in recognitions " v-bind:key="recog.id" class="my-card q-my-sm"
            v-show="showRecognitions">
            <q-item>

              <q-item-section>
                <q-item v-if="recogGets[recog.id]" bg-success>
                  <q-icon style="font-size: 2em" name="check" color="green" class="q-ml-md"></q-icon>
                </q-item>
                <q-item v-else>
                  <q-icon style="font-size: 2em" name="hourglass_empty" color="warning" class="q-ml-md"></q-icon>
                </q-item>
              </q-item-section>

              <q-item-section>
                <q-item-label><strong>{{ recog.name }}</strong></q-item-label>
              </q-item-section>
            </q-item>
          </q-card>

        </div>
      </div>
    </div>
  </div>
  <div class="q-pa-md " v-if="store.role == 4 || store.role == 5">
    <div class="row q-col-gutter-md">
      <div class="col-md-12 col-xs-12">
        <q-card class="my-card  q-py-sm">
          <q-item>
            <q-item-section avatar>
              <q-avatar square>
                <img
                  :src="store.avatar == null || store.avatar == '' ? 'https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-vector-avatar-icon-png-image_322275.jpg' : store.avatar">
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
              <q-btn color="grey" label="Editar Información" @click="redirect('profileEdit')" />
            </q-item-section>
          </q-item>
        </q-card>

      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-md-6 col-xs-12">
        <q-card class="my-card" style="padding: 33px 0px 33px 0px;">
          <q-item>
            <q-item-section avatar>
              <q-avatar square>
                <img
                  :src="profile.imgGroup == '' ? 'https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-vector-avatar-icon-png-image_322275.jpg' : profile.imgGroup">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label><strong>{{ profile.grupoScout }}</strong> </q-item-label>

            </q-item-section>
            <q-item-section>

              <q-item-label class="text-green"><strong style="text-transform: capitalize;"> Unidad: {{
              profile.unitScout
              }}</strong> </q-item-label>

            </q-item-section>

          </q-item>
        </q-card>
      </div>
      <div class="col-md-6 col-xs-12" v-if="store.role == 4">
        <q-card class="my-card text-center">
          <q-item class="row justify-center">
            <q-btn padding="xl" icon="summarize" @click="reportScoutsByGroup" />
          </q-item>
          <p>Reporte de Scouts Inscritos</p>

        </q-card>
      </div>
      <div class="col-md-12" v-if="store.role == 4">
        <q-card class="my-card text-center">
          <q-item class="row justify-center">
            <pie-chart></pie-chart>
          </q-item>
        </q-card>
      </div>
    </div>
  </div>
  <div class="q-pa-md " v-if="store.role == 1 || store.role == 2 || store.role == 3">
    <div class="row q-col-gutter-md">
      <div class="col-md-12 col-xs-12">
        <q-card class="my-card  q-py-sm">
          <q-item>
            <q-item-section avatar>
              <q-avatar square>
                <img
                  :src="store.avatar == null || store.avatar == '' ? 'https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-vector-avatar-icon-png-image_322275.jpg' : store.avatar">
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
              <q-btn color="grey" label="Editar Información" @click="redirect('profileEdit')" />
            </q-item-section>
          </q-item>
        </q-card>

      </div>
      <div class="col-md-6 col-xs-12">
        <q-card class="my-card  q-py-sm">

          <chart class="q-mt-sm"></chart>
        </q-card>

      </div>
      <div class="col-md-6 col-xs-12">
        <q-card class="my-card  q-pt-sm ">
          <p class="text-center">Dirigentes por grupo</p>
          <chart-directings-report></chart-directings-report>
        </q-card>

      </div>
    </div>

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

<script setup>
import Chart from 'src/components/Chart.vue'
import PieChart from 'src/components/PieChart.vue'
import ChartDirectingsReport from 'src/components/ChartDirectingsReport.vue'
import ServicesProfile from 'src/services/ServicesProfile'
import ServicesInscription from 'src/services/ServicesInscription'
import ServicesAdvancePlan from 'src/services/ServicesAdvancePlan'
import ServicesReport from 'src/services/ServicesReport'
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUsersStore } from 'src/store/user-store'
import { useQuasar } from 'quasar'
import ServicesDirecting from 'src/services/ServicesDirecting'
const showRecognitions = ref(false)
const visible = ref(false)
const $q = useQuasar()
const store = useUsersStore()
$q.loading.show()
const router = useRouter()
const profile = reactive({
  name: '',
  email: '',
  type: '',
  grupoScout: '',
  unitScout: '',
  imgGroup: '',
  scoutId: ''
})
const percent = ref('')
const recognitions = ref([])
const recogGets = reactive({})
if (store.role == 6) {
  ServicesProfile.getProfile()
    .then(data => {
      $q.loading.hide()

      console.log(data)
      profile.name = data.user.name
      profile.email = data.user.email
      if (store.role == 6)
        profile.scoutId = data.scout.id
      if (data.scout.type == '')
        profile.type = 'NO INSCRITO'
      console.log(data)
    })

  ServicesInscription.getStatusInscription()
    .then(data => {
      if (store.role == 6) {
        profile.grupoScout = data.data.name
        profile.statusInscription = data.data.state_inscription
        geRecognitionsComplete(profile.scoutId)

        getPercentAdvancePlan(profile.scoutId)
        ServicesAdvancePlan.advancePlanDetails(profile.scoutId)
          .then(response => {
            recognitions.value = response[0].recognitions

            console.log(recognitions.value)
          })
      } else {
        $q.loading.hide()

      }

    })

  const geRecognitionsComplete = () => {
    showRecognitions.value = false
    visible.value = true
    ServicesAdvancePlan.getRecognitionsComplete(profile.scoutId)
      .then(response => {
        response.recog.forEach(item => {
          recogGets[item.id] = true
        })
        console.log(response)
        $q.loading.hide()
        visible.value = false
        showRecognitions.value = true
      })
  }
  const getPercentAdvancePlan = () => {
    ServicesAdvancePlan.getPercent(profile.scoutId)
      .then(response => {
        percent.value = response
      })
  }

} else {
  ServicesDirecting.getProfileDirecting()
    .then(response => {
      profile.grupoScout = response.profile.group.name
      profile.imgGroup = response.profile.group.image
      profile.unitScout = response.profile.name
      console.log(response)
    })
  $q.loading.hide()

}

const reporte = async () => {
  router.push({
    name: 'ReportPeriods'
  })
}

const reporteAdvancePlan = async () => {
  $q.loading.show()
  await ServicesReport.reporteAdvancePlan()
  $q.loading.hide()
}

const reportDirectings = async () => {
  $q.loading.show()
  await ServicesReport.reportDirectingsByGroups()
  $q.loading.hide()
}


const reportScoutsByGroup = async () => {
  $q.loading.show()
  await ServicesReport.reportScoutsInscribedByUnit()
  $q.loading.hide()
}

const reportDirectingsDetails = async () => {
  $q.loading.show()
  await ServicesReport.reportDirectingsDetails()
  $q.loading.hide()
}

const redirect = (ruta) => {

  router.push(ruta)
}

</script>

<style >

</style>
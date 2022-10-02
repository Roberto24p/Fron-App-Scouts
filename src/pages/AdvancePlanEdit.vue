<template>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <h5 class="col-12 text-center q-mb-none">{{ advancePlan.tittle }}</h5>
    <q-input v-model="advancePlan.tittle" class="col-12" outlined bg-color="grey-1"> </q-input>
    <q-input v-model="advancePlan.description" class="col-12" type="textarea" outlined bg-color="grey-1"> </q-input>
    <div class="col-md-12">
      <q-card class="my-card ">
        <q-item>
          <q-item-section>
            <q-tabs v-model="tab" narrow-indicator dense align="justify" class="bg-grey-1">
              <q-tab v-for="recognition in advPlan.recognitions" :label="recognition.name" class="text-cyan"
                v-bind:key="recognition.id" :name="recognition.id" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel v-for="recognition in advPlan.recognitions" v-bind:key="recognition.id"
                :name="recognition.id">
                <q-input bg-color="yellow-2" v-model="recognition.name" label="Nombre del Reconocimiento" outlined>
                </q-input>
                <div class="q-pa-sm row">
                  <div class="col-3 q-ma-xs" v-for="topic in recognition.topics" v-bind:key="topic.id">
                    <q-input label="Nombre del indicador" v-model="topic.name" outlined>
                      <template v-slot:append>
                        <q-icon name="close" @click="deleteItem(topic, recognition.topics)" class="cursor-pointer" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <q-btn class="q-mt-sm center" color="white" text-color="black" label="Eliminar Reconocimiento"
                  @click="dialogDeleteRecognition(recognition)" />
                <q-btn class="q-mt-sm center  q-ml-md" color="white" text-color="black" label="Agregar Indicador"
                  @click="addItem(recognition.topics)" />
              </q-tab-panel>
            </q-tab-panels>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <q-btn class="q-mt-sm center" color="green" text-color="black" label="Guardar" @click="bttUpdate" style="position: fixed; bottom:50px;right:100px;" />
    <q-btn color="primary" @click="addRecognition" style="position: fixed; bottom:50px;right: 300px">
      Agregar Reconocimiento
    </q-btn>
  </div>
  <q-dialog v-model="small">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">Alerta</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        ¿Estas seguro que deseas eliminar este reconcimiento?
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Eliminar" @click="deleteRecog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useRoute } from "vue-router"
import { ref, reactive } from 'vue'
import ServicesAdvancePlan from 'src/services/ServicesAdvancePlan'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const tab = ref('')
const router = useRoute()
console.log(router.params)
const small = ref(false);
const advancePlan = reactive({
  tittle: '',
  description: '',
})

const advPlan = reactive({
  recognitions: []
})
const itemDelete = []
// const itemRecognition = ref([])
console.log(router.params)
const recognitionDelete = ref('')
const dialogDeleteRecognition = (recognitionId) => {
  small.value = true
  recognitionDelete.value = recognitionId.id
}
const deleteRecog = async () => {
  console.log(router.params.idAdvancePlan)
  console.log(recognitionDelete.value)
  const response = await ServicesAdvancePlan.deleteRecognition(recognitionDelete.value, router.params.idAdvancePlan)
  if (response.success) {
    $q.notify({
      type: 'positive',
      message: 'Reconocimiento eliminado correctamente'
    })
    getAdvancePlan()
  } else {
    $q.notify({
      type: 'error',
      message: response.message
    })
  }
}
const bttUpdate = async () => {
  $q.loading.show()
  const response = await ServicesAdvancePlan.put({
    tittle: advancePlan.tittle,
    description: advancePlan.description,
    recognitions: advPlan.recognitions,
    advancePlanId: router.params.idAdvancePlan,
    itemDelete
  })
  if (response.success) {
    $q.notify({
      type: 'positive',
      message: 'Plan de Adelanto actualizado correctamente'
    })
    getAdvancePlan()
  } else {
    $q.notify({
      type: 'error',
      message: response.message
    })
  }
  $q.loading.hide()


}

const deleteItem = (itemId, recog) => {
  itemId.name = ''
  const indice = recog.map(obj => obj.id).indexOf(itemId.id)
  itemDelete.push(recog[indice].id)
  console.log(recog[indice])
  if (indice != -1)
    recog.splice(indice, 1)
}

const addItem = (index) => {
  index.push({
    id: Date.now(),
    name: ''
  })
  console.log(index)
}

const getAdvancePlan = () => {
  ServicesAdvancePlan.advancePlanItems(router.params.idAdvancePlan)
    .then(data => {
      console.log(data.advancePlan.Description)
      console.log(data.advancePlan.recognitions)
      advancePlan.description = data.advancePlan.Description
      advancePlan.tittle = data.advancePlan.tittle
      advPlan.recognitions = data.advancePlan.recognitions
      if (advPlan.recognitions[0] != null) {
        console.log(advPlan.recognitions[0].name)
        tab.value = advPlan.recognitions[0].id
      }
    })
}

const addRecognition = () => {
  const newRecog = {
    name: 'Ingresa un nombre...',
    topics: ref([]),
    id: Date.now(),

  }
  advPlan.recognitions.push(newRecog)
  tab.value = newRecog.id

}
getAdvancePlan()
</script>

<style scoped lang="scss" >
input[text] {
  padding-left: 10px;
}
</style>
<template>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <h5 class="col-12 text-center q-mb-none">{{ advancePlan.tittle }}</h5>
    <q-input v-model="advancePlan.tittle" class="col-12" outlined></q-input>
    <q-input v-model="advancePlan.description" class="col-12" type="textarea" outlined></q-input>
    <div class=" col-md-3 col-sm-12" v-for="recognition in advPlan.recognitions" v-bind:key="recognition.id">
      <q-expansion-item expand-separator style="min-width: 225px; max-width: 450px" class="col-3"
        :label="recognition.name" default-opened header-class="bg-teal text-white " expand-icon-class="text-white">
        <q-input v-model="recognition.name" outlined class="col-md-6 q-mt-sm "></q-input>
        <div class=" q-ml-md">
          <q-input v-for="topic in recognition.topics" outlined v-bind:key="topic.id" v-model="topic.name"
            bg-color="warning" class=" q-mt-sm">
            <template v-slot:append>
              <q-icon name="close" @click="deleteItem(topic, recognition.topics)" class="cursor-pointer" />
            </template>
          </q-input>
          <q-btn class="q-mt-sm center" color="white" text-color="black" label="Agregar Indicador"
            @click="addItem(recognition.topics)" />
        </div>
      </q-expansion-item>
    </div>
    <q-btn class="q-mt-sm center" color="white" text-color="black" label="Guardar" @click="bttUpdate" />

  </div>
</template>
<script setup>
import { useRoute } from "vue-router"
import { ref, reactive } from 'vue'
import ServicesAdvancePlan from 'src/services/ServicesAdvancePlan'

const router = useRoute()
console.log(router.params)

const advancePlan = reactive({
  tittle: '',
  description: ''
})

const advPlan = reactive({
  recognitions: []
})
const itemDelete = []
// const itemRecognition = ref([])
console.log(router.params)
ServicesAdvancePlan.advancePlanItems(router.params.idAdvancePlan)
  .then(data => {
    alert(data[0].Description)
    console.log(data[0].Description)
    console.log(data[0].recognitions)
    advancePlan.description = data[0].Description
    advancePlan.tittle = data[0].tittle
    advPlan.recognitions = data[0].recognitions
  })

const bttUpdate = () => {
  ServicesAdvancePlan.put({
    tittle: advancePlan.tittle,
    description: advancePlan.description,
    recognitions: advPlan.recognitions,
    advancePlanId: router.params.idAdvancePlan,
    itemDelete
  })
  getAdvancePlan()
  console.log(advancePlan.tittle)
  console.log(advancePlan.description)
  console.log(advPlan.recognitions)
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
    id:Date.now() ,
    name: ''
  })
  console.log(index)
}

const getAdvancePlan = () =>{
  ServicesAdvancePlan.advancePlanDetails(router.params.idAdvancePlan)
  .then(data => {
    console.log(data[0].Description)
    console.log(data[0].recognitions)
    advancePlan.description = data[0].Description
    advancePlan.tittle = data[0].tittle
    advPlan.recognitions = data[0].recognitions
  })
}
getAdvancePlan()
</script>

<style scoped lang="scss" >
input[text] {
  padding-left: 10px;
}
</style>
<template>
  <div class="q-pa-md">
    <q-btn label="Agregar" color="primary" class="q-ma-md" @click="openDialogCreate" />
    <q-table title="Grupos" :rows="groups" :columns="columns" row-key="name" :loading="loading">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="yellow" icon="mode_edit" class="q-mx-sm" @click="onEdit(props.row)"></q-btn>
          <q-btn color="red" icon="delete" @click="onDelete(props.row)" v-show="props.row.state=='A'"></q-btn>
          <q-btn color="green" icon="add" @click="activate(props.row)" v-show="props.row.state!='A'"></q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-img="props">
        <q-td :props="props">
          <q-avatar rounded>
            <img :src="props.row.image == null ? 'https://i.imgur.com/wKV0Jmy.png' : props.row.image"
              alt="No Tiene Imagen" size="100px">
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>

  </div>
  <q-dialog v-model="deleteDialog">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">Alerta</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        ¿Desea eliminar el grupo seleccionado?
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Si" v-close-popup color="red" @click="deleteGroup" />
        <q-btn flat label="No" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialog" transition-show="slide-up" transition-hide="slide-down">
    <q-card style="width: 900px; max-width: 80vw;">
      <q-bar>
        <q-toolbar-title>Nuevo Grupo</q-toolbar-title>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>


      <q-card-section class="col q-pt-none q-mt-sm">
        <div class="col-6 text-center ">
          <q-img
            :src="Group.img_url == 'https://i.imgur.com/wKV0Jmy.png' ? 'https://i.imgur.com/wKV0Jmy.png' : Group.img_url"
            spinner-color="white" style="height: 140px; max-width: 150px; border: yellow 5px solid; " />

        </div>
        <q-form @reset="onReset" class="q-gutter-md row justify-center q-mt-sm">
          <!-- <q-input v-model="Group.id"></q-input> -->
          <div class="col-md-4 col-sm-12">
            <q-input filled class="col-8" v-model="Group.name" label="Nombre del Grupo" lazy-rules
              :rules="[val => val && val.length > 0 || 'Obligatorio']" />
            <q-input filled class="col-8" v-model="Group.addres" label="Dirección" lazy-rules
              :rules="[val => val && val.length > 0 || 'Obligatorio']" />
            <q-uploader field-name="image" :factory="upload" @uploaded="fileComplete" style="max-width: 280px" />
            <q-btn @click="addUnit" v-show="bttForm" class="q-mt-sm" color="warning">Agregar Unidad</q-btn>

          </div>
          <div class="col-md-7 col-sm-12 " v-show="bttForm">
            <div v-for="unit in Group.units" v-bind:key="unit.id" class="row q-mt-sm">
              <q-input square outlined label="Nombre de unidad" v-model="unit.name" class="q-mb-sm col-7" lazy-rules
                :rules="[val => val && val.length > 0 || 'Obligatorio']">
                <template v-slot:append>
                  <q-icon name="add" class="cursor-pointer" @click="addTeam(unit)" />
                  <q-icon name="close" class="cursor-pointer" @click="deleteTeam(unit, Group.units)" />
                </template>

              </q-input>
              <q-select outlined :options="unitsSelect" v-model="unit.type" class="col-3 q-ml-sm"
                :rules="[val => val && val.length > 0 || 'Obligatorio']" />
              <div v-for="team in unit.teams" v-bind:key="team.id" class="col-7">
                <q-input square outlined label="Nombre de equipo" v-model="team.name" class="q-ml-sm" lazy-rules
                  :rules="[val => val && val.length > 0 || 'Obligatorio']" bg-color="warning">
                  <template v-slot:append>
                    <q-icon name="close" class="cursor-pointer" @click="deleteTeam(team, unit.teams)" />
                  </template>
                </q-input>

              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Actualizar" v-on:click="updateData" v-show="!bttForm" />
        <q-btn flat label="Guardar" v-on:click="sendData" v-show="bttForm" />

      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirm">
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Deseas eliminar el grupo seleccionado?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Eliminar" color="primary" v-close-popup @click="deleteGroup" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue'
import ServicesGroup from 'src/services/ServicesGroup'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const loading = ref(false)
const bttForm = ref(false)
const dialog = ref(false)
const deleteDialog = ref(false)
const columns = [
  { name: 'img', label: 'Logo' },
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'address', align: 'left', label: 'Dirección', field: 'addres', sortable: true },
  { name: 'actions', label: 'Acciones' }
]

const unitsSelect = [
  'Manada',
  'Tropa',
  'Clan'
]
const groups = ref([])
const confirm = ref(false)

const Group = reactive({
  name: '',
  addres: '',
  img_url: '',
  id: '',
  units: []
})
const addTeam = (unit) => {
  const newTeam = reactive({
    name: ''
  })
  unit.teams.push(newTeam)

}

const activate = (row) => {
  ServicesGroup.activateGroup(row.id)
    .then(response => {
      console.log(response)
      if (response.success == 1) {
        getGroups()
      }
    })
}

const deleteTeam = (teamId, teams) => {
  const indice = teams.map(obj => obj.id).indexOf(teamId.id)
  if (indice != -1)
    teams.splice(indice, 1)
}


const addUnit = () => {
  console.log('Hola mundo')
  const newUnit = reactive({
    name: '',
    img: '',
    teams: []
  })
  Group.units.push(newUnit)
}
const onEdit = (data) => {
  dialog.value = true
  bttForm.value = false
  console.log(data)
  Group.name = data.name
  Group.addres = data.addres
  Group.img_url = data.image
  Group.id = data.id
}

const openDialogCreate = () => {
  dialog.value = true
  bttForm.value = true
}

async function updateData() {
  const groupJson = {
    name: Group.name,
    addres: Group.addres,
    image: Group.img_url,
  }
  const message = await ServicesGroup.put(Group.id, groupJson)
  Group.name = ''
  Group.addres = ''
  Group.img_url = ''
  Group.units = []
  console.log(message)
  dialog.value = false
  getGroups()
}
async function getGroups() {
  // loading.value = true
  $q.loading.show()
  const dataGroups = await ServicesGroup.getGroups()
  console.log(dataGroups)
  groups.value = dataGroups
  $q.loading.hide()

}

async function onDelete(data) {
  console.log(data)
  deleteDialog.value = true
  Group.id = data.id

}

const deleteGroup = async () => {
  const response = await ServicesGroup.delete(Group.id)
  console.log(response)
  if (response.success) {
    getGroups()
    $q.notify({
      type: 'success',
      message: response.message,
      timeout: 2000
    })

  }else{
    $q.notify({
      type: 'negative',
      message: response.message,
      timeout: 2000
    })
  }
  Group.id = ''

}

function sendData() {
  let validate = false
  if (Group.name == '' || Group.addres == '') {
    validate = true
    $q.notify({
      type: 'negative',
      message: 'Complete los datos'
    })
    return 0
  }
  if (validate == false) {
    Group.units.forEach(unit => {
      if (unit.name == '', unit.type == '')

        validate = true
    })
    Group.units.forEach(unit => {
      unit.teams.forEach(team => {
        if (team.name == '') {

          validate = true
        }
      })
    })
  }

  if (validate == true) {
    $q.notify({
      type: 'negative',
      message: 'Complete los datos'
    })

    return 0
  }


  const groupJson = {
    name: Group.name,
    addres: Group.addres,
    image: Group.img_url,
    units: Group.units
  }
  ServicesGroup.post(groupJson)
    .then(response => {
      dialog.value = false
      getGroups()
      console.log(response)
      Group.name = ''
      Group.addres = ''
      Group.img_url = ''
      Group.id = ''
      Group.units = []
      $q.notify({
        type: 'positive',
        message: 'Grupo creado correctamente'
      })
    })

}

const upload = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token')
    resolve({
      url: `${process.env.BASE_API}/fileGroup`,
      methid: 'POST',
      headers: [
        { name: 'Authorization', value: `Bearer ${token}` },
      ],
    })
  })
}

const fileComplete = (info) => {
  Group.img_url = info.xhr.response
}


getGroups()


</script>
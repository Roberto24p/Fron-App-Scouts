<template>
  <div class="q-pa-md">
    <q-btn label="Agregar" color="primary" class="q-ma-md" @click="dialog = true; bttForm = true " />

    <q-table title="Grupos" :rows="groups" :columns="columns" row-key="name" selection="multiple"
      v-model:selected="selected" :loading="loading">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="yellow" icon="mode_edit" class="q-mx-sm" @click="onEdit(props.row)"></q-btn>
          <q-btn color="red" icon="delete" @click="onDelete(props.row)"></q-btn>
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>

  </div>
  <q-dialog v-model="dialog" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
    <q-card class="bg-white text-primary">
      <q-bar>
        <q-toolbar-title>Asociación de Scouts del Guayas</q-toolbar-title>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="text-h6">Nuevo Grupo</div>
      </q-card-section>

      <q-card-section class="col q-pt-none">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md row">
          <q-input v-model="Group.id"></q-input>
          <q-input filled class="col-2" v-model="Group.name" label="Nombre del Grupo" lazy-rules
            :rules="[val => val && val.length > 0 || 'Obligatorio']" />
          <q-input filled class="col-2" v-model="Group.addres" label="Dirección" lazy-rules
            :rules="[val => val && val.length > 0 || 'Obligatorio']" />
          <q-input class="col-2" filled v-model="Group.img_url" label="Logo " lazy-rules
            :rules="[val => val && val.length > 0 || 'Obligatorio']" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Guardar" v-close-popup v-on:click="sendData" v-show="bttForm" />
        <q-btn flat label="Actualizar" v-close-popup v-on:click="updateData" v-show="!bttForm" />
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
        <q-btn flat label="Eliminar" color="primary" v-close-popup @click="deleteData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { reactive, ref } from 'vue'
import ServicesGroup from 'src/services/ServicesGroup'
const loading = ref(false)
const bttForm = ref(false)
const dialog = ref(false)
const selected = ref([])
const columns = [
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
  { name: 'img', label: 'Logo', field: 'img_url' },
  { name: 'actions', label: 'Acciones' }
]
const groups = ref([])
const confirm = ref(false)

const Group = reactive({
  name: '',
  addres: '',
  img_url: '',
  id: ''
})


const onEdit = (data) => {
  dialog.value = true
  bttForm.value = false
  console.log(bttForm)
  Group.name = data.name
  Group.addres = data.addres
  Group.img_url = data.img_url
  Group.id = data.id

}

async function updateData() {
  const groupJson = {
    name: Group.name,
    addres: Group.addres,
    img_url: Group.img_url,
  }
  const message = await ServicesGroup.put(Group.id, groupJson)
  selected.value = []
  console.log(message)
  getGroups()
}
async function getGroups() {
  // loading.value = true
  const dataGroups = await ServicesGroup.getGroups()
  console.log(dataGroups)
  groups.value = dataGroups

}

async function onDelete(data) {
  const message = await ServicesGroup.delete(data.id)
  console.log(message)
  getGroups()
  selected.value = []
}

function sendData() {
  const groupJson = {
    name: Group.name,
    addres: Group.addres,
    img_url: Group.img_url,
    association: 1
  }
  const data = ServicesGroup.post(groupJson)
  getGroups()
  console.log(data)
}
getGroups()

export default {
  setup() {
    return {
      dialog,
      confirm,
      loading,
      selected,
      sendData,
      Group,
      columns,
      groups,
      fullHeight: ref(false),
      onDelete,
      onEdit,
      updateData
    }
  }
}
</script>
<template>
  <q-layout view="lHh Lpr lFf" class="bg-warning
">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Asociación de Scouts del Guayas
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <q-item-label header class="text-grey-8">
          </q-item-label>

          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" :show="link.show" />
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ storeUser.name}}</div>
          <div>{{ storeUser.email }}</div>
          <q-btn color="red" size="xs" @click="signOnut">Cerrar sesion</q-btn>
        </div>

      </q-img>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from "vue-router"

import { useUsersStore } from '../store/user-store'
const storeUser = useUsersStore()
const linksList = [
  {
    title: 'Perfil',
    caption: '@quasarframework',
    icon: 'face',
    link: {
      name: 'Profile'
    },
    show:true,
    roles: [1, 6]
  },
  {
    title: 'Grupos',
    caption: 'quasar.dev',
    icon: 'groups',
    link: {
      name: 'group'
    },
    show:true,
    roles: [1]
  },
  {
    title: 'Dirigentes',
    caption: 'github.com/quasarframework',
    icon: 'explore',
    link: {
      name: 'directing'
    },
    show:true,
    roles: [1]
  },
  {
    title: 'Scouts',
    caption: 'chat.quasar.dev',
    icon: 'person',
    link: {
      name: 'scout'
    },
    show:true,
    roles: [1]
  },
  {
    title: 'Unidades',
    caption: 'forum.quasar.dev',
    icon: 'diversity_3',
    link: {
      name: 'unit'
    },
    show:true,
    roles: [1]
  },
  {
    title: 'Equipos',
    caption: 'forum.quasar.dev',
    icon: 'group',
    link: {
      name: 'team'
    },
    show:true,
    roles: [1, 2, 3, 4]
  },
  {
    title: 'Inscripciones',
    caption: '@quasarframework',
    icon: 'description',
    link: {
      name: 'Inscription'
    },
    show:true,
    roles: [1]
  },
  {
    title: 'Periodos',
    caption: '@quasarframework',
    icon: 'today',
    link: {
      name: 'period'
    },
    show:true,
    roles: [1]
  },
  {
    title: 'Reportes',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
    roles: [1,6 ],
    show: true
  },
  {
    title: 'Usuarios',
    caption: '@QuasarFramework',
    icon: 'shield',
    link: 'https://facebook.quasar.dev',
    roles: [1,6 ],
    show: true,
    link: {
      name: 'user'
    }
  },
];
linksList.forEach(page => {
  const element = page.roles.find(i=> i==storeUser.role)
  if(element == undefined)
    page.show = false
})

import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const router = useRouter()

    const signOnut = () => {
      localStorage.removeItem('token')
      router.push('/login')
      store.$patch({
        user: {
          name: '',
          email: ''
        }
      })
    }

    const leftDrawerOpen = ref(false)
    return {
      storeUser,
      signOnut,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

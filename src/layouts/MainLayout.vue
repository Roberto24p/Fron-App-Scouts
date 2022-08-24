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

          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ store.user.name }}</div>
          <div>{{ store.user.email }}</div>
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


const linksList = [
    {
    title: 'Perfil',
    caption: '@quasarframework',
    icon: 'face',
    link: {
      name: 'Profile'
    }
  },
  {
    title: 'Grupos',
    caption: 'quasar.dev',
    icon: 'groups',
    link: {
      name: 'group'
    }
  },
  {
    title: 'Dirigentes',
    caption: 'github.com/quasarframework',
    icon: 'explore',
    link: {
      name: 'directing'
    }
  },
  {
    title: 'Scouts',
    caption: 'chat.quasar.dev',
    icon: 'person',
    link: {
      name: 'scout'
    }
  },
  {
    title: 'Unidades',
    caption: 'forum.quasar.dev',
    icon: 'diversity_3',
    link: {
      name: 'unit'
    }
  },
  {
    title: 'Equipos',
    caption: 'forum.quasar.dev',
    icon: 'group',
    link: {
      name: 'team'
    }
  },
  {
    title: 'Inscripciones',
    caption: '@quasarframework',
    icon: 'description',
    link: {
      name: 'Inscription'
    }
  },
  {
    title: 'Periodos',
    caption: '@quasarframework',
    icon: 'today',
    link: {
      name: 'period'
    }
  },
  {
    title: 'Reportes',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
];

import { defineComponent, ref } from 'vue'
import { useUserStore } from "src/store/state";
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
    const store = useUserStore()
    return {
      signOnut,
      store,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

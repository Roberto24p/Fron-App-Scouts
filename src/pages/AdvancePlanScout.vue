<template>
    <div class="q-pa-md ">
        <div class="row q-col-gutter-md">
            <div class="col-md-6 col-sm-12 row">
                <div class="col-12">
                    <q-card class="my-card  q-py-sm">
                        <q-item>
                            <q-item-section avatar>
                                <q-avatar square>
                                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                </q-avatar>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label><strong>{{ profile.name }}</strong> </q-item-label>
                                <q-item-label caption>
                                    {{ profile.email }}
                                </q-item-label>

                                <!-- <q-item-label caption v-show="hasAdvancePlan">
                            {{ team_text }}
                            </q-item-label> -->

                            </q-item-section>


                        </q-item>
                    </q-card>
                </div>
                <div class="col-12 q-mt-md">
                    <q-card class="my-card ">
                        <q-item>
                            <q-item-section>
                                <q-item-label caption>
                                    Progreso del Plan de Adelanto
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item>
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
                    </q-card>
                </div>

            </div>

            <div class="col-md-6 col-sm-12 ">
                <q-scroll-area class="fit col-sm-12" style="height: 100%; max-width: 100%;">
                    <q-card class="my-card  q-py-sm">
                        <q-item v-for="recog in recogComplete" v-bind:key="recog.id">
                            <q-item-section>
                                <q-item>
                                    <q-icon style="font-size: 2em" name="check" color="green" class="q-ml-md"></q-icon>
                                </q-item>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label><strong>{{ recog.name }}</strong> </q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-card>
                </q-scroll-area>

            </div>
            <div class="col-12">
                <q-card class="my-card ">
                    <q-item>
                        <q-item-section>
                            <q-item-label><strong>Plan de Adelanto</strong> </q-item-label>
                            <q-item-label caption>
                                Manada
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-tabs v-model="tab" narrow-indicator dense align="justify" class="bg-grey-1">
                                <q-tab v-for="recognition in advancePlan" :label="recognition.name" class="text-cyan"
                                    v-bind:key="recognition.id" :name="recognition.name" />

                            </q-tabs>

                            <q-separator />
                            <q-tab-panels v-model="tab" animated>
                                <q-tab-panel v-for="recognition in advancePlan" v-bind:key="recognition.id"
                                    :name="recognition.name">
                                    <div class="q-pa-none" style="max-width: 350px">
                                        <q-list dense bordered class="rounded-borders">
                                            <q-item tag="label" v-for="topic in recognition.topics"
                                                v-bind:key="topic.id" class="q-mb-none">
                                                <q-item-section side top>
                                                    <q-checkbox v-model="checks[topic.id].check"
                                                        v-if="!checks[topic.id].check || checksModal[topic.id] == topic.id"
                                                        @click="checkTopic(topic.id)" />
                                                    <q-icon style="font-size: 2.5em" name="tasks" color="green" v-else
                                                        class="q-ml-md"></q-icon>

                                                </q-item-section>
                                                <q-item-section>
                                                    <q-item-label>{{ topic.name }}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </div>
                                </q-tab-panel>
                            </q-tab-panels>
                            <q-btn color="blue" class="q-ma-lg" @click="alertModal">Enviar</q-btn>
                        </q-item-section>
                    </q-item>
                </q-card>
            </div>
        </div>
    </div>

    <q-dialog v-model="alertDialog">
        <q-card>
            <q-card-section>
                <div class="text-h6">Mensaje de Confirmación</div>
            </q-card-section>
            <q-card-section class="row items-center">
                <span class="q-ml-sm">¿Deseas actualizar el plan de adelanto?</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="No" color="primary" v-close-popup />
                <q-btn flat label="Si" color="primary" @click="updateAdvancePlan" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { reactive, ref } from "vue"
import ServicesAdvancePlan from 'src/services/ServicesAdvancePlan'
import ServicesScout from 'src/services/ServicesScout'
import { useRoute } from "vue-router"
import { useQuasar } from 'quasar'
const $q = useQuasar()
//DATA
const router = useRoute()

const profile = reactive({
    name: '',
    email: ''
})
const checks = reactive({})
const checksModal = ref({})
const advancePlan = ref([])
const hasAdvancePlan = ref(true)
const tab = ref('parche tierno')
const percent = ref('')
const alertDialog = ref(false)
const recogComplete = ref([])
let topicsCheckArray = []
//METODOS
const loadAdvancePlan = () => {
    ServicesAdvancePlan.getChecks(router.params.scoutId)
        .then(data => {
            console.log(data)
            if (data.topics.length == 0) {
                hasAdvancePlan.value = false
                return 0
            }
            data.topics.forEach(topic => {
                // console.log(topic)
                checks[topic.topic_id].check = true

            })
        })
}
ServicesAdvancePlan.advancePlanDetails(router.params.scoutId)
    .then(data => {
        data[0].recognitions.forEach(info => {
            info.topics.forEach(items => {
                const topic = {
                    id: items.id,
                    name: items.name,
                    check: false
                }
                checks[items.id] = topic
            })
        })
        advancePlan.value = data[0].recognitions
        tab.value = advancePlan.value[0].name

    })
const alertModal = () => {
    alertDialog.value = true
}
const updateAdvancePlan = () => {
    const token = localStorage.getItem('token')
    $q.loading.show()

    fetch(`${process.env.BASE_API}/checkadvanceplan`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            scout_id: router.params.scoutId,
            topics: topicsCheckArray,
        }),
        method: 'POST'
    }).then(response => response.json())
        .then(data => {
            $q.loading.hide()

            console.log(data)
            data.topics.forEach(topic => {
                console.log(checks[topic.id])
                checks[topic.topic_id].check = true
            })
            checksModal.value = {}
            topicsCheckArray = []
            $q.notify({
                type: 'positive',
                message: 'Plan de adelanto actualizado correctamente',
                timeout: '2000'
            })
            getRecognitionsComplete()
            loadAdvancePlan()
            getPercentAdvancePlan()
        })
        .catch(e => console.log(e))

}
const checkTopic = (topicId) => {
    console.log(topicId)
    const index = topicsCheckArray.findIndex(element => element == topicId)
    if (index == -1) {
        checksModal.value[topicId] = topicId

        topicsCheckArray.push(topicId)
    } else {
        topicsCheckArray.splice(index, 1)
    }
    return 0
}
const getScoutData = () => {
    ServicesScout.getScoutData(router.params.scoutId)
        .then(response => {
            profile.name = response.scout.person.name
            profile.email = response.scout.person.user.email
            console.log(response)
        })
}

const getPercentAdvancePlan = () => {
    ServicesAdvancePlan.getPercent(router.params.scoutId)
        .then(response => {
            percent.value = response
        })
}

const getRecognitionsComplete = () => {
    ServicesAdvancePlan.getRecognitionsComplete(router.params.scoutId)
        .then(response => {
            if (response.success == 1) {
                recogComplete.value = response.recog
            }
        })
}
getRecognitionsComplete()
getPercentAdvancePlan()
getScoutData()
// const loadTeams = () => {
//     ServicesUnit.getByScout(1)
//         .then(response => {
//             const arrayAux = []
//             response.forEach(unit => {
//                 console.log(unit)

//             })
//             console.log(arrayAux)
//             console.log(response)
//         })
// }
loadAdvancePlan()
</script>
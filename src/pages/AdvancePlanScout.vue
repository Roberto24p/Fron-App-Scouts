<template>
    <div class="q-pa-md ">
        <div class="row q-col-gutter-md">
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
                            <q-item-label caption>
                                Manada
                            </q-item-label>
                        </q-item-section>

                    </q-item>
                </q-card>
            </div>
            <div class="col-12">
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
                            <q-slider v-model="model" :min="0" :max="10" color="green" track-size="10px"
                                thumb-color="black" markers />

                        </q-item-section>
                    </q-item>
                </q-card>
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
                                                        @click="checkTopic(topic.id)" />
                                                </q-item-section>
                                                <q-item-section>
                                                    <q-item-label>{{ topic.name }}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </div>
                                </q-tab-panel>
                            </q-tab-panels>
                        </q-item-section>
                    </q-item>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import ServicesAdvancePlan from 'src/services/ServicesAdvancePlan'
import { useRouter } from "vue-router"

const router = useRouter()

const profile = reactive({
    name: 'Roberto Plancencio',
    email: 'roberto24r24r@Gmail.com'
})
const checks = reactive({})
const advancePlan = ref([])
const tab = ref('parche tierno')
ServicesAdvancePlan.advancePlanDetails(1)
    .then(data => {
        console.log(data)
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
        console.log(checks)
    })
const checkTopic = (topicId) => {
    const token = localStorage.getItem('token')
    console.log(topicId)
    fetch('http://192.168.100.39:8000/api/checkadvanceplan', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            scout_id: 2,
            topic_id: topicId
        }),
        method: 'POST'
    }).then(response => response.json())
        .then(data => {
            console.log(data)
            data.topics.forEach(topic =>{
                console.log(checks[topic.id])
                checks[topic.topic_id].check = true
            })

        })
        .catch(e => console.log(e))

}
</script>
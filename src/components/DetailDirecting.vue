<script setup>
import { ref } from 'vue';
defineProps({
    unitId: String,
    dialog: Boolean,

})
const modal = ref(dialog)
</script>

<template>
    <q-dialog v-model="modal">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">Detalles Dirigente</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <ul>
                    <li>Roberto Placencio</li>
                    <li>Julio Alvares</li>
                    <li>Viviana Placencio</li>
                </ul>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
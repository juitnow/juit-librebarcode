<template>
  <q-layout view="hHh LpR fff">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Juit Librebarcode Demo</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md text-center">
        <!-- Code 128 -->
        <h2>Code 128</h2>

        <div>
          <q-input
            v-model="text128"
            :error-message="error128"
            :error="!! error128"
            :hint="`encoded as: ${barcode128}`"
            :placeholder="default128"
            label="Code 128"
            outlined
          />
          <q-btn-group>
            <q-btn color="primary" label="FNC 1" @click="text128 += '\u0031\uFE0F\u20E3'" />
            <q-btn color="primary" label="FNC 2" @click="text128 += '\u0032\uFE0F\u20E3'" />
            <q-btn color="primary" label="FNC 3" @click="text128 += '\u0033\uFE0F\u20E3'" />
            <q-btn color="primary" label="FNC 4" @click="text128 += '\u0034\uFE0F\u20E3'" />
          </q-btn-group>
          <q-btn-toggle
            v-model="codeset128"
            class="q-mx-md"
            toggle-color="primary"
            :options="[
              { label: 'Codeset A', value: 'A' },
              { label: 'Codeset B', value: 'B' },
              { label: 'Codeset C', value: 'C' },
              { label: 'Auto', value: undefined }
            ]"
          />
          <q-toggle v-model="font128" label="Text" />
          <q-slider
            v-model="size128"
            class="q-px-lg q-mt-md"
            :min="12"
            :max="256"
            :marker-labels="fontSizes"
          />
        </div>
        <h5 class="q-mb-none">
          {{ fontName128 }}
        </h5>
        <div :style="{ fontFamily: fontName128, fontSize: `${size128}px` }">
          {{ barcode128 || 'Code 128' }}
        </div>

        <!-- EAN 13 -->
        <h2>EAN 13</h2>

        <div>
          <q-input
            v-model="text13"
            :error-message="error13"
            :error="!! error13"
            :hint="`encoded as: ${barcode13}`"
            :placeholder="default13"
            label="EAN 13"
            outlined
            dense
          />
          <q-slider
            v-model="size13"
            class="q-px-lg"
            :min="12"
            :max="256"
            :marker-labels="fontSizes"
          />
        </div>
        <h4 class="q-mb-none">
          LibreBarcodeEAN13Text
        </h4>
        <div :style="{ fontFamily: 'LibreBarcodeEAN13Text', fontSize: `${size13}px` }">
          {{ barcode13 || '5369849825693' }}
        </div>
      </q-page>
    </q-page-container>

    <q-footer elevated class="text-center" style="z-index: 99999999">
      Made with love in Berlin by <a style="color: white" href="https://www.juit.com/" target="_blank">Juit GmbH</a>
      (Source code on <a style="color: white" href="https://github.com/juitnow/juit-librebarcode" target="_blank">GitHub</a>)
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import '../assets/fonts.css'
import { code128, ean, FNC1, FNC2, FNC3, FNC4 } from '../src'

import type { CodeSet } from '@juit/librebarcode'

const fontSizes = [ 12, 24, 48, 96, 128, 192, 256 ]

const default128 = 'Hello, world!'
const text128 = ref('')
const error128 = ref('')
const barcode128 = ref('')
const size128 = ref(96)
const font128 = ref(false)
const fontName128 = computed(() => font128.value ? 'LibreBarcode128Text' : 'LibreBarcode128')
const codeset128 = ref<CodeSet>()

watch([ text128, codeset128 ], ([ text128, codeset128 ]) => {
  try {
    text128 = (text128 || default128)
        .replaceAll(/\u0031\uFE0F\u20E3/g, FNC1)
        .replaceAll(/\u0032\uFE0F\u20E3/g, FNC2)
        .replaceAll(/\u0033\uFE0F\u20E3/g, FNC3)
        .replaceAll(/\u0034\uFE0F\u20E3/g, FNC4)
    barcode128.value = text128 ? code128(text128, codeset128) : ''
    error128.value = ''
  } catch (error: any) {
    error128.value = error.message || 'Unknown error'
    barcode128.value = ''
  }
}, { immediate: true })

const default13 = '5369849825693'
const text13 = ref('')
const error13 = ref('')
const barcode13 = ref('')
const size13 = ref(96)

watch(text13, (text13) => {
  try {
    barcode13.value = ean(text13 || default13)
    error13.value = ''
  } catch (error: any) {
    error13.value = error.message || 'Unknown error'
    barcode13.value = ''
  }
}, { immediate: true })
</script>

<template>
  <div class="behavior-section">
    <v-switch
      v-model="lowPowerMode"
      class="mt-0 pt-0"
      :label="t('lowPowerMode')"
      :hint="t('lowPowerModeHint')"
      persistent-hint
      dense
    />

    <div class="caption">{{ t('displayTime') }}</div>
    <v-slider
      v-model="displayTime"
      class="align-center mb-5"
      min="1"
      max="10"
      step="0.1"
      dense
      hide-details
    >
      <template #prepend>
        <v-text-field
          v-model="displayTime"
          class="mt-0 pt-0"
          dense
          hide-details
          single-line
          type="number"
          min="1"
          max="10"
          step="0.1"
          :suffix="t('unitSeconds')"
          style="width: 75px"
        />
      </template>
    </v-slider>

    <div class="caption">{{ t('delayTime') }}</div>
    <v-slider
      v-model="delayTime"
      class="align-center mb-5"
      min="0"
      max="300"
      step="1"
      dense
      hide-details
    >
      <template #prepend>
        <v-text-field
          v-model="delayTime"
          class="mt-0 pt-0"
          dense
          hide-details
          single-line
          type="number"
          min="0"
          max="300"
          step="1"
          :suffix="t('unitSeconds')"
          style="width: 75px"
        />
      </template>
    </v-slider>

    <div class="caption">{{ t('maxLines') }}</div>
    <v-slider
      v-model="maxLines"
      class="align-center mb-5"
      min="0"
      dense
      hide-details
    >
      <template #prepend>
        <v-text-field
          v-model="maxLines"
          class="mt-0 pt-0"
          dense
          hide-details
          single-line
          type="number"
          min="0"
          style="width: 75px"
        />
      </template>
    </v-slider>

    <div class="caption">{{ t('maxDisplays') }}</div>
    <v-slider
      v-model="maxDisplays"
      class="align-center mb-5"
      min="0"
      max="10"
      dense
      hide-details
    >
      <template #prepend>
        <v-text-field
          v-model="maxDisplays"
          class="mt-0 pt-0"
          dense
          hide-details
          single-line
          type="number"
          min="0"
          max="100"
          style="width: 75px"
        />
      </template>
    </v-slider>

    <div class="caption">{{ t('stackDirections') }}</div>
    <v-select
      v-model="stackDirection"
      :items="stackDirections"
      dense
      single-line
      class="mt-1 pt-0"
    />

    <div class="caption">{{ t('overflowMode') }}</div>
    <v-select
      v-model="overflow"
      :items="overflows"
      dense
      single-line
      class="mt-1 pt-0"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { settingsStore } from '~/store'
import { t } from '~/utils/i18n'

const stackDirections = [
  { text: t('stackTopToBottom'), value: 'top_to_bottom' },
  { text: t('stackBottomToTop'), value: 'bottom_to_top' },
]
const overflows = [
  { text: t('overflowHidden'), value: 'hidden' },
  { text: t('overflowOverlay'), value: 'overlay' },
]

const lowPowerMode = computed({
  get: () => {
    return settingsStore.lowPowerMode
  },
  set: (value) => {
    settingsStore.setLowPowerMode({
      lowPowerMode: value,
    })
  },
})
const delayTime = computed({
  get: () => {
    return settingsStore.delayTime
  },
  set: (value) => {
    settingsStore.setDelayTime({
      delayTime: Number(value),
    })
  },
})
const displayTime = computed({
  get: () => {
    return settingsStore.displayTime
  },
  set: (value) => {
    settingsStore.setDisplayTime({
      displayTime: Number(value),
    })
  },
})
const maxDisplays = computed({
  get: () => {
    return settingsStore.maxDisplays
  },
  set: (value) => {
    settingsStore.setMaxDisplays({
      maxDisplays: Number(value),
    })
  },
})
const maxLines = computed({
  get: () => {
    return settingsStore.maxLines
  },
  set: (value) => {
    settingsStore.setMaxLines({
      maxLines: Number(value),
    })
  },
})
const overflow = computed({
  get: () => {
    return settingsStore.overflow
  },
  set: (value) => {
    settingsStore.setOverflow({
      overflow: value,
    })
  },
})
const stackDirection = computed({
  get: () => {
    return settingsStore.stackDirection
  },
  set: (value) => {
    settingsStore.setStackDirection({
      stackDirection: value,
    })
  },
})
</script>

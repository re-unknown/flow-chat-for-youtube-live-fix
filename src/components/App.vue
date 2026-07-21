<template>
  <v-app>
    <v-main class="fill-height">
      <v-container fluid>
        <div class="subtitle-2">{{ t('settingsGeneral') }}</div>
        <general-section class="mt-3 mb-5 mx-3" />

        <div class="subtitle-2">{{ t('settingsAppearance') }}</div>
        <appearance-section class="mt-3 mb-5 mx-3" />

        <div class="subtitle-2">{{ t('settingsBehavior') }}</div>
        <behavior-section class="mt-3 mb-5 mx-3" />

        <div class="subtitle-2">{{ t('settingsFilter') }}</div>
        <filter-section class="mt-3 mb-5 mx-3" />

        <div class="subtitle-2">{{ t('settingsOthers') }}</div>
        <others-section class="mt-3 mb-5 mx-3" />

        <v-btn class="mt-4" depressed block @click="handleClickReset">
          {{ t('resetSettings') }}
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppearanceSection from '~/components/AppearanceSection.vue'
import BehaviorSection from '~/components/BehaviorSection.vue'
import FilterSection from '~/components/FilterSection.vue'
import GeneralSection from '~/components/GeneralSection.vue'
import OthersSection from '~/components/OthersSection.vue'
import { settingsStore } from '~/store'
import { t } from '~/utils/i18n'

const handleClickReset = () => {
  settingsStore.resetState()
}
</script>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>

<style lang="scss" scoped>
.v-application {
  width: 640px;
}
</style>

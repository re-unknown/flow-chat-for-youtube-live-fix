<template>
  <div class="others-section">
    <v-switch
      v-model="chatVisible"
      class="mt-0 pt-0"
      :label="t('alwaysShowChat')"
      :hint="t('alwaysShowChatHint')"
      persistent-hint
      dense
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { settingsStore } from '~/store'
import { t } from '~/utils/i18n'

const chatVisible = computed({
  get: () => {
    return settingsStore.chatVisible
  },
  set: (value) => {
    settingsStore.setChatVisible({
      chatVisible: value,
    })
  },
})
</script>

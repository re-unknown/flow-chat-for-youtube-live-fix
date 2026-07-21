<template>
  <div class="filter-section">
    {{ t('filterMessagesBy') }}
    <a href="#" @click.prevent="handleClickLink">
      Chat Filter for YouTube Live
    </a>
  </div>
</template>

<script setup lang="ts">
import { t } from '~/utils/i18n'

const handleClickLink = () => {
  window.open(
    'https://chrome.google.com/webstore/detail/chat-filter-for-youtube-l/jalcplhakmckbmlbidmbmpaegcpbejog'
  )
}
</script>

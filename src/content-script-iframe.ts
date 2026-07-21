import FlowController from '~/utils/flow-controller'
import chat from '~/assets/chat.svg'
import downArrow from '~/assets/down-arrow.svg'
import refresh from '~/assets/refresh.svg'
import { querySelectorAsync } from '~/utils/dom-helper'

const controller = new FlowController()
let observer: MutationObserver | undefined
let controlButtonTooltip: HTMLElement | undefined

const controlButtonTooltipText = 'Flow messages'

const menuButtonConfigs = [
  {
    svg: downArrow,
    title: 'Follow New Messages',
    className: 'ylcf-follow-button',
    onclick: async () =>
      await chrome.runtime.sendMessage({ type: 'menu-button-clicked' }),
    isActive: () => controller.following,
  },
  {
    svg: refresh,
    title: 'Reload Frame',
    className: 'ylcf-reload-button',
    onclick: () => window.location.reload(),
    isActive: () => false,
  },
]

const updateControlButton = () => {
  const button = parent.document.querySelector('.ylcf-control-button')
  button && button.setAttribute('aria-pressed', String(controller.enabled))
}

const getControlButtonTooltip = () => {
  if (controlButtonTooltip) {
    return controlButtonTooltip
  }

  const player = parent.document.querySelector<HTMLElement>(
    '.html5-video-player'
  )
  if (!player) {
    return
  }

  const tooltip = parent.document.createElement('div')
  tooltip.classList.add('ytp-tooltip', 'ytp-bottom', 'ylcf-control-tooltip')
  tooltip.setAttribute('aria-hidden', 'true')
  tooltip.style.display = 'none'
  tooltip.style.maxWidth = '300px'
  tooltip.style.pointerEvents = 'none'

  const textWrapper = parent.document.createElement('div')
  textWrapper.classList.add('ytp-tooltip-text-wrapper')
  textWrapper.setAttribute('aria-hidden', 'true')

  const bottomText = parent.document.createElement('div')
  bottomText.classList.add('ytp-tooltip-bottom-text')

  const text = parent.document.createElement('span')
  text.classList.add('ytp-tooltip-text')
  text.textContent = controlButtonTooltipText

  bottomText.append(text)
  textWrapper.append(bottomText)
  tooltip.append(textWrapper)

  player.append(tooltip)
  controlButtonTooltip = tooltip
  return tooltip
}

const positionControlButtonTooltip = (button: HTMLElement) => {
  const tooltip = getControlButtonTooltip()
  const player = parent.document.querySelector<HTMLElement>(
    '.html5-video-player'
  )
  if (!tooltip || !player) {
    return
  }

  tooltip.style.display = 'block'
  tooltip.removeAttribute('aria-hidden')

  const buttonRect = button.getBoundingClientRect()
  const playerRect = player.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const maxLeft = Math.max(playerRect.width - tooltipRect.width, 0)
  const left = Math.min(
    Math.max(
      buttonRect.left -
        playerRect.left +
        buttonRect.width / 2 -
        tooltipRect.width / 2,
      0
    ),
    maxLeft
  )
  const top = Math.max(
    buttonRect.top - playerRect.top - tooltipRect.height - 8,
    0
  )

  tooltip.style.left = `${left}px`
  tooltip.style.top = `${top}px`
}

const showControlButtonTooltip = (button: HTMLElement) => {
  positionControlButtonTooltip(button)
}

const hideControlButtonTooltip = () => {
  if (controlButtonTooltip) {
    controlButtonTooltip.setAttribute('aria-hidden', 'true')
    controlButtonTooltip.style.display = 'none'
  }
}

const removeControlButtonTooltip = () => {
  controlButtonTooltip?.remove()
  controlButtonTooltip = undefined
}

const removeControlButton = () => {
  const button = parent.document.querySelector('.ylcf-control-button')
  button && button.remove()
  removeControlButtonTooltip()
}

const addControlButton = () => {
  removeControlButton()

  const controls =
    parent.document.querySelector(
      '.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls-left'
    ) ??
    parent.document.querySelector(
      '.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls'
    )
  if (!controls) {
    return
  }

  const button = document.createElement('button')
  button.classList.add('ytp-button', 'ylcf-control-button')
  button.setAttribute('aria-label', 'Flow messages')
  button.setAttribute('data-title-no-tooltip', 'Flow messages')
  button.setAttribute('data-tooltip-title', 'Flow messages')
  button.onclick = async () =>
    await chrome.runtime.sendMessage({ type: 'control-button-clicked' })
  button.onblur = hideControlButtonTooltip
  button.onfocus = () => showControlButtonTooltip(button)
  button.onmouseenter = () => showControlButtonTooltip(button)
  button.onmousemove = () => positionControlButtonTooltip(button)
  button.onmouseleave = hideControlButtonTooltip
  button.innerHTML = chat

  // Match YouTube player button icon sizing.
  const svg = button.querySelector('svg')
  if (svg) {
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('height', '24')
    svg.setAttribute('width', '24')
  }

  controls.prepend(button)

  updateControlButton()
}

const updateMenuButtons = () => {
  for (const config of menuButtonConfigs) {
    const button = document.querySelector(`.${config.className}`)
    if (!button) {
      return
    }
    if (config.isActive()) {
      button.classList.add('ylcf-active-menu-button')
    } else {
      button.classList.remove('ylcf-active-menu-button')
    }
  }
}

const addMenuButtons = () => {
  const refIconButton = document.querySelector(
    '#chat-messages > yt-live-chat-header-renderer > yt-icon-button'
  )
  if (!refIconButton) {
    return
  }

  for (const config of menuButtonConfigs) {
    const icon = document.createElement('yt-icon')
    icon.classList.add('yt-live-chat-header-renderer', 'style-scope')

    const iconButton = document.createElement('yt-icon-button')
    iconButton.id = 'overflow'
    iconButton.classList.add(
      'yt-live-chat-header-renderer',
      'style-scope',
      'ylcf-menu-button',
      config.className
    )
    iconButton.title = config.title
    iconButton.onclick = config.onclick
    iconButton.append(icon)

    refIconButton.parentElement?.insertBefore(iconButton, refIconButton)

    // insert svg after wrapper button appended
    icon.innerHTML = config.svg
  }

  updateMenuButtons()
}

const addVideoEventListener = () => {
  const video = parent.document.querySelector<HTMLVideoElement>(
    'ytd-watch-flexy video.html5-main-video'
  )
  if (!video) {
    return
  }

  video.addEventListener('play', () => controller.play())
  video.addEventListener('pause', () => controller.pause())
}

const observe = async () => {
  await controller.observe()

  const itemList = await querySelectorAsync('#item-list.yt-live-chat-renderer')
  if (!itemList) {
    return
  }

  observer = new MutationObserver(async () => {
    await controller.observe()
  })
  observer.observe(itemList, { childList: true })
}

const disconnect = () => {
  controller.disconnect()
  observer?.disconnect()
}

const init = async () => {
  disconnect()
  controller.clear()
  removeControlButton()

  addVideoEventListener()
  addControlButton()
  addMenuButtons()

  await observe()
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const { type, data } = message
  switch (type) {
    case 'url-changed':
      init().then(() => sendResponse())
      return true
    case 'enabled-changed':
      controller.enabled = data.enabled
      updateControlButton()
      return sendResponse()
    case 'following-changed':
      controller.following = data.following
      updateMenuButtons()
      return sendResponse()
    case 'settings-changed':
      controller.settings = data.settings
      return sendResponse()
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  const data = await chrome.runtime.sendMessage({ type: 'iframe-loaded' })

  controller.enabled = data.enabled
  controller.following = data.following
  controller.settings = data.settings

  await init()

  window.addEventListener('unload', () => {
    disconnect()
    controller.clear()
    removeControlButton()
  })
})

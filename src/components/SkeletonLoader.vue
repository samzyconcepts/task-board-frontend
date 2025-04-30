<template>
  <div :class="[bgClassValue, loaderClass, 'relative overflow-hidden']">
    <div class="absolute top-0 bottom-0 left-0 right-0 shimmer" :style="shimmerStyle"></div>
    <slot />
  </div>
</template>

<script>
const LOADER_TYPES = { rectangle: 'rectangle', circle: 'circle' }

const LOADER_CSS_CLASSES = {
  rectangle: 'rounded',
  circle: 'rounded-full',
}

const SHIMMER_COLOR = '#ffffff'

const isHexColor = (hexColor) => {
  const hex = hexColor.replace('#', '')
  return (
    typeof hexColor === 'string' &&
    hexColor.startsWith('#') &&
    hex.length === 6 &&
    !isNaN(Number('0x' + hex))
  )
}

const hexToRgb = (hex) => {
  const result = hex.match(/\w\w/g)
  return result ? result.map((x) => +`0x${x}`).join(',') : '255,255,255'
}

import { computed, toRefs } from 'vue'

export default {
  name: 'SkeletonLoader',
  props: {
    type: {
      type: String,
      default: 'rectangle',
      validator(value) {
        return Object.values(LOADER_TYPES).includes(value)
      },
    },
    bgClass: {
      type: String,
      default: 'bg-gray-300',
    },
    cssClass: {
      type: String,
      default: '',
    },
    shimmerColor: {
      type: String,
      default: SHIMMER_COLOR,
    },
  },

  setup(props) {
    const { type, bgClass, cssClass, shimmerColor } = toRefs(props)

    const shimmerStyle = computed(() => {
      const rgb = isHexColor(shimmerColor.value) ? hexToRgb(shimmerColor.value) : '255,255,255'
      return {
        backgroundImage: `linear-gradient(90deg, rgba(${rgb}, 0) 0%, rgba(${rgb}, 0.2) 20%, rgba(${rgb}, 0.5) 60%, rgba(${rgb}, 0))`,
      }
    })

    const loaderClass = computed(() =>
      cssClass.value ? cssClass.value : LOADER_CSS_CLASSES[type.value],
    )

    return {
      shimmerStyle,
      loaderClass,
      bgClassValue: bgClass,
    }
  },
}
</script>

<style scoped>
.shimmer {
  transform: translateX(-100%);
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

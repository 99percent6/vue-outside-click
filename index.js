function isServer () {
  return typeof window === 'undefined'
}

export const clickOutside = {
  bind: function (el, binding, vNode) {
    function handler (event) {
      let isMenuClick = false
      let { target } = event
      const cb = binding.value.handler
      const elementId = binding.value.elId

      for (let i = 0; i <= 10; i++) {
        if (target) {
          if (el.isEqualNode(target) || target.id === elementId) {
            isMenuClick = true
            break
          }
          target = target.parentNode
        } else {
          break
        }
      }

      if (!isMenuClick) {
        cb(event)
      }
    }

    el.eventHandler = {
      handler
    }

    if (!isServer()) {
      window.addEventListener('click', el.eventHandler.handler)
    }
  },
  unbind: function (el, binding, vNode) {
    if (!isServer()) {
      window.removeEventListener('click', el.eventHandler.handler)
    }
  }
}

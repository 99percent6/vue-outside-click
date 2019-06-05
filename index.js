function isServer () {
  return typeof window === 'undefined'
}

exports = module.exports = {
  bind: function (el, binding) {
    function handler (event) {
      var isMenuClick = false
      var { target } = event
      var cb = binding.value.handler
      var additionalIds = binding.value.additionalIds || []

      if (!cb) {
        console.error('Handler is reuqired for vue-outside-click')
        return
      }

      for (var idx = 0; idx <= 20; idx++) {
        if (target) {
          if (el.isEqualNode(target) || additionalIds.includes(target.id)) {
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

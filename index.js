function isServer() {
  return typeof window === 'undefined'
}

exports = module.exports = {
  bind: function (el, binding) {
    function handler(event) {
      var isMenuClick = false
      var { target } = event
      let cb;
      let additionalIds;

      if (typeof binding.value === "object" && "handler" in binding.value && typeof binding.value.handler === "function") {
        cb = binding.value.handler;
        if ("additionalIds" in binding.value && Array.isArray(binding.value.additionalIds) && binding.value.length > 0) {
          additionalIds = binding.value.additionalIds;
        } else {
          additionalIds = [];
        }
      } else if (typeof binding.value === "function") {
        cb = binding.value;
      } else {
        console.error("[VUE-OUTSIDE-CLICK] you must pass either a function or an object with { handler: Function } to vue-outside-click directive");
        return;
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
      window.addEventListener('click', el.eventHandler.handler);
      if ("immediate" in binding.modifiers) {
        el.eventHandler.handler(document.getRootNode())
      }
    }
  },
  unbind: function (el, binding, vNode) {
    if (!isServer()) {
      window.removeEventListener('click', el.eventHandler.handler)
    }
  }
}

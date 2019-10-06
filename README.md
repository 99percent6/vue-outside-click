# vue-outside-click

It's vue directive for handle click outside target element

## Installation

```
$ npm install vue-outside-click
```
or 
```
$ yarn add vue-outside-click
```

## Example

```
<template>
  <div v-outside-click="{handler: hideMenu, additionalIds: ['header-menu-btn-catalog']}" class="example">
      Content
  </div>
</template>

or

<template>
  <div v-outside-click="hideMenu" class="example">
      Content
  </div>
</template>

also
(calls handler as soon as posible)
<template>
  <div v-outside-click.immediate="{} | Function" class="example">
      Content
  </div>
</template>

```


```
<script>
import outsideClick from 'vue-outside-click'

export default {
  directives: {
    outsideClick
  },
  methods: {
    hideMenu () {
      // some actions
    }
  }
}
</script>
```

## Additional info

If you want another element to have a similar behavior when clicking, you can add the id of this element to prop 'additionalIds' (string array).
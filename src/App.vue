<template>
  <div id="app">
    <MyTable :columns="columns" :items="items" rowKey="id" />
  </div>
</template>

<script>
import { columns } from '/src/assets/columns'
import { items } from '/src/assets/items'
import MyTable from './components/MyTable.vue'

export default {
  name: 'App',
  components: {
    MyTable
  },
  data() {
    return {
      columns,
      items
    }
  },
  async created() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      )
      this.items = await response.json()
    } catch (err) {
      console.warn(err)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <div class="buttons-wrapper">
      <button :style="getButtonStyle('normal')" @click="setTable('normal')">
        TABLE
      </button>
      <button :style="getButtonStyle('virtual')" @click="setTable('virtual')">
        VIRTUAL TABLE
      </button>
    </div>
    <MyTable
      v-if="isNormalTableSet"
      :columns="columns"
      :items="items"
      :pagination="false"
      :infiniteScroll="false"
      rowKey="id"
    />
    <MyVirtualTable
      v-else-if="isVirtualTableSet"
      :columns="columns"
      :items="items"
    />
  </div>
</template>

<script>
import { columns } from '/src/assets/columns'
import { items } from '/src/assets/items'
import MyVirtualTable from './components/MyVirtualTable.vue'
import MyTable from './components/MyTable.vue'

export default {
  name: 'App',
  components: {
    MyVirtualTable,
    MyTable
  },
  data() {
    return {
      columns,
      items,
      tableType: ''
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
  },
  computed: {
    isNormalTableSet() {
      return this.tableType === 'normal'
    },
    isVirtualTableSet() {
      return this.tableType === 'virtual'
    }
  },
  methods: {
    setTable(type) {
      this.tableType = type
    },
    getButtonStyle(type) {
      return {
        background:
          type === this.tableType ? 'rgb(221, 173, 42)' : 'rgb(50, 104, 219)'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons-wrapper {
  margin: 20px 0;

  button {
    width: 150px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background: rgb(50, 104, 219);
    color: #fff;
    font-weight: 500;
    margin: 0 20px;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

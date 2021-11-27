<template>
  <div id="app">
    <div class="buttons-wrapper">
      <TableToggler
        v-for="typeTable in CNSTS"
        :key="typeTable"
        :val="typeTable"
        :isActive="isActiveButton()"
        @click="setTable(typeTable)"
      />
    </div>
    <MyTable
      v-if="isNormalTableSet"
      :columns="columns"
      :items="items"
      :pagination="false"
      :infiniteScroll="false"
      rowKey="id"
    >
      <template #body-cell-email="{ item }">
        <a :href="`mailto:${item}`" target="_blank">{{ item }}</a>
      </template>
    </MyTable>
    <MyTableVirtual
      v-else-if="isVirtualTableSet"
      :columns="columns"
      :items="items"
    />
  </div>
</template>

<script>
import { columns } from '/src/assets/columns'
import TableToggler from '/src/components/TableToggler'
import MyTableVirtual from './components/MyTableVirtual.vue'
import MyTable from './components/MyTable.vue'

export default {
  name: 'App',
  components: {
    MyTableVirtual,
    MyTable,
    TableToggler
  },
  data() {
    return {
      columns,
      items: [],
      tableType: '',
      CNSTS: {
        NORMAL: 'normal',
        VIRTUAL: 'virtual'
      }
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
      return this.tableType === this.CNSTS.NORMAL
    },
    isVirtualTableSet() {
      return this.tableType === this.CNSTS.VIRTUAL
    }
  },
  methods: {
    setTable(type) {
      this.tableType = type
    },
    isActiveButton(type) {
      return type === this.tableType
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons-wrapper {
  margin: 20px 0;
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

.button-flat {
  background: #fff;
  border: none;
  cursor: pointer;
}
</style>

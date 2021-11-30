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
      :pagination="pagination"
      :serverPagination="serverPagination"
      :infiniteScroll="infiniteScroll"
      :requestFunc="getNextPageData"
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
      pagination: false,
      serverPagination: false,
      infiniteScroll: false,
      tableType: '',
      CNSTS: {
        NORMAL: 'normal',
        VIRTUAL: 'virtual'
      }
    }
  },
  async created() {
    if (!this.infiniteScroll && !this.serverPagination) {
      this.items = await this.getAllData() // грузим все данные, если не infscroll
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
    async getNextPageData(pageNumber) {
      const newData = await this.getPageData(pageNumber)
      if (this.infiniteScroll) {
        this.items = [...this.items, ...newData]
      } else {
        this.items = newData
      }
    },
    async getAllData() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/comments'
        )
        return await response.json()
      } catch (err) {
        console.warn(err)
      }
    },
    async getPageData(pageNumber) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${pageNumber}`
        )
        return await response.json()
      } catch (err) {
        console.warn(err)
      }
    },
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

<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <ColumnCellHead
            v-for="column in columns"
            :key="column.key"
            :column="column"
            :activeSortingCol="sortingCol"
            :sortingType="sortingOrder"
            @sortIconClick="sortRows(column.key)"
            @filterUpdated="updateFilter($event, column.key)"
          />
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in preparedRows" :key="row[rowKey]">
          <td v-for="column in columns" :key="column.key">
            <div class="content">
              {{ row[column.key] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="pagination" class="pagination-wrapper">
      <button @click="getPrevPaginationPage">Назад</button>
      {{ this.paginationSettings.currentPage + 1 }}
      <button @click="getNextPaginationPage">Вперед</button>
    </div>
  </div>
</template>

<script>
import ColumnCellHead from '/src/components/TableCellHead'

export default {
  name: 'MyTable',
  components: {
    ColumnCellHead
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    rowKey: {
      type: [String, Number],
      required: true
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sortingCol: null,
      sortingOrder: null,
      columnsFilters: {},
      paginationSettings: {
        rowPerPage: 10,
        currentPage: 0
      }
    }
  },
  created() {
    this.columns.forEach(column => {
      if (column.filtering) {
        this.$set(this.columnsFilters, column.key, '')
      }
    })
  },
  computed: {
    totalRows() {
      return this.sortedRows.length
    },
    totalPages() {
      return Math.floor(this.totalRows / this.paginationSettings.rowPerPage)
    },
    filteredRows() {
      let rows = JSON.parse(JSON.stringify(this.items))
      rows = rows.filter(row => this.filterRow(row))
      return rows
    },
    sortedRows() {
      const rows = JSON.parse(JSON.stringify(this.filteredRows))
      if (this.sortingCol) {
        rows.sort((a, b) => {
          if (a[this.sortingCol] < b[this.sortingCol]) {
            return this.sortingOrder === 'desc' ? -1 : 1
          } else if (a[this.sortingCol] > b[this.sortingCol]) {
            return this.sortingOrder === 'desc' ? 1 : -1
          } else {
            return 0
          }
        })
      }
      return rows
    },
    paginatedRows() {
      const startRowIdx =
        this.paginationSettings.currentPage * this.paginationSettings.rowPerPage
      const endRowIdx =
        (this.paginationSettings.currentPage + 1) *
        this.paginationSettings.rowPerPage
      return this.sortedRows.slice(startRowIdx, endRowIdx)
    },
    preparedRows() {
      return this.pagination ? this.paginatedRows : this.sortedRows
    }
  },
  methods: {
    filterRow(row) {
      let result = true
      Object.keys(this.columnsFilters).forEach(key => {
        if (this.columnsFilters[key] !== '') {
          const filterValue = `${this.columnsFilters[key]}`.toLowerCase()
          const checkingValue = `${row[key]}`.toLowerCase()
          checkingValue.indexOf(filterValue) < 0 && (result = false)
        }
      })
      return result
    },
    sortRows(colKey) {
      if (this.sortingCol !== colKey) {
        this.sortingCol = colKey
        this.sortingOrder = 'desc'
      } else {
        this.sortingCol = this.sortingOrder == 'desc' ? colKey : null
        this.sortingOrder = this.sortingOrder == 'desc' ? 'asc' : null
      }
      this.paginationSettings.currentPage = 0
    },
    updateFilter(filterValue, colKey) {
      this.columnsFilters[colKey] = filterValue
      this.paginationSettings.currentPage = 0
    },
    getNextPaginationPage() {
      this.paginationSettings.currentPage < this.totalPages
        ? this.paginationSettings.currentPage++
        : null
    },
    getPrevPaginationPage() {
      this.paginationSettings.currentPage > 0
        ? this.paginationSettings.currentPage--
        : null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table {
  border-spacing: 0;
  width: 100%;
}

td {
  border-bottom: 1px solid rgb(226, 226, 226);
  // min-width: 100px;
  background: rgb(247, 245, 237);
  text-align: left;

  .content {
    height: 70px;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    -ms-line-clamp: 3;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    box-orient: vertical;
  }
}

.dropdown {
  width: 200px;
  background: #fff;
}
</style>

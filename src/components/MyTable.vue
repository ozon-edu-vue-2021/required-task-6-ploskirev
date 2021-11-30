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
          <ColumnCellBody
            v-for="column in columns"
            :key="column.key"
            :item="row[column.key]"
          >
            <template #body-cell="{ item }">
              <slot :name="`body-cell-${column.key}`" :item="item"></slot>
            </template>
          </ColumnCellBody>
        </tr>
      </tbody>
    </table>
    <PaginationBlock
      v-if="pagination"
      :infiniteScroll="infiniteScroll"
      :currentPage="paginationSettings.currentPage + 1"
      :isLastPage="isLastPage"
      @paginationPrevPageClick="getPrevPaginationPage"
      @paginationNextPageClick="getNextPaginationPage"
      @loaderEnter="onLoaderEnter"
    />
  </div>
</template>

<script>
import ColumnCellHead from '/src/components/MyTableCellHead'
import ColumnCellBody from '/src/components/MyTableCellBody'
import PaginationBlock from '/src/components/MyTablePaginationBlock'

const DESC = 'desc'
const ASC = 'asc'

export default {
  name: 'MyTable',
  components: {
    ColumnCellHead,
    ColumnCellBody,
    PaginationBlock
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
      default: false
    },
    infiniteScroll: {
      type: Boolean,
      default: false
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
      return this.sortedRows.length - 1
    },
    totalPages() {
      return Math.floor(this.totalRows / this.paginationSettings.rowPerPage)
    },
    isLastPage() {
      return this.paginationSettings.currentPage === this.totalPages
    },
    filteredRows() {
      let rows = JSON.parse(JSON.stringify(this.items))
      rows = rows.filter(this.filterRow)
      return rows
    },
    sortedRows() {
      const rows = JSON.parse(JSON.stringify(this.filteredRows))
      if (this.sortingCol) {
        rows.sort((a, b) => {
          if (a[this.sortingCol] < b[this.sortingCol]) {
            return this.sortingOrder === DESC ? -1 : 1
          } else if (a[this.sortingCol] > b[this.sortingCol]) {
            return this.sortingOrder === DESC ? 1 : -1
          } else {
            return 0
          }
        })
      }
      return rows
    },
    paginatedRows() {
      const startRowIdx = this.infiniteScroll
        ? 0
        : this.paginationSettings.currentPage *
          this.paginationSettings.rowPerPage
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
    onLoaderEnter(e) {
      if (e.type === 'enter') {
        this.getNextPaginationPage()
      }
    },
    filterRow(row) {
      return Object.keys(this.columnsFilters).every(key => {
        if (this.columnsFilters[key] !== '') {
          const filterValue = `${this.columnsFilters[key]}`.toLowerCase()
          const checkingValue = `${row[key]}`.toLowerCase()
          return checkingValue.indexOf(filterValue) > -1
        } else {
          return true
        }
      })
    },
    sortRows(colKey) {
      if (this.sortingCol !== colKey) {
        this.sortingCol = colKey
        this.sortingOrder = DESC
      } else {
        this.sortingCol = this.sortingOrder == DESC ? colKey : null
        this.sortingOrder = this.sortingOrder == DESC ? ASC : null
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

<style scoped lang="scss">
table {
  border-spacing: 0;
  width: 100%;
}

.dropdown {
  width: 200px;
  background: #fff;
}
</style>

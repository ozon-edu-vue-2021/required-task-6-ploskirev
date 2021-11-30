<template>
  <th class="table-cell-head">
    <div class="content">
      <span class="title-sort-wrapper">
        {{ column.label }}
        <NoSortIcon
          v-if="!isSortingActive"
          class="sorting-icon"
          @click="onSortIconClick"
        />
        <SortIcon
          v-else-if="isDescSorting"
          class="sorting-icon"
          @click="onSortIconClick"
        />
        <SortReverseIcon v-else class="sorting-icon" @click="onSortIconClick" />
      </span>

      <FilterIcon
        v-if="column.filtering"
        class="filter-icon"
        @click="openFilter"
      />
    </div>
    <div v-if="isFilterOpen" class="filter-dropdown">
      <FilterDropdown
        :filterText="filterText"
        @closeFilter="closeFilter"
        @submitFilter="submitFilter"
        @textUpdate="updateFilterText"
      />
    </div>
  </th>
</template>

<script>
import FilterDropdown from '/src/components/MyTableFilterDropdown'
import FilterIcon from '/src/assets/filter.svg'
import SortReverseIcon from '/src/assets/sortAsc.svg'
import SortIcon from '/src/assets/sortDesc.svg'
import NoSortIcon from '/src/assets/noSort.svg'

export default {
  name: 'TableCellHead',
  components: {
    FilterIcon,
    SortIcon,
    SortReverseIcon,
    NoSortIcon,
    FilterDropdown
  },
  props: {
    column: {
      type: Object,
      required: true
    },
    activeSortingCol: {
      required: true,
      validator: val =>
        val === null || ['number', 'string'].some(el => typeof val === el)
    },
    sortingType: {
      required: true,
      validator: val => ['desc', 'asc', null].some(el => el === val)
    }
  },
  data() {
    return {
      isFilterOpen: false,
      filterText: ''
    }
  },
  computed: {
    isSortingActive() {
      return this.activeSortingCol === this.column.key
    },
    isDescSorting() {
      return this.isSortingActive && this.sortingType === 'desc'
    }
  },
  methods: {
    onSortIconClick() {
      this.$emit('sortIconClick')
    },
    openFilter() {
      this.isFilterOpen = true
    },
    closeFilter() {
      this.isFilterOpen = false
    },
    updateFilterText(val) {
      this.filterText = val
    },
    submitFilter() {
      this.$emit('filterUpdated', this.filterText)
      this.closeFilter()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-cell-head {
  position: relative;
  background: rgb(198, 216, 236);
  text-align: left;
  padding: 4px;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .title-sort-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;

      .sorting-icon {
        transform: scale(0.7);
        cursor: pointer;
      }
    }

    .filter-icon {
      transform: scale(0.7);
      cursor: pointer;
    }
  }

  .filter-dropdown {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;

    .button-close {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 20px;
    }

    .filter-input {
      width: 80%;
    }
  }
}
</style>

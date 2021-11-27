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

    <div v-show="isFilterOpen" class="dropdown">
      <button class="button-flat button-close" @click="closeFilter">
        &times;
      </button>
      <input class="filter-input" type="text" v-model="filterInput" />
      <button class="button-flat botton-submit" @click="submitFilter">
        ok
      </button>
    </div>
  </th>
</template>

<script>
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
    NoSortIcon
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
      filterInput: ''
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
    submitFilter() {
      this.$emit('filterUpdated', this.filterInput)
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

  .dropdown {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: 200px;
    padding: 4px;
    padding-top: 28px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 5px 2px rgb(168, 178, 197);

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

  .button-flat {
    background: #fff;
    border: none;
    cursor: pointer;
  }
}
</style>

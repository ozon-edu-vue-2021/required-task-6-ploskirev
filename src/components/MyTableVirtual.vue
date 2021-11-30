<template>
  <div class="table-wrapper">
    <div class="table">
      <div class="thead">
        <div class="tr">
          <div
            class="th"
            v-for="column in columns"
            :style="getCellStyle(column)"
            :key="column.key"
          >
            {{ column.label }}
          </div>
        </div>
      </div>
      <div class="tbody">
        <RecycleScroller
          :items="items"
          :itemSize="56"
          :buffer="2000"
          page-mode
          key-field="id"
          v-slot="{ item }"
        >
          <div class="tr">
            <div
              v-for="column in columns"
              :key="column.key"
              :style="getCellStyle(column)"
              class="td"
            >
              {{ item[column.key] }}
            </div>
          </div>
        </RecycleScroller>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyVirtualTable',
  props: {
    columns: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    getCellStyle(column) {
      const styles = {}
      if (column.width) {
        styles.width = column.width
        styles.flexShrink = 0
      } else {
        styles.width = 'auto'
        styles.flex = '1 1 0%'
      }
      return styles
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  width: 100%;

  .thead {
    .tr {
      display: flex;
      flex-wrap: nowrap;
      background: rgb(198, 216, 236);
      font-size: 14px;

      .th {
        text-align: left;
        font-weight: 500;
        padding: 4px;
      }
    }
  }

  .tbody {
    .tr {
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      background: rgb(247, 245, 237);
      font-size: 12px;
      height: 56px;

      .td {
        text-align: left;
        overflow: hidden;
        padding: 4px;

        .content {
          height: 100%;
          width: 100%;
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
    }
  }
}
</style>

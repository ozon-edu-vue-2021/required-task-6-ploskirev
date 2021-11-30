<template functional>
  <td class="table-cell-body">
    <slot name="body-cell" :item="props.item">
      <div class="content">{{ props.item }}</div>
    </slot>
  </td>
</template>

<script>
export default {
  name: 'TableCellBody',
  functional: true,
  props: {
    item: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.table-cell-body {
  vertical-align: top;
  text-align: left;
  border-bottom: 1px solid rgb(226, 226, 226);
  background: rgb(247, 245, 237);
}

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
</style>

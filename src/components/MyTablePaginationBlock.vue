<script>
import PageLoader from '/src/assets/loader.svg'

export default {
  name: 'TablePagination',
  functional: true,
  components: {
    PageLoader
  },
  props: {
    infiniteScroll: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      required: true
    },
    isLastPage: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props, listeners }) {
    const { infiniteScroll, currentPage } = props
    const { paginationPrevPageClick, paginationNextPageClick, loaderEnter } =
      listeners
    const renderPagination = () => (
      <div class="pagination-buttons">
        <button onClick={paginationPrevPageClick}>Назад</button>
        <span class="page-number">{currentPage}</span>
        <button onClick={paginationNextPageClick}>Вперед</button>
      </div>
    )
    const renderInfScroll = () => (
      <div vView={loaderEnter} class="infscroll-detector">
        <PageLoader />
      </div>
    )
    return <div>{!infiniteScroll ? renderPagination() : renderInfScroll()}</div>
  }
}
</script>

<style lang="scss" scoped>
.pagination-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  margin: 8px 0;

  button {
    border: none;
    width: 100px;
    height: 20px;
    border-radius: 3px;
    background: rgb(103, 135, 196);
    color: #fff;
    cursor: pointer;
  }

  .page-number {
    min-width: 50px;
    margin: 0 8px;
  }
}
</style>

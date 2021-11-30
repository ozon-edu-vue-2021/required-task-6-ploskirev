<script>
export default {
  name: 'FilterDropdown',
  functional: true,
  props: {
    filterText: {
      type: String,
      required: true
    }
  },
  render(h, { listeners, props }) {
    const { closeFilter, textUpdate, submitFilter } = listeners
    const { filterText } = props
    return (
      <div class="filter-dropdown">
        <button class="button-flat button-close" onClick={closeFilter}>
          &times;
        </button>
        <input
          class="filter-input"
          type="text"
          value={filterText}
          onInput={() => textUpdate(event.target.value)}
        />
        <button class="button-flat button-submit" onClick={submitFilter}>
          ok
        </button>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.filter-dropdown {
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

  .button-submit {
    margin: 4px 0;
    font-size: 16px;
    font-weight: 500;
    color: rgb(103, 135, 196);
  }

  .filter-input {
    width: 80%;
  }
}
</style>

<script>
export default {
  name: 'TableToggler',
  functional: true,
  props: {
    val: {
      type: String,
      requred: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props, listeners }) {
    const { isActive, val } = props
    const { click } = listeners
    const btnColor = 'rgb(50, 104, 219)'
    const activeColor = 'rgb(221, 173, 42)'
    return (
      <button
        style={`background: ${isActive ? activeColor : btnColor}`}
        onClick={() => click(val)}
      >
        {val.toUpperCase()}
      </button>
    )
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: rgb(50, 104, 219);
  color: #fff;
  font-weight: 500;
  margin: 0 20px;
  cursor: pointer;
}
</style>

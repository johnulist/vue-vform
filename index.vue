<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  props: {
    request: Boolean,
    action: String,
    params: {
      type: Object,
      default: () => {}
    },
    method: {
      type: String,
      required: false,
      default: 'POST',
      validator: value => /(POST|PUT|DELETE|PATCH)/gi.test(value)
    },
    accept: {
      type: String,
      default: 'application/json'
    }
  },

  mounted () {
    this.prepareComponent()
  },

  methods: {
    prepareComponent () {
      $(this.$el).validate({
        errorPlacement: (error, element) => {
          $(element).parent().append(error)
        },
        highlight: (element, errorClass) => {
          $(element).addClass(errorClass)
        },
        unhighlight: (element, errorClass) => {
          $(element).removeClass(errorClass)
        },
        submitHandler: () => {
          let promise = null

          if (this.request && axios) {
            promise = axios({
              url: this.action,
              headers: {
                Accept: this.accept,
                'X-Requested-With': 'XMLHttpRequest'
              },
              method: this.method,
              data: this.params
            })
          }

          this.$emit('validate', promise)
        }
      })
    }
  }
}
</script>

export default {
  props: {
    request: Boolean,
    action: String,
    params: {
      type: Object,
      default: () => {},
    },
    method: {
      type: String,
      required: false,
      default: 'POST',
      validator: value => {
        switch (value.toUpperCase()) {
          case 'POST':
            return true;
          case 'PUT':
            return true;
          case 'DELETE':
            return true;
          case 'PATCH':
            return true;
          default:
            return false;
        }
      },
    },
    accept: {
      type: String,
      default: 'application/json',
    },
  },

  mounted() {
    this.prepareComponent();
  },

  methods: {
    prepareComponent() {
      $(this.$el).validate({
        errorPlacement: (error, element) => {
          $(element).parent().append(error);
        },
        highlight: (element, errorClass) => {
          $(element).addClass(errorClass);
        },
        unhighlight: (element, errorClass) => {
          $(element).removeClass(errorClass);
        },
        submitHandler: () => {
          let promise = null;

          if (this.request && axios) {
            promise = axios({
              url: this.action,
              headers: {
                Accept: this.accept,
                'X-Requested-With': 'XMLHttpRequest',
              },
              method: this.method,
              data: this.params,
            });
          }

          this.$emit('validate', promise);
        },
      });
    },
  },
};

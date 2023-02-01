export default Vue.component("products", {
  data() {
    return {
      catalogUrl: "catalogData.json",
      filtered: [],
      products: [],
    };
  },
  mounted() {
    this.$parent
      .getJson(`/api/products`)
      .then((data) => {
        for (let item of data) {
          this.$data.products.push(item);
          this.$data.filtered.push(item);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    filter(userSearch) {
      let regexp = new RegExp(userSearch, "i");
      this.filtered = this.products.filter((el) =>
        regexp.test(el.product_name)
      );
    },
  },
  template: `<ul class="products products__list">
                <product v-for="item of filtered" 
                :product="item"
                @add-product="$parent.$refs.header.$refs.cart.addProduct"></product>
             </ul>`,
});

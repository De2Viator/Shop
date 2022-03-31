Vue.component("products", {
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
                @add-product="$parent.$refs.cart.addProduct"></product>
               </ul>`,
});
Vue.component("product", {
  props: ["product"],
  template: `
        <li class="product__item">
            <img
            :src="product.image"
              alt="features"
              class="product__item-img"
            />
            <div class="overlay"></div>
            <div class="buy-button-container">
              <button class="buy-button buy-btn" @click="$emit('add-product', product)">
                <img
                  src="img/mini-baggage.svg"
                  alt="baggage"
                  class="buy-button-image"
                />
                <span class="buy-button-text">Add To Cart</span>
              </button>
            </div>
            <h3 class="product__item-title">{{product.product_name}}</h3>
            <p class="product__item-desc">
              Known for her sculptural takes on traditional tailoring,
              Australian arbiter of cool Kym Ellery teams up with Moda Operandi.
            </p>
            <p class="product__item-price">\${{product.price}}</p>
          </li>
    `,
});

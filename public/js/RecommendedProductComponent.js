let recommended = Vue.component("recommended-products", {
    data() {
      return {
        catalogUrl: "catalogData.json",
        products: [],
      };
    },
    mounted() {
      this.$parent
        .getJson(`/api/products`)
        .then((data) => {
          k = 3
          for (let i = 0; i < k; i++) {
            let number = Math.floor(Math.random() * data.length);
            this.$data.products.push(data[number])     
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    methods: {
    },
    template: `

        <section class="showcase container showcase__container">
            <ul class="showcase__list d-flex justify-content-between">
                <recommended-product v-for="item of products" 
                :product="item"
                @add-product="$parent.$refs.cart.addProduct">
                </recommended-product>
            </ul>
        </section>
                 `,
  });
  Vue.component("recommended-product", {
    props: ["product"],
    template: `
            <li class="showcase__item">
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
            <img
              :src="product.image"
                alt="features"
                class="product__item-img"
              />
            <h3 class="product__item-title">{{product.product_name}}</h3>
            <p class="showcase__item-desc">
              Known for her sculptural takes on traditional tailoring,
              Australian arbiter of cool Kym Ellery teams up with Moda Operandi.
            </p>
            <p class="product__item-price">\${{product.price}}</p>
          </li>
      `,
  });
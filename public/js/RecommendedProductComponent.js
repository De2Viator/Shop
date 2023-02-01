Vue.component("recommended-products", {
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
          const k = 3
          for (let i = 0; i < k; i++) {
            let number = Math.floor(Math.random() * data.length);
            const path ='../'
            data[number].image = path.concat(data[number].image)
            this.$data.products.push(data[number])     
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    template: `
      <ul class="showcase__list">
      <product v-for="item of products" 
      :product="item"
      @add-product="$parent.$refs.header.$refs.cart.addProduct"></product>
        </product>
      </ul>
            `,
  });
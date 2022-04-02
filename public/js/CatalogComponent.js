let catalog = Vue.component('catalog',{
    data(){
        return {
            catalog: [],
        }
    },
    methods : {
    },
    template:`
    <section class="catalog__container">
        <ul class="menu">
        <catalog-item v-for='item of catalog' :catalog-item='item'>
        </catalog-item>
        </ul>
      </section>
    `,
    mounted(){
        this.$root.getJson('/api/catalog').then(data => {
          for(catalogItem of data) {
            this.catalog.push(catalogItem);
          }
        })
    }
})

Vue.component('catalog-item', {
    props:{
        catalogItem:Object
    },
    methods: {
      addProduct(item) {
        this.$root.$refs.cart.addProduct(item)
      },
    },
    template:`
    <li class="menu__item">
            <div class="overlay"></div>
            <img :src="catalogItem.image" :alt="catalogItem.name" class="menu__image" />
            <div class="buy-button-container">
              <button class="buy-button buy-btn" @click="addProduct(catalogItem)">
                <img
                  src="img/mini-baggage.svg"
                  alt="baggage"
                  class="buy-button-image catalog__buy-button-image"
                />
                <div class="buy-button-text">Add To Cart</div>
              </button>
            </div>
            <div class="menu__item-wrp">
              <h4 class="menu__title">{{ catalogItem.product_name }}</h4>
              <p class="menu__description">
                {{ catalogItem.description }}
              </p>
              <p class="menu__price">\${{ catalogItem.price}}</p>
            </div>
    </li>
    `
})
let mainCart = Vue.component('main-cart', {
    data(){
      return {
          cartUrl: 'getBasket.json',
          cartItems: [],
          shippingPrice:0,
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    item.image = '../' + item.image
                    this.$data.cartItems.push(item);
                    this.$data.shippingPrice += item.price * item.quantity;
                }
            });
    },
    methods: {
        remove(item){
            console.log(item)
            this.$parent.putJson(`/api/cart/${item.id_product}/clear`,item)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                        this.$data.shippingPrice -= item.price * item.quantity
                    }
                })
        },
        deleteCart() {
          this.$root.deleteJson('/api/cart').then(data => {
            if(data.result == 1) {
              this.cartItems.splice(0, this.cartItems.length)
            }
          })
        }
    },
    template: `
    <section class="stuff">
      <main-cart-item v-for='item of cartItems' :cartItem='item' @remove='remove'></main-cart-item>
      <div class="stuff__button">
        <button class="stuff__button-button login" @click='deleteCart'>
          Clear Shopping Cart
        </button>
        <button class="stuff__button-button">Continue shopping</button>
      </div>
    </section>
    <section class="shipping ">
      <form action="">
          <fieldset class="input-wrp">
            <legend class="shipping__title">Shipping Adress</legend>
            <label>
              <input type="text" class="shipping__input" placeholder="Country">
              <span class="visually-hidden">Country</span>
            </label>
            <label>
              <input type="text" class="shipping__input" placeholder="State">
              <span class="visually-hidden">State</span>
            </label>
            <label>
              <input type="text" class="shipping__input" placeholder="Postcode / Zip">
              <span class="visually-hidden">Postcode / Zip</span>
            </label>
          </fieldset>      
        <button class="shipping__button" type="submit">get a quote</button>
      </form>
      <div class="shipping__order">
        <div class="order-sub-total"><pre>sub total         \${{ shippingPrice }}</pre></div>
        <div class="order-grand-total"><pre class="grand-text">GRAND TOTAL      
        <span class="total-pink">\${{ shippingPrice }}</span></pre></div>
        <hr class="hr">
        <button class="order-button">
          <span class="order-button-text">proceed to checkout</span></button>            
      </div>
    </section>
    `
});

Vue.component('main-cart-item', {
    props: ['cartItem'],
    template: `
            <div class="stuff__cart shadow">
              <div class="stuff__cart-image ">
                <img :src=cartItem.image :alt=cartItem.name class="cart-image" />
              </div>
              <div class="stuff__cart-text">
                <div class="cart-container">
                  <p class="cart-text-title">{{ cartItem.product_name }}</p>
                  <img @click="$emit('remove', cartItem)" src="../img/cross.svg" alt="cross" class="cart-cross">
                  <p class="cart-text-desc">
                    Price: <span class="cart-pink">\${{ cartItem.price }}</span>
                  </p>
                  <p class="cart-text-desc">Color: Red</p>
                  <p class="cart-text-desc">Size: Xl</p>
                  <p class="cart-text-desc">Quantity: <span class="cart-number">{{ cartItem.quantity }}</span></p>
                </div>
              </div>
            </div>
    `
});
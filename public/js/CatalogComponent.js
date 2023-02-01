Vue.component('catalog',{
    data() {
        return {
            catalog: [],
        }
    },
    template:`
    <section>
        <ul class="menu">
          <product v-for="item of catalog" :product="item" @add-product="$parent.$refs.header.$refs.cart.addProduct">
          </product>
        </ul>
    </section>
    `,
    mounted(){
        this.$root.getJson('/api/catalog').then(data => {
          for(const catalogItem of data) {
            console.log(data)
            catalogItem.image ='../'+ catalogItem.image
            this.catalog.push(catalogItem);
          }
        })
    }
})
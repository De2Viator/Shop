export default Vue.component("subscription", {
    template: `
    <section class="subscription">
        <div class="subscription__list container subscription__container">
        <div class="subscription__quote">
            <img
            src="../img/Ellipse.png"
            alt="contact"
            class="subscription__quote-image"
            />
            <q class="subscription__quote-text">
            <p>“Vestibulum quis porttitor dui! Quisque viverra nunc mi,</p>
            <i class="italic">a pulvinar purus condimentum“</i>
            </q>
        </div>
        <div class="subscription__sub">
            <h2 class="subscription__sub-head">SUBSCRIBE</h2>
            <p class="subscription__sub-text">
            FOR OUR NEWLETTER AND PROMOTION
            </p>
            <form class="subscription__form">
            <input
                type="email"
                placeholder="Enter Your Email"
                class="subscription__input"
            />
            <button type="submit" class="subscription__button">
                Subscribe
            </button>
            </form>
        </div>
        </div>
    </section>
      `,
});
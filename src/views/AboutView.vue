<script setup>
import { BContainer, BRow, BCol } from 'bootstrap-vue-next'
import { ref } from 'vue'

const counter = ref(0)

function increment() {
  if (counter.value < 10) counter.value++
}
function decrement() {
  if (counter.value > 0) counter.value--
}
</script>

<template>
  <BContainer class="about-wrapper pb-5">
    <BContainer class="w-100 box" style="background-color: white;">
    <BRow>
      <BCol>
        <h1 class="text-center fw-bold">Our Mission 🎯</h1>
        <p>
          Ithaca Soap Bar Soap, Instant Liquid Soap, Olive Oil Shampoo Bar, and LiXTiK Beeswax Lip Balm are about making the most cost effective luxury soaps and lip balms, that actually add to your personal care health. Andy and Wendy developed this product line to fill a void in their own personal care experience.
        </p>
        <p>
          Some years ago, we were faced with a problem. Shipping prices were going up and the plastic bottle supply became unreliable. In that moment, we realized that we had an opportunity to solve two unmet environmental challenges:
        </p>
        <ul>
          <li>Eliminate the need for single-use plastic bottles.</li>
          <li>Eliminate shipping water.</li>
        </ul>
      </BCol>
    </BRow>
    </BContainer>

    <!-- Calculator Section -->
    <BContainer class="box my-4" style="background-color: white;">
      <BRow>
        <BCol>
          <h2 class="fw-bold">Calculator 🧮</h2>
          <p>Use the calculator to see how many resources you save when purchasing our soap!</p>
        </BCol>
      </BRow>

      <BRow class="align-items-center">
        <BCol cols="6">
          <p>Number of purchases: {{ counter }}</p>
        </BCol>
        <BCol cols="6" class="d-flex justify-content-end gap-2">
          <button @click="decrement" class="btn btn-outline-secondary">−</button>
          <button @click="increment" class="btn btn-outline-secondary">+</button>
        </BCol>
      </BRow>

      <BRow class="text-center mt-3">
        <BCol>
          <!-- Source: https://www.flaticon.com/free-icon/water-drop_3105761?term=water&page=1&position=2&origin=tag&related_id=3105761 -->
          <img src="/images/water-drop.png" alt="Water Bucket" class="resource-icon" />
        </BCol>
        <BCol>
          <!-- Source: https://www.flaticon.com/free-icon/gas-station_846347?term=gas&page=1&position=5&origin=tag&related_id=846347 -->
          <img src="/images/gas-station.png" alt="Shipping Truck" class="resource-icon" />
        </BCol>
        <BCol>
          <!-- Source: https://www.flaticon.com/free-icon/plastic-bag_3491352?term=plastic+bag&page=1&position=15&origin=tag&related_id=3491352 -->
          <img src="/images/plastic-bag.png" alt="Plastic Bag" class="resource-icon" />
        </BCol>
      </BRow>

      <BRow class="text-center mt-2">
        <BCol>
          <p><strong>{{ counter * 2 }}</strong> gallons of water saved</p>
        </BCol>
        <BCol>
          <p><strong>{{ counter * 5 }}</strong> gallons of gas saved</p>
        </BCol>
        <BCol>
          <p><strong>{{ counter * 1 }}</strong> plastic bags saved</p>
        </BCol>
      </BRow>
    </BContainer>

    <!-- FAQs -->
    <BRow>
      <BCol>
        <BContainer class="box" style="background-color: white;">
                <h2 class="fw-bold">FAQs ❓</h2>

          <BRow class="mb-4">
            <BCol>
              <h4>What makes your soap save water?</h4>
                <p>Instant Liquid Soap takes up 50% less space. This means shipping space in trains and delivery trucks. It is also 50% less space in warehouses, making them more efficient, and on store shelves. It helps employees, by reducing box weights, making them able to move more soap with less effort. This reduces breakage and waste to zero.</p>

                <p>With 80% reduced weight and 50% less space, you are increasing the water conservation efforts by 70%. It's a win win for everyone involved from the beginning of the manufacturing process to the end user.</p>
            </BCol>
          </BRow>

          <BRow class="mb-4">
            <BCol>
                <h4>What ingredients are used to make the Instant Liquid Soap?</h4>
                <p>Saponified certified organic coconut oil, 100% essential oils (in all scented varieties. Unscented liquid soap does not contain essential oils).</p>
                <p>This is a pure Castile soap concentrate. Once diluted, it is very sudsy, gentle on skin, and tough on germs.</p>
            </BCol>
          </BRow>

          <BRow class="mb-4">
            <BCol>
                  <h4>What is a shampoo bar?</h4>
                  <p>A natural shampoo bar is a bar soap, formulated for for hair. The best shampoo bar will gently clean your hair while making it shine.</p>        <p>Natural shampoo, like natural soap, is saponified oil, and possibly some essential oils for added hair care properties and gentle aroma.</p>
            </BCol>
          </BRow>
        </BContainer>
      </BCol>
    </BRow>

    <!-- Contact Section -->
    <BRow class="mb-3 mt-4 box" style="background-color: white;">
      <BCol>
        <h2 class="fw-bold">Contact Us 📞</h2>
        <p>We are here to help! Please reach out to us with any questions or concerns.</p>
        <div class="d-flex flex-wrap gap-3 mt-2">
          <a href="https://www.instagram.com/ithaca_soap_and_lip_balm/">
            <img src="/images/instagram-logo.png" alt="Instagram" class="social-icon" /> <!---https://logos-world.net/instagram-logo/-->
          </a>
          <a href="https://x.com/IthacaSoap">
            <img src="/images/x-logo.png" alt="X" class="social-icon" />
          </a> <!--https://loodibee.com/twitter/twitter-x-logo/-->
          <a href="https://www.facebook.com/ithacasoap">
            <img src="/images/facebook-logo.png" alt="Facebook" class="social-icon" />
          </a> <!--https://icons8.com/icons/set/facebook-->
          <a href="https://www.pinterest.com/ithacasoap/">
            <img src="/images/pinterest-logo.png" alt="Pinterest" class="social-icon" /> <!--https://pixsector.com/icon/free-pinterest-icon-png-vector/810-->
          </a>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped>
.about-wrapper {
  padding-top: 1.5rem;
  padding-bottom: env(safe-area-inset-bottom, 2rem);
}

.box {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-left: auto;
}

.resource-icon {
  width: 60px;
  height: auto;
}

.social-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

@media (max-width: 375px) {
  .resource-icon {
    width: 48px;
  }

  .social-icon {
    width: 36px;
    height: 36px;
  }

  .btn {
    font-size: 0.9rem;
    padding: 0.3rem 0.6rem;
  }
}
</style>

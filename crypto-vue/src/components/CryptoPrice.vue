<template>
  <div id="crypto">
    <div class="wrapper">
      <div class="buttons">
        <button v-for="(crypto, index) in cryptos"
        :key="crypto.name" @click="setCrypto(crypto, index)"
        >
          {{ crypto.name }}
        </button>
        <button @click="refreshCryptos" class="refresh">Refresh rates 🤑</button>
      </div>
      <div class="selectedCrypto">
        <h3>1 {{ this.selectedCrypto }} = {{ crypto.rate }} €</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CryptoPrice',
  data() {
    return {
      title: 'Crypto rates',
      cryptos: null,
      crypto: {
        name: null,
        rate: null,
      },
      selectedCrypto: null,
      error: null,
    };
  },
  methods: {
    setCrypto(element, index) {
      this.crypto = element;
      this.selectedCrypto = index;
      this.setDocumentTitle(index, this.crypto.rate);
    },
    refreshCryptos() {
      axios
        .get(process.env.VUE_APP_API_URL)
        .then((data) => {
          const { response } = data.data;
          this.cryptos = response;
          this.crypto = this.cryptos[`${this.selectedCrypto}`];
          this.setDocumentTitle(this.selectedCrypto, this.crypto.rate);
        })
        .catch((error) => { this.error = error; });
    },
    setDocumentTitle(index, rate) {
      document.title = `${this.title} | ${index} ${rate.toFixed(2)}€`;
    },
  },
  mounted() {
    document.title = this.title;
    axios
      .get(process.env.VUE_APP_API_URL)
      .then((data) => {
        const { response } = data.data;
        this.cryptos = response;
        this.crypto = this.cryptos.BTC;
        this.selectedCrypto = 'BTC';
        this.setDocumentTitle(this.selectedCrypto, this.crypto.rate);
      })
      .catch((error) => { this.error = error; });
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap');

#crypto {
  font-family: 'Nunito Sans';
  width: 100vw;
  height: 100vh;
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(150px);
    .buttons {
      flex-direction: row;
    }
    button {
      border-radius: 2em;
      color: #34495e;
      border:0.1em solid #34495e;
      background-color: transparent;
      text-decoration: none;
      padding:0.35em 1.2em;
      margin:0 0.3em 0.3em 0;
      outline: none;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        background-color: #34495e;
        color: white;
      }
    }
    .refresh {
      border: 0.1em solid #2ecc71;
      color: #2ecc71;
      &:hover {
        background-color: #2ecc71;
      }
    }
    .selectedCrypto {
      transform: translateY(50px);
    }
  }
}
</style>

<template>
  <div>
    <v-btn @click="auth">Giriş yap</v-btn>
    <v-btn @click="getAll">Verileri getir</v-btn>
    <v-btn @click="mysqlGetData">Mysql Verileri getir</v-btn>
    <v-btn @click="mysqlSetData">Mysql Veri Ekle</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tokenAuth: "",
    };
  },
  methods: {
    auth() {
      this.$axios
        .post("./api/auth", {
          username: "ferhat",
          password: "cengiz",
        })
        .then((response) => (this.tokenAuth = response.data.token))
        .catch((err) => console.log(err));
    },

    getAll() {
      this.$axios
        .get("/api/get-all", {
          headers: {
            Authorization: this.tokenAuth,
          },
        })
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    },
    mysqlGetData() {
      this.$axios
        .get("/api/mysql", {
          headers: {
            Authorization: this.tokenAuth,
          },
        })
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    },
    mysqlSetData() {
      this.$axios
        .post("/api/mysql-post", {
          nameSurname: "test",
          role: "Admin",
        })
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    },
  },
};
</script>

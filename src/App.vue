<template>
  <v-app>
    <v-app-bar flat app>
        <v-tabs color="teal accent-4">
          <v-tab
            :ripple="false"
            plain
            v-for="(link, index) in navLinks"
            :key="index"
            :to="link.url"
            
          >
            {{ link.name }}
          </v-tab>
        </v-tabs>
    </v-app-bar>
    <v-main app>
      <router-view class="pa-5" />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      navLinks: [
        {
          url: "/dashboard",
          name: "Dashboard",
        },
        {
          url: "/about",
          name: "About",
        },
        {
          url: "/404",
          name: "NotFound",
        },
      ],
    };
  },
  methods: {
    checkActivePage(name) {
      if (name !== null) {
        name = name.toLowerCase();
        let urlName = "";
        if (
          this.$router.history.current.path === "/" ||
          this.$router.history.current.path === "/404"
        ) {
          if (this.$router.history.current.name !== null) {
            urlName = this.$router.history.current.name.toLowerCase();
          } else {
            urlName = this.$router.history.pending.name.toLowerCase();
          }
        } else {
          urlName = this.$router.history.current.path
            .split("/")[1]
            .toLowerCase();
        }
        return name === urlName || (name === "dashboard" && urlName === "main");
      }
    },
  },
  computed: {},
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  deforeUpdate() {
    console.log("deforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  deforeDestroy() {
    console.log("deforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script >

<style lang="scss" module>
$buttonColor: rgb(19, 201, 153);

* {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.header {
  font-size: 24px;
  padding-bottom: 20px;
}
.title {
  padding: 0 15px;
  padding-top: 20px;
}
.nav {
  display: flex;
  justify-content: center;
  border-bottom: 2px solid $buttonColor;
  width: 100%;
}
.navLink {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: $buttonColor;
  min-height: 30px;
  padding: 10px 20px;
}
.navLink:hover {
  background-color: $buttonColor;
  color: #fff;
}
.navLinkActiv {
  background-color: $buttonColor;
  color: #fff;
}
main {
  padding: 0 15px;
}
</style>

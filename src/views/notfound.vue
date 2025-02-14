<template>
  <div>没有这个路径</div>
</template>

<script>
 

export default {
  name: "NotfoundComponent",
  props: {
    borderRadius: {
      type: String,
      default: "6px", // 默认值
    },
    logoWidth: {
      type: String,
      default: "20px", // 默认值
    },
    logoHeight: {
      type: String,
      default: "20px", // 默认值
    },
    link: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "vuedotjs",
    },
    leftText: {
      type: String,
      default: "creator",
    },
    rightText: {
      type: String,
      default: "Jinx",
    },
    leftSize: {
      type: String,
      default: "14px",
    },
    rightSize: {
      type: String,
      default: "14px",
    },
    leftColor: {
      type: String,
      default: "#555",
    },
    rightColor: {
      type: String,
      default: "#4c1",
    },
    logoColor: {
      type: String,
      default: "#4c1",
    },
  },
  computed: {
    containerStyle() {
      return {
        borderRadius: this.borderRadius,
      };
    },
    leftStyle() {
      return {
        fontSize: this.leftSize,
      };
    },
    rightStyle() {
      return {
        fontSize: this.rightSize,
      };
    },
    logoStyle() {
      return {
        width: this.logoWidth,
        height: this.logoHeight,
      };
    },
  },
  data() {
    return {
 
    };
  },
  mounted() {
 
  },
  methods:  {

  }
};
</script>
 
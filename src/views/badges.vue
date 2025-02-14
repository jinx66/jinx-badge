<template>
  <div
    class="badge"
    id="myDiv"
    :style="containerStyle"
    @click="openLink"
    :class="[link ? 'cursor' : '']"
  >
    <div class="badge-left" :style="leftStyle">
      <div
        v-if="logo"
        class="logo-container"
        :style="logoStyle"
        ref="logoContainer"
      ></div>
      <div v-if="leftText">{{ leftText }}</div>
    </div>
    <div v-if="rightText" class="badge-right" :style="rightStyle">
      <div class="right-text">{{ rightText }}</div>
    </div>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";

export default {
  name: "BadgeComponent",
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
    return {};
  },
  mounted() {
    this.loadSvg();
    setTimeout(()=>{
      this.convertToSVG()
    },500)
  },
  methods: {
    convertToSVG() {
      var node = document.getElementById("myDiv");

      domtoimage
        .toSvg(node)
        .then(function (dataUrl) {
          console.log('SVG 转换完成:', dataUrl);
    // 去掉 data:image/svg+xml;charset=utf-8, 前缀
    const svgContent = dataUrl.replace(/^data:image\/svg\+xml;charset=utf-8,/, '');
    
    // 清空页面内容，并插入 SVG
    document.body.innerHTML = svgContent;
  })
        .catch(function (error) {
          console.error("Error while converting to SVG:", error);
        });
    },
    openLink() {
      this.convertToSVG();
      if (!this.link) {
        return false;
      }
      console.log(this.link);

      window.open(this.link, "_blank");
    },
    loadSvg() {
      fetch(`https://simpleicons.org/icons/${this.logo}.svg`)
        .then((response) => response.text())
        .then((svg) => {
          // 使用 DOMParser 解析 SVG 字符串为 DOM
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svg, "image/svg+xml");

          // 获取 SVG 元素
          const svgElement = svgDoc.querySelector("svg");

          // 设置 fill 属性为动态颜色
          svgElement.setAttribute("fill", this.logoColor);

          // 将修改后的 SVG 插入到页面中
          this.$refs.logoContainer.innerHTML = svgElement.outerHTML;
        })
        .catch((error) => console.error("Error loading SVG:", error)); // 捕获错误
    },
  },
};
</script>

<style scoped>
.logo-container {
  margin-right: 5px;
}
.badge {
  display: inline-flex;
  border-radius: 6px;
  overflow: hidden;
  font-family: Georgia, serif;
  font-size: 12px;
  font-weight: bold;
  line-height: 12px;
  text-align: center;
}

.badge-left {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: v-bind(leftColor);
  color: white;
  padding: 5px 8px;
}

.badge-right {
  background-color: v-bind(rightColor);
  color: white;
  padding: 5px 8px;
}
.cursor {
  cursor: pointer;
}
.right-text {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="badge" @click="openLink" :class="[link ? 'cursor' : '']">
    <div class="badge-left">
      <div v-if="logo" class="logo-container" ref="logoContainer"></div>
      <div v-if="leftText">{{ leftText }}</div>
    </div>
    <div v-if="rightText" class="badge-right">
      <div>{{ rightText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BadgeComponent',
  props: {
    link: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: 'vuedotjs',
    },
    leftText: {
      type: String,
      default: 'creator',
    },
    rightText: {
      type: String,
      default: 'Jinx',
    },
    leftColor: {
      type: String,
      default: '#555',
    },
    rightColor: {
      type: String,
      default: '#4c1',
    },
    logoColor: {
      type: String,
      default: '#4c1',
    },
    svgContent: {
      type: String,
      default: '',
    },
  },
  data(){
    return {
      // link: '',
      // logo: '',
      // leftText: '',
      // rightText: '',
      // leftColor: '',
      // rightColor: '',
      // logoColor: '',
      // svgContent: ''         // 存储 SVG 内容
    }
  },
  mounted() {
    // const { link, leftText, rightText, leftColor, rightColor,logo,logoColor } = this.$route.query;
    // this.link = link;
    // // this.link = link || "https://github.com/jinx66";
    // this.logo = logo
    // // this.logo = logo || 'vuedotjs'
    // this.logoColor = logoColor || '#000'
    // this.leftText = leftText || "creator";
    // this.rightText = rightText || 'Jinx';
    // this.leftColor = leftColor || "#555";
    // this.rightColor = rightColor || "#4c1";
    this.loadSvg()
    // link=https://github.com/jinx66&logo=react&logoColor=yellow&leftText=csgo&rightText=2025&leftColor=red&rightColor=blue
    // link=https://github.com/jinx66&logoColor=red&leftText=csgo&rightText=2025
    // link=https://github.com/jinx66&leftText=csgo&rightText=2025

  },
  methods:{
    openLink() {
      if(!this.link) {
        return false
      } 
      console.log(this.link);
      
      window.open(this.link, '_blank');
    },
    loadSvg() {
      fetch(`https://simpleicons.org/icons/${this.logo}.svg`)
        .then(response => response.text())
        .then(svg => {
          // 使用 DOMParser 解析 SVG 字符串为 DOM
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
          
          // 获取 SVG 元素
          const svgElement = svgDoc.querySelector('svg');
          
          // 设置 fill 属性为动态颜色
          svgElement.setAttribute('fill', this.logoColor);
          
          // 将修改后的 SVG 插入到页面中
          this.$refs.logoContainer.innerHTML = svgElement.outerHTML;
        })
        .catch(error => console.error('Error loading SVG:', error));  // 捕获错误
    },
  }
};
</script>

<style scoped>
.logo-container{
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
.badge {
  display: inline-flex;
  border-radius: 3px;
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
</style>

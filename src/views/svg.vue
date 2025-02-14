<template>
  <div>
    <!-- Display the badge using SVG content -->
    <div v-html="svgContent"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TestComponent',
  data() {
    return {
      svgContent: '',  // 用于存储从后端获取的 SVG 内容
    };
  },
  mounted() {
    // 获取 URL 中的参数，并发送请求到后端
    const { logo, leftText, rightText, leftColor, rightColor, logoColor, link, leftSize, rightSize, borderRadius, logoWidth, logoHeight } = this.$route.query;
    this.getSvg({ logo, leftText, rightText, leftColor, rightColor, logoColor, link, leftSize, rightSize, borderRadius, logoWidth, logoHeight });
  },
  methods: {
    getSvg(data) {
      // 生成 SVG 的逻辑 (例如使用模板字符串或其他方式生成 SVG)
      const svgContent = this.generateSVG(data);  // 假设 generateSVG 是一个生成 SVG 的方法

      // 发送生成的 SVG 到后端接口保存
      this.saveSVG(svgContent);
    },

    generateSVG(data) {
      // 假设这是一个简单的模板生成方式
      return `
        <svg width="${data.logoWidth}" height="${data.logoHeight}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" rx="${data.borderRadius}" fill="${data.logoColor}" />
          <text x="50%" y="50%" fill="${data.leftColor}" font-size="${data.leftSize}" text-anchor="middle">${data.leftText}</text>
          <text x="50%" y="70%" fill="${data.rightColor}" font-size="${data.rightSize}" text-anchor="middle">${data.rightText}</text>
          <image href="${data.logo}" x="50%" y="20%" width="${data.logoWidth}" height="${data.logoHeight}" />
        </svg>
      `;
    },

    saveSVG(svgData) {
      // 使用 axios 发送 POST 请求
      axios.post('/save-svg', { svg: svgData })
        .then((response) => {
          console.log('SVG saved:', response.data);
          alert('SVG saved successfully!');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error saving SVG');
        });
    }
  },
};
</script>

<style scoped>
.badges {
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>

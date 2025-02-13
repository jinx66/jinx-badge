<template>
  <Badges :link="link" :logo="logo" :leftText="leftText" :rightText="rightText" :leftColor="leftColor" :rightColor="rightColor" :logoColor="logoColor"/>
</template>

<script>
export default {
  name: 'testComponent',
 
  components: {
    Badges: () => import('./badges.vue'),
	},
  data(){
    return {
      link: '',
      logo: '',
      leftText: '',
      rightText: '',
      leftColor: '',
      rightColor: '',
      logoColor: '',
      svgContent: ''         // 存储 SVG 内容
    }
  },
  mounted() {
    const { leftSize,rightSize,borderRadius,logoWidth,logoHeight,link, leftText, rightText, leftColor, rightColor,logo,logoColor } = this.$route.query;
    this.leftSize = leftSize
    this.rightSize = rightSize
    this.borderRadius = borderRadius
    this.logoWidth = logoWidth
    this.logoHeight = logoHeight
    this.link = link;
    // this.link = link || "https://github.com/jinx66";
    this.logo = logo
    // this.logo = logo || 'vuedotjs'
    this.logoColor = logoColor;
    this.leftText = leftText;
    this.rightText = rightText;
    this.leftColor = leftColor;
    this.rightColor = rightColor;
    // this.loadSvg()
    // link=https://github.com/jinx66&logo=react&logoColor=yellow&leftText=csgo&rightText=2025&leftColor=red&rightColor=blue
    // link=https://github.com/jinx66&logoColor=red&leftText=csgo&rightText=2025
    // link=https://github.com/jinx66&leftText=csgo&rightText=2025

  },
  methods:{
 
  }
};
</script>

<template>
  <Badges :link="link" :logo="logo" :leftText="leftText" :rightText="rightText" :leftColor="leftColor" :rightColor="rightColor" :logoColor="logoColor"/>
</template>

<script>
export default {
  name: 'IndexComponent',
 
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
 
    this.logo = logo
 
    this.logoColor = logoColor;
    this.leftText = leftText;
    this.rightText = rightText;
    this.leftColor = leftColor;
    this.rightColor = rightColor;
    console.log(this.rightColor);
    
    // this.leftSize = decodeURIComponent(leftSize);
    // this.rightSize = decodeURIComponent(rightSize);
    // this.borderRadius = decodeURIComponent(borderRadius);
    // this.logoWidth = decodeURIComponent(logoWidth);
    // this.logoHeight = decodeURIComponent(logoHeight);
    // this.link = decodeURIComponent(link);
    // // this.link = link || "https://github.com/jinx66";
    // this.logo = decodeURIComponent(logo);
    // // this.logo = logo || 'vuedotjs'
    // this.logoColor = decodeURIComponent(logoColor);
    // this.leftText = decodeURIComponent(leftText);
    // this.rightText = decodeURIComponent(rightText);
    // this.leftColor = decodeURIComponent(leftColor);
    // this.rightColor = decodeURIComponent(rightColor);

  },
  methods:{
 
  }
};
</script>

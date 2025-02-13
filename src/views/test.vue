<template>
  <div>
    <JinxBadges class="badges" />
    <JinxBadges class="badges" link="https://xianjianheng.com" logoWidth="40px" logoHeight="40px" logo="github" logoColor="#fff" leftText="" rightText="https://www.github/jinx66" leftColor="#000"  rightColor="#0c7ebf"/>
    <JinxBadges class="badges" link="https://xianjianheng.com" logo="" leftText="coverage" rightText="80%" leftColor="#565656" rightColor="#0c7ebf" />
    <JinxBadges class="badges" link="https://xianjianheng.com" logo="silverairways" leftText="silverairways" leftColor="#D0006F" logoColor="#fff" rightText="1.2.3" rightColor="#0d7fc0"/>
    <JinxBadges class="badges" link="https://xianjianheng.com" logo="reactquery" leftText="reactquery" leftColor="#FF4154" logoColor="#fff" rightText="1.2.3" rightColor="#0d7fc0"/>
    <JinxBadges class="badges" link="https://xianjianheng.com" logo="stackoverflow" leftText="stackoverflow" leftColor="#F58025" logoColor="#fff" rightText="1.2.3" rightColor="#0d7fc0"/>
    <JinxBadges class="badges" link="https://xianjianheng.com" logo="amazonsqs" leftText="amazonsqs" leftColor="#FF4F8B" logoColor="#fff" rightText="1.2.3" rightColor="#0d7fc0"/>
    <JinxBadges class="badges" link="https://xianjianheng.com" logo="indiansuperleague" leftText="indiansuperleague" leftColor="#ED2F21" logoColor="#fff" rightText="1.2.3" rightColor="#0d7fc0"/>
  </div>
</template>

<script>
export default {
  name: 'testComponent',
 
  components: {
    JinxBadges: () => import('./badges.vue'),
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
    const { link, leftText, rightText, leftColor, rightColor,logo,logoColor } = this.$route.query;
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

<style>
.badges {
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
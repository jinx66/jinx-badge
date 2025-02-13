<template>
  <Badges link="https://github.com/" logo="" leftText="just the message" rightText="" leftColor="#8a35da" rightColor="#000" logoColor="#fff"/>
</template>

<script>
export default {
  name: 'testComponent',
  props: {
  },
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
 

  },
  methods: {

  }
};
</script>

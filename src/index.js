import JinxBadges from './views/badges.vue';

JinxBadges.install = function(Vue) {
  Vue.component(JinxBadges.name, JinxBadges);
};

// JinxIndex.install = function(Vue) {
//   Vue.component(JinxIndex.name, JinxIndex);
// };
export default JinxBadges;

// export default {JinxBadges,JinxIndex};

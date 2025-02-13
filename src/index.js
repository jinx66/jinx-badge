// src/index.js
import JinxBadges from './views/badges.vue';

JinxBadges.install = function(Vue) {
  Vue.component(JinxBadges.name, JinxBadges);
};

export default JinxBadges;

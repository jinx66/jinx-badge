// src/index.js
import JinxBadges from './views/badges.vue';
import JinxIndex from './views/index.vue';

JinxBadges.install = function(Vue) {
  Vue.component(JinxBadges.name, JinxBadges);
};

JinxIndex.install = function(Vue) {
  Vue.component(JinxIndex.name, JinxIndex);
};

export default {JinxBadges,JinxIndex};

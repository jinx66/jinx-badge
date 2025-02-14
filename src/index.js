const JinxBadges = require('./views/default.vue');

JinxBadges.install = function(Vue) {
  Vue.component(JinxBadges.name, JinxBadges);
};

module.exports = JinxBadges;

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/save-svg': {
        target: 'http://localhost:3000',  // 你的后端服务器地址
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

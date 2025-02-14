<template>
  <div>
    <div
      class="badge"
      id="myDiv"
      :style="containerStyle"
      @click="openLink"
      :class="[link ? 'cursor' : '']"
    >
      <div class="badge-left" :style="leftStyle">
        <div
          v-if="logo"
          class="logo-container"
          :style="logoStyle"
          ref="logoContainer"
        ></div>
        <div v-if="leftText">{{ leftText }}</div>
      </div>
      <div v-if="rightText" class="badge-right" :style="rightStyle">
        <div class="right-text">{{ rightText }}</div>
      </div>
    </div>

    <div class="form-container">
      <div style="margin-top: -10px; height: 1600px; width: 600px">
        <label for="dataUrl">SVG Data URL:</label>

        <el-input
          type="textarea"
          :rows="2"
          placeholder="svg内容"
          :autosize="{ minRows: 2, maxRows: 25 }"
          style="height: 100%"
          v-model="svgContent"
        >
        </el-input>
      </div>
      <div>
        <img src="./image.png" style="width: 800px; height: 540px" />
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="当前地址:">
            <el-input
              v-model="form.url"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 2 }"
              style="width: 900px"
            ></el-input>
          </el-form-item>
          <div style="margin-bottom: 10px;">
            <span style="color: brown;font-size: 12px;">(参考上面配置，在网址后面拼接你所需要的参数名后点击跳转，例如
              https://badges.xianjianheng.com/index?logo=github&leftText=github&rightText=&logoColor=%23fff&leftColor=black)</span>
          </div>
          <el-form-item>
            <el-button type="primary" @click="go">跳转至当前地址</el-button>
            <el-button type="primary" @click="copySVG">复制SVG</el-button>
            <el-button type="primary" @click="downloadSVG">下载SVG</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";

export default {
  name: "BadgeComponent",
  props: {
    borderRadius: {
      type: String,
      default: "6px", // 默认值
    },
    logoWidth: {
      type: String,
      default: "20px", // 默认值
    },
    logoHeight: {
      type: String,
      default: "20px", // 默认值
    },
    link: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "vuedotjs",
    },
    leftText: {
      type: String,
      default: "creator",
    },
    rightText: {
      type: String,
      default: "Jinx",
    },
    leftSize: {
      type: String,
      default: "14px",
    },
    rightSize: {
      type: String,
      default: "14px",
    },
    leftColor: {
      type: String,
      default: "#555",
    },
    rightColor: {
      type: String,
      default: "#4c1",
    },
    logoColor: {
      type: String,
      default: "#4c1",
    },
  },
  computed: {
    containerStyle() {
      return {
        borderRadius: this.borderRadius,
      };
    },
    leftStyle() {
      return {
        fontSize: this.leftSize,
      };
    },
    rightStyle() {
      return {
        fontSize: this.rightSize,
      };
    },
    logoStyle() {
      return {
        width: this.logoWidth,
        height: this.logoHeight,
      };
    },
  },
  data() {
    return {
      form: {
        url: "",
      },
      svgContent: "",
    };
  },
  mounted() {
    this.loadSvg();
    setTimeout(() => {
      this.convertToSVG();
    }, 500);

    this.form.url = JSON.parse(JSON.stringify(window.location.href));
  },
  methods: {
    go() {
      let a = JSON.parse(JSON.stringify(this.form.url))
      let url = a.replace(/#/g, "%23")
      if (!this.validateUrl(url)) {
        return false;
      }
      // window.location.href = encodeURIComponent(this.form.url); // 重定向到新的页面
      window.location.href = url; // 重定向到新的页面
    },
    validateUrl(url) {
      // 解码URL
      const decodedUrl = decodeURIComponent(url);

      // 校验URL的格式
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (!urlPattern.test(decodedUrl)) {
        this.$message({
          showClose: true,
          message: "url格式有误",
          type: "warning",
        });
        return false; // 如果格式不正确，返回false
      }

      // 校验URL长度（假设最大长度为2000字符，可以根据需要调整）
      if (decodedUrl.length > 300) {
        this.$message({
          showClose: true,
          message: "url太长",
          type: "warning",
        });
        return false; // 如果长度超过2000字符，返回false
      }

      return true; // 如果格式和长度都合理，返回true
    },
    convertToSVG() {
      var node = document.getElementById("myDiv");

      domtoimage
        .toSvg(node)
        .then((dataUrl) => {
          console.log("SVG 转换完成:", dataUrl);
          this.svgContent = dataUrl.replace(
            /^data:image\/svg\+xml;charset=utf-8,/,
            ""
          );
          // 去掉 data:image/svg+xml;charset=utf-8, 前缀
          // const svgContent = dataUrl.replace(/^data:image\/svg\+xml;charset=utf-8,/, '');

          // // 清空页面内容，并插入 SVG
          // document.body.innerHTML = svgContent;
        })
        .catch(function (error) {
          console.error("Error while converting to SVG:", error);
        });
    },
    // 复制 SVG 内容到剪贴板
    copySVG() {
      if (this.svgContent) {
        // 使用 Clipboard API 将 SVG 内容复制到剪贴板
        navigator.clipboard
          .writeText(this.svgContent)
          .then(() => {
            // alert("SVG 内容已复制!");
            this.$message({
              showClose: true,
              message: "SVG 内容已复制",
              type: "success",
            });
          })
          .catch((error) => {
            console.error("复制失败:", error);
            this.$message({
              showClose: true,
              message: "复制失败，请重试",
              type: "error",
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "尚未生成svg",
          type: "warning",
        });
      }
    },

    // 下载 SVG 文件
    downloadSVG() {
      if (this.svgContent) {
        // 创建一个 Blob 对象，将 svgContent 转换为 Blob
        const blob = new Blob([this.svgContent], { type: "image/svg+xml" });

        // 创建下载链接
        const url = URL.createObjectURL(blob);

        // 创建一个虚拟的 <a> 标签
        const a = document.createElement("a");
        a.href = url;
        a.download = "badge.svg"; // 设置下载的文件名

        // 触发下载
        a.click();

        // 释放 URL 对象
        URL.revokeObjectURL(url);
      } else {
        alert("尚未生成 SVG");
      }
    },
    openLink() {
      this.convertToSVG();
      if (!this.link) {
        return false;
      }
      console.log(this.link);

      window.open(this.link, "_blank");
    },
    loadSvg() {
      fetch(`https://simpleicons.org/icons/${this.logo}.svg`)
        .then((response) => response.text())
        .then((svg) => {
          // 使用 DOMParser 解析 SVG 字符串为 DOM
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svg, "image/svg+xml");

          // 获取 SVG 元素
          const svgElement = svgDoc.querySelector("svg");

          // 设置 fill 属性为动态颜色
          svgElement.setAttribute("fill", this.logoColor);

          // 将修改后的 SVG 插入到页面中
          this.$refs.logoContainer.innerHTML = svgElement.outerHTML;
        })
        .catch((error) => console.error("Error loading SVG:", error)); // 捕获错误
    },
  },
};
</script>

<style scoped>
.logo-container {
  margin-right: 5px;
}
.badge {
  display: inline-flex;
  border-radius: 6px;
  overflow: hidden;
  font-family: Georgia, serif;
  font-size: 12px;
  font-weight: bold;
  line-height: 12px;
  text-align: center;
}

.badge-left {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: v-bind(leftColor);
  color: white;
  padding: 5px 8px;
}

.badge-right {
  background-color: v-bind(rightColor);
  color: white;
  padding: 5px 8px;
}
.cursor {
  cursor: pointer;
}
.right-text {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.form-container {
  /* width: 100vw; */
  /* height: 100vh; */
  display: flex;
  /* justify-items: center;
  align-items: center; */
}
</style>

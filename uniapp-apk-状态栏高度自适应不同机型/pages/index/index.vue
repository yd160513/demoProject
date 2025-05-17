<template>
  <view class="content">
    <web-view src="https://www.baidu.com/"></web-view>
  </view>
</template>

<script>
export default {
  methods: {
    getWebview() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // TODO: 可以设置成功
          const currentWebview = this.$scope.$getAppWebview();
          console.log(
            "currentWebview:",
            JSON.stringify(currentWebview, null, 2)
          );
          const webview = currentWebview.children()[0];
          console.log("子 WebView:", JSON.stringify(webview, null, 2)); // 调试输出
          // TODO: 可以获取到，但是不生效
          //   const currentWebview2 = plus.webview.currentWebview();
          //   console.log('当前 WebView:', JSON.stringify(currentWebview2, null, 2));
          // const wvArr = currentWebview2.children();
          // console.log('子 WebView:', JSON.stringify(wvArr, null, 2)); // 调试输出

          if (webview) {
            resolve(webview);
          } else {
            reject("获取webview失败");
          }
        }, 100);
      });
    },
    setWebviewTop(webview) {
      return new Promise((resolve, reject) => {
        const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
        console.log("statusBarHeight: ", statusBarHeight);
        const querys = uni.createSelectorQuery().in(this);

        querys
          .select(".content")
          .boundingClientRect((res) => {
            console.log("res:", res);
            if (res) {
              const height = res.height - statusBarHeight;
              // 设置 WebView 尺寸
              webview.setStyle({
                top: statusBarHeight,
              });

              resolve("设置成功");
            } else {
              reject("设置失败");
            }
          })
          .exec();
      });
    },
  },
  onReady() {
    // #ifdef APP-PLUS
    this.getWebview().then((webview) => {
      this.setWebviewTop(webview)
        .then(() => {
          console.log("设置成功");
        })
        .catch((err) => {
          console.log("设置失败: ", err);
        });
    });
    // #endif
  },
};
</script>

<style></style>

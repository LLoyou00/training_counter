module.exports = {
  // 跳过检查host
  devServer: { disableHostCheck: true },
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = "小兔子康复训练计时器";
      return args;
    });
  },
};

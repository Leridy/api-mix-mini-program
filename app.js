//app.js
import APP_CONFIG from "./config/config.js";
import { request } from "./utils/common.js"

if(APP_CONFIG.DEBUG_FLAG || APP_CONFIG.TEST_FLAG){
  console.log("%c此时是开发模式，在正式发布时需要更正 config/config.js 文件的相应字段的状态","color:red;font-size:20px");
}

App({
  onLaunch: function (options) {
    request({url:'https://www.leridy.pw',success:()=>{}})
  },
  globleData:{}
})

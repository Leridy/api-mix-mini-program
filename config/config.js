const SERVER_URL = "https://www.appserver.com"; // 此处填写你的正式服务器
const TEST_SERVER_URL = "https://test.appserver.com"; // 此处填写你的测试服务器
const TEST_FLAG = true; // 正式发布时需要改为 false

export default {
  APP_CONFIG: {
    NAME: '跨平台小程序',
    SERVER_URL: TEST_FLAG ? SERVER_URL : TEST_SERVER_URL,
  },
  DEBUG_FLAG: true, // 调试状态，正式发布时需改为 false
  TEST_FLAG: TEST_FLAG,
  IS_WECHAT: checkENV()
};

function checkENV (){  // 检查代码运行环境，通过检查运行环境中 wx 变量是否存
  let isWechat = false;
  try{
    isWechat  = (wx)?true:false;
  }catch(e){
    console.log(e);
  }
  return isWechat;
}

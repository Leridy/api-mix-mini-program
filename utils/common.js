import APP_CONFIG from '../config/config.js';
// import ERROR from '../utils/error.js';

const DEBUG_FLAG = APP_CONFIG.DEBUG_FLAG;
const IS_WECHAT = APP_CONFIG.IS_WECHAT;

const MAP = {
  login: 'getAuthCode',
  request: 'httpRequest',
  setNavigationBarTitle: 'setNavigationBar',
  setNavigationBarColor: 'setNavigationBar',
  requestPayment: 'tradePay',
};

export const callApi = (name, options, addtional) => {
  if (DEBUG_FLAG) {
    console.group(`调用了${name}`);
    console.log(
      `传入了参数${JSON.stringify(options)},${addtional ? addtional : ''}`);
    console.log(options);
  }
  
  if (typeof options === 'object') {
    const success = options.success;
    const fail = options.fail;
    const complete = options.complete;
    options.success = success ? (data) => {
      if (DEBUG_FLAG) {
        console.log(data);
        console.groupEnd();
      }
      success(data);
    } : null;
    
    options.fail = fail ? res => {
      if (DEBUG_FLAG) {
        console.groupEnd();
      }
      fail(res);
    } : null;
    
    options.complete = complete ? res => {
      if (DEBUG_FLAG) {
        console.groupEnd();
      }
      complete(res);
    } : null;
  }
  
  switch (name) {
    case 'login':
      options = login(options);
      break;
    case 'showActionSheet':
      options = showActionSheet(options);
      break;
    case 'showToast':
      options = showToast(options);
      break;
    case 'showLoading':
      options = showLoading(options);
      break;
    case 'request':
      options = request(options);
      break;
    case 'makePhoneCall':
      options = makePhoneCall(options);
      break;
    case 'previewImage':
      options = previewImage(options);
      break;
    case 'removeStorageSync':
      options = removeStorageSync(options);
      break;
    // case 'getSystemInfo':
    //   options = getSystemInfo(options);
    //   break;
    case 'requestPayment':
      options = requestPayment(options);
      break;
    case 'setStorageSync':
      return setStorageSync(options, addtional);
    case 'showModal':
      return showModal(options);
    case 'getStorageSync':
      return getStorageSync(options);
    // case 'getSystemInfoSync':
    //   return getSystemInfoSync(my.getSystemInfoSync());
    default:
      return 0;
  }
  
  if (IS_WECHAT) {
    wx[name](options);
  } else {
    let result = MAP[name];
    let apiName = result ? result : name;
    my[apiName](options);
  }
  
  console.groupEnd();
  return 0;
  
};

const paramsMap = (options, maps = {}) => {
  let params = {};
  
  for (let key in options) {
    let myKey = maps.hasOwnProperty(key) ? maps[key] : key;
    params[myKey] = options[key];
  }
  
  return params;
};

const login = options => {
  if (!IS_WECHAT) {
    options.scopes = 'auth_user';
  }
  return options;
};

const showActionSheet = options => IS_WECHAT ? options : paramsMap(options, {
  itemList: 'items',
});

const requestPayment = options => IS_WECHAT ? options : paramsMap(options, {
  alipay_trade_body: 'orderStr',
});

const request = options => IS_WECHAT ? options : paramsMap(options, {
  header: 'headers',
});

const makePhoneCall = options => IS_WECHAT ? options : paramsMap(options, {
  phoneNumber: 'number',
});

const removeStorageSync = options => IS_WECHAT ? options : { key: options };

const showLoading = options => IS_WECHAT ? options : paramsMap(options, {
  title: 'content',
});

const previewImage = options => {
  if (IS_WECHAT) {
    return options;
  } else {
    let params = paramsMap(options);
    let current = params.current;
    
    if (current) {
      current = options.urls.indexOf(current);
    }
    
    if (current === -1 || !current) {
      current = 0;
    }
    
    params.current = current;
    
    return params;
  }
};

const setStorageSync = (options, addtional) => {
  if (IS_WECHAT) {
    wx.setStorageSync(options, addtional);
  } else {
    my.setStorageSync(options);
  }
  console.groupEnd();
};

/**
 * wx模态弹窗不同的参数对应到支付宝confirm和alert API
 */
function showModal(options) {
  let params = paramsMap(options);
  let showCancel = params.showCancel;
  
  if (typeof showCancel === 'undefined') {
    showCancel = true;
  }
  
  if (!IS_WECHAT) {
    // 确认框
    if (showCancel) {
      params.confirmButtonText = params.confirmText;
      params.cancelButtonText = params.cancelText;
    } else {
      // 提醒框
      params.buttonText = params.confirmText;
    }
    
    my[showCancel ? 'confirm' : 'alert'](params);
  } else {
    wx.showModal(options);
  }
}

/**
 * 参数{icon: 'loading'} 无法成功映射，建议不要使用
 */
const showToast = options => {
  if (IS_WECHAT) {
    return options;
  } else {
    return paramsMap(options, {
      title: 'content',
      icon: 'type',
    });
  }
};

const getStorageSync = options => IS_WECHAT
  ? wx.getStorageSync(options)
  : my.getStorageSync({
    options,
  }).data;

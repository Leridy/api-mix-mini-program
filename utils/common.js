import APP_CONFIG from '../config/config.js';
import ERROR from '../utils/error.js';
import PARAM_VALIDATE from '../utils/param_validate.js'

const DEBUG_FLAG = APP_CONFIG.DEBUG_FLAG;
const IS_WECHAT = APP_CONFIG.IS_WECHAT;

export const validate = (obj, keys) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (keys.hasOwnProperty(key)) {
        if (typeof obj[key] !== keys[key])
          throw new Error(format(ERROR.INVALID_TYPE, [key, typeof obj[key], keys[key]]));
      } else {
        let errorStr = "未知的属性, " + key + ". 被验证的属性有:";
        for (var validKey in keys)
          if (keys.hasOwnProperty(validKey))
            errorStr = errorStr + " " + validKey;
        throw new Error(errorStr);
      }
    }
  }
};

export const format = (error, substitutions) => {
  let text = error.text;
  console.log(substitutions);
  if (substitutions) {
    let field;
    let start;
    for (let i = 0; i < substitutions.length; i++) {
      field = "{" + i + "}";
      start = text.indexOf(field);
      if (start > 0) {
        let part1 = text.substring(0, start);
        let part2 = text.substring(start + field.length);
        text = part1 + substitutions[i] + part2;
      }
    }
  }
  return text;
};

export const request = options => {

  validate(options, PARAM_VALIDATE.XCX_REQUEST);

  if (DEBUG_FLAG) {
    console.group('网络请求');
    console.time('网络请求耗时');
    console.log('传入了参数');
    console.log(options);
  }
  const success = options.success;
  const fail = options.fail;
  const complete = options.complete;
  options.success = success ? (data, statusCode, header) => {
    if (DEBUG_FLAG) {
      console.log('请求成功');
      console.log('请求到的信息')
      console.log(data)
      console.timeEnd('网络请求耗时');
      console.groupEnd('网络请求');
    };
    success(data, statusCode, header);
  } : null;

  options.fail = fail ? res => {
    if (DEBUG_FLAG) {
      console.log('请求失败');
      console.timeEnd('网络请求耗时');
      console.groupEnd('网络请求');
    };
    fail(res);
  } : null;

  options.complete = complete ? res => {
    if (DEBUG_FLAG) {
      console.log('请求完成');
      console.timeEnd('网络请求耗时');
      console.groupEnd('网络请求');
    }
    complete(res);
  } : null;

  if (IS_WECHAT) {
    wx.request(options);
  } else {
    options.headers = options.header;
    my.httpRequest(options);
  }
}

export const setStorage = options => {
  validate(options, PARAM_VALIDATE.XCX_SET_STORAGE);

  if (DEBUG_FLAG) {
    console.group('设置缓存');
    console.log('传入了参数');
    console.log(options);
  }

  const success = options.success;
  const fail = options.fail;
  const complete = options.complete;
  options.success = success ? (data) => {
    if (DEBUG_FLAG) {
      console.groupEnd('设置缓存');
    };
    success(data);
  } : null;

  options.fail = fail ? res => {
    if (DEBUG_FLAG) {
      console.groupEnd('设置缓存');
    };
    fail(res);
  } : null;

  options.complete = complete ? res => {
    if (DEBUG_FLAG) {
      console.groupEnd('设置缓存');
    }
    complete(res);
  } : null;

  if (IS_WECHAT) {
    wx.setStorage(options);
  } else {
    my.setStorage(options);
  }
}

export const setStorageSync = (key, data) => {

  if (DEBUG_FLAG) {
    console.group('同步设置缓存');
    console.log('传入了参数');
    console.log(options);
  }

  if (IS_WECHAT) {
    return wx.setStorageSync(key, data);
  } else {
    return my.setStorageSync(key, data);
  }

  console.group('同步设置缓存');
}

export const getStorage = options => {
  validate(options, PARAM_VALIDATE.XCX_GET_STORAGE);

  if (DEBUG_FLAG) {
    console.group('取出缓存');
    console.log('传入了参数');
    console.log(options);
  }

  const success = options.success;
  const fail = options.fail;
  const complete = options.complete;
  options.success = success ? (data) => {
    if (DEBUG_FLAG) {
      console.groupEnd('取出缓存');
    };
    success(data);
  } : null;

  options.fail = fail ? res => {
    if (DEBUG_FLAG) {
      console.groupEnd('取出缓存');
    };
    fail(res);
  } : null;

  options.complete = complete ? res => {
    if (DEBUG_FLAG) {
      console.groupEnd('取出缓存');
    }
    complete(res);
  } : null;

  if (IS_WECHAT) {
    wx.setStorage(options);
  } else {
    my.setStorage(options);
  }

}

export const getStorageSync = key => {
  if (DEBUG_FLAG) {
    console.group('同步取出缓存');
    console.log('传入了参数');
    console.log(key);
  }

  if (IS_WECHAT) {
    return wx.getStorage(key);
  } else {
    return my.getStorage(key);
  }
  console.groupEnd('同步取出缓存');
}

export const removeStorage = options => {
  validate(options, PARAM_VALIDATE.XCX_REMOVE_STORAGE);

  if (DEBUG_FLAG) {
    console.group('移除缓存');
    console.log('传入了参数');
    console.log(options);
  }

  const success = options.success;
  const fail = options.fail;
  const complete = options.complete;
  options.success = success ? (data) => {
    if (DEBUG_FLAG) {
      console.groupEnd('移除缓存');
    };
    success(data);
  } : null;

  options.fail = fail ? res => {
    if (DEBUG_FLAG) {
      console.groupEnd('移除缓存');
    };
    fail(res);
  } : null;

  options.complete = complete ? res => {
    if (DEBUG_FLAG) {
      console.groupEnd('移除缓存');
    }
    complete(res);
  } : null;

  if (IS_WECHAT) {
    wx.removeStorage(options);
  } else {
    my.removeStorage(options);
  }

}

export const removeStorageSync = key => {
  if (DEBUG_FLAG) {
    console.group('同步移除缓存');
    console.log('传入了参数');
    console.log(key);
  }

  if (IS_WECHAT) {
    wx.removeStorageSync(options);
  } else {
    my.removeStorageSync(options);
  }

  if (DEBUG_FLAG) console.groupEnd('同步移除缓存');
}

export const clearStorage = () => {
  if (DEBUG_FLAG) console.log('%c清空缓存', 'font-size:50px;color:blue');

  if (IS_WECHAT) {
    wx.clearStorage();
  } else {
    my.clearStorage();
  }
}

export const getStorageInfo = options => {
  validate(options, PARAM_VALIDATE.XCX_GET_STORAGE_INFO);

  if (DEBUG_FLAG) {
    console.group('获取全部缓存');
    console.log('传入了参数');
    console.log(options);
  }

  const success = options.success;
  const fail = options.fail;
  const complete = options.complete;
  options.success = success ? (data) => {
    if (DEBUG_FLAG) {
      console.log('获取到的数据是');
      console.log(data);
      console.groupEnd('获取全部缓存');
    };
    success(data);
  } : null;

  options.fail = fail ? res => {
    if (DEBUG_FLAG) {
      console.groupEnd('获取全部缓存');
    };
    fail(res);
  } : null;

  options.complete = complete ? res => {
    if (DEBUG_FLAG) {
      console.groupEnd('获取全部缓存');
    }
    complete(res);
  } : null;

  if (IS_WECHAT) {
    wx.getStorageInfo(options);
  } else {
    my.getStorageInfo(options);
  }

}

export const getStorageInfoSync = () => {
  if (DEBUG_FLAG) console.group('同步获取全部缓存');

  if (IS_WECHAT) {
    wx.getStorageInfo(options);
  } else {
    my.getStorageInfo(options);
  }

  if (DEBUG_FLAG) console.groupEnd('同步获取全部缓存');
}


export const ax = {
  request: request,
  setStorage: setStorage,
  setStorageSync: setStorageSync,
  getStorage: getStorage,
  getStorageSync: getStorageSync,
  getStorageInfo: getStorageInfo,
  getStorageInfoSync: getStorageInfoSync,
}

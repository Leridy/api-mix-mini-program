export default {
  XCX_REQUEST: {
    url: 'string',
    header: 'object',
    headers: 'object',
    method: 'string',
    success: 'function',
    fail: 'function',
    complete: 'function',
    dataType: 'string',
    data: 'string',
    timeout: 'number',
  },
  XCX_SET_STORAGE: {
    key: 'string',
    data: 'object',
    success: 'function',
    fail: 'function',
    complete: 'function',
  },
  XCX_SET_STORAGE_SYNC: {
    key: 'string',
    data: 'object',
  },
  XCX_REMOVE_STORAGE: {
    key: 'string',
    success: 'function',
    fail: 'functions',
    complete: 'function',
  },
  XCX_GET_STORAGE_INFO: {
    success: 'function',
    fail: 'function',
    complete: 'function',
  },
  

}

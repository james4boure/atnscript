/*
京东集魔方
===========================

cron:2 0,11 * * *
============Quantumultx===============
[task_local]
#集魔方
2 0,11 * * * jd_desire.js, tag=集魔方, enabled=true
 */

const $ = new Env('京东集魔方');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = true;//是否关闭通知，false打开通知推送，true关闭通知推送
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
let uuid
$.shareCodes = []
let hotInfo = {}
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      $.sku = []
      $.sku2 = []
      $.adv = []
      $.hot = false
      uuid = randomString(40)
      await jdMofang()
      hotInfo[$.UserName] = $.hot
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function jdMofang() {
  console.log(`\n集魔方 抽京豆 赢新品`)
  await getInteractionInfo()
}

//第二个
async function getInteractionInfo(type = true) {
  return new Promise(async (resolve) => {
    $.post(taskPostUrl("getInteractionInfo", {"geo":{"lng":"106.47647010204035","lat":"29.502312842810458"},"mcChannel":0,"sign":3}), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`getInteractionInfo API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data)
            // console.log(data.result.taskPoolInfo.taskList);
            if (type) {
              $.interactionId = data.result.interactionId
              $.taskPoolId = data.result.taskPoolInfo.taskPoolId
              for (let key of Object.keys(data.result.taskPoolInfo.taskList)) {
                let vo = data.result.taskPoolInfo.taskList[key]
                if (vo.taskStatus === 0) {
                  if (vo.taskId === 2004) {
                    await queryPanamaFloor()
                    for (let id of $.sku2) {
                      $.complete = false
                      await executeNewInteractionTask(vo.taskId, id)
                      await $.wait(2000)
                      if ($.complete) break
                    }
                  }
                  if (vo.taskId === 2002) {
                    await qryCompositeMaterials()
                    for (let id of $.sku) {
                      $.complete = false
                      await executeNewInteractionTask(vo.taskId, id)
                      await $.wait(2000)
                      if ($.complete) break
                    }
                  }
                  if (vo.taskId === 2006) {
                    await qryCompositeMaterials2()
                    for (let id2 of $.adv) {
                      $.complete = false
                      await executeNewInteractionTask(vo.taskId, id2)
                      await $.wait(2000)
                      if ($.complete) break
                    }
                  }
                } else {
                  console.log(`已找到当前魔方`)
                }
              }
              data = await getInteractionInfo(false)
              if (data.result.hasFinalLottery === 0) {
                let num = 0
                for (let key of Object.keys(data.result.taskPoolInfo.taskRecord)) {
                  let vo = data.result.taskPoolInfo.taskRecord[key]
                  num += vo
                }
                if (num >= 9) {
                  console.log(`共找到${num}个魔方，可开启礼盒`)
                  await getNewFinalLotteryInfo()
                } else {
                  console.log(`共找到${num}个魔方，不可开启礼盒`)
                }
              } else {
                console.log(`已开启礼盒`)
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data)
      }
    })
  })
}
function queryPanamaFloor() {
  return new Promise((resolve) => {
    $.post(taskPostUrl("qryCompositeMaterials", {"geo":{"lng":"106.47647010204035","lat":"29.502312842810458"},"mcChannel":0,"activityId":"01235772","pageId":"3620025","qryParam":"[{\"type\":\"advertGroup\",\"id\":\"06327486\",\"mapTo\":\"advData\",\"next\":[{\"type\":\"productGroup\",\"mapKey\":\"comment[0]\",\"mapTo\":\"productGroup\",\"attributes\":13}]}]","applyKey":"21new_products_h"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`queryPanamaFloor API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data)
            for (let skuVo of data.data.advData.list) {
				$.sku2 = ["100038312438","100022213851","100038312444","100038962384","100023274622", "100035222536", "10051584954296", "10052442367186"]
                $.sku2.push(skuVo.advertId)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data)
      }
    })
  })
}

function qryCompositeMaterials() {
  return new Promise((resolve) => {
	$.post(taskPostUrl("qryCompositeMaterials", {"geo":null,"mcChannel":0,"activityId":"01235772","pageId":"3620025","qryParam":"[{\"type\":\"advertGroup\",\"id\":\"06327486\",\"mapTo\":\"advData\",\"next\":[{\"type\":\"productGroup\",\"mapKey\":\"comment[0]\",\"mapTo\":\"productGroup\",\"attributes\":13}]}]","applyKey":"21new_products_h"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`qryCompositeMaterials API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data)
			//console.log(data)
            for (let key of Object.keys(data.data.advData.list)) {
              let vo = data.data.advData.list[key]
              if (vo.next && vo.next.productGroup) {
                for (let key of Object.keys(vo.next.productGroup.list)) {
                  let skuVo = vo.next.productGroup.list[key]
                  $.sku.push(skuVo.skuId)
                }
                break
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data)
      }
    })
  })
}

function qryCompositeMaterials2() {
  return new Promise((resolve) => {
    $.post(taskPostUrl("qryCompositeMaterials", {"geo":null,"mcChannel":0,"activityId":"01213138","pageId":"3513123","qryParam":"[{\"type\":\"advertGroup\",\"id\":\"06290597\",\"mapTo\":\"advData\",\"next\":[{\"type\":\"productGroup\",\"mapKey\":\"comment[0]\",\"mapTo\":\"productGroup\",\"attributes\":13}]}]","applyKey":"21new_products_h"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`qryCompositeMaterials API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data)
            //console.log(data);
            for (let key of Object.keys(data.data.advData.list)) {
              let vo = data.data.advData.list[key]
              $.adv.push(vo.advertId)
              // console.log($.adv);
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data)
      }
    })
  })
}
function executeNewInteractionTask(taskType, advertId) {
  body = { "geo": null, "mcChannel": 0, "sign": 3, "interactionId": $.interactionId, "taskPoolId": $.taskPoolId, "taskType": taskType, "advertId": advertId }
  if (taskType === 2002) {
    body = { "geo": null, "mcChannel": 0, "sign": 3, "interactionId": $.interactionId, "taskPoolId": $.taskPoolId, "taskType": taskType, "sku": advertId }
  }
  return new Promise((resolve) => {
    $.post(taskPostUrl("executeNewInteractionTask", body), (err, resp, data) => {
      // console.log(taskPostUrl("executeNewInteractionTask", body));
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} executeNewInteractionTask API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data)
            if (data.result.hasDown === 1) {
              console.log(data.result.isLottery === 1 ? `找到了一个魔方，获得${data.result.lotteryInfoList[0].quantity || ''}${data.result.lotteryInfoList[0].name}` : `找到了一个魔方`)
              $.complete = true
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data)
      }
    })
  })
}
function getNewFinalLotteryInfo() {
  return new Promise((resolve) => {
    $.post(taskPostUrl("getNewFinalLotteryInfo", { "geo": null, "mcChannel": 0, "sign": 3, "interactionId": $.interactionId }), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} getNewFinalLotteryInfo API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data)
            if (data.result.lotteryStatus === 1) {
              console.log(`开启礼盒成功：获得${data.result.lotteryInfoList[0].quantity}${data.result.lotteryInfoList[0].name}`)
            } else {
              console.log(`开启礼盒成功：${data.result.toast}`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data)
      }
    })
  })
}


function taskPostUrl(functionId, body = {}) {
  body = JSON.stringify(body)
  if (functionId === "queryPanamaPage") body = escape(body)
  return {
    url: `${JD_API_HOST}?functionId=${functionId}&body=${encodeURI((body))}&client=wh5&clientVersion=10.1.4&appid=content_ecology&uuid=${uuid}&t=${Date.now()}`,
    headers: {
      'Host': 'api.m.jd.com',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://prodev.m.jd.com',
      'Accept-Language': 'zh-cn',
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Referer': 'https://prodev.m.jd.com/mall/active/TqTRGRrp9HZTfeyRTL2UGmX4mHG/index.html?babelChannel=ttt30',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cookie': cookie
    }
  }
}


function taskSignUrl(url, body) {
  return {
    url,
    body: `body=${escape(body)}`,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': '',
      'User-Agent': 'JD4iPhone/167774 (iPhone; iOS 14.7.1; Scale/3.00)',
      'Accept-Language': 'zh-Hans-CN;q=1',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
}
function randomString(e) {
  let t = "abcdef0123456789"
  if (e === 16) t = "abcdefghijklmnopqrstuvwxyz0123456789"
  e = e || 32;
  let a = t.length, n = "";
  for (let i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
      headers: {
        Host: "wq.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        Cookie: cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-cn",
        "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 1001) {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data['retcode'] === 0 && data.data && data.data.hasOwnProperty("userInfo")) {
              $.nickName = data.data.userInfo.baseInfo.nickname;
            }
          } else {
            console.log('京东服务器返回空数据');
          }
        }
      } catch (e) {
        $.logErr(e)
      } finally {
        resolve();
      }
    })
  })
}
function showMsg() {
  return new Promise(resolve => {
    if (!jdNotify) {
      $.msg($.name, '', `${message}`);
    } else {
      $.log(`京东账号${$.index}${$.nickName}\n${message}`);
    }
    resolve()
  })
}
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}

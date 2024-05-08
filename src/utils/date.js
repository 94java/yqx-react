/**
 * @description 格式化时间
 * @param fmt 格式  如：yyyy-MM-dd、yyyy-MM-dd HH:mm:ss、yyyy年MM月dd日 W HH:mm:ss等
 * @param {String} date 时间戳
 * @returns {string|null}
 * 对 Date 的扩展，将 Date 转化为指定格式的 String ， 年(y)、月(M)、日(d)、24小时(H)、分(m)、秒(s)、周(W)、季度(q)、毫秒(S)。
 * 年(y) 可以用1-4个占位符，月(M)、日(d)、24小时(H)、分(m)、秒(s)、季度(q)可以用 1-2 个占位符，周(W)、毫秒(S)(是 1-3 位的数字) 只能用一个占位符。
 *
 * new Date() ==> Tue Apr 11 2023 09:43:51 GMT+0800 (中国标准时间)
 * dateFtt('yyyy-MM-dd', new Date()) ==> '2023-04-11'
 * dateFtt('yyyy-M-d', new Date()) ==> '2023-4-11'
 * dateFtt('yyyy-MM-dd HH:mm:ss', new Date()) ==> '2023-04-11 09:46:22'
 * dateFtt('yyyy-MM-dd W HH:mm:ss', new Date()) ==> '2023-04-11 星期二 09:48:33'
 * dateFtt('yyyy年MM月dd日 W HH:mm:ss', new Date()) ==> '2023年04月11日 星期二 09:49:51'
 * dateFtt('yyyy/MM/dd W HH:mm:ss', new Date()) ==> '2023/04/11 星期二 09:54:04'
 * dateFtt('yyyy-MM-dd W HH:mm:ss.S', new Date()) ==> '2023-04-11 星期二 10:03:38.543'
 */
export function dateFtt(fmt, date) {
  const o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "H+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    W: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][
      date.getDay()
    ], //星期
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  // 处理年份 正则 y+ 匹配一个或多个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

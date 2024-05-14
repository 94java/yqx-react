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

export const formatPast = (date, type = "default", zeroFillFlag = true) => {
  // 定义countTime变量，用于存储计算后的数据
  let countTime;
  // 获取当前时间戳
  let time = new Date().getTime();
  // 转换传入参数为时间戳
  let afferentTime = new Date(date).getTime();
  // 当前时间戳 - 传入时间戳
  time = Number.parseInt(`${time - afferentTime}`);
  let typeList = ["default", "-", "/", ".", "年月日", "月日", "年"];
  if (time < 0 || (typeof time === "number" && isNaN(time)) || !date) {
    // 时间参数存在问题 此处alert仅做错误示例，实际应用以场景需求为准
    return console.log(
      "请查看时间参数是否满足规则:\n1、时间参数为必填参数且为过去时间 \n2、时间参数不合法(参考date参数规则)"
    );
  } else if (
    (zeroFillFlag && typeof zeroFillFlag !== "boolean") ||
    (type && !typeList.includes(type))
  ) {
    // 补零参数或格式参数存在问题 此处alert仅做错误示例，实际应用以场景需求为准
    return console.log(
      "请查看补零参数/格式参数是否满足规则：\n1、补零参数为布尔值类型 \n2、格式参数不合法(参考type参数规则)"
    );
  } else if (time < 10000) {
    // 10秒内
    return "刚刚";
  } else if (time < 60000) {
    // 超过10秒少于1分钟内
    countTime = Math.floor(time / 1000);
    return `${countTime}秒前`;
  } else if (time < 3600000) {
    // 超过1分钟少于1小时
    countTime = Math.floor(time / 60000);
    return `${countTime}分钟前`;
  } else if (time < 86400000) {
    // 超过1小时少于24小时
    countTime = Math.floor(time / 3600000);
    return `${countTime}小时前`;
  } else if (time >= 86400000 && type == "default") {
    // 超过二十四小时（一天）且格式参数为默认"default"
    countTime = Math.floor(time / 86400000);
    //大于等于365天
    if (countTime >= 365) {
      return `${Math.floor(countTime / 365)}年前`;
    }
    //大于等于30天
    if (countTime >= 30) {
      return `${Math.floor(countTime / 30)}个月前`;
    }
    return `${countTime}天前`;
  } else {
    // 一天（24小时）以上且格式不为"default"则按传入格式参数显示不同格式
    // 数字补零
    let Y = new Date(date).getFullYear();
    let M = new Date(date).getMonth() + 1;
    let zeroFillM = M > 9 ? M : "0" + M;
    let D = new Date(date).getDate();
    let zeroFillD = D > 9 ? D : "0" + D;
    // 传入格式为"-" "/" "."
    if (type == "-" || type == "/" || type == ".") {
      return zeroFillFlag
        ? Y + type + zeroFillM + type + zeroFillD
        : Y + type + M + type + D;
    }
    // 传入格式为"年月日"
    if (type == "年月日") {
      return zeroFillFlag
        ? Y + type[0] + zeroFillM + type[1] + zeroFillD + type[2]
        : Y + type[0] + M + type[1] + D + type[2];
    }
    // 传入格式为"月日"
    if (type == "月日") {
      return zeroFillFlag
        ? zeroFillM + type[0] + zeroFillD + type[1]
        : M + type[0] + D + type[1];
    }
    // 传入格式为"年"
    if (type == "年") {
      return Y + type;
    }
  }
};

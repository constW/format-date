import moment from 'moment';
moment.locale('zh-CN');
export const OPTIONS = [
  { title: '前5分钟', step: 5, unit: 'm', functionName: 'getSubtractDuration' },
  { title: '前15分钟', step: 15, unit: 'm', functionName: 'getSubtractDuration' },
  { title: '前30分钟', step: 30, unit: 'm', functionName: 'getSubtractDuration' },
  { title: '前60分钟', step: 60, unit: 'm', functionName: 'getSubtractDuration' },
  { title: '前3小时', step: 3, unit: 'h', functionName: 'getSubtractDuration' },
  { title: '前4小时', step: 4, unit: 'h', functionName: 'getSubtractDuration' },
  { title: '前6小时', step: 6, unit: 'h', functionName: 'getSubtractDuration' },
  { title: '前12小时', step: 12, unit: 'h', functionName: 'getSubtractDuration' },
  { title: '前24小时', step: 24, unit: 'h', functionName: 'getSubtractDuration' },
  { title: '过去3天', step: 3, unit: 'd', functionName: 'getSubtractDuration' },
  { title: '过去7天', step: 7, unit: 'd', functionName: 'getSubtractDuration' },
  { title: '过去30天', step: 30, unit: 'd', functionName: 'getSubtractDuration' },
  { title: '本年度', step: 0, unit: '', functionName: '' },
  { title: '昨天', step: -1, unit: '', functionName: 'getDayDuration' },
  { title: '前天', step: -2, unit: '', functionName: 'getDayDuration' },
  { title: '上周', step: 1, unit: '', functionName: 'getWeekDuration' },
  { title: '上月', step: 1, unit: '', functionName: 'getMonthDuration' },
  { title: '上季度', step: 1, unit: '', functionName: 'getQuarterDuration' },
  { title: '上年度', step: 1, unit: '', functionName: 'getYearDuration' }
];
/**
 * 当前时间的以前的时间
 * @param {*} time:number;
 * @param {*} unit:string;
 * 第一个参数表示减的数值
 * 第二个参数表示减的单位，单位m代表分钟，还有其他选项：年-y，季-Q，月-M，周-w，天-d，时-h，分-m，秒-s，毫秒-ms
 * return Time Array
 */
export const getSubtractDuration = (time, unit) => {
  if (time && unit) {
    const endTime = moment(moment().format('YYYY-MM-DD HH:mm:ss')).valueOf();
    let startTime;
    if (unit == 'd' || unit == 'h' || unit == 'm' || unit == 's' || unit == 'ms') {
      startTime = moment(moment().subtract(time, unit).format('YYYY-MM-DD HH:mm:ss')).valueOf();
    } else {
      startTime = moment(moment().subtract(time, unit).format('YYYY-MM-DD 00:00:00')).valueOf();
    }
    return [startTime, endTime];
  }
  return [];
};
/**
 * 昨天 前天 大前天
 * @param {*} time:number
 */
export const getDayDuration = (time, unit) => {
  const startTime = moment(moment(moment(new Date()).add(time, 'days')).format('YYYY-MM-DD 00:00:00')).valueOf();
  const endTime = moment(moment(moment(new Date()).add(time, 'days')).format('YYYY-MM-DD 21:59:59')).valueOf();
  return [startTime, endTime];
};
/**
 * 当前时间几周之前的时间
 * @param {*} time:number
 * return Time Array
 */
export const getWeekDuration = (time) => {
  if (time) {
    const startTime = moment().week(moment().week() - time).startOf('week').valueOf();
    const endTime = moment().week(moment().week() - time).endOf('week').valueOf();
    return [startTime, endTime];
  }
  return [];
};
/**
 * 当前时间几月之前的时间
 * @param {*} time:number;
 * return Time Array
 */
export const getMonthDuration = (time) => {
  if (time) {
    const startTime = moment().month(moment().month() - time).startOf('month').valueOf();
    const endTime = moment().month(moment().month() - time).endOf('month').valueOf();
    return [startTime, endTime];
  }
  return [];
};
/**
 * 当前时间几季度之前的时间
 * @param {*} time:number;
 * return Time Array
 */
export const getQuarterDuration = (time) => {
  if (time) {
    const startTime = moment().quarter(moment().quarter() - time).startOf('quarter').valueOf();
    const endTime = moment().quarter(moment().quarter() - time).endOf('quarter').valueOf();
    return [startTime, endTime];
  }
  return [];
};
/**
 * 当前时间几年之前的时间
 * @param {*} isToday:Boolean;
 * @param {*} time:number;
 * return Time Array
 */
export const getYearDuration = (time) => {
  const startTime = moment().year(moment().year() - time).startOf('year').valueOf();
  const endTime = moment().year(moment().year() - time).endOf('year').valueOf();
  return [startTime, endTime];
};
// 自定义时间
export const getCustom = time => {
  console.log(time);
  if (time && time.length) {
    return [moment(time[0]).valueOf(), moment(time[1]).valueOf()];
  } else {
    return null;
  }
};
export const formatTime = () => {
  OPTIONS.map(o => {
    if (o.title === '本年度') {
      o.duration = [moment().year(moment().year() - 0).startOf('year').valueOf(), moment(new Date()).valueOf()];
    } else {
      if (!o.unit) {
        o.duration = eval(o.functionName + '(o.step)');
      } else {
        o.duration = eval(o.functionName + '(o.step, o.unit)');
      }
    }
    return o;
  });
  return OPTIONS;
};
export const getDuration = (p) => {
  const emp = OPTIONS.find(d => d.title === p);
  let duration;
  if (emp) {
    if (p === '本年度') {
      duration = [moment().year(moment().year() - 0).startOf('year').valueOf(), moment(new Date()).valueOf()];
    } else {
      if (!emp.unit) {
        duration = eval(emp.functionName + '(emp.step)');
      } else {
        duration = eval(emp.functionName + '(emp.step, emp.unit)');
      }
    }
    return duration;
  }
}
export const getMR = () => {
  return OPTIONS.find(o => o.title === '本年度').duration;
};
export const getS = title => {
  return OPTIONS.find(o => o.title === title);
};

export function addMonthsToDate(inputDate: string, monthsToAdd: number) {
  if (!inputDate) return '';
  const date = new Date(inputDate);

  // 获取当前日期的月份
  const currentMonth = date.getMonth();

  // 累加月份
  date.setMonth(currentMonth + monthsToAdd);

  // 输出累加后的日期
  return date.toISOString().slice(0, 10);
}

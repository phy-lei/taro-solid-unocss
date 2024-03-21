export function encryptPhone(phone: string) {
  // 验证输入是否为11位数字（中国大陆手机号码格式）
  if (!/^\d{11}$/.test(phone)) {
    return;
  }

  // 获取手机号前3位和后4位
  const prefix = phone.slice(0, 3);
  const suffix = phone.slice(-4);

  // 中间4位用星号替换
  const encryptedMiddleDigits = '****';

  // 拼接加密后的手机号
  const encryptedPhone = `${prefix}${encryptedMiddleDigits}${suffix}`;

  return encryptedPhone;
}

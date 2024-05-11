function getIPv4Address(ip) {
  // 检查 IP 地址是否是 IPv6 映射的 IPv4 地址
  if (ip.startsWith('::ffff:')) {
    // 移除前缀并返回 IPv4 地址
    return ip.split('::ffff:')[1];
  }
  // 如果已经是 IPv4 地址，直接返回
  return ip;
}

module.exports = getIPv4Address
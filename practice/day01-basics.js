const deviceName = '1号配电设备'
const deviceId = 'A-001'
let status = '运行中'

console.log(deviceName)
console.log(deviceId)
console.log(status)

let alertNumbers = 3
let processedAlerts = 2

console.log(`未处理告警数: ${alertNumbers - processedAlerts}`)
const deviceManager = [
    {name:'1号配电设备',code:'A-001',status:'运行中',energy:85,alarmCount:1},
    {name:'2号配电设备',code:'A-002',status:'离线',energy:90,alarmCount:0},
    {name:'3号配电设备',code:'A-003',status:'告警中',energy:75,alarmCount:2},
    {name:'4号配电设备',code:'A-004',status:'离线',energy:80,alarmCount:0},
    {name:'5号配电设备',code:'A-005',status:'运行中',energy:95,alarmCount:0}
]

console.log(deviceManager);

console.log('设备总数：',deviceManager.length);

function printDeviceList(devices){
    for(let i=0;i<devices.length;i++){
    console.log(`设备名称：${devices[i].name}`,`设备状态：${devices[i].status}`);
}
}
function getOfflineDevices(devices){
    for(let device of devices){
        if(device.status === '离线'){
            console.log(device);
        }
}
}
function getTotalEnergy(devices){
    let totalEnergy = 0;
for(let device of devices){
    totalEnergy+=device.energy;
}
console.log('总能耗：',totalEnergy);
}
function getTotalAlarmCount(devices){
    let totalAlarmCount = 0;
for(let device of devices){
    totalAlarmCount+=device.alarmCount;
}
console.log('总告警数：',totalAlarmCount);
}

printDeviceList(deviceManager);
getOfflineDevices(deviceManager);
getTotalEnergy(deviceManager);
getTotalAlarmCount(deviceManager);

let alarmDevices = deviceManager.filter(item => item.status === '告警中');
console.log('告警设备：',alarmDevices);
deviceManager.map(item => item.name).forEach(item => console.log('设备名称：',item));
console.log(`总能耗：${deviceManager.reduce((sum,current) => sum + current.energy,0)}`);
console.log(`在线设备数量：${deviceManager.reduce((sum,current) => current.status === '运行中' ? sum +1 : sum,0)}`);

const {name,status,energy} = deviceManager[0];
console.log('设备名称：',name);
console.log('设备状态：',status);
console.log(`设备能耗： ${energy} Kwh`);

function getDevices(devices){
    return Promise.resolve(devices);
}
async function getDeviceCount(devices){
    const result = await getDevices(devices);
    console.log('设备数量：',result.length);
}
getDeviceCount(deviceManager);
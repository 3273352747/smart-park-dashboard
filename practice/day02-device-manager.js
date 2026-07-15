let deviceManager = [
    {name:'1号配电设备',code:'A-001',status:'运行中',energy:85,alarmCount:1},
    {name:'2号配电设备',code:'A-002',status:'离线',energy:90,alarmCount:0},
    {name:'3号配电设备',code:'A-003',status:'告警中',energy:75,alarmCount:2},
    {name:'4号配电设备',code:'A-004',status:'离线',energy:80,alarmCount:0},
    {name:'5号配电设备',code:'A-005',status:'运行中',energy:95,alarmCount:0}
]

// function printDeviceList(){
//     for (let i=0; i< deviceManager.length; i++){ 
//         console.log(`设备名称:${deviceManager[i].name}`,`状态:${deviceManager[i].status}`);
//     } 
// }

// function getOfflineDevices(){
//     for(let device of deviceManager){
//     if(device.status === '离线'){
//         console.log(`离线设备名称：${device.name}`);
// }
// }
// }

// function getTotalEnergy(){
//     let totalEnergy = 0;
//     for(let device of deviceManager){
//    totalEnergy+=device.energy;
//     }
// console.log(`能耗总和: ${totalEnergy}`);
// }

// function getTotalAlarmCount(){
//     let totalAlarmCount = 0;
// for(let device of deviceManager){
//    totalAlarmCount+=device.alarmCount;
//     }
// console.log(`告警总数: ${totalAlarmCount}`);
// }

// printDeviceList();
// getOfflineDevices();
// getTotalEnergy();
// getTotalAlarmCount();

// deviceManager.filter(item => item.status === '告警中').forEach(item => console.log('告警设备名称:', item.name));//所有告警中的设备

// let device = deviceManager.map(item => item.name);
// console.log('设备名称:', device);//只包含设备名称的数组
// console.log('设备名称:',deviceManager.map(item => item.name));//合并写法

// let totalEnergy = deviceManager.reduce((sum,current) => sum + current.energy,0);
// console.log('能耗总和:', totalEnergy);//能耗总和
// console.log('能耗总和:',deviceManager.reduce((sum,current) => sum + current.energy,0));//合并写法

// let onlineDevice = deviceManager.reduce((sum,current) => current.status === '运行中' ? sum +1 : sum,0);
// console.log('在线设备数量:', onlineDevice);//在线设备数量
// console.log('在线设备数量:',deviceManager.reduce((sum,current) => current.status === '运行中' ? sum +1 : sum,0));//合并写法

const {name,status,energy} = deviceManager[0];
console.log('设备:',name);
console.log('状态:',status);
console.log(`当前能耗: ${energy} Kwh`);
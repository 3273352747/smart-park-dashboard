import { deviceManager } from "../data/devices"

export function getDeviceRecords(shouldFail = false){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(shouldFail){
                reject(new Error('模拟网络请求失败'))
                return
            }
            resolve([...deviceManager])
        },800)
    })
}
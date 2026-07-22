import { deviceManager } from "../data/devices"

export function getDeviceRecords(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...deviceManager])
        },800)
    })
}
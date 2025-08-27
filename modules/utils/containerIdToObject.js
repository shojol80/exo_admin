import xeditIdToObject from "./xeditIdToObject";

export default function containerIdToObject(containerId) {
    if (!containerId) return {}
    containerId = containerId.split('@@')[0]
    return xeditIdToObject(containerId)
}
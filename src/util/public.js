// 格式化 字节数值 到K,M,G
export function formatCnFlowByte(size, pointLength, isUnit) {
    let unit
    const units = ['B', 'K', 'M', 'G', 'TB']
    let count = 1
    while ((unit = units.shift()) && size > 1024) {
        if (count < 5) {
            size = size / 1024
            count += 1
        } else {
            break
        }
    }
    var num = isUnit ? (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) : (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength))
    // return isUnit ? (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) : (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit
    return Math.round(num) + unit
}
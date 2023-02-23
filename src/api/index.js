import request from "@/util/request";
const pre = "/sys/"
const ur = '/agr/';
// 获取访问令牌
export function authtoken(data) {
    return request({
        url: `${pre}v1/auth/token`,
        method: 'post',
        data
    });
}
// 获取机构树
export function orgslisttree(params) {
    return request({
        url: `${pre}v1/orgs/listtree`,
        method: 'get',
        params
    });
}
// 获取机构信息
export function getorgpowers(params) {
    return request({
        url: `${pre}v1/orgs/by/${params}`,
        method: 'get',
        // params
    });
}
// /v1/orgpowers/{jgdm}


// /v1/orgs/by/{jgdm}
// 获取机构信息









// 获取视频摄像机
export function videocameras(params) {
    return request({
        url: `${ur}v1/videocameras`,
        method: 'get',
        params
    });
}
// 获取用户设备信息
export function listbyuser(params) {
    return request({
        url: `${ur}v1/devices/listby/user`,
        method: 'get',
        params
    });
}
// 获取工作记录
export function works(params) {
    return request({
        url: `${ur}v1/works`,
        method: 'get',
        params
    });
}
// 获取最新的工作记录
export function deviceslatest(params) {
    return request({
        url: `${ur}v1/devices/status/latest`,
        method: 'get',
        params
    });
}
// 获取机构信息
export function orgsby(params) {
    return request({
        url: `${pre}v1/orgs/by/${params}`,
        method: 'get',
        // params
    });
}
// 获取新闻资讯
export function getnewsinfos(params) {
    return request({
        url: `${pre}v1/newsinfos`,
        method: 'get',
        params
    });
}
export function dashboarddevice(params) {
    return request({
        url: `${ur}v1/dashboard/device`,
        method: 'get',
        params
    });
}
export function extapiheweather(params) {
    return request({
        url: `${pre}v1/extapi/baiduweather?location=${params}`,
        method: 'get',
        // params
    });
}
export function extapidomainip(params) {
    return request({
        url: `${pre}v1/extapi/domainip?domain=${params}`,
        method: 'get',
        // params
    });
}
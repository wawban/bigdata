<template>
  <div class="preview">
    <h4>视频监控</h4>
    <div class="box">
      <div class="left">
        <div id="divPlugin" class="divPlugin"></div>
        <div class="huidiaoxxi">
          <div class="ssjiansju">
            <div class="text">事件回调信息</div>
            <ul class="ul">
              <li v-for="(item, index) in jisben" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
        <!-- <div id="divPlugin" class="divPlugin"></div> -->
      </div>
      <div class="box_right">
        <div class="heider">
          <Form ref="form" :model="cxdata" :label-width="90">
            <Row>
              <FormItem label="设备类型">
                <Select v-width="120" label-in-value v-model="cxdata.ylzl">
                  <Option value="1" label="录像机"></Option>
                  <Option value="2" label="摄像机"></Option>
                </Select>
              </FormItem>
              <FormItem label="所属机构">
                <TreeSelect
                  v-width="160"
                  v-model="cxdata.jgdm"
                  :data="menuList"
                />
              </FormItem>
              <FormItem :label-width="10">
                <Button type="primary" @click="v1users">查询</Button>
              </FormItem>
              <FormItem :label-width="10">
                <Button type="" @click="clickFullScreen">全屏</Button>
              </FormItem>
            </Row>
          </Form>
        </div>
        <!-- <div v-if="lujflag && cxdata.ylzl == 1"> -->
        <div v-if="lujflag">
          <!-- <div> -->
          <Form :label-width="90">
            <Row>
              <FormItem :label-width="90" label="窗口分割数">
                <Select
                  v-width="120"
                  label-in-value
                  v-model="lugin.iWndowType"
                  @on-change="cxdata.ylzl == 2 ? sxjfunc(1) : lxjfunc(2)"
                >
                  <Option :value="1" label="1x1"></Option>
                  <Option :value="2" label="2x2"></Option>
                  <Option :value="3" label="3x3"></Option>
                  <Option :value="4" label="4x4"></Option>
                </Select>
              </FormItem>
              <FormItem
                :label-width="90"
                label="录像机"
                v-if="datalist.length != 0 && cxdata.ylzl == 1"
              >
                <Select
                  v-width="100"
                  label-in-value
                  v-model="lxjid"
                  @on-change="lxjilog"
                >
                  <Option
                    v-for="(item, index) in datalist"
                    :key="index"
                    :value="item.id"
                    :label="item.sbmc"
                  ></Option>
                </Select>
              </FormItem>
              <!-- <FormItem v-if="tatol > 1" :label-width="90" label="分组"> -->
              <FormItem :label-width="90" label="分组">
                <Select
                  v-width="100"
                  label-in-value
                  v-model="daqds"
                  @on-change="
                    cxdata.ylzl == 2 ? xhuandl(daqds - 1) : wothzl(daqds - 1)
                  "
                >
                  <Option
                    v-for="(item, index) in tatol"
                    :key="index"
                    :value="item"
                    :label="item + '组'"
                  ></Option>
                </Select>
              </FormItem>
            </Row>
          </Form>
          <div class="sjiansju">
            <div class="text">云台控制</div>
            <div class="yuntai">
              <div>
                <div>
                  <span
                    @mousedown="mouseDownPTZControl(5)"
                    @mouseup="mouseUpPTZControl()"
                    >左上</span
                  >
                  <span
                    @mousedown="mouseDownPTZControl(1)"
                    @mouseup="mouseUpPTZControl()"
                    >上</span
                  >
                  <span
                    @mousedown="mouseDownPTZControl(7)"
                    @mouseup="mouseUpPTZControl()"
                    >右上</span
                  >
                </div>
                <div>
                  <span
                    @mousedown="mouseDownPTZControl(3)"
                    @mouseup="mouseUpPTZControl()"
                    >左</span
                  >
                  <span
                    @mousedown="mouseDownPTZControl(9)"
                    @mouseup="mouseUpPTZControl()"
                    >自动</span
                  >
                  <span
                    @mousedown="mouseDownPTZControl(4)"
                    @mouseup="mouseUpPTZControl()"
                    >右</span
                  >
                </div>
                <div>
                  <span
                    @mousedown="mouseDownPTZControl(6)"
                    @mouseup="mouseUpPTZControl()"
                    >左下</span
                  >
                  <span
                    @mousedown="mouseDownPTZControl(2)"
                    @mouseup="mouseUpPTZControl()"
                    >下</span
                  >
                  <span
                    @mousedown="mouseDownPTZControl(8)"
                    @mouseup="mouseUpPTZControl()"
                    >右下</span
                  >
                </div>
              </div>
              <!-- <div style="margin-left: 60px; margin-right: 30px"> -->
              <div>
                <div>
                  <div>
                    <p>云台速度</p>
                    <Select v-width="100" label-in-value v-model="ptzspeed">
                      <Option
                        v-for="(item, index) in 8"
                        :key="index"
                        :value="item"
                        :label="item"
                      ></Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <div>
                    <p>预置点号</p>
                    <Input v-width="100" v-model="preset" />
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <Button @click="clickSetPreset">设置</Button>
                  <Button @click="clickGoPreset">调用</Button>
                </div>
              </div>
              <div class="rightflex">
                <div>
                  <span @mousedown="PTZZoomIn" @mouseup="PTZZoomStop"
                    >变倍+</span
                  >
                  <span @mousedown="PTZZoomout" @mouseup="PTZZoomStop"
                    >变倍-</span
                  >
                </div>
                <div>
                  <span @mousedown="PTZFocusIn" @mouseup="PTZFoucusStop"
                    >变焦+</span
                  >
                  <span @mousedown="PTZFoucusOut" @mouseup="PTZFoucusStop"
                    >变焦-</span
                  >
                </div>
                <div>
                  <span @mousedown="PTZIrisIn" @mouseup="PTZIrisStop"
                    >光圈+</span
                  >
                  <span @mousedown="PTZIrisOut" @mouseup="PTZIrisStop"
                    >光圈-</span
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- ------------------------------------------------------------------------------------------------------------ -->
          <!-- <div class="sjiansju">
            <div class="text">视频回放</div>
            <div class="sphuifang">
              <Form :label-width="70">
                <Row>
                  <FormItem label="开始时间">
                    <DatePicker
                      v-width="180"
                      v-model="userInfo.kssj"
                      type="datetime"
                      placeholder="请选择开始时间"
                      element-id="yxkssj"
                    />
                  </FormItem>
                  <FormItem label="结束时间">
                    <DatePicker
                      :options="options"
                      v-width="180"
                      v-model="userInfo.jssj"
                      type="datetime"
                      placeholder="请选择开始时间"
                      element-id="yxkssj"
                    />
                  </FormItem>
                  <FormItem :label-width="30">
                    <Button type="primary" @click="clickRecordSearch(0)"
                      >查询</Button
                    >
                  </FormItem>
                </Row>
              </Form>
              <div class="chaxunsp">
                <ul>
                  <li v-for="(itr, index) in ckoulist" :key="index">
                    {{ itr.a }}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {{ itr.b }}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {{ itr.c }}
                  </li>
                </ul>
              </div>
              <div style="margin-top: 10px; text-align: right">
                <Button type="primary" @click="clickStartPlayback"
                  >开始回放</Button
                >
                <Button @click="clickStopPlayback">停止回放</Button>
              </div>
            </div>
          </div> -->
          <!-- --------------------------------------------------------------------------------------------------------------- -->
          <!-- <div class="lijing">
            <p>预览抓图保存路径：</p>
            <Input v-model="ztlj" />&nbsp;<Button @click="clickOpenFileDlg(0)"
              >浏览</Button
            >
          </div> -->
          <!-- ------------------------------------------------------------------------------------------------------------- -->
          <!-- <div class="lijing">
            <p>录像文件保存路径：</p>
            <Input v-model="lijun" />&nbsp;<Button @click="clickOpenFileDlg(0)"
              >浏览</Button
            >
          </div>
          <div style="margin-top: 10px; text-align: right">
            <Button type="primary" @click="clickStartRecord">开始录像</Button>
            <Button @click="clickStopRecord">停止录像</Button>
          </div> -->
          <!-- ----------------------------------------------------------------------------------------------------------------- -->
        </div>
        <div>
          <a :href="urlhref" download="">监控插件下载</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { orgslisttree, videocameras, extapidomainip } from "@/api";
export default {
  data() {
    return {
      ckoulist: [],
      urlhref: "",
      ztlj: "",
      options: {
        disabledDate(date) {
          var a = new Date(date).getTime() - 24 * 60 * 60 * 1000;
          return date && a.valueOf() > Date.now() - 86400000;
        },
      },
      userInfo: {
        kssj: "",
        jssj: "",
      },
      menuList: [],
      cxdata: {
        jgdm: "",
        ylzl: "",
      },
      datalist: [],
      lugin: {
        // w: "98%",
        w: 1150,
        h: 727,
        iWndowType: 3,
        bUndFull: false,
      },
      tatol: null,
      arrdata: [],
      daqds: 1,
      lxjid: "",
      mntd: null,
      numbertd: [],
      indexck: 0,
      jisben: [],
      lijun: "",
      lujflag: false,
      ptzspeed: 1,
      g_bPTZAuto: false,
      preset: 1,
    };
  },
  created() {
    var xy = window.location.protocol; //获取协议
    var zj = window.location.host; //获取主机
    var baseUrl = xy + "//" + zj; // 完整地址
    // const baseUrl = "http://129.28.151.167:8888";
    this.urlhref = baseUrl + "/resource/WebComponents.exe";
  },
  mounted() {
    // alert(WebVideoCtrl);
    if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
      return this.$Message.error("您还未安装过插件");
    }
    this.orgslisttree();
    // this.initPlugin();
  },

  methods: {
    // 停止录像
    clickStopRecord() {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck),
        szInfo = "";

      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_StopRecord();
        var _this = this;
        if (0 == iRet) {
          // szInfo = "停止录像成功！";
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              "停止录像成功！"
          );
        } else {
          // szInfo = "停止录像失败！";
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              "停止录像失败！"
          );
        }
        // showOPInfo(oWndInfo.szIP + " " + szInfo);
      }
    },
    // 开始录像indexck
    clickStartRecord() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck),
        szInfo = "";

      if (oWndInfo != null) {
        // var szChannelID = $("#channels").val(),
        var szChannelID =
            this.arrdata[this.tatol ? this.tatol - 1 : 0][_this.indexck].id,
          szFileName =
            oWndInfo.szIP + "_" + szChannelID + "_" + new Date().getTime(),
          iRet = WebVideoCtrl.I_StartRecord(szFileName);
        var _this = this;
        if (0 == iRet) {
          // szInfo = "开始录像成功！";
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              "开始录像成功！"
          );
        } else {
          // szInfo = "开始录像失败！";
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              "开始录像失败！"
          );
        }
        // showOPInfo(oWndInfo.szIP + " " + szInfo);
      }
    },
    // 停止回放
    clickStopPlayback() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck),
        szInfo = "";
      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_Stop();
        if (0 == iRet) {
          // szInfo = "停止回放成功！";
          _this.lxjilog();
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              "停止回放成功！"
          );
        } else {
          // szInfo = "停止回放失败！";
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              "停止回放失败！"
          );
        }
      }
    },
    clickStartPlayback() {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.indexck);
      if (oWndInfo != null) {
        // 已经在播放了，先停止
        WebVideoCtrl.I_Stop();
      }
      // szIP = $("#ip").val(),
      // szIP = this.arrdata[this.tatol ? this.tatol - 1 : 0][this.indexck].ip,
      var szIP = this.ckoulist[0].ip,
        iChannelID = this.ckoulist[0].id,
        // ckoulist
        // bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
        // iChannelID = $("#channels").val(),
        // iChannelID =
        //   this.arrdata[this.tatol ? this.tatol - 1 : 0][this.indexck].id,
        // szStartTime = $("#starttime").val(),
        // szEndTime = $("#endtime").val(),
        szStartTime = this.$Date(new Date(this.userInfo.kssj)).format(),
        szEndTime = this.$Date(new Date(this.userInfo.jssj)).format(),
        // szInfo = "",
        // bChecked = $("#transstream").prop("checked"),
        iRet = -1;
      // var oTransCodeParam = {
      //   TransFrameRate: "16", // 0：全帧率，5：1，6：2，7：4，8：6，9：8，10：10，11：12，12：16，14：15，15：18，13：20，16：22
      //   TransResolution: "2", // 255：Auto，3：4CIF，2：QCIF，1：CIF
      //   TransBitrate: "23", // 2：32K，3：48K，4：64K，5：80K，6：96K，7：128K，8：160K，9：192K，10：224K，11：256K，12：320K，13：384K，14：448K，15：512K，16：640K，17：768K，18：896K，19：1024K，20：1280K，21：1536K，22：1792K，23：2048K，24：3072K，25：4096K，26：8192K
      // };
      iRet = WebVideoCtrl.I_StartPlayback(szIP, {
        iChannelID: iChannelID,
        szStartTime: szStartTime,
        szEndTime: szEndTime,
        // oTransCodeParam: oTransCodeParam,
      });

      // if ("" == szIP) {
      // 	return;
      // }

      // if (bZeroChannel) {// 零通道不支持回放
      // 	return;
      // }

      // if (oWndInfo != null) {
      // 已经在播放了，先停止
      // WebVideoCtrl.I_Stop();
      // }

      // if (bChecked) {// 启用转码回放
      // 	var oTransCodeParam = {
      // 		TransFrameRate: "16",// 0：全帧率，5：1，6：2，7：4，8：6，9：8，10：10，11：12，12：16，14：15，15：18，13：20，16：22
      // 		TransResolution: "2",// 255：Auto，3：4CIF，2：QCIF，1：CIF
      // 		TransBitrate: "23"// 2：32K，3：48K，4：64K，5：80K，6：96K，7：128K，8：160K，9：192K，10：224K，11：256K，12：320K，13：384K，14：448K，15：512K，16：640K，17：768K，18：896K，19：1024K，20：1280K，21：1536K，22：1792K，23：2048K，24：3072K，25：4096K，26：8192K
      // 	};
      // 	iRet = WebVideoCtrl.I_StartPlayback(szIP, {
      // 		iChannelID: iChannelID,
      // 		szStartTime: szStartTime,
      // 		szEndTime: szEndTime,
      // 		oTransCodeParam: oTransCodeParam
      // 	});
      // } else {
      // iRet = WebVideoCtrl.I_StartPlayback(szIP, {
      //   iChannelID: iChannelID,
      //   szStartTime: szStartTime,
      //   szEndTime: szEndTime,
      // });
      // }
      var _this = this;
      if (0 == iRet) {
        // szInfo = "开始回放成功！";
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "开始回放成功！"
        );
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "开始回放失败！"
        );
        // szInfo = "开始回放失败！";
      }
      // showOPInfo(szIP + " " + szInfo);
    },
    // ---------------------------------------------------------------------------------------------------------------
    clickRecordSearch(iType) {
      if (!this.userInfo.kssj || !this.userInfo.jssj) {
        return this.$message({
          message: "请先选择开始/结束时间",
          type: "error",
        });
      }
      if (this.userInfo.jssj < this.userInfo.kssj) {
        return this.$message({
          message: "开始时间不能大于结束时间",
          type: "error",
        });
      }
      var szStartTime = this.$Date(new Date(this.userInfo.kssj)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      var szEndTime = this.$Date(new Date(this.userInfo.jssj)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      var iChannelID =
        this.arrdata[this.tatol ? this.tatol - 1 : 0][this.indexck].id;
      var szIP = this.arrdata[this.tatol ? this.tatol - 1 : 0][this.indexck].ip;
      var iSearchTimes = 0;
      var _this = this;
      WebVideoCtrl.I_RecordSearch(szIP, iChannelID, szStartTime, szEndTime, {
        iSearchPos: iSearchTimes * 40,
        success: function (xmlDoc) {
          if ("MORE" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
            // console.log("继续搜索");
            // for (
            //   var i = 0, nLen = $(xmlDoc).find("searchMatchItem").length;
            //   i < nLen;
            //   i++
            // ) {
            //   var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
            //   if (szPlaybackURI.indexOf("name=") < 0) {
            //     break;
            //   }
            //   var szStartTime = $(xmlDoc).find("startTime").eq(i).text();
            //   var szEndTime = $(xmlDoc).find("endTime").eq(i).text();
            //   var szFileName = szPlaybackURI.substring(
            //     szPlaybackURI.indexOf("name=") + 5,
            //     szPlaybackURI.indexOf("&size=")
            //   );

            //   var objTr = $("#searchlist").get(0).insertRow(-1);
            //   var objTd = objTr.insertCell(0);
            //   objTd.id = "downloadTd" + i;
            //   objTd.innerHTML = iSearchTimes * 40 + (i + 1);
            //   objTd = objTr.insertCell(1);
            //   objTd.width = "30%";
            //   objTd.innerHTML = szFileName;
            //   objTd = objTr.insertCell(2);
            //   objTd.width = "30%";
            //   objTd.innerHTML = szStartTime.replace("T", " ").replace("Z", "");
            //   objTd = objTr.insertCell(3);
            //   objTd.width = "30%";
            //   objTd.innerHTML = szEndTime.replace("T", " ").replace("Z", "");
            //   objTd = objTr.insertCell(4);
            //   objTd.width = "10%";
            //   objTd.innerHTML =
            //     "<a href='javascript:;' onclick='clickStartDownloadRecord(" +
            //     i +
            //     ");'>下载</a>";
            //   $("#downloadTd" + i).data("playbackURI", szPlaybackURI);
            // }

            // iSearchTimes++;
            _this.clickRecordSearch(1); // 继续搜索
          } else if (
            "OK" === $(xmlDoc).find("responseStatusStrg").eq(0).text()
          ) {
            _this.ckoulist = [];
            var iLength = $(xmlDoc).find("searchMatchItem").length;
            for (var i = 0; i < iLength; i++) {
              var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
              if (szPlaybackURI.indexOf("name=") < 0) {
                break;
              }
              // 开始时间
              var szStartTime = $(xmlDoc).find("startTime").eq(i).text();
              // 结束时间
              var szEndTime = $(xmlDoc).find("endTime").eq(i).text();
              // 文件名
              var szFileName = szPlaybackURI.substring(
                szPlaybackURI.indexOf("name=") + 5,
                szPlaybackURI.indexOf("&size=")
              ); ////第2框innerHTML
              var ks = szStartTime.replace("T", " ").replace("Z", "");
              var js = szEndTime.replace("T", " ").replace("Z", "");
              // alert(szStartTime);
              // alert(szEndTime);
              // alert(szFileName);
              _this.ckoulist.push({
                a: szFileName,
                b: ks,
                c: js,
                ip: szIP,
                id: iChannelID,
              });
              // var objTr = $("#searchlist").get(0).insertRow(-1);
              // var objTd = objTr.insertCell(0);
              // objTd.id = "downloadTd" + i;
              // var id = "downloadTd" + i; //第一框id
              // var a = iSearchTimes * 40 + (i + 1); //第一框innerHTML
              // var c = szStartTime.replace("T", " ").replace("Z", ""); //第3框innerHTML
              // var c = szEndTime.replace("T", " ").replace("Z", ""); //第4框innerHTML
              // var c = szEndTime.replace("T", " ").replace("Z", ""); //第5框innerHTML
              _this.jisben.unshift(
                _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                  " ：" +
                  "搜索录像文件成功！"
              );
            }
            // showOPInfo(szIP + " 搜索录像文件成功！");
          } else if (
            "NO MATCHES" === $(xmlDoc).find("responseStatusStrg").eq(0).text()
          ) {
            setTimeout(function () {
              // showOPInfo(szIP + " 没有录像文件！");
              _this.jisben.unshift(
                _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                  " ：" +
                  "没有录像文件！"
              );
            }, 50);
          }
        },
        error: function () {
          // showOPInfo(szIP + " 搜索录像文件失败！");
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              "搜索录像文件失败！"
          );
        },
      });
    },
    // --------------------------------------------------------------------------------------------------------------获取录像文件
    // 光圈结束
    PTZIrisStop() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);
      if (oWndInfo != null) {
        if (oWndInfo != null) {
          WebVideoCtrl.I_PTZControl(14, true, {
            iWndIndex: _this.indexck,
            success: function (xmlDoc) {
              _this.jisben.unshift(
                _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                  " ：" +
                  "光圈停止成功！"
              );
            },
            error: function () {
              _this.jisben.unshift(
                _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                  " ：" +
                  "光圈停止失败！"
              );
            },
          });
        }
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    // 光圈-
    PTZIrisOut() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);

      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(15, false, {
          iWndIndex: _this.indexck,
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "光圈-成功！"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "光圈-失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    // 光圈+
    PTZIrisIn() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);

      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(14, false, {
          iWndIndex: _this.indexck,
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "光圈+成功！"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "光圈+失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    PTZFoucusStop() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);
      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(12, true, {
          iWndIndex: _this.indexck,
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "聚焦停止成功！"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "聚焦停止失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    // 变倍-
    PTZZoomout() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);
      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, false, {
          iWndIndex: _this.indexck,
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变倍-成功！"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变倍-失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    // 变倍完成提醒
    PTZZoomStop() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);
      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, true, {
          iWndIndex: _this.indexck,
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变倍停止成功！"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变倍停止失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    // 变倍+
    PTZZoomIn() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);

      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(10, false, {
          iWndIndex: _this.indexck,
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变倍+成功"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变倍+失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    // 变焦+
    PTZFocusIn() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);
      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(12, false, {
          iWndIndex: _this.indexck,
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变焦+成功"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变焦+失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    // 变焦-
    PTZFoucusOut() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);
      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(13, false, {
          iWndIndex: _this.indexck,
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变焦-成功"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "变焦-失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    //     function PTZFoucusStop() {
    //     var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    //     if (oWndInfo != null) {
    //         WebVideoCtrl.I_PTZControl(12, true, {
    //             iWndIndex: g_iWndIndex,
    //             success: function (xmlDoc) {
    //                 showOPInfo(oWndInfo.szIP + " 聚焦停止成功！");
    //             },
    //             error: function () {
    //                 showOPInfo(oWndInfo.szIP + "  聚焦停止失败！");
    //             }
    //         });
    //     }
    // }
    clickGoPreset() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);
      var iPresetID = parseInt(this.preset, 10);

      if (oWndInfo != null) {
        WebVideoCtrl.I_GoPreset(iPresetID, {
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "调用预置点成功！"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "调用预置点失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    clickSetPreset() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);
      var iPresetID = parseInt(this.preset, 10);

      if (oWndInfo != null) {
        WebVideoCtrl.I_SetPreset(iPresetID, {
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "设置预置点成功！"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "设置预置点失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    mouseUpPTZControl() {
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);

      if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(1, true, {
          success: function (xmlDoc) {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "窗口" +
                _this.indexck +
                "停止云台成功！"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "窗口" +
                _this.indexck +
                "停止云台失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    mouseDownPTZControl(iPTZIndex) {
      var bStop = false;
      var _this = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.indexck);
      if (oWndInfo != null) {
        if (9 == iPTZIndex && _this.g_bPTZAuto) {
          _this.ptzspeed = 0;
          bStop = true;
        } else {
          _this.g_bPTZAuto = false;
          bStop = false;
        }

        WebVideoCtrl.I_PTZControl(iPTZIndex, bStop, {
          iPTZSpeed: _this.ptzspeed,
          success: function (xmlDoc) {
            if (9 == iPTZIndex) {
              g_bPTZAuto = !g_bPTZAuto;
            }
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "窗口" +
                _this.indexck +
                "开启云台成功！"
            );
          },
          error: function () {
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "窗口" +
                _this.indexck +
                "开启云台失败！"
            );
          },
        });
      } else {
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "窗口" +
            _this.indexck +
            "无预览视频"
        );
      }
    },
    clickOpenFileDlg(iType) {
      var szDirPath = WebVideoCtrl.I_OpenFileDlg(iType);
      if (szDirPath != -1 && szDirPath != "" && szDirPath != null) {
        this.lijun = szDirPath;
      }
    },

    // v1users(e) {
    //   // if (!this.cxdata.ylzl) {
    //   //   return this.$message({ message: "请先选择预览种类", type: "error" });
    //   // }
    //   if (!this.cxdata.jgdm) {
    //     return this.$message({ message: "请先选择所属机构", type: "error" });
    //   }
    //   videocameras({
    //     jgdm: this.cxdata.jgdm,
    //     size: 999,
    //     current: 1,
    //     // sblx: this.cxdata.ylzl,
    //   }).then((res) => {
    //     this.datalist = res.data;
    //     if (this.cxdata.ylzl == 2) {
    //       this.sxjfunc();
    //     } else {
    //       if (this.datalist.length != 0) {
    //         this.lxjid = this.datalist[0].id;
    //         this.initPlugin();
    //       }
    //     }
    //   });
    // },
    v1users(e) {
      // if (!this.cxdata.ylzl) {
      //   return this.$message({ message: "请先选择预览种类", type: "error" });
      // }
      if (!this.cxdata.jgdm) {
        return this.$message({ message: "请先选择所属机构", type: "error" });
      }
      videocameras({
        jgdm: this.cxdata.jgdm,
        size: 999,
        current: 1,
        // sblx: this.cxdata.ylzl,
      }).then((res) => {
        // vvs
        var a = res.data || [];
        // console.log(a);
        // console.log(3333333333333333333333);
        a.map((item) => {
          var reg =
            /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
          // alert(reg.test(item.ipdz));
          // var flagip = reg.test(this.userInfo.ipdz)
          if (!reg.test(item.ipdz)) {
            extapidomainip(item.ipdz).then((reqs) => {
              // alert(1);
              item.ipdz = reqs;
              // console.log(reqs);
              // console.log(99999999999);
            });
          }
        });

        if (e == 1) {
          var b = a.filter((item) => {
            return item.sblx == 1;
          });
          var c = a.filter((item) => {
            return item.sblx == 2;
          });
          if (b.length == 0 && c.length == 0) {
            return this.$message({ message: "无视频设备数据", type: "error" });
          } else if (b.length != 0 && c.length == 0) {
            this.cxdata.ylzl = "1";
            // 录像机
            this.datalist = b;
            this.lxjid = this.datalist[0].id;
            this.initPlugin();
            // vvs
          } else if (b.length == 0 && c.length != 0) {
            // 摄像头
            this.cxdata.ylzl = "2";
            this.datalist = c;
            this.sxjfunc();
          } else {
            // 录像机
            this.cxdata.ylzl = "1";
            this.datalist = b;
            this.lxjid = this.datalist[0].id;
            this.initPlugin();
          }
        } else {
          if (this.cxdata.ylzl == 2) {
            this.datalist = a.filter((item) => {
              return item.sblx == 2;
            });
            this.sxjfunc();
          } else {
            this.datalist = a.filter((item) => {
              return item.sblx == 1;
            });
            if (this.datalist.length != 0) {
              this.lxjid = this.datalist[0].id;
              this.initPlugin();
            }
          }
        }

        // this.datalist = res.data;
        // if (this.cxdata.ylzl == 2) {
        //   this.sxjfunc();
        // } else {
        //   if (this.datalist.length != 0) {
        //     this.lxjid = this.datalist[0].id;
        //     this.initPlugin();
        //   }
        // }
      });
    },
    sxjfunc(ber) {
      var a = this.lugin.iWndowType * this.lugin.iWndowType;
      for (var i = 0; i < a; i++) {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(i);
        if (oWndInfo != null) {
          WebVideoCtrl.I_Stop(i);
        }
      }
      this.arrdata = [];
      this.daqds = 1;
      var obar = JSON.parse(JSON.stringify(this.datalist));
      var i = this.lugin.iWndowType * this.lugin.iWndowType;
      this.tatol = Math.ceil(obar.length / i);
      for (var j = 1; j < this.tatol + 1; j++) {
        if (this.tatol == 1) {
          this.arrdata.push(this.datalist);
        } else if (j <= this.tatol) {
          this.arrdata.push(obar.splice(0, i));
        } else {
          this.arrdata.push(obar.splice(0, -1));
        }
      }
      this.initPlugin(0, ber);
    },
    initPlugin(num, ber) {
      if (ber == 1) {
        var _this = this;
        // alert(32);
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            "切换视频窗口数" +
            _this.lugin.iWndowType +
            "x" +
            _this.lugin.iWndowType
        );
        var iType = parseInt(_this.lugin.iWndowType, 10);
        WebVideoCtrl.I_ChangeWndNum(iType);

        // var iType = parseInt(this.lugin.iWndowType, 10);
        // WebVideoCtrl.I_ChangeWndNum(iType);
        // console.log(123456789);
      } else {
        var _this = this;
        WebVideoCtrl.I_InitPlugin(_this.lugin.w, _this.lugin.h, {
          iWndowType: _this.lugin.iWndowType,
          bUndFull: _this.lugin.bUndFull,
          cbSelWnd: function (xmlDoc) {
            _this.indexck = $(xmlDoc).find("SelectWnd").eq(0).text();
            _this.jisben.unshift(
              _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
                " ：" +
                "当前选择的窗口编号：" +
                _this.indexck
            );
          },
        });
        WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
        this.lujflag = true;
      }
      var a = this.lugin.iWndowType * this.lugin.iWndowType;
      for (var i = 0; i < a; i++) {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(i);
        if (oWndInfo != null) {
          WebVideoCtrl.I_Stop(i);
        }
      }
      if (this.cxdata.ylzl == 2) {
        this.xhuandl(num);
      } else {
        this.lxjilog();
      }
    },
    xhuandl(num) {
      var a = this.lugin.iWndowType * this.lugin.iWndowType;
      for (var i = 0; i < a; i++) {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(i);
        if (oWndInfo != null) {
          WebVideoCtrl.I_Stop(i);
        }
      }
      for (var i = 0; i < this.arrdata[num].length; i++) {
        this.login(
          {
            ip: this.arrdata[num][i].ipdz,
            dk: this.arrdata[num][i].fwdk,
            zh: this.arrdata[num][i].fwzh,
            mm: this.arrdata[num][i].fwmm,
          },
          i
        );
      }
    },
    login(e, index) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(index);
      if (oWndInfo != null) {
        // console.log("登录前存在清理【" + e.ip + "】所在窗口：" + index);
        var a = WebVideoCtrl.I_Stop(index);
        if (0 == a) {
          // console.log("清理成功");
        } else {
          // console.log("清理失败");
        }
      }
      let _this = this;
      _this.jisben.unshift(
        _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
          " ：" +
          e.ip +
          " 正在登录"
      );
      var iRet = WebVideoCtrl.I_Login(e.ip, 1, e.dk, e.zh, e.mm, {
        success: function (xmlDoc) {
          // console.log("登录成功【" + e.ip + "】所在窗口：" + index);
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              e.ip +
              " 登录成功"
          );
          setTimeout(() => {
            // console.log("延迟完成");
            _this.clickStartRealPlay(e.ip, index);
          }, 1000);
        },
        error: function () {
          // console.log("登录失败【" + e.ip + "】所在窗口：" + index);
          _this.$Message.error("登录失败：" + e.ip);
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              e.ip +
              " 登录失败"
          );
        },
      });

      if (-1 == iRet) {
        // console.log("已登录过【" + e.ip + "】所在窗口：" + index);
        _this.clickStartRealPlay(e.ip, index);
      }
    },
    clickStartRealPlay(e, i, flag, id) {
      // console.log("开始预览【" + e + "】所在窗口：" + i);

      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(i);
      if (oWndInfo != null) {
        // return console.log("已在播放【" + e + "】所在窗口：" + i);
        return;
      }
      let _this = this;
      _this.jisben.unshift(
        _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
          " ：" +
          e +
          " 正在预览"
      );
      var obj = {
        iStreamType: 1,
        bZeroChannel: false,
        iWndIndex: i,
      };
      if (flag == 2) {
        obj.iChannelID = id;
      }

      var iRet = WebVideoCtrl.I_StartRealPlay(e, obj);
      if (0 == iRet) {
        // console.log("预览成功【" + e + "】所在窗口：" + i);
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            e +
            " 预览成功，在窗口：" +
            i
        );
      } else {
        _this.$Message.error("预览失败【" + e + "】");
        // console.log("预览失败【" + e + "】所在窗口：" + i);
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            e +
            " 预览失败，在窗口：" +
            i
        );
      }
    },
    lxjilog() {
      var a = this.lugin.iWndowType * this.lugin.iWndowType;
      for (var i = 0; i < a; i++) {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(i);
        if (oWndInfo != null) {
          WebVideoCtrl.I_Stop(i);
        }
      }
      var arr = this.datalist.map((ite) => {
        return ite.id;
      });
      var num = arr.indexOf(this.lxjid);
      var e = this.datalist[num];
      let _this = this;
      _this.jisben.unshift(
        _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
          " ：" +
          e.ipdz +
          " 正在登录"
      );
      var iRet = WebVideoCtrl.I_Login(e.ipdz, 1, e.fwdk, e.fwzh, e.fwmm, {
        success: function (xmlDoc) {
          // console.log("登录成功【" + e.ipdz);
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              e.ipdz +
              " 登录成功"
          );
          _this.getChannelInfo(e.ipdz);
        },
        error: function () {
          // console.log("登录失败【");
          _this.$Message.error("登录失败：" + e.ipdz);
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              e.ipdz +
              " 登录失败"
          );
        },
      });

      if (-1 == iRet) {
        // console.log("已登录过【" + e.ipdz);
        _this.jisben.unshift(
          _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
            " ：" +
            e.ipdz +
            " 已登录过，正在预览"
        );
        _this.getChannelInfo(e.ipdz);
      }
    },
    getChannelInfo(e) {
      var nAnalogChannel = 0;
      // console.log("开始获取通道");
      let _this = this;
      _this.numbertd = [];
      WebVideoCtrl.I_GetAnalogChannelInfo(e, {
        async: false,
        success: function (xmlDoc) {
          var oChannels = $(xmlDoc).find("VideoInputChannel");
          _this.mntd = oChannels.length;
          // console.log("获取模拟通道成功！");
        },
        error: function (error) {
          // console.log("获取模拟通道失败！");
        },
      });
      _this.jisben.unshift(
        _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
          " ：" +
          e +
          " 获取数字通道"
      );
      WebVideoCtrl.I_GetDigitalChannelInfo(e, {
        async: false,
        success: function (xmlDoc) {
          var oChannels = $(xmlDoc).find("InputProxyChannelStatus");

          $.each(oChannels, function (i) {
            var id = parseInt($(this).find("id").eq(0).text(), 10),
              name = $(this).find("name").eq(0).text(),
              online = $(this).find("online").eq(0).text();
            if ("false" == online) {
              return true;
            }
            if ("" == name) {
              name =
                "IPCamera " +
                (id - nAnalogChannel < 9
                  ? "0" + (id - nAnalogChannel)
                  : id - nAnalogChannel);
            }
            _this.numbertd.push({ id: id, name: name, ip: e });
          });
          // console.log(e + " 获取数字通道成功！");
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              e +
              " 获取数字通道成功！"
          );
          _this.lxjfunc();
        },
        error: function () {
          // console.log(e + " 获取数字通道失败！");
          _this.jisben.unshift(
            _this.$Date(new Date()).format("YYYY-MM-DD HH:mm:ss") +
              " ：" +
              e +
              " 获取数字通道失败！"
          );
        },
      });
      WebVideoCtrl.I_GetZeroChannelInfo(e, {
        async: false,
        success: function (xmlDoc) {
          var oChannels = $(xmlDoc).find("ZeroVideoChannel");
          // console.log(oChannels);
          // console.log("获取零通道成功！");
        },
        error: function () {
          // console.log("获取零通道失败！" + WebVideoCtrl.I_GetLastError());
        },
      });
    },
    lxjfunc(ber) {
      if (ber == 2) {
        var iType = parseInt(this.lugin.iWndowType, 10);
        WebVideoCtrl.I_ChangeWndNum(iType);
        var a = this.lugin.iWndowType * this.lugin.iWndowType;
        for (var i = 0; i < a; i++) {
          var oWndInfo = WebVideoCtrl.I_GetWindowStatus(i);
          if (oWndInfo != null) {
            WebVideoCtrl.I_Stop(i);
          }
        }
      }
      this.arrdata = [];
      this.daqds = 1;
      var obar = JSON.parse(JSON.stringify(this.numbertd));
      var i = this.lugin.iWndowType * this.lugin.iWndowType;
      this.tatol = Math.ceil(obar.length / i);
      for (var j = 1; j < this.tatol + 1; j++) {
        if (this.tatol == 1) {
          this.arrdata.push(this.numbertd);
        } else if (j <= this.tatol) {
          this.arrdata.push(obar.splice(0, i));
        } else {
          this.arrdata.push(obar.splice(0, -1));
        }
      }
      this.wothzl(0);
    },
    wothzl(e) {
      var a = this.lugin.iWndowType * this.lugin.iWndowType;
      for (var i = 0; i < a; i++) {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(i);
        if (oWndInfo != null) {
          WebVideoCtrl.I_Stop(i);
        }
      }
      for (var i = 0; i < this.arrdata[e].length; i++) {
        this.clickStartRealPlay(
          this.arrdata[e][i].ip,
          i,
          2,
          this.arrdata[e][i].id
        );
      }
    },
    // ---------------------------------------------------------------------------------
    wc(a) {
      this.cxdata.jgdm = sessionStorage.getItem("dqjg");
      this.v1users(1);
    },
    orgslisttree() {
      orgslisttree().then((res) => {
        this.menuList = res.data;
        this.xh(this.menuList);
      });
    },
    async xh(a) {
      for (var i = 0; i < a.length; i++) {
        var b = {
          value: a[i].jgdm,
          title: a[i].jgmc,
          expand: true,
          children: a[i].children || [],
          jgdm: a[i].jgdm,
        };
        a[i] = b;
        if (a[i].children && a[i].children.length != 0) {
          this.recursivejg(a[i].children);
        }
      }
      await this.wc(a);
    },
    recursivejg(e) {
      for (var i = 0; i < e.length; i++) {
        var b = {
          value: e[i].jgdm,
          title: e[i].jgmc,
          expand: true,
          children: e[i].children || [],
          jgdm: e[i].jgdm,
        };
        e[i] = b;
        if (e[i].children && e[i].children.length != 0) {
          this.recursivejg(e[i].children);
        }
      }
    },
    clickFullScreen() {
      WebVideoCtrl.I_FullScreen(true);
    },
  },
};
</script>
<style lang="less" scoped>
@import "./preview.less";
</style>
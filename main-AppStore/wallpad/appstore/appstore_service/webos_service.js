// eslint-disable-next-line import/no-unresolved
const pkgInfo = require("./package.json");
const Service = require("webos-service");
const luna = require("./luna_service");
const service = new Service(pkgInfo.name); // Create service by service name on package.json
const logHeader = "[" + pkgInfo.name + "]";
const fs = require("fs");
const request = require("request");
const PWD = __dirname;
const exec = require("child_process").exec;
require("dotenv").config();

const fileServer = "http://" + process.env.fileServer;

/**
 * 앱 서버에서 앱 정보를 담을 객체 배열을 가져옴
 * 앱스토어에서 앱 설치 시 ipk 파일이 저장될 apps 디렉토리가 있는지 확인하고 없으면 생성
 */
service.register("appSetUp", (msg) => {
  let appList = [];
  request.get(fileServer + "/apps/list", (err, res, body) => {
    // request.get("http://<your ip>:8000" + "/apps/list", (err, res, body) => {
    appList = JSON.parse(body);
    console.log(appList);
    msg.respond({ appList: appList, returnValue: true });
  });
  const IpkinstallPath =
    "/media/developer/apps/usr/palm/sevices/com.appstore.app.service/";
  fs.mkdir(IpkinstallPath, (err) => {
    if (err && err.code == "EEXIST") {
      console.log("already exists");
    }
  });
});

/**
 * 설치된 모든 앱 이름 문자열 배열을 가져옴
 */
service.register("getInstalledApps", (msg) => {
  const AppinstallPath = "/media/developer/apps/usr/palm/applications/";
  let installedApps = [];
  fs.readdir(AppinstallPath, (err, apps) => {
    if (err) {
      console.log(err);
    }
    apps.forEach((app) => {
      installedApps.unshift(app);
    });
    console.log(installedApps);
    msg.respond({ installedApps: installedApps, returnValue: true });
  });
});

/**
 * 파일 서버에서 설치하려는 앱의 ipk파일을 다운로드 후 설치함.
 */
service.register("install", (msg) => {
  luna.init(service);
  console.log(msg.payload);
  let app_id = msg.payload.app_id;
  let path = PWD + "/apps/" + msg.payload.app_file;
  // ipk 파일 다운로드
  exec(
    "wget -P ./apps/ " +
      '"' +
      fileServer +
      "/apps/" +
      app_id +
      "_1.0.0_all.ipk" +
      '"',
    (err) => {
      if (err) {
        console.log(err);
        msg.respond({ returnValue: false });
      }
      let appDownload_url = "luna://com.webos.appInstallService/dev/install";
      let appDownload_params = {
        id: app_id,
        ipkUrl: path,
        subscribe: true,
      };

      const download = service.subscribe(appDownload_url, appDownload_params);
      download.addListener("response", (m) => {
        console.log("[download] " + m.payload.statusValue);
        if (m.payload.statusValue == 30) {
          sub.cancel();
          download.cancel();
          msg.respond({
            reply: "install success",
            returnValue: true,
          });
        }
      });
    }
  );

  //----------------------------앱별 추가 설치------------------------------

  if (msg.payload.app_name === "배달") {
    console.log("배달 앱은 추가로 설치되는 환경 설정이 없습니다!");
  }

  if (msg.payload.app_name === "차량") {
    console.log("임시 차량 등록 앱은 추가로 설치되는 환경이 없습니다!"); // client가 아닌 경비실용 차량 앱은 환경 설정이 필요하지만 해당 앱은 client에게 제공되는 앱입니다
  }
  if (msg.payload.app_name === "CCTV") {
    console.log("CCTV 앱은 추가로 설치되는 환경 설정이 없습니다!");
  }

  if (msg.payload.app_name === "가전제어") {
    // console.log("가전제어 앱은 bareapp을 수정하여 사용합니다!")
  }

  if (msg.payload.app_name === "운동보조") {
    console.log(
      "운동보조 앱은 추가로 mediapipe 관련 환경 설정, camera2 및 media LS2 API 설정이 필요합니다!"
    );
  }

  //------------------------- heartbeat 구독 -------------------------
  const sub = service.subscribe(`luna://${pkgInfo.name}/heartbeat`, {
    subscribe: true,
  });
  const max = 60; //heart beat 횟수 /// heart beat가 꺼지면, 5초 정도 딜레이 생김 --> 따라서 이 녀석도 heart beat를 무한히 돌릴 필요가 있어보임.
  let count = 0;
  sub.addListener("response", function (msg) {
    console.log(JSON.stringify(msg.payload));
    if (++count >= max) {
      sub.cancel();
    }
  });
  //------------------------- heartbeat 구독 -------------------------
});

/**
 * 앱을 삭제하고 ipk 파일을 제거
 */
service.register("remove", function (msg) {
  luna.init(service);
  console.log(msg.payload);
  let app_id = msg.payload.app_id;
  // ipk 파일 삭제
  exec("rm -f " + PWD + "/apps/" + msg.payload.app_file, (err) => {
    if (err) {
      console.log(err);
      msg.respond({ returnValue: false });
    }
    let appRemove_url = "luna://com.webos.appInstallService/dev/remove";
    let appRemove_params = {
      id: app_id,
      subscribe: true,
    };

    const removing = service.subscribe(appRemove_url, appRemove_params);
    removing.addListener("response", (m) => {
      console.log("[remove]" + m.payload.statusValue);
      if (m.payload.statusValue == 31) {
        sub.cancel();
        removing.cancel();
        msg.respond({
          reply: "remove success",
          returnValue: true,
        });
      }
    });
  });

  //------------------------- heartbeat 구독 -------------------------
  const sub = service.subscribe(`luna://${pkgInfo.name}/heartbeat`, {
    subscribe: true,
  });
  const max = 30; //heart beat 횟수 /// heart beat가 꺼지면, 5초 정도 딜레이 생김 --> 따라서 이 녀석도 heart beat를 무한히 돌릴 필요가 있어보임.
  let count = 0;
  sub.addListener("response", function (msg) {
    console.log(JSON.stringify(msg.payload));
    if (++count >= max) {
      sub.cancel();
    }
  });
  //------------------------- heartbeat 구독 -------------------------
});

service.register("open", (msg) => {
  luna.init(service);
  console.log(msg.payload);
  luna.launchApp(msg.payload.app_id);
  msg.respond({ returnValue: true });
});

service.register("close", (msg) => {
  luna.init(service);
  console.log(msg.payload);
  luna.closeApp(msg.payload.app_id);
  luna.launchApp("com.webos.app.home");
  msg.respond({ returnValue: true });
});

//----------------------------------------------------------------------heartbeat----------------------------------------------------------------------
// handle subscription requests
const subscriptions = {};
let heartbeatinterval;
let x = 1;
function createHeartBeatInterval() {
  if (heartbeatinterval) {
    return;
  }
  console.log(logHeader, "create_heartbeatinterval");
  heartbeatinterval = setInterval(function () {
    sendResponses();
  }, 1000);
}

// send responses to each subscribed client
function sendResponses() {
  console.log(logHeader, "send_response");
  console.log(
    "Sending responses, subscription count=" + Object.keys(subscriptions).length
  );
  for (const i in subscriptions) {
    if (Object.prototype.hasOwnProperty.call(subscriptions, i)) {
      const s = subscriptions[i];
      s.respond({
        returnValue: true,
        event: "beat " + x,
      });
    }
  }
  x++;
}

var heartbeat = service.register("heartbeat");
heartbeat.on("request", function (message) {
  console.log(logHeader, "SERVICE_METHOD_CALLED:/heartbeat");
  message.respond({ event: "beat" }); // initial response
  if (message.isSubscription) {
    subscriptions[message.uniqueToken] = message; //add message to "subscriptions"
    if (!heartbeatinterval) {
      createHeartBeatInterval();
    }
  }
});
heartbeat.on("cancel", function (message) {
  delete subscriptions[message.uniqueToken]; // remove message from "subscriptions"
  var keys = Object.keys(subscriptions);
  if (keys.length === 0) {
    // count the remaining subscriptions
    console.log("no more subscriptions, canceling interval");
    clearInterval(heartbeatinterval);
    heartbeatinterval = undefined;
  }
});

// import { storeLog } from '@/api/system/log';
import { setting } from '@/config/setting';
const { routesWhiteList } = setting;
// import { doEncrypt, doDecrypt } from '@/utils/crypto';

// 记录日志
export function recordLog(to) {
  const path = to.path;

  if (!(routesWhiteList.indexOf(path) !== -1)) {
    /*
    storeLog({ paths: [path] }).then((res) => {
      console.log(res);
      // 如果上传成功，则添加到本地
    });
    */
  }

  // 一次传多组数据
  /*
    const timestamp = new Date().getTime();
    const path = to.path;
    
    let data = { timestamp: timestamp, path: path }

    const logs = window.localStorage.getItem("logs");

    if (logs) {
        let logList = JSON.parse(logs);
        // 3次传一次
        if (logList.length >= 3) {
            storeLog(logList).then((res) => {
                console.log(res);
                // 如果上传成功，则添加到本地
                window.localStorage.setItem("logs", JSON.stringify([data]));
            }).catch(err => {
                // 上传服务端失败，则添加当前至本地
                logList.push(data);
                window.localStorage.setItem("logs", JSON.stringify(logList));
            })
        } else {
            logList.push(data);
            window.localStorage.setItem("logs", JSON.stringify(logList));
        }
    } else {
        window.localStorage.setItem("logs", JSON.stringify([data]));
    }
    */
}

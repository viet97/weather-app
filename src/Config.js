const BuildRelease = true;
const DebugLog = true;
const BuildServerTest = false;
const LoggerRedux = false;
const serverHost = {
  release: 'https://api.jungotv.app/appserver/', // 'http://api.jungotv.staging.gviet.vn:8080/jungo-appserver/',
  test: 'http://192.168.2.124:3002/appserver/',
};
const serverHostCustomer = {
  release: 'https://api.jungotv.app/user/', // 'http://api.jungotv.staging.gviet.vn:8080/user-jungo/',
  test: 'http://192.168.2.124:3000/user/',
};

const Config = {
  apiKey: '62b38348b454df9bda79c5a6a144a07d',
  aqiToken: 'a67e0a2b2a88200b16cf340eb2d1b0a819fb0533',
  versionCode: '20201107',
  versionApi: 'appserver/',
  platformConfig: 1,
  buildRelease: BuildRelease,
  debug: true, // BuildRelease ? false : DebugLog,
  useLoggerRedux: BuildRelease ? false : LoggerRedux,
  levelLog: 0,
  useServerTest: BuildRelease ? false : BuildServerTest,
  isAuthenViaFirebase: true,
  enableChat: true,
  prefixUrlDeeplinks: ['https://jungotv.app/c/', 'https://jungotv.app/c/'],
  serverHost: BuildRelease
    ? serverHost.release
    : BuildServerTest
    ? serverHost.test
    : serverHost.release,
  serverHostCustomer: BuildRelease
    ? serverHostCustomer.release
    : BuildServerTest
    ? serverHostCustomer.test
    : serverHostCustomer.release,
};

export default Config;

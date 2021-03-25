const BuildRelease = true;
const DebugLog = true;
const BuildServerTest = false;
const LoggerRedux = false;
export const locale = {
  vi: 'vi',
  en: 'en',
};
const serverHost = {
  release: 'https://api.jungotv.app/appserver/', // 'http://api.jungotv.staging.gviet.vn:8080/jungo-appserver/',
  test: 'http://192.168.2.124:3002/appserver/',
};
const serverHostCustomer = {
  release: 'https://api.jungotv.app/user/', // 'http://api.jungotv.staging.gviet.vn:8080/user-jungo/',
  test: 'http://192.168.2.124:3000/user/',
};

const Config = {
  versionCode: '20201107',
  versionApi: 'appserver/',
  platformConfig: 1,
  buildRelease: BuildRelease,
  debug: BuildRelease ? false : DebugLog,
  useLoggerRedux: BuildRelease ? false : LoggerRedux,
  levelLog: 0,
  useServerTest: BuildRelease ? false : BuildServerTest,
  defaultLocale: locale.en,
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

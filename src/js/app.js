import $ from 'dom7';
import Framework7, { getDevice } from 'framework7/bundle';

// Import F7 Styles
import 'framework7/framework7-bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
import '../css/animate.min.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';

// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7.html';

var device = getDevice();
var app = new Framework7({
  name: 'Joomdev', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  component: App, // App main component
  id: 'com.joomdev.app.biswajit', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,
  // Register service worker
  serviceWorker: {
    path: '/service-worker.js',
  },

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  showToastBottom: (msg = "") => {
    // Create toast
    let toastBottom = app.toast.create({
        text: msg,
        closeTimeout: 2000,
    });
    toastBottom.open();
    

},
logOut: function () {
  //============= remove from local storage =========
  localStorage.setItem("token", "");
  localStorage.setItem("mobile", "");
  localStorage.setItem("is_login", "");
  app.views.main.router.navigate('/login/', {
      ignoreCache: true,
      reloadCurrent: true,
  });
  app.views.main.router.clearPreviousHistory();
  let toastBottom = app.toast.create({
    text: "You’ve been Logged out!",
    closeTimeout: 2000,
  });
  toastBottom.open();



},

  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
        f7.statusbar.setBackgroundColor('#ffffff');
        f7.statusbar.setTextColor('black');
      }
    },
  },
});
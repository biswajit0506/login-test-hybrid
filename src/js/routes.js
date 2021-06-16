
import HomePage from '../pages/home.f7.html';
import LoginPage from '../pages/login.f7.html';
import OTPPage from '../pages/otp.f7.html';



import AboutPage from '../pages/about.f7.html';
import FormPage from '../pages/form.f7.html';


import DynamicRoutePage from '../pages/dynamic-route.f7.html';
import RequestAndLoad from '../pages/request-and-load.f7.html';
import NotFoundPage from '../pages/404.f7.html';

var routes = [
  {
    path: '/home_/',
    component: HomePage,
  },

  {
    path: '/home/',
    async: function ( {resolve, router}) {
//            var router = this;
        console.log(router);
        var app = router.app;
        var is_login = localStorage.getItem("is_login");

        if (is_login == null || is_login == '') {
            localStorage.setItem("is_login", "");
            resolve(
                    {
                        component: LoginPage,
                    }
            );
        } else { // ===  already loginedin

         let mobileData = localStorage.getItem("mobile");
          resolve(
            {
              component: HomePage
            },
            {
                props: {
                    mobileData: mobileData
                }
            }
         )

          } 
    
//            }, false);
    },
    on: {
        pageAfterIn(e, page) {
            page.router.clearPreviousHistory();
        },
    },
},


  {
    path: '/login/',
    component: LoginPage,
  },
  {
    path: '/otp/:mobile/',
    component: OTPPage,
  },


  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true, menu : '<i class="fa fa-home"></i>' },
                { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true, menu : '<i class="fa fa-flickr"></i>' }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});
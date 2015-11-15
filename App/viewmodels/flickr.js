define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    var outsideData;
    function getDataFor(myLocation) {
        return http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne',
            {
                tags: myLocation,
                tagmode: 'any',
                format: 'json',
                lang:'pt-br'
            },
            'jsoncallback').then(function (response) {
                outsideData.images(response.items);
            });
    }
    //----------------------------------------------------------------------------------------------------------
    return {
        displayName: 'Flickr',
        images: ko.observableArray([]),
        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceeding
        },
        compositionComplete: function () {
            outsideData = this;
            //--- regista uma função para respnder, de futuro, quando 
            //--- o utilizador mudar o nome da cidade selecionada
            $('select').change(function () {
                getDataFor($('select').val());
            });
            //--- fim
            if (this.images().length > 0) {
                return;
            }
            getDataFor($('select').val());
        },
        select: function (item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/detail';
            app.showDialog(item);
        },
        splitTags: function (tags) {
            var arr = tags.split(' ');
            var retVal = "Tags: ";
            for (x = 0; x < arr.length; x++) {
                if (x > 0)
                    retVal += " #" + arr[x] + ";";
                else
                    retVal += "#" + arr[x] + ";";
            }
            return retVal;
        }
    };
});
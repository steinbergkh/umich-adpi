angular.module('umichAdpiApp').controller('PhotoEditController', function ($scope, $rootScope, $resource, $q, album, albumAPIService, imageService) {
    var photoAlbum = album('galleries_images');
    var publicIds = [];
    var photoList = function () {
        if (!$rootScope.serviceCalled) {
            return photoAlbum.photos({}, function (v) {
                $rootScope.serviceCalled = true;
                angular.forEach(v.resources, function (value, key) {
                    /*console.log('----------------');
                     console.log('key: '+key);
                     console.log('value: '+value);
                     console.log('----------------');*/
                    publicIds.push(value.public_id);
                });
                $rootScope.photos = v.resources;
                console.log(publicIds);
            });
        } else {
            return $q.when(true);
        }
    };
    //photoList();
    //$scope.photoList = photoList;

    /*if ($rootScope.photos.length > 0){

     }*/
});
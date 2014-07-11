'use strict';
angular.module('umichAdpiApp').controller('photoUploadCtrl', function ($scope, $rootScope, $location, imageCreateService) {
    var imageDBStore = imageCreateService;

    $scope.widget = $(".cloudinary_fileupload")
        .cloudinary_fileupload()
        .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, {tags: 'galleries_images', context: 'photo='}, {
            // Uncomment the following lines to enable client side image resizing and valiation.
            // Make sure cloudinary/processing is included the js file
            //disableImageResize: false,
            //imageMaxWidth: 800,
            //imageMaxHeight: 600,
            //acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
            //maxFileSize: 20000000, // 20MB
            dropZone: "#direct_upload",
            start: function (e) {
                $scope.status = "Starting upload...";
                $scope.$apply();
            },
            fail: function (e, data) {
                $scope.status = "Upload failed";
                $scope.$apply();
            }
        })
        .on("cloudinaryprogressall", function (e, data) {
            $scope.progress = Math.round((data.loaded * 100.0) / data.total);
            $scope.status = "Uploading... " + $scope.progress + "%";
            $scope.$apply();
        })
        .on("cloudinarydone", function (e, data) {
            $rootScope.photos = $rootScope.photos || [];
            console.log('data.result = ' + data.result);
            data.result.context = {custom: {photo: $scope.title}};
            $scope.result = data.result;
            imageDBStore.saveImage(data.result.public_id, data.result.url);
            $rootScope.photos.push(data.result);
            $scope.$apply();
        });
    // Receiving error - cannot call methods on fileupload prior to initialization; attempted to call method 'option'
    // fixed according to https://github.com/blueimp/jQuery-File-Upload/issues/1980

    $scope.widget.updateTitle = function () {
        var uploadParams = $scope.widget.fileupload('option', 'formData');
        console.log('uploadParams = ' + uploadParams);
        console.log('uploadParams[context] = ' + uploadParams["context"]);
        uploadParams["context"] = "photo=" + $scope.title;
        console.log('uploadParams = ' + uploadParams);
        $scope.widget.fileupload('option', 'formData', uploadParams);
    };

});
var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('AppCtrl', ['$scope', '$http', '$uibModal', 'SchoolService', function ($scope, $http, $uibModal, SchoolService) {

    $scope.animationsEnabled = true;
    $scope.schoolList = [];

    var refresh = function () {
        $http.get('/schools').success(function (response) {
            console.log("data are here");
            $scope.schoolList = response;
            $scope.school = "";
        });
    };
    refresh();

    // add school service
    $scope.addSchool = function () {

        SchoolService.addSchool($scope.school,function(school){
            $scope.schoolList.push(school);
        });

        $scope.school = {};
    };

    // delete school service

    $scope.remove = function (school) {
        console.log(school);
        var id = school._id;
        $http.delete('/schools/' + id).success(function (response) {
            for (var i = 0; i < $scope.schoolList.length; i++) {
                if ($scope.schoolList[i]._id == id) {
                    var index = i;
                }
            }
            $scope.schoolList.splice(index, 1);
        });
    };

    // update school service

    $scope.edit = function (school) {
        $scope.open(school);
    };
    $scope.update = function () {
        console.log($scope.school._id);
        $http.put('/schools/' + $scope.school._id, $scope.school).success(function (response) {
            for (var i = 0; i < $scope.schoolList.length; i++) {
                if ($scope.schoolList[i]._id == $scope.school._id) {
                    $scope.schoolList[i] = $scope.school;
                }
            }
            $scope.school = {};
        })
    };

    $scope.deselect = function () {
        $scope.school = "";
    };
    $scope.open = function (school) {
        var schoolCopy = school;

        //this line is used to do the differentiation between update and Add new school

        var modEdit = (school != null) ? true : false;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/formSchool.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                school: function () {
                    return schoolCopy;
                },
                modEdit: function () {
                    return modEdit;
                }
            }
        });
        modalInstance.result.then(function (school) {
            $scope.school = school;
            if (modEdit) {
                $scope.update();
            } else {
                $scope.addSchool();
            }
        }, function () {

        });
    };


}]);

// this is the controller for our Modal used for Add & Update
myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, school, modEdit) {
    $scope.modEdit = modEdit;
    $scope.school = school;

    $scope.ok = function () {
        $uibModalInstance.close($scope.school);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

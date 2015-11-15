/**
 * Created by Rafaa on 14/11/2015.
 */

myApp.service('SchoolService' ,function ($http) {

    this.addSchool = function(school,callback){
        $http.post('/schools',school).success(function (response) {
            callback(response);
        });
    }

});

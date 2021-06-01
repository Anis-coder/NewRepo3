
app.service('CustomerService', function ($http) {

    this.GetAll = function (apiroute) {
        return $http.get(apiroute);
    }
    this.GetById = function (apiroute,id) {
        return $http.get(apiroute+'/'+id);
    }

    this.CreateCustomer = function (apiroute, model) {
        return $http({
            method: "post",
            url: apiroute,
            data: model
        });
    }
    this.UpdateCustomer = function (apiroute, model) {
        return $http({
            method: "put",
            url: apiroute,
            data: model
        });
    }
    this.DeleteCustomer = function (apiroute) {
        return $http({
            method: "delete",
            url: apiroute
            
        });
    }

});

app.controller('customerctrl', ['$scope', 'CustomerService',

    function ($scope, CustomerService) {

        $scope.btnText = 'Save';

        $scope.getCustomer = function () {

            var customer = CustomerService.GetAll('https://localhost:44395/api/Values/');
                customer.then(function (result) {
                    $scope.customers = result.data;
                })
        }

        $scope.getCustomerById = function (id) {

            var customer = CustomerService.GetById('https://localhost:44395/api/Values',id);
            customer.then(function (result) {
                $scope.custId = result.data.CustId;
                $scope.fName = result.data.FirstName;
                $scope.lName = result.data.LastName;
                $scope.email = result.data.Email;
                $scope.phone = result.data.Phone
                               
                $scope.btnText = 'Update'
            })
        }

        $scope.deleteCustomer = function (id) {

            var customer = CustomerService.DeleteCustomer('https://localhost:44395/api/Values/'+id);
            customer.then(function (result) {
                $scope.getCustomer();
                alert('Customer deleted Succesfully.');
            })
        }

        $scope.CreateOrUpdateCustomer = function () {

            var data = {
                FirstName: $scope.fName,
                LastName: $scope.lName,
                Email: $scope.email,
                Phone: $scope.phone,
                CustomerStatus: 'Active',
                CustId: $scope.custId
            }
            if ($scope.btnText == 'Save') {
                

                var customer = CustomerService.CreateCustomer('https://localhost:44395/api/Values/Post', data);
                customer.then(function (result) {

                    $scope.getCustomer();
                    clear();
                    alert('Customer added Succesfully.');
                   

                })
            }
            else {
                var customer = CustomerService.UpdateCustomer('https://localhost:44395/api/Values/Put', data);
                customer.then(function (result) {
                    clear();
                    $scope.getCustomer();
                  
                    alert('Customer Updated Succesfully');
                   
                    $scope.btnText = 'Save';
                })
            }
        }

        $scope.getCustomer();

        function clear() {
            $scope.fName = '',
            $scope.lName = '',
            $scope.email = '',
            $scope.phone=''
        }
    }
]);
export default class BaseController {
    constructor($scope) {
        this.__$scope = $scope;
    }

    $watch() {
        return this.__$scope.$watch(...arguments);
    }


}
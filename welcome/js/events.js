
function EventsCtrl($scope, $window, $rootElement, $http, $filter) {
  $scope.events = [];
  $scope.table = [];

  date = new Date();

  // Lets show events until 12 hours after the event.
  date.setHours(date.getHours() - 12);


  var year = $filter('date')(date, 'yyyy');
  var month = $filter('date')(date, 'MM');
  var day = $filter('date')(date, 'dd');

  var url = 'https://hsbxl.be/Special:Ask/-5B-5BCategory:TechTue-7C-7CEvent-5D-5D-20-5B-5BEnd-20date::-3E' + year + '-2D' + month + '-2D' + day + '-20-5D-5D/-3FStart-20date/-3FEnd-20date/-3FLocation/format%3Djson/sort%3D-5BStart-20date-5D/order%3Dasc/offset%3D0';

  $http({method: 'GET', url: url}).
            success(function(data, status, headers, config) {

                var row = [];
                angular.forEach(data.results, function(value, key){
                  data.results[key].start = data.results[key].printouts['Start date'][0];
                  data.results[key].printouts['Start date'][0] = data.results[key].printouts['Start date'][0] * 1000;
                  data.results[key].printouts['Start date'][0] = $filter('date')(data.results[key].printouts['Start date'][0], 'dd MMM');
                  row = {
                    date: data.results[key].printouts['Start date'][0],
                    event: data.results[key].fulltext,
                    url: data.results[key].fullurl
                  };
                  $scope.table.push(row);
                });
                $scope.events = data.results;
            });

  $scope.eventGrid = {
    data: 'table',
    columnDefs: [
      {field: 'date', displayName: 'Date'},
      {field: 'event', displayName: 'Event', cellTemplate: '<a href="{{row.getProperty(\'url\')}}">{{row.getProperty(col.field)}}</a>'},
    ]
  };

}

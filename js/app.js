var app = angular.module("sampleApp", [ "ngCookies"]);


app.filter('humanize', function(){
  return function(text) {
    if(text) {
      var string = text.split("_").join(" ").toLowerCase();
      var string = string.charAt(0).toUpperCase() + string.slice(1);
      return string
    };
  };
});

app.factory('NewsFeed', ['$timeout', '$http', '$q', function ($timeout, $http, $q) {
    var service = {
      hackerNews: {
        get: function(query, mode){
          var deferred = $q.defer();
          // Can use mode popular or latest
          var defaultMode = "search_by_date";
          if (angular.isDefined(mode)) defaultMode = mode;
          var queryUrl =  "http://hn.algolia.com/api/v1/" + defaultMode;
          
          $http({method: 'GET', url: queryUrl, params: {query: query, tags: "story"}}).
            then(function(response) {
              deferred.resolve(response);
            }, function(response) {
              deferred.reject(response);
          });
          return deferred.promise;
        }
      },
      githubNews: {
        get: function(query, sort, order, date){
          var deferred = $q.defer();
          var queryUrl =  "https://api.github.com/search/repositories";
          var sort = sort || "stars";
          var order = order || "desc";
          // Complete documentation https://developer.github.com/v3/

          $http({method: 'GET', url: queryUrl, params: {q: query, sort: sort, order: order, created: ">2016-02-01"}}).
            then(function(response) {
              deferred.resolve(response);
            }, function(response) {
              deferred.reject(response);
          });
          return deferred.promise;
        }
      },
      jobNews: {
        get: function(query){
          var deferred = $q.defer();
          var queryUrl =  "https://spreadsheets.google.com/feeds/list/1MOBmMhtOMgvBHtGdCqgjv1P_tenSIOBbqPB9Cq67EJ0/1/public/values?alt=json";

          $http({method: 'GET', url: queryUrl}).
            then(function(response) {
              deferred.resolve(response);
            }, function(response) {
              deferred.reject(response);
          });
          return deferred.promise;
        }
      }


    };
    return service;
}]);

app.controller("SampleCtrl", ["$scope", "$http", "$timeout", "NewsFeed",
  function($scope, $http, $timeout, NewsFeed) {

      $scope.news = {
        hackerNews:{
          search: {
            mode: "search_by_date"
          }
        },
        githubNews:{
          search: {
            mode: "updated"
          }
        }, 
        jobsNews: {}
      };

      var searchQuery = "angularjs";

      function addMonths(date, months) {
        date.setMonth(date.getMonth() + months);
        return date;
      }

      $scope.getGithubNews = function(){
        var beforeDate =  addMonths(new Date(), -6);
        NewsFeed.githubNews.get(searchQuery, $scope.news.githubNews.search.mode, 'desc', beforeDate).then(function(results){
          $scope.news.githubNews.data = results.data.items;
        })
      }

      $scope.getHackerNews = function(){
        NewsFeed.hackerNews.get(searchQuery, $scope.news.hackerNews.search.mode ).then(function(results){
          $scope.news.hackerNews.data = results.data.hits;
        })
      }

      $scope.getJobNews = function(){
          NewsFeed.jobNews.get().then(function(results){
            $scope.news.jobsNews.data = results.data.feed.entry;
        })
      }

      function init(){
        $scope.getJobNews();
        $scope.getGithubNews();
        $scope.getHackerNews();
      }

      init();
      
  }
]);

$('body').attr('ng-controller', 'SampleCtrl');

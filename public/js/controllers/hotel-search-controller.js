
// hotel search controller

app.controller('hotelSearch', ['$scope', 'apiCall', function($scope, apiCall) {

  /* stand alone functions to handle api call
     success results
  */
 
  // function for review saving...
  function reviewSuccess(data) {
    $scope.name = '';
    $scope.comment = '';
    // review added success modal to be called from here...
  }



  $scope.openBookingModal = function() {
    $('#booking').openModal();
  };
  $scope.closeBookingModal = function() {
    $('#booking').closeModal();
  };



  // handle the add reviews modal box operations
  $scope.openAddReviewModal = function(hotel) {
    $scope.hotelId = hotel._id;
    $('#addReviews').openModal();
  };

  $scope.saveReviewModal = function(hotelId) {
    if (!$scope.name || !$scope.comment) {
      $scope.reviewErrorMessage = 'Name and Comment are required';
      return;
    }
    // construct the url
    var url = '/api/hotels/reviews/' + hotelId;
    // build the request object
    var reqObject = {
      name: $scope.name,
      review: $scope.comment
    }

    // make the api call to send request to save review in database
    apiCall.saveReview(url, reqObject).success(reviewSuccess);
    $('#addReviews').closeModal();
  };



  // handle the review modal box operations
  $scope.openViewReviewsModal = function(hotel) {

    // clear error message and review array
    $scope.reviewReport = '';
    $scope.reviews = [];
    
    // build the api url
    var url = '/api/hotels/' + hotel._id;

    // make the api call
    apiCall.hotelSearch(url).success( function (data) {
      if (data.reviews.length === 0) {
        $scope.reviewReport = 'No Reviews.';
        $('#viewReviews').openModal();
      } else {
        $scope.reviews = data.reviews;
        $('#viewReviews').openModal();
      }
    }).error(function(err) {
      $scope.error = 'We can\'t fetch the reviews at the moment. Please try again...';
    });
  };


  $scope.closeViewReviewsModal = function() {
    $('#viewReviews').closeModal();
  };

}]);
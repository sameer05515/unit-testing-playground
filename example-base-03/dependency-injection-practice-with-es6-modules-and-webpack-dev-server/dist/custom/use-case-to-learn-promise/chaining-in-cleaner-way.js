/******/ (() => { // webpackBootstrap
/*!*********************************************************************************!*\
  !*** ./src/scripts/custom/use-case-to-learn-promise/chaining-in-cleaner-way.js ***!
  \*********************************************************************************/
var btn = document.createElement("button");
btn.innerText = "Fetch Data";
var step = 1;
var success = false;
var logValue = function logValue(val, stepMessage) {
  console.log(stepMessage, val);
  step++;
  return val;
};
var handleError = function handleError(err, stepMessage) {
  console.error(stepMessage, err);
  throw err;
};
var fetchUserData = function fetchUserData() {
  return fetch('https://jsonplaceholder.typicode.com/users/1').then(function (response) {
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  }).then(function (data) {
    return logValue(data, "User data:");
  })["catch"](function (err) {
    return handleError(err, "Error in fetching user data:");
  });
};
var fetchUserPosts = function fetchUserPosts(user) {
  return fetch("https://jsonplaceholder.typicode.com/posts?userId=".concat(user.id)).then(function (response) {
    if (!response.ok) {
      throw new Error('Failed to fetch user posts');
    }
    return response.json();
  }).then(function (posts) {
    return logValue(posts, "User posts:");
  })["catch"](function (err) {
    return handleError(err, "Error in fetching user posts:");
  });
};
var fetchPostComments = function fetchPostComments(posts) {
  return fetch("https://jsonplaceholder.typicode.com/comments?postId=".concat(posts[0].id)).then(function (response) {
    if (!response.ok) {
      throw new Error('Failed to fetch post comments');
    }
    return response.json();
  }).then(function (comments) {
    return logValue(comments, "Post comments:");
  })["catch"](function (err) {
    return handleError(err, "Error in fetching post comments:");
  });
};
var clickHandler = function clickHandler() {
  console.clear();
  fetchUserData().then(function (user) {
    return fetchUserPosts(user);
  }).then(function (posts) {
    return fetchPostComments(posts);
  }).then(function (comments) {
    console.log("All fetch operations succeeded");
    success = true;
  })["catch"](function (err) {
    return console.error(err);
  })["finally"](function () {
    if (success) {
      console.log("Job done!!");
    } else {
      console.error("Job failed in step: ".concat(step));
    }
    success = false; // Reset success flag for next click
    step = 1; // Reset step counter for next click
  });
};
btn.addEventListener("click", clickHandler);
document.body.appendChild(btn);
/******/ })()
;
//# sourceMappingURL=chaining-in-cleaner-way.js.map
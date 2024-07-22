const btn = document.createElement("button");
btn.innerText = "Fetch Data";
let step = 1;
let success = false;

const logValue = (val, stepMessage) => {
  console.log(stepMessage, val);
  step++;
  return val;
};

const handleError = (err, stepMessage) => {
  console.error(stepMessage, err);
  throw err;
};

const fetchUserData = () => {
  return fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then(data => logValue(data, "User data:"))
    .catch(err => handleError(err, "Error in fetching user data:"));
};

const fetchUserPosts = (user) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user posts');
      }
      return response.json();
    })
    .then(posts => logValue(posts, "User posts:"))
    .catch(err => handleError(err, "Error in fetching user posts:"));
};

const fetchPostComments = (posts) => {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch post comments');
      }
      return response.json();
    })
    .then(comments => logValue(comments, "Post comments:"))
    .catch(err => handleError(err, "Error in fetching post comments:"));
};

const clickHandler = () => {
  console.clear();

  fetchUserData()
    .then(user => fetchUserPosts(user))
    .then(posts => fetchPostComments(posts))
    .then(comments => {
      console.log("All fetch operations succeeded");
      success = true;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      if (success) {
        console.log("Job done!!");
      } else {
        console.error(`Job failed in step: ${step}`);
      }
      success = false; // Reset success flag for next click
      step = 1; // Reset step counter for next click
    });
};

btn.addEventListener("click", clickHandler);
document.body.appendChild(btn);

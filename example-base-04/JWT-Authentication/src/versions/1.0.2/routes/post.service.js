const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Prem",
    title: "Post 2",
  },
];

exports.getPosts = (username) => {
  const filteredPosts = posts.filter((post) => post.username === username);
  return filteredPosts;
};

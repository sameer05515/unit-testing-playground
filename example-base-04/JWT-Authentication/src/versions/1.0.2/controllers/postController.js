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
  
  exports.getPosts = (req, res) => {
    const filteredPosts = posts.filter((post) => post.username === req.user.name);
    res.json({ data: filteredPosts, timeStamp: new Date().toString() });
  };
  
const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Prem",
    title: "Post 2",
  },
  {
    username: "Alice",
    title: "Post 3 - Exploring JavaScript",
  },
  {
    username: "John",
    title: "Post 4 - My First Node.js App",
  },
  {
    username: "Sara",
    title: "Post 5 - React Tips and Tricks",
  },
  {
    username: "Mike",
    title: "Post 6 - Understanding Express Middleware",
  },
  {
    username: "Priya",
    title: "Post 7 - Introduction to TypeScript",
  },
  {
    username: "Alex",
    title: "Post 8 - Handling API Requests in React",
  },
  {
    username: "Emma",
    title: "Post 9 - Deploying with Docker",
  },
  {
    username: "Liam",
    title: "Post 10 - Building a REST API with Spring Boot",
  },
  {
    username: "Olivia",
    title: "Post 11 - Next.js for Beginners",
  },
  {
    username: "David",
    title: "Post 12 - Securing APIs with JWT",
  },
  {
    username: "Sophia",
    title: "Post 13 - Working with MongoDB and Mongoose",
  },
  {
    username: "James",
    title: "Post 14 - Frontend vs Backend Development",
  },
  {
    username: "Lucas",
    title: "Post 15 - Setting Up CI/CD with Jenkins",
  },
  {
    username: "Isabella",
    title: "Post 16 - Understanding Redux State Management",
  },
  {
    username: "Ethan",
    title: "Post 17 - REST vs GraphQL",
  },
  {
    username: "Mia",
    title: "Post 18 - Writing Unit Tests with Jest",
  },
  {
    username: "Noah",
    title: "Post 19 - Serverless Architecture Explained",
  },
  {
    username: "Ava",
    title: "Post 20 - Exploring WebSockets for Real-Time Apps",
  }
];


exports.getPosts = (username) => {
  const filteredPosts = posts.filter((post) => post.username === username);
  return filteredPosts;
};


const testPosts = {
  user: { displayName: 'Eric Song', },
  timestamp: Date.now(),
  message: 'I have saved $3 since yesterday!',
  reactions: {
    likes: 1,
    heart: 2,
    ugly: 99999,
  },
};

export const db = {
  getPosts: (user) => {
    return Array(5).map(() => testPosts);
  }
}
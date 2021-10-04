import faker from "faker";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

/*
  Good quality code with nice variable names and 
  nice function names often doesn't need many
  comments to help readers understand it.

  Question: Is this code understandable?
*/

export default async function seed() {
  await Post.deleteMany({}).exec();
  await Comment.deleteMany({}).exec();

  const fakePosts = [];

  for (let i = 6; --i; ) {
    const post = new Post({
      author: faker.internet.userName(),
      content: faker.lorem.sentence(),
      image: faker.image.image(),
      // QUESTION: Why don't I need to give a value to totalComments here?
      comments: [],
    });
    await post.save();
    fakePosts.push(post);
  }

  for (let i = 0; i < fakePosts.length; i++) {
    const post = fakePosts[i];
    for (let j = 0; j < faker.datatype.number(12); j++) {
      const comment = new Comment({
        author: faker.internet.userName(),
        content: faker.lorem.sentence(),
        postId: post._id,
      });
      await post.addComment(comment);
    }
  }
}

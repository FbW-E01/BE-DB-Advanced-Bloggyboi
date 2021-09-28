function Comment({ comment }) {
  return (
    <p>
      <b>{comment.author}</b> {comment.content}
    </p>
  );
}

export default function Post({ post }) {
  return (
    <div className="post">
      <img src={post.image} alt="" />
      <p>
        <b>{post.author}</b> {post.content}
      </p>
      <p>
        <span className="tag">#catsofdci</span>
        <span className="tag">#kittywebdev</span>
        <span className="tag">#😺</span>
      </p>
      <p className="commentLink">
        {post.totalComments > 3 && <>View all {post.totalComments} comments</>}
      </p>
      {post.totalComments > 0 && (
        <div className="comments">
          {post.comments?.map((c) => (
            <Comment key={c._id} comment={c} />
          ))}
        </div>
      )}
    </div>
  );
}

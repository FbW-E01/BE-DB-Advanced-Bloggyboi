import { useState } from 'react';

function Comment({ comment }) {
  return (
    <p>
      <b>{comment.author}</b> {comment.content}
    </p>
  );
}

export default function Post({ post }) {
  const [comments, setComments] = useState(post.comments);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  function handleClick() {
    const url = "http://localhost:8080/post/"+post._id+"/comments";

    fetch(url)
      .then(response => response.json())
      .then(allComments => setComments(allComments))
      .catch(error => {
        alert("Oh no! An error happened! Please try again. If the problem persists, contact support at 555-123-456 :)");
        console.error(error);
      })
  }

  function addComment() {
    const url = "http://localhost:8080/post/"+post._id+"/comments";
    const payload = { author, content };
    const config = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    }

    fetch(url, config)
      .then(res => res.json())
      .then(newComment => {
        if (newComment.error) {
          // do something
        }
        console.log(newComment);
        setComments([...comments, newComment])
      })
      .catch(error => {
        alert("Oh no!!!!!");
        console.error(error);
      })
  }

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
      <div className="addComment">
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} /><br/>
        <textarea value={content} onChange={e => setContent(e.target.value)}></textarea><br/>
        <button onClick={addComment}>Add comment</button>
      </div>
      <p className="commentLink" onClick={handleClick}>
        {post.totalComments > 3 && <>View all {post.totalComments} comments</>}
      </p>
      <div className="comments">
        {comments.map(c => <Comment key={c._id} comment={c} />)}
      </div>
    </div>
  );
}

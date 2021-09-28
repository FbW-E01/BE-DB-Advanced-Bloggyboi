import { useEffect, useState } from "react";
import Post from "./components/Post.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/posts')
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return "Loading...";
  }

  return (
    <div className="posts">
      {posts?.map(p => <Post key={p._id} post={p} />)}
    </div>
  );
}

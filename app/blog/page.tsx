export default function Blog() {
  const posts = [
    { id: 1, title: "First Blog Post", excerpt: "This is the first post." },
    { id: 2, title: "Second Blog Post", excerpt: "Another interesting story." },
    { id: 3, title: "Final Thoughts", excerpt: "Concluding the blog list." }
  ];

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: "1.5rem" }}>
            <a href={`/blog/${post.id}`} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>
              {post.title}
            </a>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

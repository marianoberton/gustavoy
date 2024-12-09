type Post = {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    slug: string;
  };
  
  export default function LatestPosts({ posts }: { posts: Post[] }) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Últimas publicaciones</h2>
        {posts.length > 0 ? (
          <ul className="grid md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <li key={post.id} className="border p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{post.title.rendered}</h3>
                <div
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <a
                  href={`/posts/${post.slug}`}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Leer más
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </section>
    );
  }
  
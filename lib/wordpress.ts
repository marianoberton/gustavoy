import { fetch, Agent } from "undici";
import querystring from "query-string";
import "dotenv/config";

import {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
} from "./wordpress.d";

// WordPress Config
const baseUrl = process.env.WORDPRESS_URL;
const username = process.env.WORDPRESS_USER;
const password = process.env.WORDPRESS_PASSWORD;

// Configuración para forzar IPv4
const agent = new Agent({
    keepAliveTimeout: 60000, // Ajusta el tiempo de inactividad antes de cerrar conexión
    connect: {
      family: 4,
    }
  });
  

// Validación de configuración
if (!baseUrl || !username || !password) {
  throw new Error(
    "WORDPRESS_URL, WORDPRESS_USER o WORDPRESS_PASSWORD no están definidos en las variables de entorno."
  );
}

// Función para obtener URLs con parámetros
function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? querystring.stringify(query) : null;
  return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

// Función para realizar peticiones con autenticación
async function fetchWithAuth(url: string): Promise<any> {
  const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString(
    "base64"
  )}`;

  const response = await fetch(url, {
    headers: {
      Authorization: authHeader,
      Accept: "application/json",
    },
    dispatcher: agent, // Para IPv4
  });

  if (!response.ok) {
    throw new Error(
      `Error al realizar la petición: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}


// WordPress Functions

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
}): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", {
    author: filterParams?.author,
    tags: filterParams?.tag,
    categories: filterParams?.category,
  });
  return await fetchWithAuth(url);
}

export async function getPostById(id: number): Promise<Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  return await fetchWithAuth(url);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const url = getUrl("/wp-json/wp/v2/posts", { slug });
  const posts = await fetchWithAuth(url);
  return posts[0];
}

export async function getAllCategories(): Promise<Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories");
  return await fetchWithAuth(url);
}

export async function getCategoryById(id: number): Promise<Category> {
  const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
  return await fetchWithAuth(url);
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const url = getUrl("/wp-json/wp/v2/categories", { slug });
  const categories = await fetchWithAuth(url);
  return categories[0];
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { categories: categoryId });
  return await fetchWithAuth(url);
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tagId });
  return await fetchWithAuth(url);
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", { post: postId });
  return await fetchWithAuth(url);
}

export async function getAllTags(): Promise<Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags");
  return await fetchWithAuth(url);
}

export async function getTagById(id: number): Promise<Tag> {
  const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
  return await fetchWithAuth(url);
}

export async function getTagBySlug(slug: string): Promise<Tag> {
  const url = getUrl("/wp-json/wp/v2/tags", { slug });
  const tags = await fetchWithAuth(url);
  return tags[0];
}

export async function getAllPages(): Promise<Page[]> {
  const url = getUrl("/wp-json/wp/v2/pages");
  return await fetchWithAuth(url);
}

export async function getPageById(id: number): Promise<Page> {
  const url = getUrl(`/wp-json/wp/v2/pages/${id}`);
  return await fetchWithAuth(url);
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const url = getUrl("/wp-json/wp/v2/pages", { slug });
  const pages = await fetchWithAuth(url);
  return pages[0];
}

export async function getAllAuthors(): Promise<Author[]> {
  const url = getUrl("/wp-json/wp/v2/users");
  return await fetchWithAuth(url);
}

export async function getAuthorById(id: number): Promise<Author> {
  const url = getUrl(`/wp-json/wp/v2/users/${id}`);
  return await fetchWithAuth(url);
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  const url = getUrl("/wp-json/wp/v2/users", { slug });
  const authors = await fetchWithAuth(url);
  return authors[0];
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { author: authorId });
  return await fetchWithAuth(url);
}

export async function getPostsByAuthorSlug(
  authorSlug: string
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { author: author.id });
  return await fetchWithAuth(url);
}

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  const url = getUrl("/wp-json/wp/v2/posts", { categories: category.id });
  return await fetchWithAuth(url);
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tag.id });
  return await fetchWithAuth(url);
}

export async function getFeaturedMediaById(
  id: number
): Promise<FeaturedMedia> {
  const url = getUrl(`/wp-json/wp/v2/media/${id}`);
  return await fetchWithAuth(url);
}

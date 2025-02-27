import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

const blogDirectory = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDirectory);
const posts = files.map((file) => {
  const fullPath = path.join(blogDirectory, file);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const { attributes } = frontMatter(content);
  const slug = file.replace('.md', '');
  return {
    slug,
    ...attributes,
  };
});

fs.writeFileSync(
  'src/data/blogPosts.json',
  JSON.stringify(posts, null, 2),
  'utf-8'
);
console.log('Blog posts generated successfully.');

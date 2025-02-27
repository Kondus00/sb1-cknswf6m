import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDirectory = path.join(__dirname, 'src/content/blog');
const outputDirectory = path.join(__dirname, 'src/data');

try {
  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const files = fs.readdirSync(blogDirectory);
  const posts = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(blogDirectory, file), 'utf-8');
      const [, frontMatter = ''] = content.split('---');
      const metadata = {};
      
      frontMatter.split('\n').forEach(line => {
        const [key, ...value] = line.split(':');
        if (key && value.length) {
          metadata[key.trim()] = value.join(':').trim();
        }
      });

      return {
        slug: file.replace('.md', ''),
        title: metadata.title || '',
        date: metadata.date || '',
        description: metadata.description || ''
      };
    });

  fs.writeFileSync(
    path.join(outputDirectory, 'blogPosts.json'),
    JSON.stringify(posts, null, 2),
    'utf-8'
  );

  console.log('Blog posts generated successfully.');
} catch (error) {
  console.error('Error generating blog posts:', error);
  process.exit(1);
}
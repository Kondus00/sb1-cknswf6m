const fs = require('fs').promises;
const path = require('path');

// Ścieżka do pliku JSON i folderu docelowego
const jsonPath = path.join(__dirname, 'data', 'blogPosts.json');
const outputDir = path.join(__dirname, 'content', 'blog');

async function generateMarkdownPosts() {
  try {
    // Utwórz folder 'content/blog', jeśli nie istnieje
    await fs.mkdir(outputDir, { recursive: true });

    // Odczytaj dane z blogPosts.json
    const blogPostsData = require(jsonPath);

    // Przetwórz każdy post i wygeneruj plik Markdown
    for (const post of blogPostsData) {
      const { slug, title, description, date } = post;

      // Szablon Markdown z Front Matter
      const markdownContent = `---
title: ${title}
slug: ${slug}
description: ${description}
date: ${date}
---

# ${title}

${description}
`;

      // Ścieżka pliku wyjściowego
      const filePath = path.join(outputDir, `${slug}.md`);

      // Zapisz plik Markdown
      await fs.writeFile(filePath, markdownContent, 'utf8');
      console.log(`Wygenerowano plik: ${filePath}`);
    }

    console.log('Wszystkie posty zostały wygenerowane pomyślnie!');
  } catch (error) {
    console.error('Błąd podczas generowania postów:', error);
  }
}

// Uruchom skrypt
generateMarkdownPosts();

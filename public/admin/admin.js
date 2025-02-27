import CMS from '@staticcms/core'; // Zmiana tutaj!

CMS.init({
  config: {
    backend: {
      name: 'github', // Używasz GitHub jako backendu
      repo: 'kondus00/sb1-cknswf6m', // Twoje repozytorium
      branch: 'main', // Główna gałąź (dostosuj, jeśli używasz innej)
    },
    media_folder: 'public/images', // Folder na media
    public_folder: '/images', // Ścieżka publiczna dla mediów
    collections: [
      {
        name: 'blog',
        label: 'Blog',
        folder: 'content/blog', // Folder z postami
        create: true,
        fields: [
          { label: 'Title', name: 'title', widget: 'string' },
          { label: 'Date', name: 'date', widget: 'datetime' },
          { label: 'Description', name: 'description', widget: 'string' },
          { label: 'Body', name: 'body', widget: 'markdown' },
        ],
      },
    ],
  },
});
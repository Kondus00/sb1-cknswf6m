import CMS from 'decap-cms';

CMS.init({
  config: {
    backend: {
      name: 'github',
      repo: 'kondus00/sb1-cknswf6m', // Upewnij się, że to poprawne repozytorium
      branch: 'main', // Upewnij się, że to Twoja główna gałąź
    },
    media_folder: 'public/images/uploads',
    public_folder: '/images/uploads',
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        folder: 'content/blog',
        create: true,
        slug: '{{slug}}',
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
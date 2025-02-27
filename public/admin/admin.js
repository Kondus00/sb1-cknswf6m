import CMS from 'decap-cms'; // Zmienione z @decaporg/decap-cms na decap-cms

CMS.init({
  config: {
    backend: {
      name: 'github', // lub 'gitlab', 'bitbucket' – wybierz swój host Git
      repo: 'Kondus00/sb1-cknswf6m', // np. 'twoje-uzytkownik/dialog-ai-website'
      branch: 'main', // lub 'master', w zależności od Twojej gałęzi
      auth_endpoint: 'https://api.github.com',
  app_id: 'Ov23liDeTCLKTO8SnMdo',
  app_secret: '7a39209ab6e05eb25a2b80dc9f664c588a21ee72',
    },
    media_folder: 'public/images', // Folder dla mediów (np. zdjęcia w blogach)
    public_folder: '/images', // Publiczna ścieżka dla mediów
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
import i18n from './src/i18n'

export const onCreatePage = async ({ page, actions: { createPage, deletePage, createRedirect } }) => {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  const originalPath = page.path;

  await deletePage(page);

  await Promise.all(
    i18n.options.supportedLngs.filter(lang => lang != 'cimode').map(async lang => {
      const localizedPath = `/${lang}${page.path}`;

      await createPage({
        ...page,
        path: localizedPath,
        context: {
          ...page.context,
          originalPath,
          lang,
        },
      });
    })
  );

  createRedirect({
    fromPath: originalPath,
    toPath: `/${i18n.options.fallbackLng}${page.path}`,
    isPermanent: true,
    redirectInBrowser: isEnvDevelopment,
    statusCode: 301
  });
};

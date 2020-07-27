import i18next from 'i18next';

i18next
  .use({
    type: 'backend',
    init: function (services, backendOptions, i18nextOptions) {
      this.services = services;
      this.options = {
        loadPath: './locales/{{lng}}/{{ns}}.json',
        ...backendOptions
      };
    },
    read: function (language, namespace, callback) {
      const filename = this.services.interpolator.interpolate(this.options.loadPath, { lng: language, ns: namespace });
      try {
        const resources = require(`${filename}`);
        callback(null, resources);
      } catch (err) {
        let msg = `Cannot load resource: ${filename}`;
        if (typeof window === "undefined") {
          console.warn(`\u001b[A\u001b[1L\u001b[93mwarn \u001b[0m${msg}\u001b[B`)
        } else {
          console.warn(msg);
        }

        callback(err, null);
      }
    },
  })
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],

    ns: ['common'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18next;

export const config = {
  siteName: 'Umi Porject',
  copyright: 'Umi Porjec  ©2019 bruce.lc',
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login|\/404|\/projects/],
    },
  ],
};


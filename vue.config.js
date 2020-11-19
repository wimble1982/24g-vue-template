module.exports = {
  pages: {
    index: {
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Vue Template',

      // The following properties are Vue defaults, but required when using the
      // `pages` configuration.

      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        // Load SCSS variables and mixins to be used globally
        additionalData: `
          @import '@/assets/scss/_variables.scss';
          @import '@/assets/scss/_mixins.scss';
        `,
      },
    },
  },
  chainWebpack: (config) => {
    // SVG Loader
    // To use SVGs inline (<svg>), load them as you would any Vue component.
    // To use as images (<img>, url(...)), append `?external` to the filename.
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .oneOf('external')
      .resourceQuery(/external/)
      .use('file')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      })
      .end()
      .end()
      .oneOf('inline')
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        // SVG Optimizer options
        svgo: {
          plugins: [{ removeDimensions: true }, { removeViewBox: false }],
        },
      });
  },
};

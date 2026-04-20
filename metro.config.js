// Metro config — extends Expo's defaults to ensure .otf/.ttf/.woff font files
// are treated as bundleable assets. Expo's defaults already include these,
// but being explicit avoids surprises when new font file types are added.
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts = Array.from(
  new Set([...(config.resolver.assetExts ?? []), 'otf', 'ttf', 'woff', 'woff2']),
);

module.exports = config;

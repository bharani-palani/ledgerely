module: {
  rules: [
    // This would match almost any react-native module
    {
      test: /(@?react-(navigation|native)).*\.(ts|js)x?$/,
      include: /node_modules/,
      exclude: [/react-native-web/, /\.(native|ios|android)\.(ts|js)x?$/],
      loader: 'babel-loader'
    },
    // This would match ui-kitten
    {
        test: /@?(ui-kitten|eva-design).*\.(ts|js)x?$/,
        loader: 'babel-loader'
    }
  ]
}
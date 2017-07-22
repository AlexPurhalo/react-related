module.exports = {
	entry: "./entry.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
module: {
    rules: [
	    {
		    test: /\.js$/,
		    loader: 'babel-loader',
		    query: {
			    presets: [
			    	'es2015',
				    'babel-preset-react',
				    'babel-preset-es2015'
			    ]
		    }
	    },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
};

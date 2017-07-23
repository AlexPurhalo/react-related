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
		    exclude: /node_modules/,
		    loader: 'babel-loader',
		    query: {
			    presets: [
			    	'react', "es2015", "stage-0", "stage-1", "stage-2", "stage-3"
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

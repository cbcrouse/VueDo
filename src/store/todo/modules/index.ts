/**
 * Automatically imports all the modules and exports as a single module object
 */
const requireModule = require.context('.', false, /\.store\.ts$/);
const modules = {};

requireModule.keys().forEach(filename => {
	// create the module name from fileName
	// remove the store.ts extension and capitalize
	const moduleName: string = filename
						.replace(/(\.\/|\.store\.ts)/g, '')
						.replace(/^\w/, c => c.toUpperCase())

	// noImplicitAny has to be set to false in tsconfig.json for this to work.
	modules[moduleName] = requireModule(filename).default || requireModule(filename);
});

export default modules;
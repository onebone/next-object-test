requirejs.config({
	baseUrl: 'js/'
});

requirejs(['data'], (data) => {
	const shapes = new data.Shapes();
	const mouse = new data.MouseInformation();

	addEventListener('mousedown', () => {

	});
});

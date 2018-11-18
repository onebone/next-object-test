requirejs.config({
	baseUrl: 'js/'
});

requirejs(['data', 'shapes'], (data, shapes) => {
	const objs = new data.Objects();
	const mouse = new data.MouseInformation();

	objs.addCircle(new data.Vector2(100, 100), 100);
	objs.renderAll();

	addEventListener('mousedown', () => {

	});
});

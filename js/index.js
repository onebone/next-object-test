requirejs.config({
	baseUrl: 'js/'
});

requirejs(['data', 'shapes'], (data, shapes) => {
	const objs = new data.Objects('canvas');
	const mouse = new data.MouseInformation();

	objs.addCircle(new data.Vector2(10, 10), 100);
	objs.renderAll();

	addEventListener('mousedown', () => {

	});

	const canvas = objs.canvas;
	function resize() {
		canvas.setWidth(window.innerWidth);
		canvas.setHeight(window.innerHeight);
		canvas.renderAll();
	}

	addEventListener('resize', resize, objs.canvas);
	resize(canvas);
});

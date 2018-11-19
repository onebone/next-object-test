requirejs.config({
	baseUrl: 'js/'
});

requirejs(['data', 'shapes'], (data, shapes) => {
	const objs = new data.Objects('canvas');
	const mouse = new data.MouseInformation();

	objs.addCircle(new data.Vector2(10, 10), 100);
	objs.renderAll();

	addEventListener('mousedown', (e) => {
		if(e.button === 0) {
			const pos = new data.Vector2(e.clientX, e.clientY);

			mouse.hold = objs.pickObject(pos);
			mouse.prev = pos;
		}
	});

	addEventListener('mousemove', (e) => {
		if(mouse.hold) {
			const prev = mouse.prev;
			const dx = e.clientX - prev.x;
			const dy = e.clientY - prev.y;

			mouse.hold.move(dx, dy);

			prev.x += dx;
			prev.y += dy;

			objs.renderAll();
		}
	});

	addEventListener('mouseup', (e) => {
		if(e.button === 0) {
			mouse.hold = null;
		}
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

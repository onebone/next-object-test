requirejs.config({
	baseUrl: 'js/'
});

requirejs(['math', 'data', 'shapes'], (math, data, shapes) => {
	const objs = new data.Objects('canvas');
	const mouse = new data.MouseInformation();

	objs.addCircle(new math.Vector2(10, 10), 100);
	objs.renderAll();

	const canvas = objs.canvas;
	addEventListener('mousedown', (e) => {
		if(e.button === 0) {
			const pos = new math.Vector2(e.clientX, e.clientY);

			mouse.hold = objs.pickObject(pos);
			mouse.prev = pos;

			mouse.hold.createAnchors();
			mouse.hold.render(canvas);
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
			if(mouse.hold === null) {
				objs.removeAllAnchors();
			}

			mouse.hold = null;
		}
	});

	function resize() {
		canvas.setWidth(window.innerWidth);
		canvas.setHeight(window.innerHeight);
		canvas.renderAll();
	}

	addEventListener('resize', resize, objs.canvas);
	resize(canvas);
});

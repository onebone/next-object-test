define(['lib/fabric', 'shapes', 'lib/priority-q', 'config'], (f, shapes, PriorityQueue, Config) => {
	class Vector2 {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		add(x, y) {
			return new Vector2(this.x + x, this.y + y);
		}

		distance(pos) {
			let dx = this.x - pos.x;
			let dy = this.y - pos.y;

			return Math.sqrt(dx * dx + dy * dy);
		}
	}
	return {
		Vector2: Vector2,
		MouseInformation: class MouseInformation {
			constructor() {
				this.hold = null;
				this.prev = new Vector2(0, 0);
			}
		},
		Objects: class Objects {
			constructor(canvas) {
				this.objects = new PriorityQueue([], (a, b) => b.zIndex - a.zIndex);

				this.shapeId = 0;
				this.topZIndex = 0;
				this.canvas = new f.StaticCanvas(canvas);
			}

			addCircle(pos, radius, fill = Config.DefaultShapeColor) {
				const circle = new shapes.Circle(
					this.shapeId++,
					pos,
					this.topZIndex++,
					radius,
					fill
				);
				this.addObject(circle);
			}

			addObject(obj) {
				this.objects.enqueue(obj);
			}

			pickObject(pos) { // 마우스를 클릭했을 때 도형을 선택하는 함수
				let ret = null;
				this.objects.forEach(object => {
					if(object.isInside(pos)) {
						if(ret === null || ret.zIndex < object.zIndex) { // 가장 위에 있는 도형을 선택하기
							ret = object;
						}
					}
				});

				return ret;
			}

			renderAll() {
				this.objects.forEach(object => {
					object.render(this.canvas);
				});

				this.canvas.renderAll();
			}
		}
	};
});
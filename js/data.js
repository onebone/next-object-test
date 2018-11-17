define(() => {
	return {
		MouseInformation: class MouseInformation {
			constructor() {
				this.hold = null;
			}
		},
		Vector2: class Vector2 {
			constructor(x, y) {
				this.x = x;
				this.y = y;
			}

			distance(pos) {
				let dx = this.x - pos.x;
				let dy = this.y - pos.y;

				return Math.sqrt(dx * dx + dy * dy);
			}
		},
		Shapes: class Shapes {
			constructor() {
				/**
				 * @type {Shape[]}
				 */
				this.shapes = [];
			}

			pickShape(pos) { // 마우스를 클릭했을 때 도형을 선택하는 함수
				let ret = null;
				this.shapes.forEach(shape => {
					if(shape.isInside(pos)) {
						if(ret === null || ret.zIndex < shape.zIndex) { // 가장 위에 있는 도형을 선택하기
							ret = shape;
						}
					}
				});

				return ret;
			}
		}
	};
});
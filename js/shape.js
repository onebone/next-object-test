define(() => {
	class Shape {
		/**
		 * @param {Vector2} pos
		 * @param {Number} zIndex
		 */
		constructor(pos, zIndex) {
			this.pos = pos;
			this.zIndex = zIndex;
		}

		isInside(pos) {
			return false;
		}
	}

	return {
		Circle: class Circle extends Shape {
			constructor(pos, zIndex, radius) {
				super(pos, zIndex);

				this.radius = radius;
			}

			isInside(pos) {
				return this.pos.distance(pos) < this.radius;
			}
		}
	};
});
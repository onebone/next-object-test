define(['lib/fabric'], (f) => {
	class ShapeObject {
		/**
		 * @param {Number} id
		 * @param {Vector2} pos
		 * @param {Number} zIndex
		 */
		constructor(id, pos, zIndex) {
			this.id = id;
			this.pos = pos;
			this.zIndex = zIndex;

			this.rendered = false;
		}

		isInside(pos) {
			return false;
		}

		render(canvas) {}
	}

	return {
		Circle: class Circle extends ShapeObject {
			constructor(id, pos, zIndex, radius, fill) {
				super(id, pos, zIndex);

				this.radius = radius;
				this.fill = fill;

				this.obj = new f.Circle({
					radius: this.radius,
					left: this.pos.x,
					top: this.pos.y,
					fill: this.fill
				});
			}

			isInside(pos) {
				return this.pos.distance(pos) < this.radius;
			}

			render(canvas) {
				if(!this.rendered) {
					canvas.add(this.obj);

					this.rendered = true;
				}
			}

			remove(canvas) {
				if(this.rendered) {
					canvas.remove(this.obj);

					this.rendered = false;
				}
			}
		}
	};
});
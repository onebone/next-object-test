define(['lib/fabric', 'config'], (f, config) => {
	const ANCHOR_POSITION = [
		   0,
		1, 2, 3,
		4,    5,
		6, 7, 8
	];

	class Anchor {
		constructor(parent, pos) {
			this.parent = parent;

			this.obj = new f.Rect({
				fill:           config.AnchorColor,
				stroke:         config.AnchorStrokeColor,
				strokeWidth:    config.AnchorStrokeWidth,
				left: pos.x, top: pos.y,
				width: config.AnchorSize, height: config.AnchorSize
			});

			this.rendered = false;
		}

		render(canvas) {
			if(!this.rendered) {
				this.rendered = true;

				canvas.add(this.obj);
			}
		}

		remove(canvas) {
			if(this.rendered) {
				this.rendered = false;

				canvas.remove(this.obj);
			}
		}

		onParentMove(dx, dy) {
			const x = this.obj.get('left');
			const y = this.obj.get('right');
			this.obj.set({
				left: x + dx,
				top: y + dy
			});
		}
	}

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
			this.obj = null;

			this.rendered = false;
		}

		isInside(pos) {
			return false;
		}

		render(canvas) {}

		move(dx, dy) {
			this.pos.x += dx;
			this.pos.y += dy;

			this.obj.set({
				left: this.pos.x,
				top: this.pos.y
			});
		}
	}

	return {
		Circle: class extends ShapeObject {
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
				return this.pos.add(this.radius, this.radius).distance(pos) < this.radius;
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
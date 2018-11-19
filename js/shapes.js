define(['lib/fabric', 'config', 'data', 'math'], (f, config, data, math) => {
	const ANCHOR_POSITION = [
		0, 1, 2,
		4,    6,
		8, 9, 10
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

			this.pos = pos;

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

		move(dx, dy) {
			this.pos.x += dx;
			this.pos.y += dy;

			this.obj.set({
				left: this.pos.x,
				top: this.pos.y
			});
		}
	}

	class ShapeObject extends math.Vector2 {
		/**
		 * @param {Number} id
		 * @param {Vector2} pos
		 * @param {Vector2} size
		 * @param {Number} zIndex
		 */
		constructor(id, pos, size, zIndex) {
			super(pos.x, pos.y);

			this.id = id;
			this.size = size;
			this.zIndex = zIndex;
			this.obj = null;

			this.anchors = [];

			this.rendered = false;
		}

		isInside(pos) {
			return false;
		}

		render(canvas) {
			this.anchors.forEach(a => {
				a.render(canvas);
			});
		}

		move(dx, dy) {
			this.x += dx;
			this.y += dy;

			this.obj.set({
				left: this.x,
				top: this.y
			});

			this.anchors.forEach(a => {
				a.move(dx, dy);
			});
		}

		createAnchors() {
			ANCHOR_POSITION.forEach(v => {
				const dx = v & 0b0011;
				const dy = (v & 0b1100) >>> 2;

				this.anchors.push(
					new Anchor(
						this,
						new math.Vector2(
							this.x + dx * this.size.x * 0.5 - config.AnchorSize * 0.5,
							this.y + dy * this.size.y * 0.5 - config.AnchorSize * 0.5
						)
					)
				);
			});
		}

		removeAnchors(canvas) {
			this.anchors.forEach(a => {
				a.remove(canvas);
			});

			this.anchors = [];
		}
	}

	return {
		Circle: class Circle extends ShapeObject {
			constructor(id, pos, zIndex, radius, fill) {
				super(id, pos, new math.Vector2(radius * 2, radius * 2), zIndex);

				this.radius = radius;
				this.fill = fill;

				this.obj = new f.Circle({
					radius: this.radius,
					left: this.x,
					top: this.y,
					fill: this.fill
				});
			}

			isInside(pos) {
				return this.add(this.radius, this.radius).distance(pos) < this.radius;
			}

			render(canvas) {
				if(!this.rendered) {
					canvas.add(this.obj);

					this.rendered = true;
				}

				super.render(canvas);
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
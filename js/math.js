define(() => {
	return {
		Vector2: class Vector2 {
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
	};
});
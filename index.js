export default {
	rgb2hsl(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const diff = max - min;

		let h = 0;
		let l = (max + min) / 2;
		let s = 0;

		if (max === min) {
			h = 0;
		} else if (max === r && g >= b) {
			h = 60 * ((g - b) / diff);
		} else if (max === r && g < b) {
			h = 60 * ((g - b) / diff) + 360;
		} else if (max === g) {
			h = 60 * ((b - r) / diff) + 120;
		} else if (max === b) {
			h = 60 * ((r - g) / diff) + 240;
		};

		if (l === 0 || max === min) {
			s = 0;
		} else if (0 < l && l <= 0.5) {
			s = diff / (2 * l);
		} else if (l > 0.5) {
			s = diff / (2 - 2 * l);
		};

		return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
	},

	rgb2hsv(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const diff = max - min;

		let h = 0;
		let v = max;
		let s = max === 0 ? 0 : diff / max;

		// h
		if (max === min) {
			h = 0;
		} else if (max === r && g >= b) {
			h = 60 * ((g - b) / diff);
		} else if (max === r && g < b) {
			h = 60 * ((g - b) / diff) + 360;
		} else if (max === g) {
			h = 60 * ((b - r) / diff) + 120;
		} else if (max === b) {
			h = 60 * ((r - g) / diff) + 240;
		};

		return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
	},

	hsl2rgb(h, s, l) {
		h /= 360;
		s /= 100;
		l /= 100;

		let r = 0;
		let g = 0;
		let b = 0;
		let p = 0;
		let q = 0;

		function rgb(t, p, q) {
			if (t < 1.0 / 6.0) {
				return p + (q - p) * 6.0 * t;
			} else if (t >= 1.0 / 6.0 && t < 1.0 / 2.0) {
				return q;
			} else if (t >= 1.0 / 2.0 && t < 2.0 / 3.0) {
				return p + (q - p) * ((2.0 / 3.0) - t) * 6.0;
			} else {
				return p;
			}
		}

		function _rgb(t) {
			if (t < 0) {
				return t + 1.0;
			} else if (t > 1) {
				return t - 1.0;
			}
			else {
				return t;
			}
		}

		if (s === 0) {
			r = g = b = l;
		} else {
			q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
			p = 2.0 * l - q;
			r = rgb(_rgb(h + 1.0 / 3.0), p, q);
			g = rgb(_rgb(h), p, q);
			b = rgb(_rgb(h - 1.0 / 3.0), p, q);
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	},

	// Hue 色调 0 ~ 360
	// Saturation 饱和度 0 ~ 100
	// Value 明度 0 ~ 100
	hsv2rgb(h, s, v) {
		h /= 1;
		s /= 100;
		v /= 100;

		let r = 0;
		let g = 0;
		let b = 0;

		if (s === 0) {
			r = g = b = v;
		} else {
			let _h = h / 60;
			let i = Math.floor(_h);
			let f = _h - i;
			let p = v * (1 - s);
			let q = v * (1 - f * s);
			let t = v * (1 - (1 - f) * s);
			switch (i) {
				case 0:
					r = v;
					g = t;
					b = p;
					break;
				case 1:
					r = q;
					g = v;
					b = p;
					break;
				case 2:
					r = p;
					g = v;
					b = t;
					break;
				case 3:
					r = p;
					g = q;
					b = v;
					break;
				case 4:
					r = t;
					g = p;
					b = v;
					break;
				case 5:
					r = v;
					g = p;
					b = q;
					break;
			}
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
};

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.colorConvert = {})));
}(this, (function (exports) { 'use strict';

/**
 * rgb2hsl
 *
 * @param {number} r 红色颜色值 0~255
 * @param {number} g 绿色颜色值 0~255
 * @param {number} b 蓝色颜色值 0~255
 */
function rgb2hsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var diff = max - min;
  var h = 0;
  var l = (max + min) / 2;
  var s = 0;

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
  }

  

  if (l === 0 || max === min) {
    s = 0;
  } else if (0 < l && l <= 0.5) {
    s = diff / (2 * l);
  } else if (l > 0.5) {
    s = diff / (2 - 2 * l);
  }

  
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}
/**
 * rgb2hsv
 *
 * @param {number} r 红色颜色值 0~255
 * @param {number} g 绿色颜色值 0~255
 * @param {number} b 蓝色颜色值 0~255
 */

function rgb2hsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var diff = max - min;
  var h = 0;
  var v = max;
  var s = max === 0 ? 0 : diff / max; // h

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
  }

  
  return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
}
/**
 * hsl2rgb
 *
 * @param {number} h Hue 色调 0 ~ 360
 * @param {number} s Saturation 饱和度 0 ~ 100
 * @param {number} l lightness 亮度 0 ~ 100
 */

function hsl2rgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  var r = 0;
  var g = 0;
  var b = 0;
  var p = 0;
  var q = 0;

  function rgb(t, p, q) {
    if (t < 1.0 / 6.0) {
      return p + (q - p) * 6.0 * t;
    } else if (t >= 1.0 / 6.0 && t < 1.0 / 2.0) {
      return q;
    } else if (t >= 1.0 / 2.0 && t < 2.0 / 3.0) {
      return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
    } else {
      return p;
    }
  }

  function _rgb(t) {
    if (t < 0) {
      return t + 1.0;
    } else if (t > 1) {
      return t - 1.0;
    } else {
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
}
/**
 * hsv2rgb
 *
 * @param {number} h Hue 色调 0 ~ 360
 * @param {number} s Saturation 饱和度 0 ~ 100
 * @param {number} v Value 明度 0 ~ 100
 */

function hsv2rgb(h, s, v) {
  h /= 1;
  s /= 100;
  v /= 100;
  var r = 0;
  var g = 0;
  var b = 0;

  if (s === 0) {
    r = g = b = v;
  } else {
    var _h = h / 60;

    var i = Math.floor(_h);
    var f = _h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

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

exports.rgb2hsl = rgb2hsl;
exports.rgb2hsv = rgb2hsv;
exports.hsl2rgb = hsl2rgb;
exports.hsv2rgb = hsv2rgb;

Object.defineProperty(exports, '__esModule', { value: true });

})));

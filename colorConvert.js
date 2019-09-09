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
 * rgb2hex
 *
 * @param {number} r 红色颜色值 0~255
 * @param {number} g 绿色颜色值 0~255
 * @param {number} b 蓝色颜色值 0~255
 * @param {number} a 透明度 0~100，默认100
 */

function rgb2hex(r, g, b, a) {
  if (typeof a === 'undefined') {
    a = '';
  } else {
    a = Math.round(255 * a / 100);
    a = (a | 1 << 8).toString(16).slice(1);
  }

  var val = (b | g << 8 | r << 16 | 1 << 24).toString(16).slice(1);
  return '#' + val.toUpperCase() + a.toUpperCase();
}
/**
 * hsl2rgb
 *
 * @param {number} h Hue 色调 0 ~ 360
 * @param {number} s Saturation 饱和度 0 ~ 100
 * @param {number} l Lightness 亮度 0 ~ 100
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
/**
 * hex2rgb
 *
 * @param {string} r hex颜色值 eg: #000、#325312、#b2c343
 */

function hex2rgb(hex) {
  hex = hex.replace(/^#/, '');
  var a = null;

  if (hex.length === 8) {
    a = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }

  if (hex.length === 4) {
    a = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.slice(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  var num = parseInt(hex, 16);
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  var rgb = [r, g, b];

  if (a !== null) {
    rgb.push(Math.round(a * 100));
  }

  return rgb;
}

exports.rgb2hsl = rgb2hsl;
exports.rgb2hsv = rgb2hsv;
exports.rgb2hex = rgb2hex;
exports.hsl2rgb = hsl2rgb;
exports.hsv2rgb = hsv2rgb;
exports.hex2rgb = hex2rgb;

Object.defineProperty(exports, '__esModule', { value: true });

})));

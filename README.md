# Color Convert

> Demo: http://gavin-yyc.github.io/colorconvert/

- rgb2hsl
- rgb2hsv
- rgb2hex
- hsl2rgb
- hsv2rgb
- hex2rgb

## Usage：

```
import cc from '@youc/colocconvert';

cc.rgb2hsl(255, 34, 178);
```

or

```
<script src="./colorConvert.js"></script>

<script>
var cc = window.colorConvert;
cc.rgb2hsl(255, 34, 178);
</script>
```

## APIS：

### rgb2hsl

参数分别为：`red`、`green`、`blue`对应的颜色值

```
cc.rgb2hsl(255, 34, 178); // [321, 100, 57]
```

### rgb2hsv

参数分别为：`red`、`green`、`blue`对应的颜色值

```
cc.rgb2hsv(12, 1, 23); // [270, 96, 9]
```

### rgb2hex

只有传透明度时才会返回透明度格式的rgb颜色值。

- 透明度范围为0~100
- 返回值字母皆为大写

```
// rgb
cc.rgb2hex(1, 2, 3); // #010203

// rgb with alpha
cc.rgb2hex(1, 2, 3, 67); // #010203AB
```

### hsl2rgb

参数分别为：`Hue`, `Saturation`, `Lightness`

```
cc.hsl2rgb(321, 100, 57); // [255, 36, 178]
```

### hsv2rgb

参数分别为：`Hue`, `Saturation`, `Value`

```
cc.hsv2rgb(321, 87, 100); // [255, 33, 177]
```

### hex2rgb

可传入带透明度形式的hex值，返回值中alpha为0~100

```
cc.hex2rgb('#c23'); // [204, 34, 51]
cc.hex2rgb('#0C0117'); // [12, 1, 23]
cc.hex2rgb('#010203AB'); // [1, 2, 3, 67]
```

可省略`#`

```
cc.hex2rgb('0C0117'); // [12, 1, 23];
```
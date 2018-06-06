/*
 *	颜色转换工具 v1.1
 *  JS练习，Blog：http://youthol.top
 *  @params Array [ r, g, b ] or [ h, s, l ] or [ h, s, v ]
 *  @return Array [ r, g, b ] or [ h, s, l ] or [ h, s, v ]
 *  GitHub : http://gavin-yyc.github.io/colorconvert/
 */
/*********************************
*     Function hsv2rgb          *
*********************************/
;(function( window, undefined ){

	var r, g, b, h, s, l, ss, v, p, q, t, color;
	var Max = Math.max, 
        Min = Math.min;

    //防止命名空间冲突 noConflict
    //如果系统中存在$C或者ColorConvert或者CC
    //那么就保存到__ColorConvert、_$C、或者_CC中
    var _ColorConvert = window.ColorConvert,
    	_$C = window.$C,
    	_CC = window.CC;


	var ColorConvert = function( rgb, method ){
		return new ColorConvert.fn.init( rgb, method );
	};

	ColorConvert.fn = ColorConvert.prototype = {
		constructor: ColorConvert,
		init : function( rgb, method ){
			if ( !rgb ) {
				return this;
			};
			if ( typeof rgb === 'object' && rgb instanceof Array ) {
				if ( typeof method === 'string' ) {
					if ( method !== '' ) {
						switch( method ){
							case 'rgb2hsl': return this['rgb2hsl']( rgb ); break;
							case 'rgb2hsv': return this['rgb2hsv']( rgb ); break;
							case 'hsv2rgb': return this['hsv2rgb']( rgb ); break;
							case 'hsl2rgb': return this['hsl2rgb']( rgb ); break;
							default:
								throw new Error( method + 'is not a illegal String' );
								break;
						}
					}else{
						throw new Error( method + ' is not a illegal String' );
					}
				}else{
					throw new Error( method + ' is not a String' );
				}
			}else{
				throw new Error( rgb + ' is not a Array' );
			}
		}
	};

	ColorConvert.fn.init.prototype = ColorConvert.fn;

	/*********************************
	*     Function rgb2hsl          *
	*********************************/
	ColorConvert.rgb2hsl = ColorConvert.fn.rgb2hsl = function( rgb ){
		rgb = rgb.map(function( item, index, array ){
				return ( item / 1000 );
		})
		//获取最大值、最小值
		var max = Max.apply( Math, rgb );
		var min = Min.apply( Math, rgb );
		//保存r, g, b的值
		r = rgb[0];
		g = rgb[1];
		b = rgb[2];
		
		//计算h
		if ( max == min ) {
			h = 0;
		}else if ( max == r && g >= b ) {
			h = 60 * (( g - b ) / ( max - min ));
		}else if ( max == r && g < b ) {
			h = 60 * (( g - b ) / ( max - min )) + 360;
		}else if ( max == g ) {
			h = 60 * (( b - r ) / ( max - min )) + 120;
		}else if ( max == b ) {
			h = 60 * (( r - g ) / ( max - min )) + 240;
		};

		//计算l
		l = 0.5 * ( max + min );

		//计算s
		if ( l == 0 || max == min ) {
			s = 0;
		}else if ( 0 < l && l <= 0.5 ) {
			s = ( max - min ) / ( max + min );
		}else if ( l > 0.5 ) {
			s = ( max - min ) / ( 2 - ( max + min ) );
		};

		h  = Math.round( h );
		s  = Math.round( s  * 100 );
		l  = Math.round( l  * 100 );

		return [ h, s, l ]
	}


	/*********************************
	*     Function rgb2hsv          *
	*********************************/
	ColorConvert.rgb2hsv = ColorConvert.fn.rgb2hsv = function( rgb ){
		rgb = rgb.map(function( item, index, array ){
				return ( item / 1000 );
		})
		//获取最大值、最小值
		var max = Max.apply( Math, rgb );
		var min = Min.apply( Math, rgb );
		//保存r, g, b的值
		r = rgb[0];
		g = rgb[1];
		b = rgb[2];
		
		//计算h
		if ( max == min ) {
			h = 0;
		}else if ( max == r && g >= b ) {
			h = 60 * (( g - b ) / ( max - min ));
		}else if ( max == r && g < b ) {
			h = 60 * (( g - b ) / ( max - min )) + 360;
		}else if ( max == g ) {
			h = 60 * (( b - r ) / ( max - min )) + 120;
		}else if ( max == b ) {
			h = 60 * (( r - g ) / ( max - min )) + 240;
		};

		//计算hsv中的s，定义为ss
		if ( max == 0 ) {
			ss = 0;
		}else{
			ss = 1 - min / max;
		};

		//计算v
		v = max / (255 / 1000 );

		h  = Math.round( h );
		ss = Math.round( ss * 100 );
		v  = Math.round( v  * 100 );
		
		return [ h, ss, v ]
	}

	/*********************************
	*     Function hsv2rgb          *
	*********************************/
	ColorConvert.hsv2rgb = ColorConvert.fn.hsv2rgb = function( hsv ){
		h = parseFloat( hsv[0] );
		s = parseFloat( hsv[1] ) / 100;
		v = parseFloat( hsv[2] ) / 100;
		if ( s == 0 ) {
			r = g = b = v;
		}else{
			_h = h % 6;
			f = h / 60 - _h;
			p = v * ( 1 - s );
			q = v * ( 1 - f * s );
			t = v * ( 1 - ( 1 - f ) * s);
			switch( _h ){
				case 0:
					r = v; g = t; b = p; break;
				case 1:
					r = q; g = v; b = p; break;
				case 2:
					r = p; g = v; b = t; break;
				case 3:
					r = p; g = q; b = v; break;
				case 4:
					r = t; g = p; b = v; break;
				case 5:
					r = v; g = p; b = q; break;
			}
		}
		r = rgbToInt( r );
		g = rgbToInt( g );
		b = rgbToInt( b );
		return [ r, g, b ];
	}

	/*********************************
	*     Function hsl2rgb          *
	*********************************/
	ColorConvert.hsl2rgb = ColorConvert.fn.hsl2rgb = function( hsl ){
		h = parseFloat( hsl[0] ) / 360;
		s = parseFloat( hsl[1] ) / 100;
		l = parseFloat( hsl[2] ) / 100;
		if ( s == 0 ) {
			r = g = b = l;
		}else {
			q = l < 0.5 ? l * ( 1.0 + s ) : l + s - ( l * s );
			p = 2.0 * l - q;
		    r = rgbToInt( rgb( _rgb( h + 1.0 / 3.0 ) ) );
			g = rgbToInt( rgb( _rgb( h ) ) );
			b = rgbToInt( rgb( _rgb( h - 1.0 / 3.0 ) ) );
		}
		return [ r, g, b ];
	}

	//计算temp3
	function _rgb( t ){
		if ( t < 0 )
			t = t + 1.0
		if ( t > 1 )
			t = t - 1.0
		return t;
	}

	//计算rgb的每个值
	function rgb( t ){
		if ( t < 1.0 / 6.0 ) {
			color = p + ( ( q - p ) * 6.0 * t );
		}else if ( t >= 1.0 / 6.0 && t < 0.5 ) {
			color = q;
		}else if ( t >= 0.5 && t < 2.0 / 3.0 ) {
			color = p + ( ( q - p ) * 6.0 * ( 2.0 / 3.0 - t ) );
		}else {
			color = p;
		}
		return color;
	}

	/*********************************
	*     Function rgbToInt         *
	*********************************/
	//转换成整数
	function rgbToInt( t ){
		t = Math.floor( t * 255 );
		return t;
	}


	window.$C = window.CC = ColorConvert;

})( window )
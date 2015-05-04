/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */




/**
 * 解析Style
 *
 * @param {String} css
 * @param {Function} onAttr 处理属性的函数
 *   参数格式： function (sourcePosition, position, name, value, source)
 * @return {String}
 */
function parseStyle (css, onAttr) {
  if (css[css.length - 1] !== ';') css += ';';
  var cssLength = css.length;
  var isAttrStart = false;
  var isParenthesisOpen = false;
  var BLANK_CHART = /\s/;
  var lastPos = 0;
  var retCSS = '';

  for (var i = 0; i < cssLength; i++) {
    var c = css[i];
    if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) {
        // 在圆括号里面，忽略
      } else {
        var source = css.slice(lastPos, i).trim();
        var j = source.indexOf(':');
        if (j !== -1) {
          var name = source.slice(0, j).trim();
          var value = source.slice(j + 1).trim();
          retCSS += onAttr(lastPos, retCSS.length, name, value, source) + '; ';
        }
        lastPos = i + 1;
      }
    }
  }

  return retCSS;
}


exports.parseStyle = parseStyle;


console.log(parseStyle('y; position:fixed; width:100px; x; height:100px; background:url(baidu;;);\n\nbackground:#aaa',
function (sourcePosition, position, name, value, source) {
  console.log(sourcePosition, position, name, value, source);
  return source;
}));

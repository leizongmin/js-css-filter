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
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = '';

  function addNewAttr () {
    // 如果没有正常的闭合圆括号，则直接忽略当前属性
    if (!isParenthesisOpen) {
      var source = css.slice(lastPos, i).trim();
      var j = source.indexOf(':');
      if (j !== -1) {
        var name = source.slice(0, j).trim();
        var value = source.slice(j + 1).trim();
        // 必须有属性名称
        if (name) {
          retCSS += onAttr(lastPos, retCSS.length, name, value, source) + '; ';
        }
      }
    }
    lastPos = i + 1;
  }

  for (; i < cssLength; i++) {
    var c = css[i];
    if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) {
        // 在圆括号里面，忽略
      } else {
        addNewAttr();
      }
    } else if (c === '\n') {
      addNewAttr();
    }
  }

  return retCSS;
}


exports.parseStyle = parseStyle;


console.log(parseStyle('y; position:fixed; width:100px; x; y:(aa\nc); height:100px; background:url(baidu;;);\n\nbackground:#aaa',
function (sourcePosition, position, name, value, source) {
  console.log(sourcePosition, position, name, value, source);
  return source;
}));

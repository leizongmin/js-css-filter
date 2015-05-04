/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */


var whiteList = {};
whiteList.width = true;
whiteList.height = true;
whiteList.border = true;
whiteList.position = /absoulte|relative/;
whiteList.background = function (val) {
  return val;
};


exports.whiteList = whiteList;

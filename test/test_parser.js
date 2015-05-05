/**
 * cssfilter tests
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var should = require('should');
var parseStyle = require('../lib/parser');

describe('parseStyle', function () {

  it('stript blank chars', function () {

    parseStyle('width: 100px;\nheight:200px;   font-size:400;', function (sourcePosition, position, name, value, source) {
      if (name === 'width') {
        value.should.equal('100px');
      } else if (name === 'height') {
        value.should.equal('200px');
      } else if (name === 'font-size') {
        value.should.equal('400');
      }
      return name + ':' + value;
    }).should.equal('width:100px; height:200px; font-size:400;');
  });

  it('ending without `;`', function () {
    parseStyle('width: 100px;height:200px;    font-size:400', function (sourcePosition, position, name, value, source) {
      if (name === 'width') {
        value.should.equal('100px');
      } else if (name === 'height') {
        value.should.equal('200px');
      } else if (name === 'font-size') {
        value.should.equal('400');
      }
      return name + ':' + value;
    }).should.equal('width:100px; height:200px; font-size:400;');
  });

  it('inside `()`', function () {
    parseStyle('width: 100px;height:200px;  background:url(xxx);  font-size:400', function (sourcePosition, position, name, value, source) {
      if (name === 'width') {
        value.should.equal('100px');
      } else if (name === 'height') {
        value.should.equal('200px');
      } else if (name === 'font-size') {
        value.should.equal('400');
      } else if (name === 'background') {
        value.should.equal('url(xxx)');
      }
      return name + ':' + value;
    }).should.equal('width:100px; height:200px; background:url(xxx); font-size:400;');

    parseStyle('width: 100px;height:200px;  background:url(x;x;x);  font-size:400', function (sourcePosition, position, name, value, source) {
      if (name === 'width') {
        value.should.equal('100px');
      } else if (name === 'height') {
        value.should.equal('200px');
      } else if (name === 'font-size') {
        value.should.equal('400');
      } else if (name === 'background') {
        value.should.equal('url(x;x;x)');
      }
      return name + ':' + value;
    }).should.equal('width:100px; height:200px; background:url(x;x;x); font-size:400;');

    parseStyle('width: 100px;height:200px;  background:url(xx\nx);  font-size:400', function (sourcePosition, position, name, value, source) {
      if (name === 'width') {
        value.should.equal('100px');
      } else if (name === 'height') {
        value.should.equal('200px');
      } else if (name === 'font-size') {
        value.should.equal('400');
      }
      return name + ':' + value;
    }).should.equal('width:100px; height:200px; font-size:400;');
  });

});

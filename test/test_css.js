/**
 * cssfilter tests
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var should = require('should');
var filterCSS = require('../');

describe('parseStyle', function () {

  it('normal', function () {

    filterCSS('00xx; position: fixed; width:100px; height:  200px').should.equal('width:100px; height:200px;');

    filterCSS('position: fixed; width:100px; height:  200px', {
      onAttr: function (name, value, options) {
        options.isWhite.should.equal(true);
        if (name === 'width') value.should.equal('100px');
        else if (name === 'height') value.should.equal('200px');
        else throw new Error('bad attr name `' + name + '`');
      },
      onIgnoreAttr: function (name, value, options) {
        options.isWhite.should.equal(false);
        if (name === 'position') value.should.equal('fixed');
        else throw new Error('bad attr name `' + name + '`');
      }
    }).should.equal('width:100px; height:200px;');

  });

  it('onAttr() returns new sources', function () {

    filterCSS('position: fixed; width:100px; height:  200px', {
      onAttr: function (name, value, options) {
        options.isWhite.should.equal(true);
        if (name === 'width') value.should.equal('100px');
        else if (name === 'height') value.should.equal('200px');
        else throw new Error('bad attr name `' + name + '`');
        return name + ': ' + value;
      }
    }).should.equal('width: 100px; height: 200px;');

  });

  it('onIgnoreAttr() returns new sources', function () {

    filterCSS('position: fixed; width:100px; height:  200px', {
      onIgnoreAttr: function (name, value, options) {
        options.isWhite.should.equal(false);
        if (name === 'position') value.should.equal('fixed');
        else throw new Error('bad attr name `' + name + '`');
        return 'x-' + name + ':' + value;
      }
    }).should.equal('x-position:fixed; width:100px; height:200px;');

  });

});

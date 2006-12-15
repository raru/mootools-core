/*
Script: Hash.js
	Contains the class Hash.

Author:
	Christophe Beyls <http://digitalia.be>

License:
	MIT-style license. (?)
*/

/*
Class: Hash
	It wraps an object that it uses internally as a map. The user must use put(), get(), and remove() to add/change, retrieve and remove values, it must not access the internal object directly. With this implementation, null values are not allowed.

Example:
	(start code)
	var hash = new Hash({a: 'hi', b: 'world', c: 'howdy'});
	hash.remove('b'); // b is removed.
	hash.set('c', 'hello');
	hash.get('c'); // returns 'hello'
	hash.length // returns 2 (a and b)
	(end)
*/

var Hash = new Class({

	length: 0,

	initialize: function(obj) {
		this.obj = {};
		for (var property in obj) {
			this.obj[property] = obj[property];
			this.length++;
		}
	},

	get: function(key) {
		return this.obj[key];
	},

	set: function(key, value) {
		if (value == null) throw 'Cannot put null values in the map';
		if (this.obj[key] == undefined) this.length++;
		this.obj[key] = value;
		return this;
	},

	remove: function(key) {
		if (this.obj[key] == undefined) return;
		var obj = {};
		this.length--;
		for (var property in this.obj){
			if (property != key) obj[property] = this.obj[property];
		}
		this.obj = obj;
		return this;
	},

	each: function(fn, bind) {
		for (var property in this.obj) fn.call(bind || this, property, this.obj[property]);
	},
	
	extend: function(obj){
		this.initialize(Object.extend(this.obj, obj));
		return this;
	},

	empty: function() {
		return (this.length == 0);
	},

	keys: function() {
		var keys = [];
		for (var property in this.obj) keys.push(property);
		return keys;
	},

	values: function() {
		var values = [];
		for (var property in this.obj) values.push(this.obj[property]);
		return values;
	}

});

/*
Function: $H
	Shortcut to create an Hash from an Object.
*/

function $H(obj) {
	return new Hash(obj);
};
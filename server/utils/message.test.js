const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {

  it('should generate the correct message object', () => {

    var from = 'admin';
    var text = 'this is the test text';
    var msg = generateMessage(from, text);

    expect(msg.from).toBe(from);
    expect(msg.text).toBe(text);
    expect(typeof msg.createdAt).toBe('number');

  });

});

describe('generateLocationMessage', () => {

  it('should generate correct location object', () => {

    var from = 'admin';
    var lat = '40.0233916';
    var long = '-75.12139690000001';

    var msg = generateLocationMessage(from, lat, long);
    expect(msg.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
    expect(typeof msg.createdAt).toBe('number');

  });

});

const expect = require('expect');

var {generateMessage} = require('./message');

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

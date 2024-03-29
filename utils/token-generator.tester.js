const TokenGenerator = require('./authTest');
const jwt = require('jsonwebtoken');

const tokenGenerator = new TokenGenerator('a', 'a', {
  algorithm: 'HS256',
  keyid: '1',
  noTimestamp: false,
  expiresIn: '2m',
  notBefore: '2s'
});

// Token Generator needs to be signed
// console.log(tokenGenerator);

token = tokenGenerator.sign(
  { id: 'something' },
  { audience: 'myaud', issuer: 'myissuer', jwtid: '1', subject: 'user' }
);

setTimeout(function() {
  token2 = tokenGenerator.refresh(token, {
    verify: { audience: 'myaud', issuer: 'myissuer' },
    jwtid: '2'
  });
  // console.log(jwt.decode(token, { complete: true }));
  // console.log(jwt.decode(token2, { complete: true }));
}, 3000);

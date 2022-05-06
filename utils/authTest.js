// const jwt = require('jsonwebtoken');
// const { promisify } = require('util');

// const userId = +Date.now();
// const refreshId = Date.now() + 100;

// const user = {
//   refreshId,
//   userId
// };

// const privateKey = 'just-bobby';
// const privateKeyRefresh = 'just-refresh';
// const expiresIn = '3s';
// let token = jwt.sign({ userId }, privateKey, { expiresIn });
// const refresh = jwt.sign({ refreshId }, privateKeyRefresh);

// setTimeout(() => {
//   const decodeding = promisify(jwt.verify)(token, privateKey)
//     .then(val => {
//       console.log(val.userId);
//     })
//     .catch(err => {
//       if (err.message === 'jwt expired') {
//         if (user.refreshId === jwt.decode(refresh).refreshId) {
//           const token = jwt.sign({ userId }, privateKey);
//           console.log(jwt.verify(token, privateKey));
//         }
//       }
//     });
// }, 5000);

// const decodedRefresh = jwt.verify(refresh, privateKeyRefresh);

// function TokenGenerator(privateKey, publicKey, options) {
//   this.privateKey = privateKey;
//   this.publicKey = publicKey;
//   this.option = options;
// }

// TokenGenerator.prototype.sign = function(payload, signOptions) {
//   const jwtSignOptions = Object.assign({}, signOptions, this.options);
//   return jwt.sign(payload, this.privateKey, jwtSignOptions);
// };

// TokenGenerator.prototype.refresh = function(token, refreshOptions) {
//   const payload = jwt.verify(token, this.publicKey, refreshOptions.verify);
//   delete payload.signature;
//   delete payload.exp;
//   delete payload.nbf;
//   delete payload.jti;
//   const jwtSignOptions = Object.assign({}, this.options, {
//     jwtid: refreshOptions.jwtid
//   });
//   return jwt.sign(payload, this.privateKey, jwtSignOptions);
// };

// module.exports = TokenGenerator;

// Synchronous Sign with default (HMAC SHA256)
// let token = jwt.sign({ foo: 'bar' }, 'shhhh');

// Synchronous Sign with RSA SHA256
// const privateKey = fs.readFileSync('private.key');

// token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });

// Sign asynchronously
// jwt.sign(
//   { foo: 'bar' },
//   fs.readFileSync('private.key'),
//   { algorithm: 'RS256' },
//   function(err, token) {
//     console.log(token);
//   }
// );

// Backdate a jwt 30 seconds
// const older_token = jwt.sign(
//   {
//     foo: 'bar',
//     iat: Math.floor(Date.now() / 1000) - 300
//   },
//   'shhhh'
// );
// console.log(older_token);

// const data = 'foobar';
// const exp = Math.floor(Date.now() / 1000) + 3600;
// const expiresIn = '10s';

// const token = jwt.sign({ data }, 'secret', { expiresIn });
// console.log(token);
// const decoded = jwt.decode(token, { complete: true });
// console.log(decoded.header);

// const verify = (token, secret) => {
//   try {
//     const decoded = jwt.verify(token, secret);
//     return decoded;
//   } catch (err) {
//     return err.message;
//   }
// };

// console.log(verify(token, 'secret'));

import SecureLS from 'secure-ls';

const secureLocal =  new SecureLS({
  encodingType: 'aes',
  encryptionSecret: process.env.SECURE_LOCAL_SECRET,
});

export default secureLocal;
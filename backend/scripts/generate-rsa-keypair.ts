import * as Fs from 'fs';
import generateRsaKeyPair from 'generate-rsa-keypair';

Fs.writeFileSync(
    `${__dirname}/../.rsa-keypair.json`, 
    JSON.stringify(generateRsaKeyPair())
);
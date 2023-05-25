import prisma from "../../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from 'next'
import AESUtil from "../../../utils/AESUtil";
import RSAUtil from "../../../utils/RSAUtil";
import * as crypto from 'crypto';

var rsaPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2GkiM15L0Otcj
fcBldEo9NBkN+rTuvOmQGKICwsNKX5wnHiAt0XOgHg9gOw0bmuV4ol78tiVZ1fN6
f5Ou2HAQqwsfZstef0UAZxYSZRYaivOAGufNNRuGVG6ujErhqPkntb8F2uJCp9wu
vKUo5OD7mkT1d/OFl7zbfsqpKZRuuC5/6DF0xwGM+7PSGnbYuCPpMNSicIZi1+7K
fueXx1XMP426YUd/ylRNXRq2D6xdahH0AjHPytlzfZ9WQRSvtwRihZLpfrm5c0QP
cpp93VATAVcl4EtNFbuTMy12C+TRT7lbQIu0AqmTnj93U8+hskNoiHwysD7TJVmF
jzFnm4ItAgMBAAECggEAdR3ATTyT2ZlCJiRJKba5zFUGTBRSazx6Jl+BSq9B9EI7
ZnkcjvsnFvJeRzCTRI7BSG19E6B9syJDviPwskGnCUFIHQD6iKLnmNOzwU7cAWQe
KOSk8jhWpHUG3iGCQ1FuNJjR6w0T+XSFylUvD3bsL0TPVuO3bdLh9nS8GEGSogWi
lN62a28ULRjOpm0anD1Zpn8daUuGxhY3ebJUcia2gnLBmdvXptuDNmqwzGdn1Awp
AybwtBOMm88tgsMIZJjVSN0dyiahtB12VULwPq0j9X4L/hLecNg3SptMBQqRgW6F
MKDRl43kj58g56Gt3HJWrTa0Dm+HwWY3Gx2vhIZV4QKBgQDfnms5dWIKuwmJ2evT
3joVkVLuVfxaGtsbbwFGiPMvpb7Ap4dHmFEEsFiCEDqXcw9EDqTH3b07aqRxVPEY
EF0Wgyrh9BIUiTrF8BkpdH/lJO21Vc9ZJ9RZ+vCAsMgoBhDmjKDziYdFaTSblMu8
nS55pm5i3bvcXnWCY/zphmVYOQKBgQDQeNrapg88gjFCTJukFPGN0yoFkELIA1MX
yLu7VG0ZSQx1j2bso+i9Djz7rcHc9jwjSkeRUjdmcJzS0Ko6kHBiZFp/vfBMqnVy
DLUjmW/Evm9DTi5gOIRkNSDPbMw3T/rM6J5nEe3fonYG/aKHPjaxqqYswsBR21nE
WvgT/B5xlQKBgAmkgScnIqUnz498MCkgqgyICbVxS8Ju6gfSz5FFEod5dDJGhxTV
QpkbKZXiMUSal4vtvblInIJVZOXmLcdF3V29Jjo8FhOAn2ItqkgZV/J/lyh8nMZR
a1y972T9OoRPTqdCZSZbRdP+Z2BWGDr35CsmvBfTS+iCwjpvKVbAjtoxAoGAf/E7
96akgTExxAu6FYhY+v6WspVnttL7gwRJ2t0km7kOMXQR6bdqleSQHrHz4YUpQUtM
Au7fWzpPtL4lSw3sOyZ1uCI8wQB4Vcdgv/lh8/Af3sGzipAFCG7mtQaDiorGVE2L
MZx6TZ6qKv4sai4PaRhfJedcGqCxReXCjJlVocUCgYEAtZpsDCLFT98inWsYBGl4
eRkYQKVPhFuT4nAyy+kmjmuJ18nq/nd98zYrxxQMXWbpE58awwE5fMC692OOVSVt
0BnN4wviLOd3//7XILm0EkcvUYNGsoAkrQna5keCEmHMYzjPstmwxXRxkZJuMxZm
KEeGO9BVhdPE4f588egQYPw=
-----END PRIVATE KEY-----`;


function aesDecrypt(encrypted: string, key: string): string {
  const decipher = crypto.createDecipheriv('aes-256-ecb', Buffer.from(key), Buffer.alloc(0));
  let decrypted = decipher.update(Buffer.from(encrypted, 'base64'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString('utf8');
}

function aesEncrypt(data: string, key: string): string {
  const cipher = crypto.createCipheriv('aes-256-ecb', Buffer.from(key), Buffer.alloc(0));
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

function rsaDecrypt(encrypted: string, privateKey: string): string {
  const buffer = Buffer.from(encrypted, 'base64');
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer,
  );
  return decrypted.toString('utf8');
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const encryptedAesKey = (req.headers['request-key']) as string;
  const { requestData } = req.body;

  console.info("收到客户端发来的加密AesKey:", encryptedAesKey)
  console.info("收到客户端发来的加密RequestData:", requestData)

  var decryptedAesKey = rsaDecrypt(encryptedAesKey, rsaPrivateKey);
  console.info("解密AesKey:", decryptedAesKey)
  var decryptedData = aesDecrypt(requestData, decryptedAesKey);
  console.info("解密RequestData:", decryptedData)


  const responseData = {
    resopnseData: aesEncrypt("Hello, "+decryptedData,decryptedAesKey)
  }

  res.json(responseData);
}
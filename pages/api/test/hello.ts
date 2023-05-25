
import prisma from "../../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from 'next'
import * as crypto from 'crypto';

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
  
  const rsaKey = await prisma.rsaKey.findUnique({
    where: {
      id: 1,
    }
  });

  console.info("rsaKey",rsaKey)

  if (rsaKey?.privateKey) {
    var decryptedAesKey = rsaDecrypt(encryptedAesKey, rsaKey?.privateKey);
    console.info("解密AesKey:", decryptedAesKey)
    var decryptedData = aesDecrypt(requestData, decryptedAesKey);
    console.info("解密RequestData:", decryptedData)
    const responseData = {
      resopnseData: aesEncrypt("Hello, " + decryptedData, decryptedAesKey)
    }
    res.json(responseData);
  }
  const responseData = {
    resopnseData: "RsaPrivateKey获取失败"
  }
  res.json(responseData)
}

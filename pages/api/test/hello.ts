
import prisma from "../../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv';
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

  let privateKey = ""
  //从Redis获取缓存提高性能 
  try {
    const redisPrivateKey :string = await kv.get('privateKey') || ""
    if (redisPrivateKey === "") {
      const rsaKey = await prisma.rsaKey.findUnique({
        where: {
          id: 1,
        }
      });
      console.info("缓存中Ras私钥不存在,从数据库中获取并写入缓存成功!")
      await kv.set('privateKey', rsaKey?.privateKey , { ex: 100, nx: true });
      privateKey = rsaKey?.privateKey || ""
    } else {
      console.log("从缓存中获取PrivateKey成功!");
      privateKey = redisPrivateKey
    }
  } catch (error) {
    console.info("从缓存或者数据库中获取Rsa私钥失败.", error)
  }

  if (privateKey !== "") {
    var decryptedAesKey = rsaDecrypt(encryptedAesKey, privateKey);
    console.info("解密AesKey:", decryptedAesKey)
    var decryptedData = aesDecrypt(requestData, decryptedAesKey);
    console.info("解密RequestData:", decryptedData)
    const responseData = {
      responseData: aesEncrypt("Hello, " + decryptedData, decryptedAesKey)
    }
    return res.json(responseData);
  }
  const responseData = {
    responseData: "RsaPrivateKey获取失败"
  }
  return res.json(responseData)
}

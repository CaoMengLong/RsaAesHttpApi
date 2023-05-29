[![Face Photo Restorer](./public/screenshot.png)](https://restorephotos.io/)

## How it works
在现代互联网环境中，HTTP接口通信的安全问题引起了广泛的关注。尽管HTTPS提供了一定的数据保护，但数据仍有可能被窃取或篡改。本研究旨在设计和实现一个应用于HTTP接口通信的RSA和AES混合加密模型，提供更高级别的数据安全保障。预期该研究的成果将进一步增强HTTP接口通信的安全性，同时保持良好的性能，对推动更广泛的数据保护意识和强加密技术的应用具有重要意义。

In the modern Internet environment, the security issues of HTTP interface communication have drawn widespread attention. Although HTTPS provides some data protection, data can still potentially be stolen or tampered with. This study aims to design and implement a hybrid encryption model of RSA and AES for HTTP interface communication, providing a higher level of data security. The expected outcomes of this research will further enhance the security of HTTP interface communication while maintaining good performance. This has significant implications for promoting broader data protection awareness and the application of strong encryption technologies.

### Vercel/Neon API key in .env file.

Create a file in root directory of project with env. And store your API key in it, as shown in the .example.env file.

### Installing the dependencies.

```bash
npm install
```

### Running the application.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

## Powered by

This example is powered by the following services:

- [Vercel](https://vercel.com) (hosting, serverless functions)
- [@vercel/kv](https://upload.io) (Serverless Redis)
- [Neon](https://neon.tech/) (Serverless Postgres)


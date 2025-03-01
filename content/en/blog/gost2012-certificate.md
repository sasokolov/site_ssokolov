---
title: "Self-signed GOST2012 Certificate"
date: 2019-02-14
draft: false
categories: ["News"]
language: "en"
tags: ["crypto", "gost", "gost2012", "openssl"]
author: "Sergey"
summary: "Commands for creating self-signed certificates using the Russian GOST 2012 encryption standard."
---

So I don't forget. I built openssl1.1 on Centos 7 and separately the GOST engine from [this repo](https://github.com/gost-engine/engine)

Generate a private key and certificate request in one command:

```
$ openssl req  -engine gost  \
   -newkey gost2012_512   \
   -pkeyopt paramset:A    \
   -passout pass:1234567890 \
   -subj "/C=RU/ST=Moscow/L=Moscow/O=foo_bar/OU=foo_bar
/CN=developer/email@example.com" \
   -keyout private-test.key  \
   -out certificate-test.csr -md_gost12_512
```

Available algorithms can be found [here.](https://github.com/gost-engine/engine/blob/master/README.gost)
Available hashing methods can be obtained like this:

```
$ openssl
OpenSSL> engine gost
OpenSSL> list -digest-algorithms
```

Generate the certificate itself:

```
$ openssl x509 -req -days 365 \
  -in certificate-test.csr \
  -signkey private-test.key \
  -out certificate-test.pem \
  -engine gost
```

You can see the result like this:

```
$ openssl x509 -engine gost -in certificate-test.pem  -text --noout 
Certificate: 
    Data: 
        Version: 1 (0x0) 
        Serial Number: 
            2f:54:7c:f3:05:1a:27:4e:e0:db:c3:03:09:81:7c:ef:da:39:d1:cc 
        Signature Algorithm: GOST R 34.10-2012 with GOST R 34.11-2012 (512 bit) 
        Issuer: C = RU, ST = Moscow, L = Moscow, O = foo_bar, OU = foo_bar, CN = developer, emailAddress = email@example.com 
        Validity 
            Not Before: Feb 13 16:07:23 2019 GMT 
            Not After : Feb 13 16:07:23 2020 GMT 
        Subject: C = RU, ST = Moscow, L = Moscow, O = foo_bar, OU = foo_bar, CN = developer, emailAddress = email@example.com 
        Subject Public Key Info: 
            Public Key Algorithm: GOST R 34.10-2012 with 512 bit modulus 
                Public key: 
                    X:5E6286D582F33981E60FCF0C932B07A12726E3962F127C161A2BD569A404BC41881922F3F8B6FD402FE1BA093FD04F9AF489EE0637ED18D58FCC8724747494A4 
                    Y:9455534A534C4D407C1F134F72FAB196D1110E48042260B84E5B4F1A3D255E688AA5C57580D6718C1713584869316F7D452ABC698FBAF3D5AF0BB6BEF1F8D3F8 
                Parameter set: GOST R 34.10-2012 (512 bit) ParamSet A 
    Signature Algorithm: GOST R 34.10-2012 with GOST R 34.11-2012 (512 bit) 
        28:2b:ed:a5:39:2d:41:47:47:eb:03:55:ca:e1:89:6f:35:12: 
        7d:6d:ba:27:cf:30:f5:c0:37:8b:dd:c7:a2:52:16:7c:ee:cb: 
        29:f6:0b:00:6a:1b:02:cd:29:60:32:b8:bc:35:a0:93:46:fa: 
        b2:25:bc:b7:06:d4:34:dc:a6:65:c8:66:ce:c8:d5:02:5d:fb: 
        77:0e:d1:c0:73:f9:af:87:72:89:c3:bd:df:33:ac:ca:74:a6: 
        33:aa:01:53:89:09:e6:7e:57:49:b1:7b:36:86:a6:04:ec:d4: 
        49:1a:27:98:5e:e1:36:a5:74:5a:54:b0:5a:23:83:c9:be:b3: 
        6c:4c
```
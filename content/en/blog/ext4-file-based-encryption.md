---
title: "ext4 file-based encryption"
date: 2016-11-16
draft: false
categories: ["News"]
language: "en"
author: "Sergey"
summary: "Guide to using file-level encryption in the ext4 file system, available starting with Linux kernel 4.1."
---

Starting with kernel 4.1, the *CONFIG_EXT4_ENCRYPTION* option was added. This feature enables encryption implementation in the ext4 driver. With it, you can encrypt specific parts of the file system, such as a specific directory.

It so happens that I use [ROSA Fresh](https://www.rosalinux.ru/rosa-fresh/) on my desktop, but the latest release of this system, although it has a kernel version higher than 4.1, lacks the tools for such functionality. The necessary utilities only appeared in e2fsprogs-1.43. But no worries. On [ABF](https://abf.io/), I found a fresh build of R9 (it's not even alpha yet) and it has kernel v4.8.7 and e2fsprogs-1.43.3, which means everything necessary is already there. We download it, install it in a virtual machine, and try it out.

I was experimenting on a file system mounted at /home, device /dev/sda6.

1. First, let's enable the functionality **(don't enable this on a boot partition. GRUB won't understand it and won't be able to boot the system)**

```bash
sudo tune2fs -O encrypt /dev/sda6
```

2. Now let's create a file with the salt:

```bash
echo 0x$(head -c 16 /dev/urandom | xxd -p)>~/.cryptoSalt
```

3. Create a directory that we will encrypt:

```bash
mkdir ~/crypted
```

4. And apply encryption to it, entering the key from the keyboard:

```bash
/usr/sbin/e4crypt add_key -S `cat ~/.cryptoSalt` ~/crypted
```

Now in the ~/crypted directory, you can create folders and files as usual.

After a reboot, you won't be able to read the contents. More precisely, you'll be able to see that there are files and directories, but their names will be distorted, and the contents of the files won't be readable at all. To see everything normally again, you need to execute again

```bash
/usr/sbin/e4crypt add_key -S `cat ~/.cryptoSalt` ~/crypted
```

And if you forgot which key and with which salt you initially protected it, then you can forget about the contents; it's unlikely that you'll be able to recover it.
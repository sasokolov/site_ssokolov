---
title: Samba 4.5.3 update with AD
author: Сергей
type: post
date: 2016-12-23T13:58:20+00:00
#url: https://en.ssokolov.ru/2016/12/23/samba-4-5-3-update-with-ad/
categories:
  - News

---
I have updated samba to version 4.5.3 for Centos 7.

For Windows XP SP3 users need to add the param in /etc/samba/smb.conf:  
`<br />
[global]<br />
…<br />
ntlm auth = yes<br />
` 

You can add <a href="https://abf-downloads.rosalinux.ru/craft_personal/repository/rosa-server72/x86_64/main/release/" target="_blank">the repository</a> and use it.  
If you update from previous version, may check the database:  
`<br />
# samba-tool dbcheck<br />
`

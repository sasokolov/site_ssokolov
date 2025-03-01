---
title: "RPM Cheatsheet"
date: 2018-07-02
draft: false
categories: ["Notes"]
language: "en"
author: "Sergey"
summary: "Useful commands and macros for working with RPM and managing package building."
---

View built-in macros (can be filtered using grep):
```bash
rpm --showrc
```

View the results of expanding specific macros:

```
rpm --eval "%systemd_post daemond.service",
rpm --eval %_libdir
```

Declare a macro in the spec file in the current section:
```
%define _some_dir /opt/some/path
```

Declare a macro for the entire spec file (should be declared in the first lines of the spec file):

```
%global _some_dir /opt/some/path
```

General syntax for macro declaration:
```
%global <macro_name_here> <macro_default_value>
%define <macro_name_here> <macro_default_value>
```

Macro values can be passed using the parameter:
```
--define "<macro_name_here><macro_value>"
```

View how macros will be expanded in the entire spec file:
```
rpmspec \
--define "macro_name macro_value" \
--parse some-spec-file.spec
```

Disable debuginfo package:
```
%global debug_package %{nil}
```

Build only binary rpm:
```
rpmbuild -bb some-spec.spec
```

Build source package:
```
rpmbuild -bs some-spec.spec
```

Build binary package and source package:

```
rpmbuild -ba some-spec.spec
```

Build SRPM for el5 from el7:
```
rpmbuild -bs --define "_sourcedir $PWD" --target x86_64-linux-el5 --define "_source_filedigest_algorithm md5" --define "dist .el5" specfile.spec
```
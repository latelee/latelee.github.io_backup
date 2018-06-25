---  
layout: post  
title: 
keywords:   
category : docker容器  
tags : [docker]  
---  
## 背景及分析
MySQL容器启动时，会自动创建一些必要的数据库，比如mysql。这是官方默认的做法。但是，我们还需要创建自定义的数据库。
<!-- more -->

Create a new file: /etc/apt/sources.list.d/nodesource.list

You'll need to create this file with sudo, but when you create the file, put this inside it:

deb https://deb.nodesource.com/node_6.x xenial main
deb-src https://deb.nodesource.com/node_6.x xenial main
Then, save the file. (replace node_6.x with node_7.x or node_8.x, etc. for newer Node versions)
Download the GPG Signing Key from Nodesource for the repository. Otherwise, you may get NO_PUBKEY errors with apt-get update:
curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
Manually run sudo apt-get update.

This refreshes the data from the nodesource repo so apt knows a newer version exists.

If you get a NO_PUBKEY GPG error, then go back to Step 2
Check apt-cache policy nodejs output.

This is not done by the script, but you want to make sure you see an entry that says something like this in the output (though the version might be different if you are not using 6.x as the version string; the only thing we care about is that there's a newer version number provided via nodesource):

Version table:
    6.2.1-1nodesource1~xenial1 500
       500 https://deb.nodesource.com/node_6.x xenial/main amd64 Packages
    4.2.6~dfsg-1ubuntu4 500
       500 http://archive.ubuntu.com/ubuntu xenial/universe amd64 Packages
If you do not see entries like this, and only see 4.2.6, start over. Otherwise, proceed.
Install the nodejs binary. Now that you have confirmed 6.x is available on your system, you can install it: sudo apt-get install nodejs
nodejs --version should now show v6.2.1 or similar on output (as long as it starts with v6. you're on version 6 then; this may be a higher version number if you're using a newer version than 6 but as long as it is not 4.2.6 you should be good to go).
# 搭建v2ray

## 服务端

创建v2ray目录

`mkdir /etc/v2ray`

下载 v2ray

`wget https://github.com/v2ray/v2ray-core/releases/download/v4.9.0/v2ray-linux-64.zip`

解压，压缩包

`unzip -o v2ray-linux-64.zip -d ~/v2ray/`

进入解压目录

`cd v2ray`

复制v2ray v2ctl geoip.dat geosite.dat到/etc/v2ray目录

`cp -f v2ray v2ctl geoip.dat geosite.dat /etc/v2ray`

赋予执行权限

`chmod +x /etc/v2ray/v2ray v2ctl`

创建配置文件

`touch /etc/v2ray/config.json`

编辑配置文件

`nano /etc/v2ray/config.json`

复制下面配置，粘贴进去

```json
{
  "inbound": {
    "port": 10000,
    "listen":"127.0.0.1",
    "protocol": "vmess",
    "settings": {
      "clients": [
        {
          "id": "783c3fb0-eb16-456f-a915-15ca3a636a94",
          "alterId": 64
        }
      ]
    },
    "streamSettings": {
      "network": "ws",
      "wsSettings": {
      "path": "/ray"
      }
    }
  },
  "outbound": {
    "protocol": "freedom",
    "settings": {}
  }
}
```

启动

`/etc/v2ray/v2ray --config=/etc/v2ray/config.json`

## 搭建caddy WEB服务器

创建caddy目录

`mkdir /etc/caddy`

下载 caddy`

`wget https://github.com/mholt/caddy/releases/download/v0.10.11/caddy_v0.10.11_linux_386.tar.gz`

解压caddy到/etc/caddy目录

`tar zxvf caddy_v0.10.11_linux_386.tar.gz -C /etc/caddy caddy`

赋予执行权限

`chmod +x /etc/caddy/caddy`

创建配置文件

`touch /etc/caddy/caddy.conf`

编辑配置文件

`nano /etc/caddy/caddy.conf`

复制下面，粘贴进去

```conf
my.hunk.ink
{
  tls yadiraies@gmail.com
  log /var/log/caddy.log
  proxy /ray localhost:10000 {
    websocket
    header_upstream -Origin
  }
}
```

## 安装Supervisor守护进程

官网：[http://www.supervisord.org](http://www.supervisord.org)

介绍：Supervisor的服务器端称为supervisord，主要负责在启动自身时启动管理的子进程，响应客户端的命令，重启崩溃或退出的子进程，记录子进程stdout和stderr输出，生成和处理子进程生命周期中的事件。

安装

`apt-get install supervisor -y`

创建v2ray-caddy守护进程配置文件

`touch /etc/supervisor/conf.d/v2ray-caddy.conf`

编辑v2ray-caddy守护进程配置文件

`nano /etc/supervisor/conf.d/v2ray-caddy.conf`

复制下面，粘贴进去

```conf
[program:v2ray]
user=root
command=/etc/v2ray/v2ray -config=/etc/v2ray/config.json
startsecs=1
startretries=100
autorstart=true
autorestart=true

[program:caddy]
user=root
command=/etc/caddy/caddy -conf /etc/caddy/caddy.conf
startsecs=1
startretries=100
autorstart=true
autorestart=true
```

首次使用，请先执行下面更新命令
更新配置命令：`supervisorctl update all`

v2ray

启动：`supervisorctl start v2ray`

重启：`supervisorctl restart v2ray`

停止：`supervisorctl stop v2ray`

caddy

启动：`supervisorctl start caddy`

重启：`supervisorctl restart caddy`

停止：`supervisorctl stop caddy`

## v2ray客户端配置文件

上面安装完成，并正常运行后，可以使用此客户端配置了。

```json
{
  "inbound": {
    "port": 1080,
    "listen": "127.0.0.1",
    "protocol": "socks",
    "settings": {
      "auth": "noauth",
      "udp": false
    }
  },
  "outbound": {
    "protocol": "vmess",
    "settings": {
      "vnext": [
        {
           "address": "my.hunk.ink",
          "port": 443,
          "users": [
            {
              "id": "783c3fb0-eb16-456f-a915-15ca3a636a94",
              "alterId": 64
            }
          ]
        }
      ]
    },
    "streamSettings": {
      "network": "ws",
      "security": "tls",
      "tlsSettings": {
        "serverName": "my.hunk.ink"
      },
      "wsSettings": {
        "path": "/ray"
      }
    }
  }
}
```

注意：客户端配置的参数值必须和服务端的为一致

```json
"protocol":
"id":
"alterId":
"network":
"path":
```

请修改替换和服务端相同参数，例如 UUID、域名。

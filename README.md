[![Build/release](https://github.com/kokolokksk/catcat-dm/actions/workflows/build.yml/badge.svg?branch=v1.2.5)](https://github.com/kokolokksk/catcat-dm/actions/workflows/build.yml)
# CatCatDM

> CatCatDM! 
> >The meta-electron-catcat-bilibili-danmu application!

### 说明
 哔哩哔哩 直播弹幕姬

- 发送弹幕需要设置 ```SESSDATA```(```SESSDATA```) 与 ```csrf```(```bili_jct```)，登陆哔哩哔哩后 F12 复制cookies中的 ```SESSDATA``` 与 ```bili_jct``` 对应键值
- tts 需要Azure平台相应key

>dom版
 - [界面截图](https://db.loli.monster/danmu2.png)
 - [主程序界面](https://db.loli.monster/application.png)

- [下载地址](https://github.com/kokolokksk/mua/releases/latest)
## Windows
- 在Windows 10 上测试
- 直接运行CatCatDM.exe
## Linux
- 在Ubuntu 20.04 版本上测试。
- 进入目录 ```chmod +x CatCatDM```
- 若提示  ```libgconf-2.so.4: cannot open shared object file: No such file or directory``` 则 ```apt-get update``` 再```apt-get install libgconf-2-4``` 然后执行 ```./CatCatDM```

#### 待做列表
- [x] 显示一条文字
- [x] 动起来
- [x] 对接直播间
- [x] 自定义房间号
- [x] 粉丝牌（包含颜色）
- [x] 背景颜色自定义
- [x] 弹幕颜色
- [x] 人气
- [ ] TTS欢迎礼物
- [x] 进入直播间 
- [x] 礼物(基本显示)
- [x] 发送弹幕
- [ ] 发送弹幕更多选项
- [ ] [弹幕统计](https://github.com/kokolokksk/catcat-dm-data)
- [ ] ~[增量更新](https://github.com/kokolokksk/lolidate)~
- [x] 使用更加好听的TTS


#### 下一步
- 摸鱼

### 感谢（Thanks）
- [MistEO](https://github.com/MistEO)![MistEO](https://avatars.githubusercontent.com/u/18511905?s=70&v=4)提出的bug
- npm module [electron-referer](https://github.com/akameco/electron-referer)
- npm module [bilibili-live-ws](https://github.com/simon300000/bilibili-live-ws/)
- npm module [bilibili-live-danmaku-api](https://github.com/simon300000/bilibili-live-danmaku-api)
- [background image](https://codepen.io/plavookac/pen/QMwObb)
- [tts间隔问题](https://stackoverflow.com/questions/62564402/microsoft-cognitive-tts-onaudioend-event-not-working)
- This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

### 交流
issue 或者 神秘代码（319833969）

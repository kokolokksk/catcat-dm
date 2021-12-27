/*  作者：鬼小妞
    链接：https://juejin.cn/post/6844903949972013064
    来源：稀土掘金
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
const DEFAULT_THEME = 'theme' // 默认主题

let themeOptions = {} // 可选主题

/* ------------------------------------
       批量自动导入可选主题
------------------------------------ */
const files = require.context('.', false, /\.scss$/)// 第一个参数表示相对的文件目录，第二个参数表示是否包括子目录中的文件，第三个参数表示引入的文件匹配的正则表达式。
files.keys().forEach((key) => {
  if (key === './index.js') return
  let optionKey = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.scss'))// 截取文件名称
  themeOptions[`${optionKey}`] = key // 设置key为文件名
})

/* ------------------------------------
*            设置主题配置
------------------------------------ */
export const theme = {
  currentTheme: DEFAULT_THEME, // 当前主题
  themeOption: themeOptions // 当前主题可选项
}

/* ------------------------------------
*            设置主题
对外提供一个setup方法，用来修改我们的主题；
由于需要兼容多主题样式，所以这里在body上加入了相应的类名，方便我们做样式定制
------------------------------------ */
export const themeSetup = themekey => {
  if (!themekey) {
    return
  }

  let themeName = themekey.replace(/\s+/g, '') // 去除所有空格
  // 如果以及添加过这个样式，就不再重复添加
  if (document.body.classList) {
    if (Array.from(document.body.classList).includes('theme-' + themeName)) {
      console.log('你已使用该主题')
      return
    }
  }

  // 如果设置没有在可选主题里，则不可修改主题
  if (!themeOptions[themeName]) {
    console.log('没有在可选主题里，不可修改主题')
    return
  }

  // 如果有主题dom,移除
  let themeDom = document.querySelectorAll('style[theme]')
  if (themeDom) {
    for (let i = 0; i < themeDom.length; i++) {
      document.head.removeChild(themeDom[i])
    }
  }

  // 给body创建一个主题标记,方便定制
  Object.keys(themeOptions).forEach(themeName => {
    document.body.classList.remove(`theme-${themeName}`)
  })
  document.body.classList.add(`theme-${themeName}`)
  document.body.setAttribute('theme', themeName)

  theme.currentTheme = themeName

  require(`${themeOptions[themeName]}`)// 引入
  document.head.lastChild.setAttribute('theme', themeName)// 给新添加的style设置theme属性
  window.localStorage.setItem('THEME', themeName)// 缓存主题

  console.log('修改主题成功')
}

/**
 * 主题初始化
 * @function initTheme
 * 从本地存储取，设置主题
 */
export const initTheme = function () {
  let localTheme = window.localStorage.getItem('THEME')
  if (localTheme) {
    themeSetup(localTheme)// 设置本地缓存主题
  } else {
    themeSetup(DEFAULT_THEME)// 设置默认主题
  }
}

// 把切换主题绑定到window上，方便在vue组件以外的文件使用语言包
window.theme = theme
window.themeSetup = themeSetup
window.initTheme = initTheme

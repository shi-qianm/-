/**
 *
 * [MITM]
 * music.163.com
 *
 * [Script]
 * http-request ^https?:\/\/music\.163\.com\/ script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/neteasemusic/neteasemusic.cookie.js
 * cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/neteasemusic/neteasemusic.js
 *
 */

const cookieName = '网易云音乐'
const cookieKey = 'chavy_cookie_neteasemusic'
const cookieVal = $persistentStore.read(cookieKey)

const pc = `http://music.163.com/api/point/dailyTask?type=1`
const mobile = `http://music.163.com/api/point/dailyTask?type=0`

function sign() {
  let url = {
    url: null,
    headers: {
      Cookie: cookieVal
    }
  }

  url.url = pc
  $httpClient.post(url, (error, response, data) => {
    log('网易云音乐(PC端)', data)
  })

  url.url = mobile
  $httpClient.post(url, (error, response, data) => {
    log('网易云音乐(移动端)', data)
  })

  $done({})
}

function log(title, data) {
  let result = JSON.parse(data)
  if (result.code == 200) {
    console.log(`签到成功: ${title}`)
  } else {
    console.log(
      `签到失败: ${title}, 错误编码: ${result.code}, 错误原因: ${result.msg}`
    )
  }
}

sign()

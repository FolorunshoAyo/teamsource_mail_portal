const {series, parallel, src, dest} = require('gulp')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify')
const postcss = require('gulp-postcss')
const cleancss = require('gulp-clean-css')

/* Destination dir */

const destDir = './dist'

/* JS. Transpile with babel & minify */

const processJs = (baseName, isMin) => {
  let r = src('src/js/' + baseName + '.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))

  if (isMin) {
    r = r.pipe(uglify()).pipe(rename(baseName + '.min.js'))
  }

  return r.pipe(dest(destDir + '/js'))
}

const processJsMain = () => {
  return processJs('main')
}

const processJsMainMin = () => {
  return processJs('main', true)
}

const processJsChartSample = () => {
  return processJs('chart.sample')
}

const processJsChartSampleMin = () => {
  return processJs('chart.sample', true)
}

/* CSS */

const processCss = () => {
  return src('src/css/main.css')
    .pipe(postcss())
    .pipe(cleancss())
    .pipe(dest(destDir + '/css'))
}

/* HTML */
const dateNowMillis = Date.now()

const concatHtml = file => {
  let replaceHtmlClassWith = ''
  const formScreenFiles = 
  [
    'login',
    'register',
    'account-details',
    'forgot-password',
    'mail-sent'
  ]

  const adminPageFiles = [
    'admin-index',
    'admin-organisations',
    'admin-organisation',
    'admin-contacts',
    'admin-agents',
    'admin-groups',
    'admin-emails',
    'admin-users',
    'admin-plans',
    'admin-campaigns',
  ];

  if (formScreenFiles.indexOf(file) > -1) {
    replaceHtmlClassWith = 'form-screen'
  }

  const sources = [
    'src/html/parts/head.html',
    'src/html/parts/app-open.html'
  ]

  if (formScreenFiles.indexOf(file) < 0) {
    sources.push(
      (adminPageFiles.indexOf(file) > -1)? 'src/html/parts/navbar-admin.html': 'src/html/parts/navbar.html',
      (adminPageFiles.indexOf(file) > -1)? 'src/html/parts/admin-aside.html' : 'src/html/parts/aside.html',
      'src/html/parts/title-bar.html',
      'src/html/parts/hero-bar.html'
    )
  }

  sources.push(`src/html/${file}.html`)

  if (formScreenFiles.indexOf(file) < 0) {
    sources.push(
      'src/html/parts/footer.html',
      'src/html/parts/sample-modal.html'
    )
  }

  sources.push(
    'src/html/parts/app-close.html',
    'src/html/parts/bottom-scripts.html'
  )

  if (file === 'index' || file === "admin-index" || file === 'campaign' || file === 'admin-organisation') {
    sources.push('src/html/parts/bottom-scripts-admin.html')
  }

  sources.push('src/html/parts/bottom.html')

  const titleStrings = {
    tables: 'Tables | TeamSend',
    index: 'Dashboard | TeamSend',
    forms: 'Forms | TeamSend',
    profile: 'Profile | TeamSend',
    login: 'Login | TeamSend',
    "account-details": 'New Account | TeamSend',
    "forgot-password": 'Forgot Password | TeamSend',
    'mail-sent': 'Mail Sent | TeamSend',
    agents: 'Agents | TeamSend',
    'all-contacts': "Contacts | TeamSend",
    'bulk-upload': "Bulk Export Import Contacts | TeamSend",
    'new-group': "New Group | TeamSend",
    'all-groups': "All Groups | TeamSend",
    'check-bounce': "Bounce Checker | TeamSend",
    'bounced-emails': "Bounced Emails | TeamSend",
    'template-builder-originate': 'Create New Email Template | TeamSend',
    'email-templates': 'Email Templates | TeamSend',
    'all-campaigns': 'All Campaigns | TeamSend',
    'new-campaign': 'New Campaign | TeamSend',
    campaign: 'Email Campaign Details | Teamsend',
    group: 'Group Details | Teamsend',
    'all-schedules': 'All Schedules | Teamsend',
    'email-tracker': 'Email Tracker | Teamsend',
    'mail-logs': 'Mail Logs | Teamsend',
    'admin-index': 'Admin Dashboard | Teamsend Admin',
    'admin-organisations': 'Organisations | Teamsend Admin',
    'admin-organisation': 'Organisation Details | Teamsend Admin',
    'admin-contacts': 'Contacts | Teamsend Admin'
  }

  const titleStringsLong = {
    tables: 'Responsive Tables',
    agents: 'Agents',
    'all-contacts': "Contacts",
    'bulk-upload': "Bulk Export Import Contacts",
    'new-group': "New Group",
    'all-groups': "All Groups",
    'check-bounce': "Bounce Checker",
    'bounced-emails': "Bounce Emails",
    'template-builder-originate': 'Create New Email Template',
    'email-templates': 'Email Templates',
    'all-campaigns': 'All Campaigns',
    'new-campaign': 'New Campaign',
    campaign: 'Email Campaign Details',
    group: 'Group Details',
    'all-schedules': 'All Schedules',
    'email-tracker': 'Email Tracker',
    'mail-logs': 'Mail Logs',
    'campaign-logs': 'Campaign Logs',
    'admin-index': 'Admin Dashboard',
    'admin-organisations': 'Organisations',
    'admin-organisation': 'Organisation Details',
    'admin-contacts': 'Contacts'
  }

  const subMenuLinks = {
    'all-contacts': "contacts",
    'bulk-upload': "contacts",
    'all-groups': "groups",
    'new-group': "groups",
    'check-bounce': "emails",
    'bounced-emails': "emails",
    'template-builder-originate': "email-builder",
    'email-templates': "email-builder",
    'all-campaigns': "campaigns",
    'new-campaign': "campaigns" ,
    'all-schedules': "campaigns",
    'email-tracker': "campaigns",
    'mail-logs': 'campaigns',
    'campaign-logs': 'campaigns',
  }

  const titleStringReplacement = titleStrings[file] ? titleStrings[file] : ''
  const titleStringLongReplacement = titleStringsLong[file] ? titleStringsLong[file] : titleStringReplacement

  return src(sources)
    .pipe(concat(`${file}.html`))
    .pipe(replace('--date-now-millis', dateNowMillis.toString()))
    .pipe(replace('--html-class', replaceHtmlClassWith))
    .pipe(replace('--stylesheet-min-path', `css/main.css?v=${dateNowMillis.toString()}`))
    .pipe(replace(`--set-active-${file}-html`, 'active'))
    .pipe(replace(`--plus-or-minus-${subMenuLinks[file]}`, 'minus'))
    .pipe(replace(/ --set-active-[a-z-]+/gi, ''))
    .pipe(replace(/--plus-or-minus-[a-z-]+/gi, 'plus'))
    .pipe(replace('{{ titleString }}', titleStringReplacement))
    .pipe(replace('{{ titleStringLong }}', titleStringLongReplacement))
    .pipe(dest(destDir))
}

/* Img */

const copyImg = () => {
  return src('src/img/*')
    .pipe(dest(destDir + '/img'))
}

const copyTailwindFavicons = () => {
  return src('src/tailwind-favicons/*')
    .pipe(dest(destDir))
}

exports.default = series(
  parallel(
    () => concatHtml('index'),
    () => concatHtml('tables'),
    () => concatHtml('forms'),
    () => concatHtml('profile'),
    () => concatHtml('login'),
    () => concatHtml('register'),
    () => concatHtml('account-details'),
    () => concatHtml('forgot-password'),
    () => concatHtml('mail-sent'),
    () => concatHtml('agents'),
    () => concatHtml('all-contacts'),
    () => concatHtml('bulk-upload'),
    () => concatHtml('all-groups'),
    () => concatHtml('new-group'),
    () => concatHtml('check-bounce'),
    () => concatHtml('bounced-emails'),
    () => concatHtml('template-builder-originate'),
    () => concatHtml('email-templates'),
    () => concatHtml('all-campaigns'),
    () => concatHtml('new-campaign'),
    () => concatHtml('campaign'),
    () => concatHtml('group'),
    () => concatHtml('all-schedules'),
    () => concatHtml('email-tracker'),
    () => concatHtml('mail-logs'),
    () => concatHtml('campaign-logs'),
    () => concatHtml('admin-index'),
    () => concatHtml('admin-organisations'),
    () => concatHtml('admin-organisation'),
    () => concatHtml('admin-contacts'),
    processJsMain,
    processJsMainMin,
    processJsChartSample,
    processJsChartSampleMin,
    copyImg,
    copyTailwindFavicons,
  ),
  processCss
)

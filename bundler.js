const path = require('path')
const rollup = require('rollup')
const { exec } = require('child_process')
const loadConfigFile = require('rollup/dist/loadConfigFile')
const debug = require('debug')
debug.enable('main, front')

const pattern = 'http://localhost:'
const main = { p: 0, log: debug('main') }
const front = { p: 0, log: debug('front') }

const stop = code => {
  if (code !== null && (code === 0 || code === 1)) {
    front.p.kill()
    process.exit()
  }
}

const startMain = async () => {
  const { options, warnings } = await loadConfigFile(path.resolve(__dirname, 'rollup.config.js'))
  const watcher = rollup.watch(options)
  watcher.on('event', ({ code, input }) => {
    if (input && input.includes('/main/')) {
      if (code === 'BUNDLE_START' && main.p && main.p.kill) {
        main.p.off('close', stop)
        main.p.off('data', main.log)
        main.p.kill('SIGINT')
        delete main.p
      } else if (code === 'BUNDLE_END' && !main.p) {
        main.p = exec('electron .')
        main.p.stdout.on('data', main.log)
        main.p.stdout.on('error', main.log)
        main.p.on('data', main.log)
        main.p.on('close', stop)
      }
    }
    // else if (input && input.includes('/renderer/')) {
  })

  warnings.flush()
  for (const optionsObj of options) {
    const bundle = await rollup.rollup(optionsObj)
    await Promise.all(optionsObj.output.map(bundle.write))
  }
}
front.p = exec('vue-cli-service serve')
front.p.stdout.on('error', front.log)
front.p.stdout.on('data', data => {
  if (data.includes(pattern) && !main.p) {
    const l = data.indexOf(pattern) + pattern.length
    const port = data.toString().slice(l, l + 4)
    process.env.VUE_DEV_SERVER_URL = pattern + port
    startMain()
  }
  front.log(data.toString())
})

front.p.on('data', (data) => {
  front.log(data.toString())
})

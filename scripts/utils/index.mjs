import fs from "fs"
import chalk from "chalk";
import { require } from "./require.mjs"

export { fuzzyMatchTarget } from "./fuzzyMatchTarget.mjs"
export { require } 


export const targets = fs.readdirSync('packages').filter(f => {
    console.log(f)
    if (!fs.statSync(`packages/${f}`).isDirectory()) {
      return false
    }
    const pkg = require(`./packages/${f}/package.json`)
    if (pkg.private && !pkg.buildOptions) {
      return false
    }
    return true
  })
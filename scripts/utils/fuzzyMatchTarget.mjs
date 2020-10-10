import chalk from "chalk";

export function fuzzyMatchTarget(partialTargets, includeAllMatching) {
    const matched = []
    partialTargets.forEach(partialTarget => {
      for (const target of targets) {
        if (target.match(partialTarget)) {
          matched.push(target)
          if (!includeAllMatching) {
            break
          }
        }
      }
    })
    if (matched.length) {
      return matched
    } else {
      console.log()
      console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
          `Target ${chalk.underline(partialTargets)} not found!`
        )}`
      )
      console.log()
  
      process.exit(1)
    }
}
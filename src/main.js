const globby = require("globby");
const YAML = require("yaml");
const fs = require("fs");

function loadDataDir(dataDir) {
  let people = {};

  const matches = globby.sync(dataDir + "/*.yml");
  for (match of matches) {
    const person = fs.readFileSync(match, "utf8");
    people[match] = YAML.parse(person);
  }
  return people;
}

function main() {
  const dataDir = process.argv[2];
  const people = loadDataDir(dataDir);
  console.log(people);
}

main();

#! /usr/bin/env node
import fetch from 'node-fetch'
import yargs from 'yargs'
import open from 'open'
import randomExt from 'random-ext'
// import { writeFile } from 'fs'

// to obtain an API key, visit here: https://api.nasa.gov/
const API_KEY = 'pesonalApiKey'

const { argv } = yargs(process.argv)

const randomDateString = randomExt
  .date(new Date(), new Date('1995-06-16'))
  .toISOString()
  .split('T')[0]

const res = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${randomDateString}`
)
const data = await res.json()

// const n = data.url.lastIndexOf('/')
// const fileName = data.url.substring(n + 1)
// console.log(fileName)

if (argv.print) {
  console.log(`
    date: ${data.date}
    title: ${data.title}
    url: ${data.hdurl}
  `)
}

if (argv.hd) {
  open(data.hdurl)
} else {
  open(data.url)
}

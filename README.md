# Check Participation

This actions is checking members' participation for a given unit of time - for example a week - and marks them to README file.

## Required input

Attendance Username-Id Mapping: `/.attendance/usermap.txt`
Attendance database: `/.attendance/records.txt`
ReadMe.md File: old `/README.md`

## Output

Automatically updated `/README.md`

## How to test

```bash
$ npm i
$ node index.js
```


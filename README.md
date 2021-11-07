# Check Participation

This action will run on every push to check members' participation for a given unit of time - for example a week - and marks them to README file.

like:
<table id="attendance"><tr>        <th></th> <!-- 이 부분은 이름 영역이라 빈 column -->        <th><strong>Week 1</strong></th><th><strong>Week 2</strong></th><th><strong>Week 3</strong></th><th><strong>Week 4</strong></th><th><strong>Week 5</strong></th><th><strong>Week 6</strong></th><th><strong>Week 7</strong></th>      </tr><tr>        <td><strong>김성빈</strong></td>        <td>1/3</td><td>1/3</td><td>1/3</td><td>💯</td><td>💯</td><td>💯</td><td>0/3</td>      </tr><tr>        <td><strong>오규태</strong></td>        <td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td>      </tr><tr>        <td><strong>오예림</strong></td>        <td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td>      </tr></table>

## Required input

Attendance Username-Id Mapping: `/.attendance/usermap.txt` <br/>
Attendance database: `/.attendance/records.txt` <br/>
ReadMe.md File: old `/README.md` <br/>

## Output

Automatically updated `/README.md`

## How to test

```bash
$ npm i
$ node index.js
```


# Check Participation

This action will run on every push to check members' participation for a given unit of time - for example a week - and marks them to README file.

like:
<table>
  <tr>
    <th></th>
    <th><strong>1 주차</strong></th>
	</tr>
    <tr>
      <td><strong>김다롬</strong></td>
      <td>💯</td>
    </tr>
    <tr>
      <td><strong>오규태</strong></td>
      <td>💯</td>
    </tr>
    <tr>
      <td><strong>오예림</strong></td>
      <td>💯</td>
    </tr>
    <tr>
      <td><strong>이유진</strong></td>
      <td>💯</td>
    </tr>
    <tr>
      <td><strong>황성찬</strong></td>
      <td>💯</td>
    </tr>
</table>

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


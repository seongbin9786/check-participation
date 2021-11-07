# Check Participation

This action will run on every push to check members' participation for a given size of session - for example a week - and marks them on README file.

like below:
<table id="attendance"><tr>        <th></th> <!-- 이 부분은 이름 영역이라 빈 column -->        <th><strong>Week 1</strong></th><th><strong>Week 2</strong></th><th><strong>Week 3</strong></th><th><strong>Week 4</strong></th><th><strong>Week 5</strong></th><th><strong>Week 6</strong></th><th><strong>Week 7</strong></th>      </tr><tr>        <td><strong>김성빈</strong></td>        <td>1/3</td><td>1/3</td><td>1/3</td><td>💯</td><td>💯</td><td>💯</td><td>💯</td>      </tr><tr>        <td><strong>오규태</strong></td>        <td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td>      </tr><tr>        <td><strong>오예림</strong></td>        <td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td><td>0/3</td>      </tr></table>

## Required input

> 아래 문서 중 `README.md` 이외에 내용에 주석이 위치할 수 없다.
> 
> There must be no content inside each documents other than those required keys and values mentioned below.

#### UserName-RealName Mapping File


path: `/.attendance/usermap.txt`

content:
```
seongbin9786 김성빈
RustShark 오규태
Ohyaelim 오예림
```

#### User Participation Records File

path: `/.attendance/records.txt`

content:
```
seongbin9786=1,1,1,3,3,3,2
RustShark=0,0,0,0,0,0,0
Ohyaelim=0,0,0,0,0,0,0
```

#### Config File

path: `/.attendance/config.txt`

content:
```
firstSession=2021-10-03 00:00
sessionName=Week
sessionLength=7
fullyAttendedMinimum=3
```

#### ReadMe.md File

path: `/README.md` 

content:
```
id="attendance"인 table Element가 하나 있어야 함.
```

## Output

Automatically updated `/README.md`

## How to test

```bash
$ npm i
$ node index.js
```

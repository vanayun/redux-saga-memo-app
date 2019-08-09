# json-server 설치

```bash
$ npm install -g json-server #json-server 글로벌 설치
```
```bash
$ mkdir fake-server #fake-server 폴더 생성
$ touch db.json # db.json 파일 생성 후 초기 데이터 입력.
```

db.json
```json
{
  "memo": [
      {
          "id": 1,
          "title": "첫 메모 제목",
          "body": "첫 메모 내용"
      }
  ]
}
```

```bash
$ json-server --watch db.json --port 3001 #서버 실행
```

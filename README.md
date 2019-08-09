# json-server 설치

```bash
mkdir fake-server #fake-server 폴더 생성
touch db.json # db.json 파일 생성 후 초기 데이터 입력.
npm install -g json-server #json-server 글로벌 설치
json-server --watch db.json --port 3001 
```

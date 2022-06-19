# recipe-manager

## Getting Started
```bash
docker-compose up -d
cd server
npm install
npm start

cd ../client
npm install
npm run build
npm start
```

## stack
- MERN
- Reducx/Redux Saga

## 내용
레시피의 정보를 저장하여 그 저장된 정보로 생성된 AI영상으로 해당 레시피의 안내를 단계별로 받을 수 있는 서비스 내용 기획

## 기능
- 회원가입, 로그인, jwt 인증
- 레시피 추가/수정/삭제 기능
- 레시피 추가/수정시 AI 영상제작 API와 통신하여 영상 주소 받아 같이 저장하기

## 비고
- Redux/Redux Saga/jwt 연습용도 프로젝트

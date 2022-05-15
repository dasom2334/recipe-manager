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

## 내용
레시피의 정보를 저장하여 그 저장된 정보로 생성된 AI영상으로 해당 레시피의 안내를 단계별로 받을 수 있는 서비스 내용 기획

## 기능
- 회원가입, 로그인, jwt 인증
- 레시피 추가/수정/삭제 기능
- 레시피 추가/수정시 AI 영상제작 API와 통신하여 영상 주소 받아오기

## 비고
- DeepBrainAI의 영상제작 API 헬퍼는 완성되었지만, 레시피의 단계별로 여러 영상을 한꺼번에 제작하려 Promise.all로 비동기 통신을 묶어 처리하는 부분에서 DeepBrainAI API의 영상제작 API의 영상제작 진도가 토큰이 만료될 떄까지 완료되지 않아 관련 부분 정상 작동을 확인을 하지 못했음.

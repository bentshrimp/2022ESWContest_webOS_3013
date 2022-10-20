# 제 20회 임베디드 소프트웨어 경진대회 webOS부문 방파제팀
2022 ESWContest webOS - 영상데이터 기반 스마트 서비스 개발

**작품명**

- Home++

**작품 설명**

- 기존 월패드의 한계를 보완하여 개발한 Home++ 월패드는 플랫폼으로, 자체 앱 스토어가 탑재돼 유연하게 앱을 다운받을 수 있으며, 운동 보조 기능과 배달 물품 조회 기능, 차량 스케줄링 기능, 가전 제어 기능, cctv 기능을 제공한다.

<br/>

## 파일 구성도
<br/>
📦2022ESWContest_webOS_3013 <br/>
 ┣ 📂EC2 <br/>
 ┃ ┣ 📂express_file_server <br/>
 ┃ ┗ 📂express_server <br/>
 ┣ 📂main-AppStore <br/>
 ┃ ┣ 📂wallpad <br/>
 ┃ ┃ ┗ 📂appstore <br/>
 ┃ ┃ ┃ ┣ 📂appstore_app <br/>
 ┃ ┃ ┃ ┗ 📂appstore_service <br/>
 ┣ 📂main-CCTV <br/>
 ┃ ┣ 📂outside <br/>
 ┃ ┃ ┗ 📂arduino <br/>
 ┃ ┃ ┃ ┗ 📂cctv <br/>
 ┃ ┃ ┃ ┃ ┗ 📜cctv.ino <br/>
 ┃ ┣ 📂wallpad <br/>
 ┃ ┃ ┗ 📂cctv <br/>
 ┃ ┃ ┃ ┗ 📂cctv_app <br/>
 ┣ 📂main-CarScheduling <br/>
 ┃ ┣ 📂office <br/>
 ┃ ┃ ┣ 📂arduino <br/>
 ┃ ┃ ┃ ┗ 📂barrier <br/>
 ┃ ┃ ┃ ┃ ┗ 📜barrier.ino <br/>
 ┃ ┃ ┣ 📂car-detection <br/>
 ┃ ┃ ┃ ┣ 📂car-detection_app <br/>
 ┃ ┃ ┃ ┣ 📂car-detection_service <br/>
 ┃ ┃ ┣ 📂docker <br/>
 ┃ ┃ ┃ ┗ 📂tesseract <br/>
 ┃ ┣ 📂wallpad <br/>
 ┃ ┃ ┣ 📂register-car <br/>
 ┃ ┃ ┃ ┣ 📂register-car_app <br/>
 ┃ ┃ ┃ ┗ 📂register-car_service <br/>
 ┣ 📂main-Delivery <br/>
 ┃ ┣ 📂entrance <br/>
 ┃ ┃ ┗ 📂Detecting-packages <br/>
 ┃ ┣ 📂wallpad <br/>
 ┃ ┃ ┗ 📂delivery <br/>
 ┃ ┃ ┃ ┣ 📂delivery_app <br/>
 ┃ ┃ ┃ ┗ 📂delivery_service <br/>
 ┣ 📂main-HomeTraining <br/>
 ┃ ┗ 📂wallpad <br/>
 ┃ ┃ ┗ 📂exercise <br/>
 ┃ ┃ ┃ ┣ 📂exercise_app <br/>
 ┃ ┃ ┃ ┗ 📂exercise_service <br/>
 ┃ ┗ 📂home <br/>
 ┃ ┃ ┃ ┣ 📂led <br/>
 ┃ ┃ ┃ ┃ ┗ 📜led.ino <br/>
 ┃ ┃ ┃ ┗ 📂windowBlind <br/>
 ┃ ┃ ┃ ┃ ┗ 📜windowBlind.ino <br/>
 ┣ 📂main-NoticeAlert <br/>
 ┃ ┣ 📂wallpad <br/> 
 ┃ ┃ ┣ 📂control <br/>
 ┃ ┃ ┃ ┣ 📂control_app <br/>
 ┃ ┃ ┃ ┗ 📂control_service <br/>
 ┃ ┃ ┗ 📂reservation <br/>
 ┃ ┃ ┃ ┣ 📂reservation_app <br/>
 ┃ ┃ ┃ ┗ 📂reservation_service <br/>
 ┗ 📜README.md
<br>

## 팀 명단
<table>
  <tr>
    <td align="center"><a href="https://github.com/ymw0407"><img src="https://avatars.githubusercontent.com/u/77202633?v=4" width="100px;" alt=""/><br/><sub><b>윤민우</b><sub></a></td>
    <td align="center"><a href="https://github.com/seiyoon"><img src="https://avatars.githubusercontent.com/seiyoon" width="100px;" alt=""/><br/><sub><b>황세윤</b><sub></a></td>
    <td align="center"><a href="https://github.com/judyzero"><img src="https://avatars.githubusercontent.com/u/100904133?v=4" width="100px;" alt=""/><br/><sub><b>유다영</b></sub></a></td>
    <td align="center"><a href="https://github.com/jjunh33"><img src="https://avatars.githubusercontent.com/u/57091983?v=4" width="100px;" alt=""/><br/><sub><b>이준혁</b></sub></a></td>
    <td align="center"><a href="https://github.com/bentshrimp"><img src="https://avatars.githubusercontent.com/u/39232867?v=4" width="100px;" alt=""/><br/><sub><b>박진우</b></sub></a></td>
  </tr>
  <tr>
    <td align="center">팀장</td><td align="center">팀원</td><td align="center">팀원</td><td align="center">팀원</td><td align="center">팀원</td>
  </tr>
</table>

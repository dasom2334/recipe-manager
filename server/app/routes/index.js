import express from "express"
import deepBrainApiService from '../services/deepBrainApiService.js'
const indexRouter = express.Router();


indexRouter.route('/').get(function (req, res) {
  const deepBrainApi = new deepBrainApiService();
  (async () => {
      const term = 3000;
      let isGet = false;
      try {
          await deepBrainApi.generateClientToken(req, res);
          await deepBrainApi.generateToken(req, res);
          await deepBrainApi.getModelList(req, res);
          await deepBrainApi.getModelInfo(req, res);
          deepBrainApi.setText('테스트');
          await deepBrainApi.makeVideo(req, res);
          await deepBrainApi.findProject(req, res);
          while (true) {
              const current = deepBrainApi.getCurrentprogress();
              if (current === 100) {
                  isGet = true;
                  break;
              }
              console.log('current progress: ', current);

              await deepBrainApi.findProject(req, res);
              await new Promise(r => setTimeout(r, term));
          }
      } catch (e) {
          console.log(e);
      }
      if (isGet) 
          console.log(deepBrainApi.getVideo());
      }
  )();
  res.json({"현재 시간 : ": new Date().toLocaleString()})
});

export default indexRouter;
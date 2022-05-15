import express from "express"
import deepBrainApiService from '../services/deepBrainApiService.js'
const indexRouter = express.Router();

indexRouter.route('/').get(function(req, res) {
  const deepBrainApi = new deepBrainApiService();
  
  (async () => {
    await deepBrainApi.generateClientToken(req, res);
    await deepBrainApi.generateToken(req, res);
    await deepBrainApi.getModelList(req, res);
    await deepBrainApi.getModelInfo(req, res);
    await deepBrainApi.makeVideo(req, res);
    await deepBrainApi.findProject(req, res);
    while(deepBrainApi.getCurrentprogress() !== 100) {
      console.log('current progress: ', deepBrainApi.getCurrentprogress());
      await deepBrainApi.findProject(req, res);
      await new Promise(r => setTimeout(r, 3000));
    }
    console.log(deepBrainApi.getVideo());
  })();
  res.json({"현재 시간 : ": new Date().toLocaleString()})
});

export default indexRouter;
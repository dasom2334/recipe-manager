import db from '../models/index.js'
import https from 'https';

export default function deepBrainApiService() {
    let token = '';
    const basicInfo = {
        appId: "aistudios.com",
        platform: "web",
        isClientToken: true,
        uuid: "6443234b-77d5-4013-bfd6-bb9399f317d9",
        sdk_v: "1.0",
        clientHostname: "aistudios.com"
    };
    const model = {
        language: "ko",
        model: "ysy",
        clothes: "2"
    }
    let text = '안녕안녕녕';

    const hostInfo = {
        hostname: 'dev.aistudios.com'
    }
    let models = [];
    let videoKey = '';
    let currentProject = {progress: false};

    const requestPromise = (collback, reqData, body = null) => {
        console.log(body);
        const promise = new Promise((resolve, reject) => {
            const response = https.request(reqData, (getRes) => {
                console.log(`statusCode: ${getRes.statusCode}`); 
                console.log(`HEADERS:${JSON.stringify(getRes.headers)}`);
                getRes.on('data', (chunk) => {
                    try {
                        const data = JSON.parse(chunk);
                        console.log(data);
                        collback(data, resolve, reject);
                    } catch (e) {
                        console.log(chunk);
                        // console.log(chunk.toString());
                        console.log(e);
                        reject(e);
                    }
                });
                getRes.on('end', () => {
                    // console.log('No more data in response.');
                    resolve();
                });
            });
            if (body !== null) response.write(JSON.stringify(body));
            response.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
                reject(e);
            });
            response.end();
        });
        return promise;
    }
    return {
        setText: (data) => {
            text = data;
        },
        getCurrentprogress: () => currentProject.progress,
        getVideo: () => {
            if (currentProject.progress !== 100) {
                return false;
            } else {
                return currentProject;
            }
        },
        generateClientToken: (req, res) => {
            const reqData = {
                ...hostInfo,
                path: '/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-b' +
                        'fd6-bb9399f317d9',
                method: 'GET'
            };
            const callback = (data, resolve, reject) => {
                if (data.succeed) {
                    token = data.token;
                } else {
                    reject();
                }
            }
            return requestPromise(callback, reqData);
        },
        generateToken: (req, res) => {
            const body = {
                ...basicInfo,
                token: token
            };
            const reqData = {
                ...hostInfo,
                path: '/api/odin/generateToken',
                method: 'POST'
            };
            const callback = (data, resolve, reject) => {
                if (!data.succeed) {
                    reject();
                }
            }
            return requestPromise(callback, reqData, body);
        },
        getModelList: (req, res) => {
            const body = {
                ...basicInfo,
                token: token
            };
            const reqData = {
                ...hostInfo,
                path: '/api/odin/getModelList',
                method: 'POST'
            };
            const callback = (data, resolve, reject) => {
                if (!data.succeed) {
                    reject();
                } else {
                    models = data.models;
                }
            }
            return requestPromise(callback, reqData, body);
        },
        getModelInfo: (req, res) => {
            // ysy 아니면 영상 제공이 안돼서 고정시켜놓기.
            req.body.model = "ysy";

            const body = {
                ...basicInfo,
                token: token,
                model: req.body.model
            };
            const reqData = {
                ...hostInfo,
                path: '/api/odin/getModelInfo',
                method: 'POST'
            };
            const callback = (data, resolve, reject) => {
                if (!data.succeed) {
                    reject();
                } else {
                    // model = data.model;
                }
            }
            return requestPromise(callback, reqData, body);
            
        },
        makeVideo: (req, res) => {
            const body = {
                ...basicInfo,
                token: token,
                ...model,
                text: text
            };
            const reqData = {
                ...hostInfo,
                path: '/api/odin/makeVideo',
                method: 'POST'
            };
            const callback = (data, resolve, reject) => {
                if (!data.success) {
                    reject();
                } else {
                    videoKey = data.data.key;
                }
            }
            return requestPromise(callback, reqData, body);
        },
        findProject: (req, res) => {
            const body = {
                ...basicInfo,
                token: token,
                key: videoKey
            };
            const reqData = {
                ...hostInfo,
                path: '/api/odin/findProject',
                method: 'POST'
            };
            const callback = (data, resolve, reject) => {
                if (!data.success) {
                    reject();
                } else {
                    currentProject = data.data;
                }
            }
            return requestPromise(callback, reqData, body);
            
        },
    }
}
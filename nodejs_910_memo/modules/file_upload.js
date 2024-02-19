/**
 * 파일이 업로드 되면
 * 업로드 된 파일을 저장폴더에 저장하는 미들웨어
 */

//import fs form "fs"
//fs.existsSync()
//fs 모듈에서 existsSync 함수와 mkdirSync()함수만 사용하겠다.
import { existsSync, mkdirSync } from "fs";
import path from "path";
import multer from "multer";
//uuid 모듈에 있는 v4()함수를 uuid라는 이름으로 사용하겠다.
import { v4 as uuid } from "uuid";

// 프로세스의 물리적 저장소 경로(path)
//Document/workspace/nodejs/node_030/iolist/public/uploads
const appRoot = process.env.PWD;
const upLoadPath = path.join(appRoot, "public", "uploads");

/**
 *  multer 는 destination 과 filename 이라는 2개의 함수가 필요하다
 * destination : 파일을 저장할 때 사용할 설정들
 * filename : 파일 이름에 대한 핸들링
 */

const storgaeOption = {
  destination: async (req, file, callback) => {
    if (!existsSync(upLoadPath)) {
      mkdirSync(upLoadPath, { recursive: true });
    }
    callback(null, upLoadPath);
  },
  filename: (req, file, callback) => {
    //image name injection 해킹공격에 대비하여 원래 이름을 변경하여 업로드 하도록 지시
    const upFileName = `${uuid()}-${file.originalname}`;
    callback(null, upFileName);
  },
};

const storage = multer.diskStorage(storgaeOption);
const upLoad = multer({ storage });

export { upLoad };

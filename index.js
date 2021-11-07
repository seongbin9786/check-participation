require("dotenv").config();
const run = require("./runner");

// GITHUB_REPOSITORY와 GITHUB_ACTOR는 기본 제공되는 환경 변수이다.
// 이 값들도 with, env 둘 다 환경변수로 들어온다. with, env를 동시에 쓰면 문법 오류가 난다.
// env로 통일했다.
const token = process.env.GITHUB_TOKEN;
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const userName = process.env.GITHUB_ACTOR;
const addedFiles = process.env.ADDED_FILES || "";
const deletedFiles = process.env.DELETED_FILES || "";

run(token, owner, repo, userName, addedFiles, deletedFiles);

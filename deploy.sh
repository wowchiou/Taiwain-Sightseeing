#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git remote add origin https://github.com/wowchiou/Taiwain-Sightseeing.git
git checkout master

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:wowchiou/Taiwain-Sightseeing.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:wowchiou/Tainwain-Sightseeing.git master:gh-pages

git push -f --set-upstream origin master

cd -
# 1. 配置 git remote
git remote set-url origin https://github.com/yao52069/poe-vendor-string.git

# 2. 验证 remote
git remote -v

# 3. 提交所有改动
git add .
git commit -m "feat: 简体中文汉化 + GitHub Actions 自动同步 + Vercel配置"

# 4. 推送到你的 GitHub Fork
git push origin master

git pull && git checkout --orphan boat && git add . && git commit -m "reborn"
git branch -D main && git branch -m main
git push -f origin main
git branch --set-upstream-to=origin/main main && git pull
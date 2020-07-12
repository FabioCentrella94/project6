@ECHO OFF

START /wait npm install -g nodemon

cd backend
START /wait npm install

cd ../frontend
START /wait npm install

EXIT /B
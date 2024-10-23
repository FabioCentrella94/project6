@ECHO OFF

cd backend
START /wait npm install

cd ../frontend
START /wait npm install

EXIT /B
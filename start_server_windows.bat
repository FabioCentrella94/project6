@ECHO OFF

cd backend
START /B nodemon server

cd ../frontend
START /B npm start

EXIT /B
# HOT TAKES #

## Requirement ##

In order to test the app you must have node installed, if you don't have it follow the link to install it `https://nodejs.org/en/download/`.

## Installation ##

1. Clone this repo; 

2. Run the file:
    1. `setup_windows.bat` if you are on Windows;
    2. `setup_mac_and_linux` if you are on Mac or Linux.


If you have any problems to run the files:
1. open the terminal and run `npm install -g nodemon`;
2. go in the frontend folder and run `npm install`;
3. go in the backend folder and run `npm install`;

On Mac and Linux in case of denied permission when running the commands use the word `sudo` before the command. Example `sudo npm install -g nodemon`.

## Usage ##

Run the file: 
1. `start_server_windows.bat` if you are on Windows:
2. `start_server_linux_and_mac` if you are on Mac or Linux.

After running the file, the browser should automatically open on `http://localhost:8081`, if it doesn't just open the browser and paste the link in it.

If the app gives any problems you may have to run the server manually:
1. go in the backend folder and run `nodemon server`:
2. go in the frontend folder and run `npm start`.

If the app keeps giving problems stop the command both in frontend and backend folder pressing ctrl + c and try to run again the commands in the backend/frontend folder in different order, for example this time run first `npm start` in frontend folder and then `nodemon server` in backend folder.

P.S. = 
Environment:
Windows 10 Home
Visual Studio Code
Node Version: 12.18.1

Issue: Nodemon gives error "not digitally signed" when trying to run command nodemon server.

Solution: Run the command in command prompt not powershell.

## API Test ##
To test the API's are on `https://localhost:3000`. If you get any error message you may have to remove the `auth` from the routes inside the file `sauce.js` inside the `routes` folder in the `backend` folder.

## MongoDB Admins Test Terminal ##

In order to test the database admin is required to install the mongo shell:

1. if you are using Mac or Linux:
    1. install 'homebrew' by pasting the following link in the terminal '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"', in case of any error add the word 'sudo' before the link
    2. install the mongoshell by pasting the following link in the terminal 'brew install mongodb/brew/mongodb-community-shell', in case of any error add the word 'sudo' before the link
    3. add <your mongo shell's download directory>/bin to your $PATH variable
    4. run the following command in the terminal 'mongo "mongodb+srv://cluster0-iabbj.mongodb.net/hot-takes-01" --username <username>', replace <username> with 'TablesAdmin' or 'DatabaseAdmin' to test the different Admins
    5. insert the password '12345'

2. if you are using Windows:
    1. download the following package and install it 'https://downloads.mongodb.org/win32/mongodb-shell-win32-x86_64-2012plus-4.2.8.zip'
    2. add <your mongo shell's download directory>/bin to your $PATH variable
    3. run the following command in the terminal 'mongo "mongodb+srv://cluster0-iabbj.mongodb.net/hot-takes-01" --username <username>', replace <username> with 'TablesAdmin' or 'DatabaseAdmin' to test the different Admins
    4. insert the password '12345'
# Getting Started with MelEasy
Project github: [https://github.com/CodingBunnyi/mel-easy-travel](https://github.com/CodingBunnyi/mel-easy-travel).

Important thing: The project is only used for the University of Melbourne GEOM90007 Assignment 3 (Group 67) 2022 semester 2.

**Collaborator**:<br>

[CodingBunnyi](https://github.com/CodingBunnyi): Yuhan Qian 1244574 [**yuhqian1@student.unimelb.edu.au**](mailto:yuhqian1@student.unimelb.edu.au)<br>

[chcc3](https://github.com/chcc3): Cheng Chen 1161885 [**cheng.chen6@student.unimelb.edu.au**](mailto:pshangguan@student.unimelb.edu.au)<br>

[onennine](https://github.com/onennine): Xiaoxi Zhang 1226240 [**xiaoxzhang2@student.unimelb.edu.au**](mailto:pshangguan@student.unimelb.edu.au)

[pshangg](https://github.com/pshanggu): Peicong Shangguan 1222843 [**pshangguan@student.unimelb.edu.au**](mailto:pshangguan@student.unimelb.edu.au) 

## Run frontend
> Make sure you have node.js installed<br>
> node.js installation page: [https://nodejs.org/en/](https://nodejs.org/en/)

In the project directory, you can run:

> 1. Use `npm install` to install packages for frontend server <br>
> If you have any dependency issue when install packages, you can try `npm install --save --legacy-peer-deps` 
> 2. Use `npm start` to start frontend server
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
  
## Run backend
> Make sure you have python 3.7 or higher correctly installed  

* ### Windows user:
> 1. Open CMD at the backend folder which include the `requirements.txt` file:<br>
> `cd backend`
> 2. Create a python virtual environment at the backend folder:<br>
> `python -m venv env` or `python3 -m venv env`
> 3. Active the python virtual environment:<br>
> `env\Scripts\activate`  
> 4. Install the required python libraries:<br>
> `pip install -r requirements.txt`
> 5. Run backend server:<br>
> `python server.py` or `python3 server.py`
> 6. Update cached data:  
> Use `python server.py -u` or `python3 server.py -u` to start the backend server and 
> update cached data (This may take 10-15 min depend on the network condition)


* ### Mac-OS user:
> 1. Open CMD at the backend folder which include the `requirements.txt` file:<br>
> `cd backend`
> 2. Create a python virtual environment at the backend folder: <br>
> `python -m venv env` or `python3 -m venv env`
> 3. Active the python virtual environment:<br>
> `source env/bin/activate`
> 4. Install the required python libraries:<br>
> `pip install -r requirements.txt`
> 5. Run backend server:<br>
> `python server.py` or `python3 server.py`
> 6. Update cached data:  
> Use `python server.py -u` or `python3 server.py -u` to start the backend server and 
> update cached data (This may take 10-15 min depend on the network condition)

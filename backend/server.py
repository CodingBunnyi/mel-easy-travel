# Import flask and datetime module for showing date and time
from flask import Flask, request

import datetime


x = datetime.datetime.now()
  
# Initializing flask app
app = Flask(__name__)
  
  
# Route for seeing a data
@app.route('/data', methods=['get'])
def get_time():
    # Returning an api for showing in  reactj
    hello = request.args.get('hello', None)
    world = request.args.get('world', None)


    return f'{hello}...{world}'
  
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)


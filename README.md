Install requirements first: pip install -r requirements.txt

To run application: python fri.py or flask run

Application organization:

npm install
npm link ../capstone/frontend/node_modules/react

On Mac
Step 1: Make sure homebrew is installed
    * if not run command:
        $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    * check if installed by running:
        $ brew
Step 2: Install Node.js
    * check if node is already installed
    * run $ which node
    * if command returns "node not found
        - run $ brew install node
    * else check the version of node
        - run $ node --version
    * this app runs on v18.11.0
    * if node version is not this 
        - run $ brew install node @18
Step 3: Open capstone directory in VScode
Step 4: Open 2 terminals in VSCode
Step 5: In one terminal cd into frontend dir
        - run $ npm install --legacy-peer-deps
        - run $ npm install @material-ui/core --legacy-peer-deps
Step 6: Install Python if you havent 
        - run $ which python
        - if that comes up empty install python from site
            https://www.python.org/downloads/release/python-3110/
        - run $ python --version to double check
Step 7: In the other terminal cd into server dir
        - pip install -r requirements.txt
            * pip3 for some stable releases of python if pip command not found
        - run $ python app.py
            * python3 app.py for some stable release of python if pip command not found


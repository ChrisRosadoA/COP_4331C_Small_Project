## COP_4331C_Small_Project
A Contact Manager developed using LAMP Stack technologies. 

## Members And Roles
- Christian Rosado - Project Manager
- Christopher Beck - API
- Trevor Geiger - API
- Brian Chang - Front-End
- Trygve Nelson - Front-End
- Jared Reich - Database


## Website
https://projectreich.com/

## Requirements
- Visual Studio Code, MobaXTerm for Windows

## To Run Locally And Make Changes
- Clone repo using git clone into a directory
- Open MobaXTerm and create a new SSH session
- Use the IP: `104.248.228.192` and login as `root`
- Enter the directory /var/www/html/ to locate the repository
- Any changes made locally on Visual Studio Code must be updated on MobaXTerm

## To Debug
- Create a SSH session with the IP: `104.248.228.192` and login as `root`
- Run the command `sudo tail -f /var/log/apache2/error.log` 

## To View Database
- Create a SSH session with the IP: `104.248.228.192` and login as `root`
- Open mysql using `mysql`
- Access the database using `use ContactManager;`
- View users using `select * from Users;` or contacts using `select * from Contacts;`

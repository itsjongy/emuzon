# Amazan

Amazan is a clone of [Amazon](https://www.amazon.com).
<br/>
Access to the live site: [Amazan](https://itsamazan.herokuapp.com/)

## Index
| [Feature List](https://github.com/itsjongy/amazan/wiki/Features) | [Database Scheme](https://github.com/itsjongy/amazan/wiki/Database-Schema) | [User Stories](https://github.com/itsjongy/amazan/wiki/User-Stories) | [Wireframes](https://github.com/itsjongy/amazan/wiki/Wireframe) |

## Technologies Used
<div>
<img src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" alt="JavaScript" width="50"/>
<img
src="https://camo.githubusercontent.com/dd8b0601cdfefe534a6a26f4c29c7f8a5fcfc315002655f519c73121f7bad8bc/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f707974686f6e2f707974686f6e2d6f726967696e616c2e737667" alt="Python" width="50"/>
<img
src="https://camo.githubusercontent.com/aeb03e440f3a4d435adc6708b212dc20f3f1f09ecc12b6e420002b0851c18e13/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f736f636b6574696f2f736f636b6574696f2d6f726967696e616c2e737667" alt="Python" width="50"/>
<img
src="https://camo.githubusercontent.com/f7b8dd3ec5e0959272f5015575d66b6b6231329b1b597cca76d665453eb10f6b/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f73716c616c6368656d792f73716c616c6368656d792d6f726967696e616c2e737667" alt="Python" width="50"/>
<img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" alt="React" width="50"/>
<img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" alt="React" width="50"/>
<img src="https://camo.githubusercontent.com/d536b9cc0c533324368535ece721f5424f28eae3ec0e6f3847408948ecacfce6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2e737667" alt="React" width="50"/>
<img src="https://camo.githubusercontent.com/2e496d4bfc6f753ddca87b521ce95c88219f77800212ffa6d4401ad368c82170/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f637373332f637373332d6f726967696e616c2e737667" alt="React" width="50"/>
<img src="https://camo.githubusercontent.com/da7acacadecf91d6dc02efcd2be086bb6d78ddff19a1b7a0ab2755a6fda8b1e9/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f68746d6c352f68746d6c352d6f726967696e616c2e737667" alt="React" width="50"/>
<img src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" alt="React" width="50"/>
</div>

## Getting Started
<details>
<summary>How do I run this project?</summary>

1. Clone this repo.

   ```bash
   git clone git@github.com:itsjongy/amazan.git
   ```

2. Install dependencies from the root directory and update the contents of your requirements.txt file to match your Pipfile.lock

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Install dependencies from the `react-app` directory

   ```bash
   npm install
   ```

4. In the `react-app` directory, create a `.env` file using the `.env.example` that will be used to define your desired `PORT` (preferably 5000).

5. In the root directory, create a `.env` file that will be used to define your environment variables.

   > Use the `.env.example` found in the root directory as a template. Use a secured combination of characters for your `SECRET_KEY`. The `DATABASE_URL` should be in the format of `postgresql://<database_user>:<password>@localhost/<database_name>`

6. Create a **user** using the same credentials in the `.env` file of the root directory with the ability to create databases

   ```bash
    psql -c "CREATE USER <database_username> PASSWORD '<password>' CREATEDB"
   ```

7. Create a **database** using the same credentials in the `.env` file of the root directory

   ```bash
    psql -c "CREATE DATABASE <database_name> WITH OWNER <database_username>"
   ```

8. Enter `pipenv` to migrate and seed your database

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

9. Inside of the `pipenv` shell, start the services in the root directory

   ```bash
   flask run
   ```

10. In a separate terminal, start the services in the `react-app` directory

    ```bash
    npm start
    ```
  
# Helpful commands

| Command              | Purpose                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `pipenv shell`       | Open your terminal in the virtual environment and be able to run flask commands without a prefix                                             |
| `pipenv run`         | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands |
| `flask db upgrade`   | Check in with the database and run any needed migrations                                                                                     |
| `flask db downgrade` | Check in with the database and revert any needed migrations                                                                                  |
| `flask seed all`     | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details                |

</details>
   
## Features
Users will be allowed to browse through the products and the product page without an account. However, in order to access the full features of Amazan, users must login or sign up with an account.
  - If you do not want to make an account, feel free to test the site using the demo login.

Logged in users can perform following actions:
  - Write/edit/delete reviews under a product.
  - Add items into cart, edit the amount of items in the cart, and remove items in the cart.
   
## Upcoming features
This is a project that I want to continue working on and improve over time so I'll be committed to adding more features in the future.
### To-do:
  - [ ] Create an orders page
  - [ ] Create a checkout page
  - [ ] Search bar
  - [ ] Categories

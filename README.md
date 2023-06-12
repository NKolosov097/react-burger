<h1 align="center"><a href="https://nkolosov097.github.io/react-burger" target="_blank">Stellar Burger</a></h1>
<h3 align="start">Technologies</h3>
<h4>
  <ul>
    <li>Typescript</li>
    <li>React</li>
    <li>React DnD</li>
    <li>React Icons</li>
    <li>React Test Renderer</li>
    <li>Redux</li>
    <li>Redux Toolkit</li>
    <li>Classnames</li>
    <li>Mocha</li>
    <li>Fetch Mock</li>
    <li>Jest</li>
    <li>Cypress</li>
    <li>Gh Pages</li>
  </ul>
  </h4>

<hr>

<h3 align="start">Description</h3>
  <h4>Online burger constructor, when you can:
  <ul>
    <li>Drag and drop ingredients from the list on the left to the right</li>
    <li>Create your own unique burger</li>
    <li>Register</li>
    <li>Login</li>
    <li>Reset forgotten password</li>
    <li>Track your order in profile page (orders)</li>
    <li>Watch other orders in feed page</li>
    <li>Change your personal info in profile page</li>
  </ul>
</h4>

<hr>

<details>
  <summary><h3>Local start of aplication</h3></summary>
  <ol>
    <li>
      <h4>Clone the repository:</h4>
      <code>git@github.com:NKolosov097/react-burger.git</code>
    </li>
    <li>
      <h4>Install all dependencies:</h4>
      <code>npm i</code>
      or
      <code>yarn add</code>
    </li>
    <li>
      <h4>Start the application:</h4>
      <code>npm start</code>
      or 
      <code>yarn start</code>
    </li>
    <li>
      <h4>Go to http://localhost:3000 to view the application</h4>
    </li>
  </ol>
</details>

<hr>

<details>
  <summary><h3>Testing</h3></summary>
  <details>
    <summary><h4>Unit tests</h4></summary>
    <h4>Launch all unit tests:</h4>
    <code>npm run test</code>
  </details>
  
  <details>
    <summary><h4>E2E tests</h4></summary>
    <ol>
      <li>
        <h4>Create "fixtures" folder in cypress directory</h4>
      </li>
      <li>
        <h4>Create <code>login.json</code> with following content:</h4>
        <code>{<Br>
          "email": "email@gmail.com",<Br>
          "password": "password"<Br>
        }</code>
      </li>
      <li>
        <h4>Start the application:</h4>
        <code>npm start</code>
        or 
        <code>yarn start</code>
      </li>
      <li>
        <h4>Launch cypress:</h4>
        <code>npm run cypress:open</code>
        or 
        <code>yarn run cypress:open</code>
      </li>
    </ol>
  </details>
</details>

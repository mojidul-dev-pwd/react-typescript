import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { AppProps, Users } from './components/App.types';
import User from './components/User';

// interface AppProps {
//   title: string;
// }
//or using type
// type AppProps = {
//   title: string;
// };

//or Using Inline Type Declaration
// const App = ({ title }: { title: string }) => {
//   return <div>App</div>;
// };

// const App: FC<AppProps> = () => {
//   return <div>App</div>;
// };

// export interface Name {
//   first: string;
//   last: string;
// }

// export interface Login {
//   uuid: string;
// }

// export interface Users {
//   name: Name;
//   login: Login;
//   email: string;
// }

const App: FC<AppProps> = ({ title }) => {

  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          'https://randomuser.me/api/?results=10'
        );
        console.log(data);
        setUsers(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {/* {users.map(({ login, name, email }) => {
          return (
            <li key={login.uuid}>
              <div>
                Name: {name.first} {name.last}
              </div>
              <div>Email: {email}</div>
              <hr />
            </li>
          );
        })} */}

        {users.map(({ login, name, email }) => {
          return <User key={login.uuid} name={name} email={email} />;
        })}
      </ul>
    </div>
  );
};

export default App;
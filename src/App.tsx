import axios from 'axios';
import { FC, useState } from 'react';
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

  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState<Users[]>([]);

  const [username, setUsername] = useState('');

  // useEffect(() => {
    
  //   const getUsers = async () => {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await axios.get(
  //         'https://randomuser.me/api/?results=10'
  //       );
  //       console.log(data);
  //       setUsers(data.results);
  //     } catch (error) {
  //       console.log(error);
  //     }finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getUsers();
  // }, []);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://randomuser.me/api/?results=10');
      console.log(data);
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  
  return (
    <div>
      <h1>{title}</h1>
      {isLoading && <p>Loading...</p>}
      <button onClick={handleClick}>Show Users</button>
      &nbsp;
      <input type='text' onChange={handleChange} />
      <div>{username}</div>
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
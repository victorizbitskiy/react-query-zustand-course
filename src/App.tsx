import {immer} from "zustand/middleware/immer";
import { useEffect } from "react";
import { create } from "zustand";

interface User {
  id: number;
  username: string;
}

interface UsersState {
  users: User[];
  isLoading: boolean;
  errors: string[];
  addUser: (username: string) => void;
  fetchUsers: () => void;
}

const useUsersStore = create<UsersState>()(
  immer((set) => ({
    users: [],
    isLoading: false,
    errors: [],
    addUser: (username: string) =>
      set((state) => {
        state.users.push({ id: Date.now(), username });
      }),
    fetchUsers: async () => {
      const result = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = (await result.json()) as User[];
      set({ users: json });
    },
  }))
);

const useCommentsStore = create(() => ({}));

function App() {
  const users = useUsersStore((state) => state.users);
  const addUser = useUsersStore((state) => state.addUser);
  const fetchUsers = useUsersStore((state) => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  const onBtnClick = () => {
    addUser("new user");
  };

  return (
    <div className="App">
      {users.map((user) => (
        <div>
          {user.id}. {user.username}
        </div>
      ))}
      <button onClick={onBtnClick}>click</button>
    </div>
  );
}

export default App;

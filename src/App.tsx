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
}

const useUsersStore = create<UsersState>((set) => ({
  users: [],
  currentUser: null,
  settings: {},
  isLoading: false,
  errors: [],
  addUser: (username: string) =>
    set((state) => ({
      users: [...state.users, { id: Date.now(), username }],
    })),
}));

const useCommentsStore = create(() => ({}));

function App () {
  const users = useUsersStore(state => state.users)
  const addUser = useUsersStore(state => state.addUser)

  return (
    <div className="App">

    </div>
  )
}

export default App
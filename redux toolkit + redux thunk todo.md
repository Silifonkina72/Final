# TODO: Инициализация Store на проекте с React, TypeScript, Redux Toolkit, Thunk и Yup

### Инициализация проекта с помощью Vite

1. **Инициализация нового проекта с Vite:**

   ```bash
   npm create vite@latest my-todo-app --template react-ts
   cd my-todo-app
   ```

2. **Установка необходимых зависимостей:**

   ```bash
   npm install @reduxjs/toolkit react-redux axios yup
   ```

## Структуризация директорий:

```plaintext 
src/
|-- api/
|   |-- todoApi.ts
|-- components/
|   |-- TodoApp/
|   |   |-- TodoApp.tsx
|   |   |-- TodoList.tsx
|   |   |-- TodoItem.tsx
|-- pages/
|   |-- Home.tsx
|-- store/
|   |-- slices/
|   |   |-- todoSlice.ts
|   |-- thunkActions/
|   |   |-- todoThunk.ts
|   |-- index.ts
|-- types/
|   |-- index.ts
|-- utils/
|   |-- logger.ts
|-- hooks.ts
|-- validation/
|   |-- todoValidation.ts
```

Под каждую сущность мы создаем в папках `types/`, `slices/`, `thunkActions/`, `api/` и `validation/` НОВЫЙ файл.

## Шаг 1: Создание папки `types` и описание типов

Зачем это нужно:
- Типизация позволяет обеспечить строгий контроль над типами данных в приложении, что помогает избежать ошибок и улучшает автодополнение в IDE.
- Определение типов в одном месте упрощает их использование и поддержку.

```ts
// Путь: src/types/index.ts

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoCreateRequest {
  title: string;
}

export interface TodoCreateResponse {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoUpdateRequest {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoUpdateResponse {
  id: number;
  title: string;
  completed: boolean;
}
```

## Шаг 2: Создание утилиты `logger.ts`

Зачем это нужно:
- Логирование ошибок помогает отслеживать и диагностировать проблемы в приложении, предоставляя информацию о произошедших ошибках.

```ts
// Путь: src/utils/logger.ts

export const logError = (error: unknown): void => {
  console.error(error);
};
```

## Шаг 3: Создание папки `validation` и валидации с помощью `yup`

Зачем это нужно:
- Валидация данных на уровне клиентского приложения помогает предотвратить отправку неверных данных на сервер, что улучшает пользовательский опыт и уменьшает нагрузку на сервер.

```ts
// Путь: src/validation/todoValidation.ts

import * as yup from 'yup';

export const todoSchema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
});
```

## Шаг 4: Создание папки `api` и взаимодействие с API

Зачем это нужно:
- Вынесение логики взаимодействия с backend в отдельную папку `api` позволяет разделить логику взаимодействия с сервером и логику управления состоянием в приложении.
- Это делает код более чистым и поддерживаемым.

```ts
// Путь: src/api/todoApi.ts

import axios, { AxiosError } from 'axios';
import { logError } from '../utils/logger';
import {
  TodoCreateRequest,
  TodoCreateResponse,
  TodoUpdateRequest,
  TodoUpdateResponse,
  Todo,
} from '../types';

const API_URL = 'http://localhost:3000/todos';

export const createTodo = async ({ title }: TodoCreateRequest): Promise<TodoCreateResponse> => {
  try {
    const response = await axios.post<TodoCreateResponse>(API_URL, { title });
    return response.data;
  } catch (error) {
    logError(error);
    throw error as AxiosError;
  }
};

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get<Todo[]>(API_URL);
    return response.data;
  } catch (error) {
    logError(error);
    throw error as AxiosError;
  }
};

export const updateTodo = async (todo: TodoUpdateRequest): Promise<TodoUpdateResponse> => {
  try {
    const response = await axios.put<TodoUpdateResponse>(`${API_URL}/${todo.id}`, todo);
    return response.data;
  } catch (error) {
    logError(error);
    throw error as AxiosError;
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    logError(error);
    throw error as AxiosError;
  }
};
```

## Шаг 5: Создание `thunkActions`

Зачем это нужно:
- Thunks позволяют выполнять асинхронные операции, такие как запросы к серверу, в Redux.
- Использование `createAsyncThunk` упрощает создание асинхронных экшенов и автоматическое управление состояниями загрузки и ошибок.

```ts
// Путь: src/store/thunkActions/todoThunk.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { createTodo, fetchTodos, updateTodo, deleteTodo } from '../../api/todoApi';
import {
  TodoCreateRequest,
  TodoUpdateRequest,
  Todo,
} from '../../types';

export const createTodoThunk = createAsyncThunk(
  'todos/create',
  async (todoData: TodoCreateRequest, { rejectWithValue }) => {
    try {
      return await createTodo(todoData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTodosThunk = createAsyncThunk(
  'todos/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTodos();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  'todos/update',
  async (todoData: TodoUpdateRequest, { rejectWithValue }) => {
    try {
      return await updateTodo(todoData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteTodo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
```

Зачем это нужно:
- `rejectWithValue` позволяет передать дополнительную информацию об ошибке в `rejected` action. Это полезно для обработки ошибок на уровне Redux и для отображения соответствующих сообщений об ошибках в пользовательском интерфейсе.
- Когда вы используете `rejectWithValue`, вы можете передать данные об ошибке, которые будут доступны в `action.payload` при обработке `rejected` состояния в `extraReducers`.

## Шаг 6: Создание slice под каждую сущность

Зачем это нужно:
- Slice объединяет редьюсеры и действия (actions) для управления состоянием одной сущности.
- `initialState` задает начальное состояние.
- `reducers` описывают, как состояние должно изменяться в ответ на синхронные действия.
- `extraReducers` обрабатывают асинхронные действия, созданные с помощью `createAsyncThunk`.

```ts
// Путь: src/store/slices/todoSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTodoThunk, fetchTodosThunk, updateTodoThunk, deleteTodoThunk } from '../thunkActions/todoThunk';
import { Todo } from '../../types';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Пример обычного редьюсера
    toggleTodoState(state, action: PayloadAction<number>) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodoThunk.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTodosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodosThunk.rejected, (state, action: PayloadAction<string>) => {


        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTodoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodoThunk.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodoThunk.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleTodoState, clearError } = todoSlice.actions;

export default todoSlice.reducer;
```

Зачем это нужно и как это работает:
- Обычные редьюсеры (`reducers`) описывают, как состояние должно изменяться в ответ на синхронные действия. Например:
  - `toggleTodoState`: Этот редьюсер изменяет состояние `completed` у задачи (todo) с заданным `id`.
  - `clearError`: Этот редьюсер очищает поле `error` в состоянии.
- `extraReducers` позволяет обрабатывать дополнительные действия (actions), которые не описаны в `reducers`. Это особенно полезно для обработки асинхронных операций, таких как thunks.
- Когда `createAsyncThunk` создаёт асинхронное действие, оно генерирует три типа действий: pending (ожидание), fulfilled (успешно выполнено) и rejected (ошибка).
- `builder.addCase` используется для обработки этих различных состояний:
  - `pending`: устанавливает `loading` в `true`, что можно использовать для отображения индикатора загрузки в UI.
  - `fulfilled`: обрабатывает успешное выполнение действия, добавляя новый элемент в список задач (`todos`) или обновляя состояние задач.
  - `rejected`: обрабатывает ошибки, устанавливая `error` в соответствующее сообщение об ошибке.
- Это обеспечивает централизованное управление состоянием и упрощает поддержку кода, разделяя синхронные и асинхронные логики.

## Шаг 7: Создание файла `store`

Зачем это нужно:
- Store является центральным хранилищем состояния приложения.
- `configureStore` из Redux Toolkit упрощает настройку store с рекомендованными настройками по умолчанию.
- Определение типов `RootState` и `AppDispatch` позволяет использовать типизированные хуки для работы со store.

```ts
// Путь: src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './slices/todoSlice';

const storeOptions = {
  reducer: {
    todos: todoSlice,
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Шаг 8: Создание своих хуков

Зачем это нужно:
- Типизированные хуки `useAppDispatch` и `useAppSelector` обеспечивают типобезопасное использование хуков `useDispatch` и `useSelector` из `react-redux`.
- Это упрощает работу с типами и уменьшает количество ошибок при доступе к состоянию и отправке действий.

```ts
// Путь: src/hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Шаг 9: Взаимодействие в компонентах

Зачем это нужно:
- Компоненты должны уметь взаимодействовать со store для получения состояния и отправки действий.
- Использование созданных хуков делает этот процесс типобезопасным и удобным.

### Главный компонент приложения

```tsx
// Путь: src/components/TodoApp/TodoApp.tsx

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createTodoThunk, fetchTodosThunk, updateTodoThunk, deleteTodoThunk } from '../../store/thunkActions/todoThunk';
import { todoSchema } from '../../validation/todoValidation';
import TodoList from './TodoList';

const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  const handleCreateTodo = async () => {
    try {
      await todoSchema.validate({ title });
      dispatch(createTodoThunk({ title }));
      setTitle('');
    } catch (validationError) {
      console.error(validationError);
    }
  };

  const handleClearError = () => {
    dispatch({ type: 'todos/clearError' });
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
      />
      <button onClick={handleCreateTodo} disabled={loading}>
        Создать
      </button>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={handleClearError}>Очистить ошибку</button>
        </div>
      )}
      <TodoList todos={todos} loading={loading} />
      {loading && <p>Загрузка...</p>}
    </div>
  );
};

export default TodoApp;
```

### Компонент списка задач

```tsx
// Путь: src/components/TodoApp/TodoList.tsx

import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../../types';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, loading }) => {
  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
```

### Компонент элемента задачи

```tsx
// Путь: src/components/TodoApp/TodoItem.tsx

import React from 'react';
import { useAppDispatch } from '../../hooks';
import { Todo } from '../../types';
import { updateTodoThunk, deleteTodoThunk } from '../../store/thunkActions/todoThunk';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(updateTodoThunk({ ...todo, completed: !todo.completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTodoThunk(todo.id));
  };

  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={handleToggle}
      >
        {todo.title}
      </span>
      <button onClick={handleDelete}>Удалить</button>
    </li>
  );
};

export default TodoItem;
```

## Шаг 10: Создание страницы Home

Зачем это нужно:
- Страницы позволяют разделить логику отображения в зависимости от маршрутов, что упрощает навигацию и организацию кода.

```tsx
// Путь: src/pages/Home.tsx

import React from 'react';
import TodoApp from '../components/TodoApp/TodoApp';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Список задач</h1>
      <TodoApp />
    </div>
  );
};

export default Home;
```

## Шаг 11: Оборачивание всего приложения в Provider

Зачем это нужно:
- Провайдер `Provider` из `react-redux` позволяет передать store всему приложению, что позволяет использовать хуки `useDispatch` и `useSelector` в любом компоненте приложения.

```tsx
// Путь: src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);
```



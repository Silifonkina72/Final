### Шаги по инициализации проекта

1. **Инициализация проекта с помощью Vite:**
   ```bash
   npm create vite@latest my-react-app -- --template react-ts
   cd my-react-app
   npm install
   ```

2. **Установка React Router:**
   ```bash
   npm install react-router-dom
   ```

3. **Структура проекта:**

   ```
   my-react-app/
   ├── public/
   ├── src/
   │   ├── api/
   │   ├── components/
   │   ├── pages/
   │   │   ├── List.tsx
   │   │   ├── TodoDetail.tsx
   │   │   ├── CreateTodo.tsx
   │   │   └── NotFound.tsx
   │   ├── routes/
   │   │   ├── protected/
   │   │   │   ├── index.tsx
   │   │   │   └── todoRoutes.tsx
   │   │   │   └── nestedTodoRoutes.tsx
   │   │   ├── public/
   │   │   │   ├── index.tsx
   │   │   │   └── publicRoutes.tsx
   │   │   └── index.tsx
   │   ├── types/
   │   ├── App.tsx
   │   ├── main.tsx
   ├── index.html
   ├── package.json
   └── vite.config.ts
   ```

4. **Настройка маршрутизации:**

   **Создание компонента Layout:**
   ```tsx
   // src/components/Layout.tsx
   import { Outlet } from 'react-router-dom';

   export function Layout() {
     return (
       <div>
         <header>Header</header>
         <main>
           <Outlet />
         </main>
         <footer>Footer</footer>
       </div>
     );
   }
   ```
   **Зачем это нужно и что это дает:**
   
   Компонент `Layout` служит для создания общей структуры страницы, включающей такие элементы, как шапка, основное содержимое и подвал. Использование `<Outlet />` позволяет внедрять дочерние компоненты в структуру, что делает приложение более модульным и управляемым.

   **Создание ErrorBoundary:**
   ```tsx
   // src/components/ErrorBoundary.tsx
   import { useRouteError } from 'react-router-dom';

   export function ErrorBoundary({ global }: { global?: boolean }) {
     const error = useRouteError();
     return (
       <div>
         <h1>{global ? 'Global Error' : 'Page Error'}</h1>
         <p>{error?.message || 'Something went wrong!'}</p>
       </div>
     );
   }
   ```
   **Зачем это нужно и что это дает:**

   Компонент `ErrorBoundary` позволяет ловить ошибки на уровне маршрутов и выводить пользовательский интерфейс для обработки ошибок. Это отличный способ улучшить обработку ошибок в приложении, делая его более устойчивым и информативным для пользователей.

   **Настройка маршрутов с использованием `useRoutes`:**

   **NestedTodoRoutes:**
   ```tsx
   // src/routes/protected/nestedTodoRoutes.tsx
   import { RouteObject, useRoutes } from 'react-router-dom';
   import { ErrorBoundary } from '../../components/ErrorBoundary';
   import { TodoDetail } from '../../pages/TodoDetail';
   import { NotFound } from '../../pages/NotFound';
   import { SubTodos } from '../../pages/SubTodos'; // Создайте страницу SubTodos

   const NestedTodoRouteObject: RouteObject[] = [
     {
       path: '/',
       children: [
         {
           path: ':todoId',
           element: <TodoDetail />,
           errorElement: <ErrorBoundary />
         },
         {
           path: ':todoId/subtodos',
           element: <SubTodos />,
           errorElement: <ErrorBoundary />
         },
         {
           path: '*',
           element: <NotFound />
         }
       ],
       errorElement: <ErrorBoundary global={true} />
     },
     {
       path: '*',
       element: <NotFound />
     }
   ];

   export const NestedTodoRoutes = () => {
     return useRoutes(NestedTodoRouteObject);
   };
   ```

   **TodoRoutes:**
   ```tsx
   // src/routes/protected/todoRoutes.tsx
   import { RouteObject, useRoutes } from 'react-router-dom';
   import { Layout } from '../../components/Layout';
   import { ErrorBoundary } from '../../components/ErrorBoundary';
   import { List } from '../../pages/List';
   import { NotFound } from '../../pages/NotFound';
   import { CreateTodo } from '../../pages/CreateTodo';
   import { NestedTodoRoutes } from './nestedTodoRoutes';

   const TodoRouteObject: RouteObject[] = [
     {
       element: <Layout />,
       errorElement: <ErrorBoundary global={true} />,
       children: [
         {
           path: '/',
           index: true,
           element: <List />,
           errorElement: <ErrorBoundary />
         },
         {
           path: 'todos/*',
           element: <NestedTodoRoutes />,
           errorElement: <ErrorBoundary />
         },
         {
           path: 'create',
           element: <CreateTodo />,
           errorElement: <ErrorBoundary />
         },
         {
           path: '*',
           element: <NotFound />
         }
       ]
     }
   ];

   export const TodoRoutes = () => {
     return useRoutes(TodoRouteObject);
   };
   ```

   **Зачем это нужно и что это дает:**

   `useRoutes` позволяет создавать иерархическую структуру маршрутов, что делает приложение более гибким и расширяемым. Вы можете легко добавлять новые маршруты, организовывать их в логические группы и управлять ими в одном месте, что упрощает поддержку и развитие приложения.

   **Защищенные маршруты:**
   ```tsx
   // src/routes/protected/index.tsx
   import { RouteObject, createBrowserRouter } from 'react-router-dom';
   import { ErrorBoundary } from '../../components/ErrorBoundary';
   import { TodoRoutes } from './todoRoutes';

   export const protectedRoutes: RouteObject[] = [
     {
       path: '/*',
       element: <TodoRoutes />,
       errorElement: <ErrorBoundary global={true} />
     }
   ];

   export const protectedRouter = createBrowserRouter(protectedRoutes);
   ```

   **Незащищенные маршруты:**
   ```tsx
   // src/routes/public/publicRoutes.tsx
   import { RouteObject, useRoutes } from 'react-router-dom';
   import { Layout } from '../../components/Layout';
   import { ErrorBoundary } from '../../components/ErrorBoundary';
   import { Home } from '../../pages/Home';
   import { About } from '../../pages/About';
   import { NotFound } from '../../pages/NotFound';

   const PublicRouteObject: RouteObject[] = [
     {
       element: <Layout />,
       errorElement: <ErrorBoundary global={true} />,
       children: [
         {
           path: '/',
           index: true,
           element: <Home />,
           errorElement: <ErrorBoundary />
         },
         {
           path: 'about',
           element: <About />,
           errorElement: <ErrorBoundary />
         },
         {
           path: '*',
           element: <NotFound />
         }
       ]
     }
   ];

   export const PublicRoutes = () => {
     return useRoutes(PublicRouteObject);
   };

   export const publicRouter = createBrowserRouter(PublicRouteObject);
   ```

   **Экспорт маршрутов в `routes/index.tsx`:**
   ```tsx
   // src/routes/index.tsx
   import { RouterProvider } from 'react-router-dom';
   import { protectedRouter } from './protected';
   import { publicRouter } from './public';

   interface AppRoutesProps {
     isAuth: boolean;
   }

   export function AppRoutes({ isAuth }: AppRoutesProps) {
     return <RouterProvider router={isAuth ? protectedRouter : publicRouter}></RouterProvider>;
   }
   ```

5. **Настройка основного приложения:**
```tsx
// src/App.tsx
import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import store from './store'; // Импортируйте ваш store

function App() {
  const isAuth = true; // или получить значение из вашего состояния

  return (
    <Provider store={store}>
      <AppRoutes isAuth={isAuth} />
    </Provider>
  );
}

export default App;
```

6. **Настройка точки входа:**
```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Зачем все это оборачивать в маршрутизатор

Оборачивание компонентов в маршрутизатор необходимо для управления навигацией и маршрутизацией в приложении. React Router предоставляет мощный и гибкий способ управления переходами между страницами, динамическими маршрутами и обработкой ошибок.

 Использование `Layout` с `<Outlet />` позволяет создавать общую структуру для страниц и организовывать их внутри родительского компонента. Это делает код более читаемым и поддерживаемым.

### Пример расширения маршрутов с использованием `useRoutes`

Использование `useRoutes` позволяет создавать иерархическую структуру маршрутов и удобно добавлять новые маршруты. 

Таким образом, вы можете легко добавлять и расширять маршруты, используя `useRoutes`, и сохранять код организованным и поддерживаемым.
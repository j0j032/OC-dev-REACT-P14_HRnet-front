# OpenClassrooms-REACT-P14_HR-Net

### Prequirements:

> **This is my last project for the Openclassrooms React Developer path.**
>
>⚠ If you are not a member of Openclassrooms and want to try the project, contact me.
> Else, I've provided the information to the jury

The Project is built on MERN stack(Mongo,Express,React,Node) and it uses `pnpm create vite`.

To run the project ```pnpm run dev```

> ⚠ The [REST Api](https://github.com/j0j032/OC-dev-REACT-P14_HRnet-Back) built with nodeJs/express is hosted on aws,
> I'll
> turn
> on the server when the exam date will be booked, so you don't have to run it yourself.
> Make sure you run the app on http://localhost:5173 or http://localhost:4173 (restricted CORS policy)


---

### Description:

Hrnet is an app to manage your employees, it provides a simple interface to add, edit, delete and search
employees.
You can access to the app with the 2 differents users I've provided in the OC deliverables.

The interface display a list of employees in terms of its company. so you have custom theme for each company and
employees are different.

---

### Main Features:

- Authentication
- CRUD operations
- Search
- Sort
- Server side Pagination
- Table view
- Gallery view
- Upload and display pictures
- Picture optimization
- Dark / Light theme

---

### Libraries:

#### Custom (asked by the jury):

- [basic-modal-react](https://github.com/j0j032/basic-modal-react) to display a modal
- [basic-datepicker-react](https://github.com/j0j032/basic-datepicker-react) to display a custom datepicker

#### State management:

- [react-query](https://react-query.tanstack.com/) for server state synchronization
- [context native Api](https://reactjs.org/docs/context.html) for client state management

💡 _If you want to know why I made these choices, [You can read my article about state management in
React](https://hello-j0j0.medium.com/state-management-client-state-server-state-pourquoi-vous-devriez-utiliser-react-query-b731356d5078)_

#### Others:

- [react-hook-form](https://react-hook-form.com/) for form management
- [react-table](https://react-table.tanstack.com/) for table management

---

### Performance:

To test performance, I provide a no auth branch, it's the same app but without authentication. So if you want to test in
lightHouse
please check out to the [no-auth](https://github.com/j0j032/OC-dev-REACT-P14_HRnet-front/tree/no-auth) branch and run:

- ```pnpm run build```
- ```pnpm run preview```

---


👋 I also designed everything my self so Hope you'll enjoy it, and if you have any questions, don't hesitate to contact
me.

Jordan


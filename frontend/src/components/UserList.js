// /frontend/src/components/UserList.js
import React, { useEffect, useState } from "react";
import userService from "../services/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers();
        setUsers(response.data);
      } catch (error) {
        alert("Error al obtener los usuarios");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.level}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

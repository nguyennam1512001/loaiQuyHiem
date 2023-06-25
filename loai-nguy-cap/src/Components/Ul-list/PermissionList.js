import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./style.css";

function PermissionList({handlePermissionChange }) {
  const data = useContext(AuthContext);

  const handleContainerClick = (event) => {
    event.stopPropagation();
  };

  const handleChange = (event, itemId, num) => {
    handlePermissionChange(itemId, num);
  };
  
  return (
    <ul className="permission-list" onClick={handleContainerClick}>
      {data.permissionData &&
        data.permissionData.map((item) => {
          return (
            <li key={item.id}>
              <input
                className="permission-item"
                type="checkbox"
                id={item.id}
                checked={item.checked}
                onChange={(event) => handleChange(event, item.name, item.id)}
              />
              <label htmlFor={item.id}>{item.name}</label>
            </li>
          );
        })}
    </ul>
  );
}

export default PermissionList;

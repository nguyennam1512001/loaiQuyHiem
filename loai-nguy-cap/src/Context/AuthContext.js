import axios from "axios";
import React, { createContext, memo, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = memo(({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("user-token"));
  const [permissionData, setPermissionData] = useState(null)
  const [kingdom, setKingdom] = useState(null)
  const [phylum, setPhylum] = useState(null)
  const [Class, setClass] = useState(null)
  const [order, setOrder] = useState(null)
  const [family, setFamily] = useState(null)
  const [genus, setGenus] = useState(null)
  const [config, setconfig] = useState(null)

  const checkAuth = (token) => {
    setIsChecking(true);
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setconfig(configs)
    axios.get("http://wlp.howizbiz.com/api/roles", configs)
      .then((res) => {
        setPermissionData(res.data);
      })
      .catch((error) => {
        console.error(error);
    });
    
    return axios
      .get("http://wlp.howizbiz.com/api/me", configs)
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data.user);
        return res.data.user;
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setIsChecking(false);
      });
  };
    if (!isChecking && !isAuthenticated && token) {
    checkAuth(token);
    }

  const login = (token) => {
    localStorage.setItem("user-token", token);
    setIsAuthenticated(true);
    setToken(token);
    checkAuth(token);
  };
  const logout = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("kingdom");
    localStorage.removeItem("phylum");
    localStorage.removeItem("class");
    localStorage.removeItem("order");
    localStorage.removeItem("family");
    localStorage.removeItem("genus");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ kingdomRes, phylumRes, classRes, orderRes, familyRes, genusRes] = await Promise.all([
          axios.get("http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Kingdom", config),
          axios.get("http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Phylum", config),
          axios.get("http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Class", config),
          axios.get("http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Order", config),
          axios.get("http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Family", config),
          axios.get("http://wlp.howizbiz.com/api/phanloaihoc?ranks[]=Genus", config)
        ]);
        setKingdom(kingdomRes.data);
        setPhylum(phylumRes.data);
        setClass(classRes.data);
        setOrder(orderRes.data);
        setFamily(familyRes.data);
        setGenus(genusRes.data);

        // Lưu trữ dữ liệu vào localStorage
        localStorage.setItem('kingdom', JSON.stringify(kingdomRes.data));
        localStorage.setItem('phylum', JSON.stringify(phylumRes.data));
        localStorage.setItem('class', JSON.stringify(classRes.data));
        localStorage.setItem('order', JSON.stringify(orderRes.data));
        localStorage.setItem('family', JSON.stringify(familyRes.data));
        localStorage.setItem('genus', JSON.stringify(genusRes.data));
      } catch (error) {
        console.error(error);
      }
    };

    // Kiểm tra dữ liệu trong localStorage
    const kingdomFromLocalStorage = localStorage.getItem('kingdom');
    const phylumFromLocalStorage = localStorage.getItem('phylum');
    const classFromLocalStorage = localStorage.getItem('class');
    const orderFromLocalStorage = localStorage.getItem('order');
    const familyFromLocalStorage = localStorage.getItem('family');
    const genusFromLocalStorage = localStorage.getItem('genus');

    if ( kingdomFromLocalStorage && phylumFromLocalStorage && classFromLocalStorage && orderFromLocalStorage && familyFromLocalStorage && genusFromLocalStorage) {
      setKingdom(JSON.parse(kingdomFromLocalStorage));
      setPhylum(JSON.parse(phylumFromLocalStorage));
      setClass(JSON.parse(classFromLocalStorage));
      setOrder(JSON.parse(orderFromLocalStorage));
      setFamily(JSON.parse(familyFromLocalStorage));
      setGenus(JSON.parse(genusFromLocalStorage));
    } else {
      fetchData();
    }
  },[]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isChecking, login, logout, user,permissionData,  kingdom, phylum, Class, order, family, genus }}
    >
      {children}
    </AuthContext.Provider>
  );
})
export const useAuth = () => useContext(AuthContext);
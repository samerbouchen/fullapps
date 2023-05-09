import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, redirect } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Chiefs from "scenes/chiefs";
import Geography from "scenes/geography";
import Login from "scenes/login/login";
import getUserRole from "service/getUserRole";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(null);
  useEffect(()=> {
      if(localToken) {
        setToken(localToken);
      }
  },[])
  return (
    <div className="app">
      <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                  {!token ?
                   <Route path="/login" element={<Login setToken={setToken} token={token} />} />
                   : (  
                   <>
                    <Route path="/login" element={<Login setToken={setToken} token={token} />} />
                    <Route element={<Layout token={token} />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {getUserRole(token) === "admin"
                      ?
                      <>
                        <Route path="/chiefs" element={<Chiefs />} />
                      </>
                      : null
                      }
                    <Route path="/contact" element={<Geography />} />

                    </Route>
                   </>

                   )
                }
                </Routes>
            </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

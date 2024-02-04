import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function Context({ children }) {
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [classrooms, setClassrooms] = useState([])
    const [blogpost, setblogpost] = useState([])
    const [receiver, setreceiver] = useState([])
    return (
        <AuthContext.Provider value={{receiver,setreceiver,setblogpost,blogpost,showForm, setShowForm, editForm, setEditForm,classrooms,setClassrooms }}>
            {children}
        </AuthContext.Provider>
    );
}

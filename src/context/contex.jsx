import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function Context({ children }) {
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [classrooms, setClassrooms] = useState([])
    const [blogpost, setblogpost] = useState([])
    return (
        <AuthContext.Provider value={{setblogpost,blogpost,showForm, setShowForm, editForm, setEditForm,classrooms,setClassrooms }}>
            {children}
        </AuthContext.Provider>
    );
}

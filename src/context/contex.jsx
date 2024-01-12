import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function Context({ children }) {
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    return (
        <AuthContext.Provider value={{ showForm, setShowForm, editForm, setEditForm }}>
            {children}
        </AuthContext.Provider>
    );
}

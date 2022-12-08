import React, { createContext, useReducer } from "react";
import Reducer from "./Reduser";

const initialState = {
    ui_pw_input_visibility: false,
    ui_login_alt_link_drawer: false,
    ui_toggle_switch: "left",
    ui_radio_btn_checked: true,
    ui_right_sidepanel_modal_show: false
};

const ContextStore = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
};

export const Context = createContext(initialState);
export default ContextStore;

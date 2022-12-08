import React, { useEffect, useRef, useState, forwardRef } from "react";

import Form from 'react-bootstrap/Form';


const UiBasicDropDown = (props) => {
    return (
        <>
            <div className="col-10">
                <Form.Select aria-label="Select User Name" onClick={props.onClick}>
                <option value="">Select User Name</option>
                    {props.userlist.map((users) => (
                        <option value={users.email}>{users.first_name != undefined ? ((users.first_name) + " " + (users.last_name != undefined ? users.last_name : "")) : users.email}</option>
                    ))}
                </Form.Select>
            </div>
        </>
    );
};

export {
    UiBasicDropDown,
}
// ActionIcons.js
import React from 'react';
import { HiOutlineEye } from 'react-icons/hi';
import { TbPencilMinus } from 'react-icons/tb';
import { FaTimes } from 'react-icons/fa';

const ActionIcons = ({ remove, edit, view, disable, disableEdit, disableDelete, disableDeleteBtn }) => {
    return (
        <div className="flex gap-4 items-center justify-start">
            {!disableEdit && <HiOutlineEye className="cursor-pointer text-green-600" size={!disable ? 20 : 25} onClick={view} />}
            {!disable && (
                <div className="flex gap-4 items-center justify-start">
                    {!disableEdit && <TbPencilMinus className="cursor-pointer dark:text-custom-blue-dark text-custom-blue-light" size={20} onClick={edit} />}
                    {!disableDelete && <button disabled={disableDeleteBtn}><FaTimes className={`${disableDeleteBtn ? "cursor-not-allowed" : "cursor-pointer"} text-red-500 p-0.5 border rounded-full border-red-500`} size={!disableEdit ? 18 : 23} onClick={remove} /></button>}
                </div>)
            }
        </div>
    );
};

export default ActionIcons;

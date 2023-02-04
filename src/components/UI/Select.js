import React from "react";

const Select = (props) => {
    return(
        <div className={`col col-lg-${props.cols.lg} col-md-${props.cols.md} col-sm-${props.cols.sm} col-12`}>
            <div className="form-group label-floating is-select">
                <label className="control-label">
                    {props.label}
                </label>
                <select className="form-select" ref={props.my_ref} onChange={e => props.on_change ? props.on_change(e.target.value) : undefined}>
                    <option value="">{props.selected_option}</option>
                    {
                        props.options && props.options.map((opt, index) =>
                            <option key={index} value={opt.value}>{opt.label}</option>
                        )
                    }
                </select>
                <div className={`invalid-feedback ${props.has_errored ? 'd-block' : 'd-none'}`}>
                    {props.error_message}
                </div>
            </div>
        </div>
    );
}
export default Select;
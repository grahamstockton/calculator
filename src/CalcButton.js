function CalcButton(props) {
    return (
        <button className="calc-button" id={props.name === "0" ? "zero" : props.name} onClick={props.onClick}>{props.name}</button>
    )
}

export default CalcButton;
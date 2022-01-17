function CalcButton(props) {
    return (
        <button className="calc-button" id={props.name} onClick={props.onClick}>{props.name}</button>
    )
}

export default CalcButton;
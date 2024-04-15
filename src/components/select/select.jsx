export default function Select(props) {
    //props need :
    const { selectedOption, onOptionChange } = props; //{unrequired, atLeast(() => {})}
    const options = props.optionList; //required
    const values = props.valueList ? props.valueList : undefined; //
    const id = props.id ? props.id : undefined; //

    const option = options.map((option, index) => {
        return (
            <option key={index} value={values ? values[index] : index}>
                {option}
            </option>
        );
    });
    return (
        <>
            <select
                defaultValue={selectedOption ? selectedOption : ''}
                name={id ? id : ''}
                id={id ? id : ''}
                onChange={(e) => onOptionChange(e.target)}>
                {/* onChange={(e) => onOptionChange(e.target.selectedindex.value)}> with index*/}
                {option}
            </select>
        </>
    );
}
/**
 * props should have at least onOptionChange={() => {}}
 * onOptionChange can be any f(e.target){}
 *`
 */

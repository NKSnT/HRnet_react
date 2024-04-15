import { /* useEffect, */ useState } from 'react';
import States from 'src/assets/states';

export default function Select(props) {
    const defaultSelectValue = States[0].abbreviation;
    const [selected, setSelected] = useState(defaultSelectValue);
    //props need :
    const options = props.optionList; //required
    const values = props.valueList ? props.valueList : undefined; //
    const id = props.id ? props.id : undefined; //

    const option = options.map((options, index) => {
        return (
            <option key={index} value={values ? values[index] : index}>
                {options}
            </option>
        );
    });
    return (
        <>
            <select
                name={id ? id : ''}
                id={id ? id : ''}
                onChange={(e) => setSelected(e.target.value)}>
                {option}
            </select>
        </>
    );
}

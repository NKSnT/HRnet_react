<!-- usage -->

import Select from 'react_select_pckg';

function MyComponent() {
return (
<Select
optionList={statesNames}
valueList={statesAbbreviation}
id=""
onOptionChange={(elTarget) => {}}
/>
);
}

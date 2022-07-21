import {CurrencyConvector} from "./components";
import {useEffect, useState} from "react";


function App() {
    const currencies = ['USD', 'UAH', 'EUR']
    const [selectOption, setSelectOption] = useState({})

    // console.log(selectOption)
    useEffect(() => {
            fetch('https://api.exchangerate.host/latest',
                {
                    method: "GET",
                    mode: 'cors'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setSelectOption({
                        base: data.base,
                        rates: Object.keys(data.rates).reduce((result, key) => {
                            if (currencies.includes(key)) {
                                return {...result, [key]: data.rates[key]}
                            }
                            return result
                        }, {})
                    })
                })
        }
        , []
    )
    return (
        <div className='container'>
            <CurrencyConvector selectOption={selectOption} setSelectOption={setSelectOption}/>
        </div>
    );
}

export default App;

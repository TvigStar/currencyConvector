import {useEffect, useState} from "react";

export const CurrencyConvector = (props) => {
    const {selectOption, setSelectOption} = props
    const [secondBase, setSecondBase] = useState('')
    const [input, setInput] = useState({firstValue: 1, secondValue: 1})

    const selectHandle = (e) =>  {
        const rates =  Object.keys(selectOption.rates).reduce( (prev, current) => {
            return {...prev, [current]: selectOption.rates[current] / selectOption.rates[e.target.value]
            }
        }, {})
        setSelectOption({
            base: e.target.value,
            rates
        })
        setInput({firstValue: input.firstValue,
            secondValue: (input.firstValue * rates[secondBase]).toFixed(4)})
    }

    const secondSelectHandle = (value) => {
       setSecondBase(value)
        setInput({firstValue: (input.secondValue / selectOption.rates[value]).toFixed(4),
            secondValue: input.secondValue})
    }

    const inputHandler = (value) => {
        setInput({firstValue: value,
            secondValue: (value * selectOption.rates[secondBase]).toFixed(4)})
    }

    const secondInputHandler = (value) => {
        setInput({firstValue: (value / selectOption.rates[secondBase]).toFixed(4),
        secondValue: value})
    }

    useEffect(() => {
        if (!secondBase){
            console.log(selectOption.base)
            setSecondBase(selectOption.base)
        }
    }, [selectOption])

    if (Object.keys(selectOption).length === 0) {
        return (
            <div>
                <h1> loading</h1>
            </div>
        )
    }


    return (
        <div>
            <div>
                <input
                    value={input.firstValue}
                    onChange={(e) => inputHandler(+e.target.value)} />
                <select
                    value={selectOption.base}
                    onChange={selectHandle}>
                    {Object.keys(selectOption.rates).map(option =>
                        <option value={option} key={option}> {option}</option>
                    )}
                </select>
            </div>
            <br></br>
            <div>
                <input
                    value={input.secondValue}
                    onChange={(e) => secondInputHandler(+e.target.value)}/>
                <select
                    value={secondBase}
                    onChange={(e) => secondSelectHandle(e.target.value)}>
                    {Object.keys(selectOption.rates).map(option =>
                        <option value={option} key={option}> {option}</option>
                    )}
                </select>
            </div>
        </div>
    )
}


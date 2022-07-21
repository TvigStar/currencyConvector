import {useEffect, useState} from "react";

export const CurrencyConvector = (props) => {
    const {selectOption, setSelectOption} = props
    const [newBase, setNewBase] = useState('')
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
            secondValue: (input.firstValue * rates[newBase]).toFixed(4)})
    }

    const secondSelectHandle = (value) => {
       setNewBase(value)
        setInput({firstValue: (input.secondValue / selectOption.rates[value]).toFixed(4),
            secondValue: input.secondValue})
    }

    const inputHandler = (value) => {
        setInput({firstValue: value,
            secondValue: (value * selectOption.rates[newBase]).toFixed(4)})
    }

    const secondInputHandler = (value) => {
        setInput({firstValue: (value / selectOption.rates[newBase]).toFixed(4),
        secondValue: value})
    }

    useEffect(() => {
        if (!newBase){
            console.log(selectOption.base)
            setNewBase(selectOption.base)
        }
    }, [selectOption])

    if (Object.keys(selectOption).length === 0) {
        return (
            <div className='load_block'>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }


    return (
        <div className='main'>
            <span className='txt_currency'> Currency Convector</span>
            <div className='block_input'>
            <div className='inputs'>
                <input
                    className='form'
                    value={input.firstValue}
                    onChange={(e) => inputHandler(+e.target.value)} />
                <select
                    className='form'
                    value={selectOption.base}
                    onChange={selectHandle}>
                    {Object.keys(selectOption.rates).map(option =>
                        <option value={option} key={option}> {option}</option>
                    )}
                </select>
            </div>
            <br></br>
            <div className='inputs'>
                <input
                    className='form'
                    value={input.secondValue}
                    onChange={(e) => secondInputHandler(+e.target.value)}/>
                <select
                    className='form'
                    value={newBase}
                    onChange={(e) => secondSelectHandle(e.target.value)}>
                    {Object.keys(selectOption.rates).map(option =>
                        <option value={option} key={option}> {option}</option>
                    )}
                </select>
            </div>
            </div>
        </div>
    )
}

